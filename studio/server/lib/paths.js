import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** studio/ 自身 */
export const STUDIO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
/** 仓库根 —— cast/ episodes/ references/ 都在这下面 */
export const PROJECT_ROOT = resolve(STUDIO_ROOT, '..');
/** 生产状态侧车，不进 git */
export const STATE_DIR = join(STUDIO_ROOT, '.state');

/**
 * 可读目录白名单。
 *
 * 写白名单而不是黑名单：新增目录默认读不到（安全地失败），
 * 而不是默认全开、再回头补例外清单——那种写法漏一条就是全盘暴露。
 */
const READABLE = [
  'cast',
  'episodes',
  'bibles',
  'agents',
  'skills',
  'references',
  'scripts/storyboards',
  '_dashboard/assets',
];

/**
 * 可写路径白名单，比可读窄得多。
 *
 * `episodes/` 刻意不在这里：剧集 markdown 是只读真源，工作台永不回写。
 * 理由见 studio/README.md —— 14 集至少 4 种文档结构，安全回写做不到。
 */
const WRITABLE = ['cast'];

function isInside(child, parent) {
  const p = resolve(parent);
  const c = resolve(child);
  return c === p || c.startsWith(p + sep);
}

function checkAgainst(relPath, allowList, action) {
  if (typeof relPath !== 'string' || !relPath.length) {
    throw Object.assign(new Error('缺少路径'), { statusCode: 400 });
  }
  // 先归一化再比对：'cast/../.ssh/id_rsa' 这类逃逸在 resolve 后才现原形
  const abs = resolve(PROJECT_ROOT, relPath);

  const ok = allowList.some((dir) => isInside(abs, join(PROJECT_ROOT, dir)));
  if (!ok) {
    throw Object.assign(new Error(`路径不在${action}白名单内: ${relPath}`), { statusCode: 403 });
  }
  return abs;
}

/** 解析可读路径，越界抛 403 */
export function resolveReadable(relPath) {
  return checkAgainst(relPath, READABLE, '可读');
}

/** 解析可写路径，越界抛 403。比可读严格：只有 cast/ */
export function resolveWritable(relPath) {
  return checkAgainst(relPath, WRITABLE, '可写');
}

/** 侧车状态文件路径，限制在 .state/ 内 */
export function resolveState(...segments) {
  const abs = resolve(STATE_DIR, ...segments);
  if (!isInside(abs, STATE_DIR)) {
    throw Object.assign(new Error('状态路径越界'), { statusCode: 403 });
  }
  return abs;
}
