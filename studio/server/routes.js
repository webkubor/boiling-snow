import { createReadStream, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { createRouter, fail, json } from './lib/http.js';
import { generate, health, listJobs, postProcess } from './lib/museav.js';
import { PROJECT_ROOT, resolveReadable, resolveWritable } from './lib/paths.js';
import { nextId, readState, writeState } from './lib/state.js';
import { getRegistry, invalidateRegistry } from './registry.js';

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  // 标题字体直接读仓库里的原文件，不在 studio 下存副本
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff2': 'font/woff2',
};

/* ── SSE：出图是几十秒的长活，进度得能实时推回前端 ───────────────── */

const sseClients = new Set();

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) {
    // 某个页签关了不该影响其它页签
    try {
      res.write(payload);
    } catch {
      sseClients.delete(res);
    }
  }
}

/* ── 镜头（工作台自己的账本，不碰 episodes/） ─────────────────────── */

const SHOTS_FILE = 'shots.json';
const emptyShots = () => ({ shots: [] });

function loadShots() {
  const state = readState(SHOTS_FILE, emptyShots());
  if (!Array.isArray(state.shots)) return emptyShots();
  return state;
}

/** 只挑白名单字段落盘，免得前端顺手把整个对象塞回来污染账本 */
function sanitizeShot(input, base = {}) {
  const pick = (key, fallback) => (input[key] !== undefined ? input[key] : (base[key] ?? fallback));
  return {
    id: base.id,
    episode: pick('episode', null),
    title: pick('title', '未命名镜头'),
    order: Number(pick('order', 0)) || 0,
    duration: Number(pick('duration', 5)) || 5,
    prompt: pick('prompt', ''),
    ratio: pick('ratio', '16:9'),
    model: pick('model', ''),
    characters: Array.isArray(pick('characters')) ? pick('characters') : [],
    refs: Array.isArray(pick('refs')) ? pick('refs') : [],
    status: pick('status', 'draft'),
    notes: pick('notes', ''),
    takes: Array.isArray(base.takes) ? base.takes : [],
    createdAt: base.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/* ── 剧集 / 分镜（只读） ──────────────────────────────────────── */

function listMarkdown(dirRel) {
  const dir = join(PROJECT_ROOT, dirRel);
  try {
    return readdirSync(dir)
      // README 是给人看的目录说明，不是剧集/分镜本身
      .filter((f) => f.endsWith('.md') && f.toUpperCase() !== 'README.MD')
      .map((f) => {
        const abs = join(dir, f);
        const text = readFileSync(abs, 'utf8');
        const st = statSync(abs);
        return {
          id: basename(f, '.md'),
          rel: `${dirRel}/${f}`,
          // 第一个 # 标题当作显示名，没有就退回文件名
          title: text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? basename(f, '.md'),
          lines: text.split('\n').length,
          size: st.size,
          mtime: st.mtimeMs,
        };
      })
      .sort((a, b) => a.id.localeCompare(b.id, 'zh'));
  } catch {
    return [];
  }
}

/* ── 路由表 ──────────────────────────────────────────────────── */

export const handleApi = createRouter({
  'GET /health': async ({ res }) => {
    const reg = getRegistry();
    json(res, {
      museav: await health(),
      registry: {
        characters: reg.characters.length,
        categories: Object.fromEntries(
          Object.entries(reg.categories).map(([k, v]) => [k, v.length]),
        ),
        orphans: reg.orphans.length,
      },
    });
  },

  'GET /registry': ({ res, query }) => {
    const reg = getRegistry({ force: query.get('refresh') === '1' });
    json(res, {
      // 不回 raw：角色全文按需单取，列表页不需要几百 KB
      characters: reg.characters.map(({ raw, ...rest }) => rest),
      categories: reg.categories,
      orphans: reg.orphans,
      builtAt: reg.builtAt,
    });
  },

  'GET /cast/:name': ({ res, params }) => {
    const char = getRegistry().characters.find((c) => c.name === params.name);
    if (!char) throw Object.assign(new Error(`没有这个角色: ${params.name}`), { statusCode: 404 });
    json(res, char);
  },

  'PUT /cast/:name': ({ res, params, body }) => {
    const char = getRegistry().characters.find((c) => c.name === params.name);
    if (!char) throw Object.assign(new Error(`没有这个角色: ${params.name}`), { statusCode: 404 });
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw Object.assign(new Error('角色档案必须是一个 JSON 对象'), { statusCode: 400 });
    }
    // 缩进 2 + 中文不转义，跟仓库里现有 JSON 的风格一致，diff 才干净
    const abs = resolveWritable(char.castPath);
    writeFileSync(abs, `${JSON.stringify(body, null, 2)}\n`, 'utf8');
    invalidateRegistry();
    json(res, { ok: true, path: char.castPath });
  },

  'GET /episodes': ({ res }) => json(res, listMarkdown('episodes')),
  'GET /storyboards': ({ res }) => json(res, listMarkdown('scripts/storyboards')),

  'GET /doc/:rel': ({ res, params }) => {
    const abs = resolveReadable(params.rel);
    json(res, { rel: params.rel, text: readFileSync(abs, 'utf8') });
  },

  'GET /shots': ({ res }) => json(res, loadShots()),

  'POST /shots': ({ res, body }) => {
    const state = loadShots();
    const shot = sanitizeShot(body);
    shot.id = nextId('shot', state.shots);
    state.shots.push(shot);
    writeState(SHOTS_FILE, state);
    json(res, shot, 201);
  },

  'PUT /shots/:id': ({ res, params, body }) => {
    const state = loadShots();
    const index = state.shots.findIndex((s) => s.id === params.id);
    if (index < 0) throw Object.assign(new Error('镜头不存在'), { statusCode: 404 });
    state.shots[index] = sanitizeShot(body, state.shots[index]);
    writeState(SHOTS_FILE, state);
    json(res, state.shots[index]);
  },

  'DELETE /shots/:id': ({ res, params }) => {
    const state = loadShots();
    const index = state.shots.findIndex((s) => s.id === params.id);
    if (index < 0) throw Object.assign(new Error('镜头不存在'), { statusCode: 404 });
    const [removed] = state.shots.splice(index, 1);
    writeState(SHOTS_FILE, state);
    json(res, { ok: true, removed: removed.id });
  },

  /** 标记采用哪一版出图 */
  'POST /shots/:id/adopt': ({ res, params, body }) => {
    const state = loadShots();
    const shot = state.shots.find((s) => s.id === params.id);
    if (!shot) throw Object.assign(new Error('镜头不存在'), { statusCode: 404 });
    let found = false;
    for (const take of shot.takes) {
      take.adopted = take.id === body.takeId;
      if (take.adopted) found = true;
    }
    if (!found) throw Object.assign(new Error('这一版不存在'), { statusCode: 404 });
    shot.status = 'adopted';
    shot.updatedAt = new Date().toISOString();
    writeState(SHOTS_FILE, state);
    json(res, shot);
  },

  /**
   * 出图 / 出视频。**这一步花钱**，所以只在用户显式点击时触发，
   * 后端任何地方都不会自动调它。立即返回，进度走 SSE。
   */
  'POST /shots/:id/generate': ({ res, params, body }) => {
    const state = loadShots();
    const shot = state.shots.find((s) => s.id === params.id);
    if (!shot) throw Object.assign(new Error('镜头不存在'), { statusCode: 404 });

    const prompt = (body.prompt ?? shot.prompt ?? '').trim();
    if (!prompt) throw Object.assign(new Error('这个镜头还没有 prompt'), { statusCode: 400 });

    // 垫图存的是仓库相对路径，交给 museav 前换成绝对路径
    const refs = (body.refs ?? shot.refs ?? []).map((rel) => resolveReadable(rel));

    const takeId = nextId('take', shot.takes);
    const take = {
      id: takeId,
      prompt,
      video: Boolean(body.video),
      model: body.model || shot.model || '',
      ratio: body.ratio || shot.ratio || '16:9',
      refs: body.refs ?? shot.refs ?? [],
      status: 'running',
      url: null,
      error: null,
      startedAt: new Date().toISOString(),
    };
    shot.takes.push(take);
    shot.status = 'generating';
    writeState(SHOTS_FILE, state);
    json(res, { ok: true, take }, 202);

    generate(
      {
        prompt,
        ratio: take.ratio,
        model: take.model || undefined,
        refs,
        video: take.video,
        duration: take.video ? shot.duration : undefined,
      },
      (line) => broadcast('progress', { shotId: shot.id, takeId, line }),
    )
      // 留下 museav 的原始 stdout：出图结果对不上时，这是唯一能复盘的线索
      .then((result) => finishTake(shot.id, takeId, { status: 'done', url: result.url, raw: result.raw }))
      .catch((err) => finishTake(shot.id, takeId, { status: 'failed', error: err.message }));
  },

  'GET /jobs': async ({ res, query }) => {
    json(res, await listJobs({ limit: Number(query.get('limit')) || 20 }));
  },

  'POST /post-process': async ({ res, body }) => {
    const abs = resolveReadable(body.path);
    json(res, await postProcess(body.action, abs, body.args ?? []));
  },

  /** 图片/视频直出。前端 <img src="/api/asset?p=references/..."> */
  'GET /asset': ({ req, res, query }) => {
    const rel = query.get('p');
    const abs = resolveReadable(rel);
    const st = statSync(abs);
    const type = MIME[extname(abs).toLowerCase()] ?? 'application/octet-stream';

    // 视频要能拖进度条，得支持 Range
    const range = req.headers.range;
    if (range && type.startsWith('video/')) {
      const [startRaw, endRaw] = range.replace(/bytes=/, '').split('-');
      const start = Number(startRaw) || 0;
      const end = endRaw ? Number(endRaw) : st.size - 1;
      res.writeHead(206, {
        'content-type': type,
        'content-range': `bytes ${start}-${end}/${st.size}`,
        'accept-ranges': 'bytes',
        'content-length': end - start + 1,
      });
      createReadStream(abs, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'content-type': type,
      'content-length': st.size,
      // 本地文件随时可能被重新出图覆盖，别让浏览器缓存住
      'cache-control': 'no-cache',
    });
    createReadStream(abs).pipe(res);
  },

  'GET /events': ({ req, res }) => {
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    });
    res.write('retry: 3000\n\n');
    sseClients.add(res);

    const keepAlive = setInterval(() => {
      try {
        res.write(': ping\n\n');
      } catch {
        clearInterval(keepAlive);
      }
    }, 25_000);

    req.on('close', () => {
      clearInterval(keepAlive);
      sseClients.delete(res);
    });
  },
});

/** 出图结束后回写账本并广播——两个 then 分支共用，避免写重复逻辑 */
function finishTake(shotId, takeId, patch) {
  const state = loadShots();
  const shot = state.shots.find((s) => s.id === shotId);
  if (!shot) return;
  const take = shot.takes.find((t) => t.id === takeId);
  if (!take) return;

  Object.assign(take, patch, { finishedAt: new Date().toISOString() });
  // 别把已经采用过的镜头打回去
  if (shot.status === 'generating') {
    shot.status = patch.status === 'done' ? 'review' : 'failed';
  }
  writeState(SHOTS_FILE, state);
  broadcast('take', { shotId, take });
}

/** 挂进 Vite dev server 的 middleware */
export function apiMiddleware() {
  return async (req, res, next) => {
    if (!req.url?.startsWith('/api/')) return next();
    const url = new URL(req.url, 'http://localhost');
    try {
      const matched = await handleApi(req, res, url.pathname.slice('/api'.length), url.searchParams);
      if (!matched) json(res, { error: `未知接口: ${url.pathname}` }, 404);
    } catch (err) {
      if (!res.headersSent) fail(res, err);
      else res.end();
    }
  };
}
