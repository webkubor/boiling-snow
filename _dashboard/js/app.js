// 核心渲染逻辑
document.addEventListener('DOMContentLoaded', () => {
    renderRoster();
    renderWeapons();
    renderScenery();
    initMusicPlayer();
});

function renderRoster() {
    const container = document.getElementById('roster-container');
    if (!container) return;
    container.innerHTML = '';

    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = `roster-card ${!char.isRevealed ? 'locked' : ''}`;
        
        const ipTag = char.isOriginalIP ? `<div class="ip-tag">ORIGINAL IP</div>` : '';
        const episodeTag = char.revealedIn ? `<div class="ep-tag">${char.revealedIn}</div>` : '';
        
        // 天榜标签逻辑：准备注入到 info 区域
        const rosterTag = char.isHeavenlyRoster ? `<span class="master-badge">天榜高手</span>` : '';
        
        const weaponTags = char.weapons.map(w => `<span class="weapon-tag">${w}</span>`).join('');

        card.innerHTML = `
            ${ipTag}
            ${episodeTag}
            <div class="avatar-container">
                <img src="${char.avatar}" alt="${char.name}" class="char-avatar">
            </div>
            <div class="char-info">
                <div class="char-meta-row">
                    ${rosterTag}
                </div>
                <div class="char-name">${char.name}</div>
                <div class="char-title">${char.title}</div>
                <div class="char-desc">${char.desc}</div>
                <div class="char-weapons">${weaponTags}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderWeapons() {
    const container = document.getElementById('weapons-container');
    if (!container || !weapons) return;
    weapons.forEach(w => {
        const item = document.createElement('div');
        item.className = 'weapon-item';
        item.innerHTML = `
            <div class="weapon-img-wrapper"><img src="${w.url}" alt="${w.name}"></div>
            <div class="weapon-name">${w.name}</div>
            <div class="weapon-desc">${w.desc}</div>
        `;
        container.appendChild(item);
    });
}

function renderScenery() {
    const container = document.getElementById('scenery-container');
    if (!container || !sceneries) return;
    sceneries.forEach(s => {
        const item = document.createElement('div');
        item.className = 'scenery-item';
        item.innerHTML = `<img src="${s.url}" alt="${s.name}" loading="lazy">`;
        container.appendChild(item);
    });
}

function initMusicPlayer() {
    const overlay = document.getElementById('enter-overlay');
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    if (!overlay || !music || !toggle) return;

    overlay.addEventListener('click', () => {
        music.play().then(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.style.display = 'none', 1000);
        }).catch(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.style.display = 'none', 1000);
        });
    });

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (music.paused) {
            music.play();
            toggle.className = 'music-on';
        } else {
            music.pause();
            toggle.className = 'music-off';
        }
    });
}
