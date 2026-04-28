// 核心渲染逻辑
document.addEventListener('DOMContentLoaded', () => {
    // 1. 渲染数据 (增加健壮性检查)
    try {
        if (typeof characters !== 'undefined') renderRoster();
        if (typeof weapons !== 'undefined') renderWeapons();
        if (typeof sceneries !== 'undefined') renderScenery();
        if (typeof materials !== 'undefined') renderMaterials();
        if (typeof aestheticBible !== 'undefined') renderAesthetics();
        if (typeof aiInstructions !== 'undefined') renderAIInstructions();
        if (typeof cinematicDirectives !== 'undefined') renderDirectorManual();

        // 增加美学手册点击交互
        document.querySelectorAll('.directive-item, .manual-item, .instruction-card').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('copy-btn')) return;
                const title = item.querySelector('strong, .directive-name, .instruction-name')?.innerText || '美学指令';
                const desc = item.querySelector('.directive-desc, .instruction-prompt code')?.innerText || item.innerText;
                openAestheticModal(title, desc);
            });
        });
    } catch (e) {
        console.error("数据渲染出错:", e);
    }

    // 2. 音乐播放与入阵逻辑
    initMusicPlayer();

    // 3. 初始化弹窗逻辑
    initModal();
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

    const targets = document.querySelectorAll('.section-title, .roster-grid, .assets-grid, .scenery-gallery, .factions, .manifesto-section, .video-teaser');
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
        const avatarMarkup = char.isRevealed
            ? `
            <div class="avatar-container">
                <img src="${char.avatar}" alt="${char.name}" class="char-avatar">
            </div>`
            : `
            <div class="avatar-container avatar-placeholder" aria-hidden="true">
                <div class="avatar-placeholder-core">
                    <span class="avatar-placeholder-seal">${getSealText(char)}</span>
                    <span class="avatar-placeholder-caption">天机未显</span>
                </div>
            </div>`;
        card.innerHTML = `
            ${ipTag}
            ${episodeTag}
            ${avatarMarkup}
            <div class="char-info">
                <div class="char-meta-row">${rosterTag}</div>
                <div class="char-name">${char.name}</div>
                <div class="char-title">${char.title}</div>
                <div class="char-desc">${char.isRevealed ? char.desc : '<span class="desc-locked">天机未显，待君入阵</span>'}</div>
                <div class="char-weapons">${weaponTags}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            if (char.isRevealed) openCharModal(char);
        });

        container.appendChild(card);
    });
}

function getSealText(char) {
    if (char.name === '未知者') return '秘';
    return char.name?.slice(0, 1) || '隐';
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

function renderAesthetics() {
    const container = document.getElementById('aesthetics-bible-container');
    if (!container) return;
    container.innerHTML = `
        <div class="bible-intro">
            <h3>${aestheticBible.title} ${aestheticBible.version}</h3>
            <p class="philosophy">${aestheticBible.philosophy}</p>
        </div>
        <div class="bible-directives">
            ${aestheticBible.directives.map(d => `
                <div class="directive-item">
                    <span class="directive-name">${d.name}</span>
                    <span class="directive-desc">${d.desc}</span>
                </div>
            `).join('')}
        </div>
        <div class="bible-tech">
            <p><strong>环境背景:</strong> ${aestheticBible.environment}</p>
            <p><strong>技术参数:</strong> ${aestheticBible.technical}</p>
        </div>
    `;
}

function renderAIInstructions() {
    const container = document.getElementById('ai-instructions-container');
    if (!container || typeof aiInstructions === 'undefined') return;
    container.innerHTML = aiInstructions.map(instr => `
        <div class="instruction-card">
            <div class="instruction-name">${instr.name}</div>
            <div class="instruction-prompt">
                <code>${instr.prompt}</code>
                <button class="copy-btn" onclick="copyPrompt(this)">COPY</button>
            </div>
        </div>
    `).join('');
}

function openAestheticModal(title, content) {
    const modal = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
        <div class="modal-aesthetic-content">
            <h2 class="sub-section-title">${title}</h2>
            <div class="modal-description">${content}</div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderDirectorManual() {
    const container = document.getElementById('director-manual-container');
    if (!container || typeof cinematicDirectives === 'undefined') return;
    container.innerHTML = cinematicDirectives.map(d => `
        <div class="manual-item">
            <strong>${d.name}:</strong> ${d.desc}
        </div>
    `).join('');
}

window.copyPrompt = (btn) => {
    const code = btn.previousElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'COPIED';
        setTimeout(() => btn.innerText = originalText, 2000);
    });
};

function initModal() {
    const modal = document.getElementById('modal-overlay');
    const closeBtn = document.querySelector('.modal-close');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 绑定 ESC 键关闭
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function openCharModal(char) {
    const modal = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
        <div class="modal-char-layout">
            <div class="modal-char-visual">
                <img src="${char.avatar}" alt="${char.name}">
            </div>
            <div class="modal-char-data">
                <h2>${char.name}</h2>
                <p class="modal-title">${char.title}</p>
                <hr>
                <div class="modal-info-section">
                    <h4>人物简介</h4>
                    <p>${char.desc}</p>
                </div>
                <div class="modal-info-section">
                    <h4>专属神兵</h4>
                    <p>${char.weapons.join(' / ')}</p>
                </div>
                <div class="modal-info-section">
                    <h4>出场回目</h4>
                    <p>${char.revealedIn || '未正式露面'}</p>
                </div>
                <div class="modal-actions">
                    <button class="primary-btn" onclick="copyName('${char.name}')">复制角色名</button>
                    ${char.isOriginalIP ? '<span class="status-tag">原创 IP 保护</span>' : ''}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.copyName = (name) => {
    navigator.clipboard.writeText(name).then(() => {
        alert(`${name} 已复制到剪贴板`);
    });
};

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
