import { ref } from 'vue';

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'content-type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error ?? `请求失败 (${res.status})`);
  return data;
}

export const api = {
  health: () => request('/health'),
  registry: (refresh = false) => request(`/registry${refresh ? '?refresh=1' : ''}`),

  character: (name) => request(`/cast/${encodeURIComponent(name)}`),
  saveCharacter: (name, raw) =>
    request(`/cast/${encodeURIComponent(name)}`, { method: 'PUT', body: raw }),

  episodes: () => request('/episodes'),
  storyboards: () => request('/storyboards'),
  doc: (rel) => request(`/doc/${encodeURIComponent(rel)}`),

  shots: () => request('/shots'),
  createShot: (shot) => request('/shots', { method: 'POST', body: shot }),
  updateShot: (id, shot) => request(`/shots/${id}`, { method: 'PUT', body: shot }),
  deleteShot: (id) => request(`/shots/${id}`, { method: 'DELETE' }),
  adoptTake: (id, takeId) => request(`/shots/${id}/adopt`, { method: 'POST', body: { takeId } }),
  generate: (id, opts) => request(`/shots/${id}/generate`, { method: 'POST', body: opts }),

  jobs: (limit = 20) => request(`/jobs?limit=${limit}`),
  postProcess: (body) => request('/post-process', { method: 'POST', body }),
};

/** 仓库相对路径 → 可直接塞进 <img src> 的 URL */
export function assetUrl(rel) {
  return rel ? `/api/asset?p=${encodeURIComponent(rel)}` : '';
}

/* ── SSE：出图要跑几十秒，进度靠它推回来 ─────────────────────── */

const listeners = new Map();
export const sseConnected = ref(false);
let source = null;

function ensureSource() {
  if (source) return;
  source = new EventSource('/api/events');
  source.onopen = () => {
    sseConnected.value = true;
  };
  source.onerror = () => {
    // EventSource 自带重连，这里只反映状态，不手动重建（会连出两条流）
    sseConnected.value = false;
  };
  for (const event of ['progress', 'take']) {
    source.addEventListener(event, (e) => {
      const data = JSON.parse(e.data);
      for (const fn of listeners.get(event) ?? []) fn(data);
    });
  }
}

export function onServerEvent(event, handler) {
  ensureSource();
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(handler);
  return () => listeners.get(event)?.delete(handler);
}
