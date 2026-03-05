// 核心渲染逻辑
document.addEventListener('DOMContentLoaded', () => {
    // 1. 渲染数据
    renderRoster();
    renderWeapons();
    renderScenery();
    renderMaterials();

    // 2. 音乐播放与入阵逻辑
    initMusicPlayer();
});

function initScrollObserver() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('.section-title, .roster-grid, .assets-grid, .scenery-gallery, .factions, .manifesto-section');
    targets.forEach(t => observer.observe(t));
}

function renderRoster() {
    const container = document.getElementById('roster-container');
    if (!container) return;
    container.innerHTML = '';
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = `roster-card ${!char.isRevealed ? 'locked' : ''}`;
        const ipTag = char.isOriginalIP ? `<div class="ip-tag">ORIGINAL IP</div>` : '';
        const episodeTag = char.revealedIn ? `<div class="ep-tag">${char.revealedIn}</div>` : '';
        const rosterTag = char.isHeavenlyRoster ? `<span class="master-badge">天榜高手</span>` : '';
        const weaponTags = char.weapons.map(w => `<span class="weapon-tag">${w}</span>`).join('');
        card.innerHTML = `
            ${ipTag}
            ${episodeTag}
            <div class="avatar-container">
                <img src="${char.avatar}" alt="${char.name}" class="char-avatar">
            </div>
            <div class="char-info">
                <div class="char-meta-row">${rosterTag}</div>
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
    if (!container || typeof weapons === 'undefined') return;
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
    if (!container || typeof sceneries === 'undefined') return;
    sceneries.forEach(s => {
        const item = document.createElement('div');
        item.className = 'scenery-item';
        item.innerHTML = `<img src="${s.url}" alt="${s.name}" loading="lazy">`;
        container.appendChild(item);
    });
}

function renderMaterials() {
    const container = document.getElementById('materials-container');
    if (!container || typeof materials === 'undefined') return;
    materials.forEach(m => {
        const item = document.createElement('div');
        item.className = 'weapon-item';
        item.innerHTML = `
            <div class="weapon-img-wrapper"><img src="${m.url}" alt="${m.name}"></div>
            <div class="weapon-name">${m.name}</div>
            <div class="weapon-desc">${m.desc}</div>
        `;
        container.appendChild(item);
    });
}

function initMusicPlayer() {
    const overlay = document.getElementById('enter-overlay');
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    if (!overlay || !music || !toggle) return;

    overlay.addEventListener('click', () => {
        // 先尝试播放
        music.play().then(() => {
            console.log("音频播放成功");
        }).catch(err => {
            console.warn("音频播放被拦截:", err);
        });

        // 无论音频是否成功，都必须让遮罩消失
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
            initScrollObserver(); // 遮罩消失后再激活滚动动效
        }, 1500);
    });

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (music.paused) {
            music.play();
            toggle.classList.remove('music-off');
            toggle.classList.add('music-on');
        } else {
            music.pause();
            toggle.classList.remove('music-on');
            toggle.classList.add('music-off');
        }
    });
}
