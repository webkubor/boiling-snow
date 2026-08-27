<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { api, assetUrl } from '../api';

const characters = ref([]);
const orphans = ref([]);
const selected = ref(null);
const detail = ref(null);
const draft = ref('');
const tab = ref('profile');
const saving = ref(false);
const message = ref(null);
const keyword = ref('');

const filtered = computed(() => {
  const kw = keyword.value.trim();
  if (!kw) return characters.value;
  return characters.value.filter(
    (c) => c.name.includes(kw) || c.title?.includes(kw) || c.aliases?.some((a) => a.includes(kw)),
  );
});

/** 有图却没有 cast 档案的角色 —— 缺口该被看见，而不是悄悄消失在 orphans 里 */
const undocumented = computed(() => {
  const names = new Set();
  for (const o of orphans.value) {
    // 只有人像类目录里的孤儿才可能是「缺档案的角色」，场景图和神兵不算
    if (['三视图', '定妆照', '脸部参考'].includes(o.category)) names.add(o.name.split(/[_\-]/)[0]);
  }
  return [...names];
});

const jsonInvalid = computed(() => {
  if (!draft.value) return false;
  try {
    JSON.parse(draft.value);
    return false;
  } catch {
    return true;
  }
});

const dirty = computed(
  () => detail.value && draft.value !== JSON.stringify(detail.value.raw, null, 2),
);

async function loadList() {
  const reg = await api.registry();
  characters.value = reg.characters;
  orphans.value = reg.orphans;
  if (!selected.value && characters.value.length) select(characters.value[0].name);
}

async function select(name) {
  selected.value = name;
  detail.value = null;
  detail.value = await api.character(name);
  draft.value = JSON.stringify(detail.value.raw, null, 2);
  message.value = null;
}

async function save() {
  if (jsonInvalid.value) return;
  saving.value = true;
  message.value = null;
  try {
    await api.saveCharacter(selected.value, JSON.parse(draft.value));
    message.value = { kind: 'ok', text: `已写入 ${detail.value.castPath}` };
    await loadList();
    await select(selected.value);
  } catch (err) {
    message.value = { kind: 'bad', text: err.message };
  } finally {
    saving.value = false;
  }
}

function revert() {
  draft.value = JSON.stringify(detail.value.raw, null, 2);
  message.value = null;
}

/** cast JSON 每个角色的字段都不一样，所以按值的形状渲染，不写死表单 */
function shapeOf(value) {
  if (Array.isArray(value)) return value.every((v) => typeof v === 'string') ? 'tags' : 'list';
  if (value && typeof value === 'object') return 'object';
  return 'text';
}

const allRefs = computed(() => {
  if (!detail.value?.refs) return [];
  return Object.entries(detail.value.refs).flatMap(([category, files]) =>
    files.map((f) => ({ ...f, category })),
  );
});

watch(selected, () => {
  tab.value = 'profile';
});

onMounted(loadList);
</script>

<template>
  <div class="page">
    <aside class="list-pane">
      <div class="search">
        <input v-model="keyword" class="input" placeholder="搜角色 / 别名 / 身份" />
      </div>
      <div class="roster scroll-y">
        <button
          v-for="char in filtered"
          :key="char.name"
          class="roster-item"
          :class="{ active: char.name === selected }"
          @click="select(char.name)"
        >
          <img v-if="char.avatar" :src="assetUrl(char.avatar)" class="avatar" :alt="char.name" />
          <span v-else class="avatar avatar-empty">{{ char.name[0] }}</span>
          <span class="roster-body">
            <span class="roster-name">{{ char.name }}</span>
            <span class="roster-title">{{ char.title || '—' }}</span>
          </span>
          <span class="roster-count" :class="{ zero: !char.refCount }">{{ char.refCount }}</span>
        </button>

        <div v-if="undocumented.length" class="gap-note">
          <div class="gap-title">有图无档案</div>
          <div class="gap-body">
            {{ undocumented.join(' · ') }}
            <p class="dim">这些名字在 references/ 里有图，但 cast/ 下没有 JSON 档案。</p>
          </div>
        </div>
      </div>
    </aside>

    <section v-if="detail" class="detail">
      <header class="head">
        <div class="head-main">
          <h1 class="title-brush head-title">{{ detail.name }}</h1>
          <p class="dim head-sub">{{ detail.title }}</p>
          <div class="head-tags">
            <span v-if="detail.rank" class="tag tag-gold">{{ detail.rank }}</span>
            <span v-if="detail.faction" class="tag">{{ detail.faction }}</span>
            <span class="tag mono">{{ detail.id }}</span>
          </div>
        </div>
        <div class="head-actions">
          <button class="btn btn-sm" :disabled="!dirty" @click="revert">还原</button>
          <button
            class="btn btn-sm btn-primary"
            :disabled="!dirty || jsonInvalid || saving"
            @click="save"
          >
            {{ saving ? '写入中…' : '保存到 cast/' }}
          </button>
        </div>
      </header>

      <div v-if="message" class="banner" :class="message.kind">{{ message.text }}</div>

      <nav class="tabs">
        <button
          v-for="t in [
            { id: 'profile', label: '档案' },
            { id: 'refs', label: `参考图 ${allRefs.length}` },
            { id: 'raw', label: '原文 JSON' },
          ]"
          :key="t.id"
          class="tab"
          :class="{ active: tab === t.id }"
          @click="tab = t.id"
        >
          {{ t.label }}
        </button>
      </nav>

      <div class="body scroll-y">
        <!-- 档案：按值的形状自适应渲染 -->
        <div v-if="tab === 'profile'" class="fields">
          <section v-for="(value, key) in detail.raw" :key="key" class="field">
            <h3 class="field-key">{{ key }}</h3>
            <p v-if="shapeOf(value) === 'text'" class="field-text">{{ value }}</p>
            <div v-else-if="shapeOf(value) === 'tags'" class="field-tags">
              <span v-for="(item, i) in value" :key="i" class="tag">{{ item }}</span>
            </div>
            <pre v-else class="field-json mono">{{ JSON.stringify(value, null, 2) }}</pre>
          </section>
        </div>

        <!-- 参考图 -->
        <div v-else-if="tab === 'refs'" class="grid">
          <figure v-for="file in allRefs" :key="file.rel" class="shot">
            <img :src="assetUrl(file.rel)" :alt="file.name" loading="lazy" />
            <figcaption>
              <span class="tag">{{ file.category }}</span>
              <span class="dim">{{ file.name }}</span>
            </figcaption>
          </figure>
          <p v-if="!allRefs.length" class="empty">
            这个角色还没有任何参考图。去镜头台出一张，或往 references/ 里放。
          </p>
        </div>

        <!-- 原文 -->
        <div v-else class="raw">
          <p class="dim raw-hint">
            直接改真源 <code class="mono">{{ detail.castPath }}</code
            >。点保存才会写盘。
          </p>
          <textarea v-model="draft" class="textarea raw-editor" spellcheck="false" />
          <p v-if="jsonInvalid" class="raw-error">JSON 语法有误，保存已锁住</p>
        </div>
      </div>
    </section>

    <div v-else class="empty detail">选一个角色</div>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  height: 100%;
  grid-template-columns: 236px 1fr;
}

