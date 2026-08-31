<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { api, setCurrentSeason, getCurrentSeason, sseConnected } from './api';

const health = ref(null);
const error = ref('');
const seasons = ref([]);
const currentSeason = ref(getCurrentSeason());
const router = useRouter();

const NAV = [
  { to: '/shots', label: '镜头台', hint: '分镜 · 出图 · 采用' },
  { to: '/episodes', label: '剧集看板', hint: '14 集 · 分镜 · 指令' },
  { to: '/cast', label: '角色库', hint: 'cast/ 真源可编辑' },
  { to: '/gallery', label: '参考图库', hint: 'references/' },
  { to: '/bible', label: '创意法典', hint: '红线 · 旁白 · 镜头美学' },
  { to: '/aesthetic', label: '三轴预览', hint: '镜头 · 音乐 · 审美' },
  { to: '/cases', label: '经典案例', hint: '8 个天榜 Solo 15s · 分享' },
  { to: '/craft', label: 'Skill 创作中心', hint: 'novels/Agent skills · 一键组装' },
  { to: '/prompt-lab', label: 'Prompt 实验室', hint: '法典 + 角色 + 神兵 → Seedance' },
  { to: '/batch', label: '批量生成', hint: '笛卡尔积 · 一键 N 条 → 草稿 shots' },
  { to: '/queue', label: '渲染队列', hint: 'museav jobs' },
];

const SEASON_LABELS = {
  s1: '第一季 · 沸腾之雪',
  s2: '第二季',
  s3: '第三季',
};

function seasonLabel(name) {
  return SEASON_LABELS[name] || name;
}

async function onSeasonChange(e) {
  const next = e.target.value;
  setCurrentSeason(next);
  currentSeason.value = next;
  router.go(0);
}

// 全局搜索
const searchQ = ref('');
const searchResults = ref([]);
const searchOpen = ref(false);
let searchTimer = null;

watch(searchQ, (q) => {
  clearTimeout(searchTimer);
  if (!q.trim()) { searchResults.value = []; return; }
  searchTimer = setTimeout(async () => {
    try {
      const r = await api.search(q);
      searchResults.value = r.results;
    } catch {
      searchResults.value = [];
    }
  }, 200);
});

const groupedResults = computed(() => {
  const g = { character: [], episode: [], weapon: [], bgm: [] };
  for (const r of searchResults.value) (g[r.type] || (g[r.type] = [])).push(r);
  return g;
});

const RESULT_TYPE_LABEL = { character: '角色', episode: '剧集', weapon: '神兵', bgm: 'BGM' };

function gotoResult(r) {
  searchOpen.value = false;
  searchQ.value = '';
  searchResults.value = [];
  router.push(r.to);
}

function onSearchBlur() {
  // 延迟关，让 click 先触发
  setTimeout(() => { searchOpen.value = false; }, 150);
}

onMounted(async () => {
  try {
    const [h, s] = await Promise.all([api.health(), api.seasons()]);
    health.value = h;
    seasons.value = s.seasons.map((x) => x.name);
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

      <!-- 季/IP 切换器 -->
      <div class="season-picker">
        <label class="season-label" for="season-select">季 / IP</label>
        <select id="season-select" class="season-select" :value="currentSeason" @change="onSeasonChange">
          <option v-for="s in seasons" :key="s" :value="s">{{ seasonLabel(s) }}</option>
        </select>
      </div>

      <!-- 全局搜索 -->
      <div class="search-wrap">
        <input
          v-model="searchQ"
          class="search-input"
          placeholder="搜角色 / 剧集 / 神兵 / BGM…"
          @focus="searchOpen = true"
          @blur="onSearchBlur"
        />
        <div v-if="searchOpen && searchQ" class="search-dropdown">
          <div v-if="!searchResults.length" class="search-empty dim">无匹配</div>
          <template v-else>
            <template v-for="(items, type) in groupedResults" :key="type">
              <div v-if="items.length" class="search-group">
                <div class="search-group-head">{{ RESULT_TYPE_LABEL[type] || type }} <span class="dim mono">({{ items.length }})</span></div>
                <button v-for="r in items" :key="r.name || r.title" class="search-item" @mousedown="gotoResult(r)">
                  <span class="search-item-title">{{ r.name || r.title }}</span>
                  <span class="dim search-item-sub">{{ r.title || r.holder || r.tag || r.core || '' }}</span>
                </button>
              </div>
            </template>
          </template>
        </div>
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

/* 季/IP 切换器 */
.season-picker {
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--line-1);
  background: var(--ink-2);
}
.season-label {
  display: block;
  margin-bottom: 4px;
  color: var(--text-3);
  font-size: 9px;
  letter-spacing: 0.22em;
}
.season-select {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  background: var(--ink-3);
  color: var(--text-1);
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}
.season-select:hover {
  border-color: var(--line-gold);
}
.season-select:focus {
  outline: none;
  border-color: var(--gold-2);
}

/* 全局搜索 */
.search-wrap { position: relative; padding: var(--sp-3) var(--sp-4); border-bottom: 1px solid var(--line-1); }
.search-input {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  background: var(--ink-3);
  color: var(--text-1);
  font-size: 12px;
}
.search-input:focus { outline: none; border-color: var(--gold-2); }
.search-dropdown {
  position: absolute;
  top: calc(100% - 1px);
  left: var(--sp-4);
  right: var(--sp-4);
  max-height: 360px;
  overflow-y: auto;
  background: var(--ink-2);
  border: 1px solid var(--line-gold);
  border-radius: var(--r-2);
  box-shadow: var(--shadow-panel);
  z-index: 50;
}
.search-group { padding: 4px 0; border-bottom: 1px solid var(--line-1); }
.search-group:last-child { border-bottom: none; }
.search-group-head { padding: 4px 8px; color: var(--gold-2); font-size: 9px; letter-spacing: 0.2em; }
.search-item {
  display: block;
  width: 100%;
  padding: 4px 8px;
  border: none;
  background: none;
  color: var(--text-1);
  text-align: left;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}
.search-item:hover { background: var(--gold-wash); }
.search-item-title { display: block; }
.search-item-sub { display: block; font-size: 10px; }
.search-empty { padding: var(--sp-3); text-align: center; font-size: 11px; }
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
