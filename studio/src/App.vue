<script setup>
import { onMounted, ref } from 'vue';
import { api, sseConnected } from './api';

const health = ref(null);
const error = ref('');

const NAV = [
  { to: '/shots', label: '镜头台', hint: '分镜 · 出图 · 采用' },
  { to: '/cast', label: '角色库', hint: 'cast/ 真源可编辑' },
  { to: '/gallery', label: '参考图库', hint: 'references/' },
  { to: '/queue', label: '渲染队列', hint: 'museav jobs' },
];

onMounted(async () => {
  try {
    health.value = await api.health();
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<template>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-title title-brush">沸雪</div>
        <div class="brand-sub">工作台 · LOCAL</div>
      </div>

      <nav class="nav">
        <RouterLink v-for="item in NAV" :key="item.to" :to="item.to" class="nav-item">
          <span class="nav-label">{{ item.label }}</span>
          <span class="nav-hint">{{ item.hint }}</span>
        </RouterLink>
      </nav>

      <div class="status">
        <div v-if="error" class="status-row">
          <span class="dot dot-crimson" />
          <span class="dim">后端未就绪</span>
        </div>
        <template v-else-if="health">
          <div class="status-row" :title="health.museav.reason ?? ''">
            <span :class="['dot', health.museav.loggedIn ? 'dot-jade' : 'dot-crimson']" />
            <span class="dim">museav {{ health.museav.version ?? '缺失' }}</span>
          </div>
          <div class="status-row">
            <span :class="['dot', sseConnected ? 'dot-jade' : 'dot-dim']" />
            <span class="dim">{{ health.registry.characters }} 角色 · {{ health.registry.orphans }} 待归属</span>
          </div>
        </template>
        <div v-else class="status-row"><span class="dot dot-dim" /><span class="dim">连接中…</span></div>
      </div>
    </aside>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 168px 1fr;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--line-1);
  background: var(--ink-1);
}

.brand {
  padding: var(--sp-5) var(--sp-4) var(--sp-4);
  border-bottom: 1px solid var(--line-1);
}
.brand-title {
  font-size: 26px;
  line-height: 1.1;
}
.brand-sub {
  margin-top: 2px;
  color: var(--text-3);
  font-size: 10px;
  letter-spacing: 0.22em;
}

.nav {
  flex: 1;
  padding: var(--sp-3) var(--sp-2);
}
.nav-item {
  display: block;
  margin-bottom: 2px;
  padding: 7px 10px;
  border-left: 2px solid transparent;
  border-radius: var(--r-2);
  color: var(--text-2);
  text-decoration: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.nav-item:hover {
  background: var(--ink-2);
  color: var(--text-1);
}
.nav-item.router-link-active {
  border-left-color: var(--gold-2);
  background: var(--gold-wash);
  color: var(--gold-1);
}
.nav-label {
  display: block;
  font-size: 13px;
}
.nav-hint {
  display: block;
  color: var(--text-3);
  font-size: 10px;
}
.nav-item.router-link-active .nav-hint {
  color: var(--gold-3);
}

.status {
  padding: var(--sp-3) var(--sp-4);
  border-top: 1px solid var(--line-1);
}
.status-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  line-height: 1.8;
}
.dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
}
.dot-jade {
  background: var(--jade);
}
.dot-crimson {
  background: var(--crimson);
}
.dot-dim {
  background: var(--text-3);
}

.main {
  min-width: 0;
  height: 100%;
  overflow: hidden;
}
</style>