.list-pane {
  display: flex;
  min-height: 0;
  flex-direction: column;
  border-right: 1px solid var(--line-1);
  background: var(--ink-1);
}
.search {
  padding: var(--sp-3);
  border-bottom: 1px solid var(--line-1);
}
.roster {
  flex: 1;
  padding: var(--sp-2);
}
.roster-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--sp-2);
  padding: 6px;
  border: none;
  border-radius: var(--r-2);
  background: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
}
.roster-item:hover {
  background: var(--ink-2);
}
.roster-item.active {
  background: var(--gold-wash);
}
.avatar {
  display: flex;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  object-fit: cover;
}
.avatar-empty {
  background: var(--ink-3);
  color: var(--text-3);
}
.roster-body {
  min-width: 0;
  flex: 1;
}
.roster-name {
  display: block;
  font-size: 13px;
}
.roster-item.active .roster-name {
  color: var(--gold-1);
}
.roster-title {
  display: block;
  overflow: hidden;
  color: var(--text-3);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.roster-count {
  color: var(--text-3);
  font-size: 10px;
}
.roster-count.zero {
  color: var(--crimson);
}

.gap-note {
  margin: var(--sp-3) 6px;
  padding: var(--sp-2);
  border: 1px dashed var(--line-2);
  border-radius: var(--r-2);
}
.gap-title {
  margin-bottom: 4px;
  color: var(--text-2);
  font-size: 10px;
  letter-spacing: 0.1em;
}
.gap-body {
  color: var(--text-2);
  font-size: 11px;
}
.gap-body p {
  margin-top: 4px;
  font-size: 10px;
}

.detail {
  display: flex;
  min-width: 0;
  flex-direction: column;
}
.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--line-1);
}
.head-title {
  font-size: 22px;
  font-weight: 400;
}
.head-sub {
  font-size: 11px;
}
.head-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}
.head-actions {
  display: flex;
  gap: var(--sp-2);
}

.banner {
  margin: var(--sp-3) var(--sp-5) 0;
  padding: 6px 10px;
  border-radius: var(--r-2);
  font-size: 11px;
}
.banner.ok {
  background: var(--jade-wash);
  color: var(--jade);
}
.banner.bad {
  background: var(--crimson-wash);
  color: var(--crimson);
}

.tabs {
  display: flex;
  gap: var(--sp-1);
  padding: var(--sp-3) var(--sp-5) 0;
  border-bottom: 1px solid var(--line-1);
}
.tab {
  padding: 5px 12px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: var(--text-2);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
}
.tab:hover {
  color: var(--text-1);
}
.tab.active {
  border-bottom-color: var(--gold-2);
  color: var(--gold-1);
}

.body {
  flex: 1;
  padding: var(--sp-4) var(--sp-5);
}

.fields {
  display: flex;
  max-width: 900px;
  flex-direction: column;
  gap: var(--sp-4);
}
.field-key {
  margin-bottom: var(--sp-1);
  color: var(--gold-2);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
}
.field-text {
  color: var(--text-1);
  font-size: 13px;
}
.field-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.field-json {
  overflow-x: auto;
  padding: var(--sp-3);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--ink-1);
  color: var(--text-2);
  font-size: 11px;
  line-height: 1.7;
  white-space: pre-wrap;
}

.grid {
  display: grid;
  gap: var(--sp-3);
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.shot {
  overflow: hidden;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--ink-2);
}
.shot img {
  display: block;
  width: 100%;
  height: 180px;
  background: var(--ink-0);
  object-fit: cover;
}
.shot figcaption {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  font-size: 10px;
}
.shot figcaption .dim {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.raw-hint {
  margin-bottom: var(--sp-2);
  font-size: 11px;
}
.raw-editor {
  min-height: 60vh;
}
.raw-error {
  margin-top: var(--sp-2);
  color: var(--crimson);
  font-size: 11px;
}
</style>
