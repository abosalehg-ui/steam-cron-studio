// =============================================================
// STEAM CRON STUDIO — Core Application
// =============================================================

import { t, translations } from './i18n.js';

// ── State ──────────────────────────────────────────────────────
const DEFAULT_STATE = {
  lang: 'ar',
  steamId: '',
  chatId: '',
  region: 'sa',
  currency: 'SAR',
  timezone: 'Asia/Riyadh',
};

let _state = { ...DEFAULT_STATE };

export function getState() { return { ..._state }; }

export function setState(partial) {
  _state = { ..._state, ...partial };
  persistState();
  document.dispatchEvent(new CustomEvent('state-changed', { detail: _state }));
}

function persistState() {
  try {
    localStorage.setItem('scs_state', JSON.stringify(_state));
  } catch { /* incognito or storage full */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem('scs_state');
    if (raw) _state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch { /* corrupt */ }
}

// ── Language ───────────────────────────────────────────────────
export function getLang() { return _state.lang; }

export function setLang(lang) {
  setState({ lang });
  applyLang(lang);
}

function applyLang(lang) {
  const isAr = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir  = isAr ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', !isAr);
  document.body.dir = isAr ? 'rtl' : 'ltr';

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key, lang);
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder, lang);
  });

  // Update lang toggle button
  const toggleBtn = document.querySelector('.lang-toggle-text');
  if (toggleBtn) toggleBtn.textContent = t('lang_toggle', lang);
}

// ── Navigation ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'nav_home',        href: '../index.html',              page: 'home' },
  { key: 'nav_builder',     href: '../pages/builder.html',      page: 'builder' },
  { key: 'nav_library',     href: '../pages/library.html',      page: 'library' },
  { key: 'nav_compat',      href: '../pages/compatibility.html',page: 'compat' },
  { key: 'nav_guide_api',   href: '../pages/guide-api-keys.html', page: 'guide-api' },
  { key: 'nav_guide_deploy',href: '../pages/guide-deployment.html', page: 'guide-deploy' },
];

// Adjust hrefs for index.html (root level)
const NAV_ITEMS_ROOT = NAV_ITEMS.map(item => ({
  ...item,
  href: item.href.replace('../', ''),
}));

function buildNav(activePage, isRoot = false) {
  const host = document.getElementById('nav-host');
  if (!host) return;

  const items = isRoot ? NAV_ITEMS_ROOT : NAV_ITEMS;
  const lang  = getLang();

  const builderHref = isRoot ? 'pages/builder.html' : '../pages/builder.html';

  host.innerHTML = `
    <a class="nav-brand" href="${isRoot ? 'index.html' : '../index.html'}">
      <img src="${isRoot ? 'assets/icons/logo.svg' : '../assets/icons/logo.svg'}" alt="Logo">
      <span>Steam <span style="color:var(--text-white)">Cron</span> <span>Studio</span></span>
    </a>
    <ul class="nav-links">
      ${items.map(item => `
        <li>
          <a href="${item.href}" class="${item.page === activePage ? 'active' : ''}" data-i18n="${item.key}">
            ${t(item.key, lang)}
          </a>
        </li>
      `).join('')}
    </ul>
    <div class="nav-actions">
      <button class="lang-toggle" id="lang-toggle-btn" aria-label="Switch language">
        <span>🌐</span>
        <span class="lang-toggle-text">${t('lang_toggle', lang)}</span>
      </button>
      <a href="${builderHref}" class="btn btn-primary btn-sm" data-i18n="cta_start">
        ${t('cta_start', lang)}
      </a>
    </div>
    <button class="nav-hamburger" id="nav-hamburger-btn" aria-label="القائمة" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;

  // Inject mobile drawer right after nav (only once)
  if (!document.getElementById('nav-mobile-drawer')) {
    const drawer = document.createElement('div');
    drawer.className = 'nav-mobile-drawer';
    drawer.id = 'nav-mobile-drawer';
    drawer.innerHTML = `
      ${items.map(item => `
        <a href="${item.href}" class="${item.page === activePage ? 'active' : ''}" data-i18n="${item.key}">
          ${t(item.key, lang)}
        </a>
      `).join('')}
      <div class="drawer-cta">
        <button class="btn btn-ghost btn-sm" id="drawer-lang-btn">
          🌐 ${t('lang_toggle', lang)}
        </button>
        <a href="${builderHref}" class="btn btn-primary btn-sm">${t('cta_start', lang)}</a>
      </div>
    `;
    document.body.insertBefore(drawer, document.body.firstChild);

    document.getElementById('drawer-lang-btn')?.addEventListener('click', () => {
      const newLang = getLang() === 'ar' ? 'en' : 'ar';
      setLang(newLang);
    });
  }

  // Hamburger toggle
  const hamburger = document.getElementById('nav-hamburger-btn');
  const drawer2   = document.getElementById('nav-mobile-drawer');
  hamburger?.addEventListener('click', () => {
    const isOpen = drawer2.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    const d = document.getElementById('nav-mobile-drawer');
    const h = document.getElementById('nav-hamburger-btn');
    if (d?.classList.contains('open') && !d.contains(e.target) && !h?.contains(e.target)) {
      d.classList.remove('open');
      h?.classList.remove('open');
      h?.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });

  document.getElementById('lang-toggle-btn')?.addEventListener('click', () => {
    const newLang = getLang() === 'ar' ? 'en' : 'ar';
    setLang(newLang);
  });
}

function buildFooter(isRoot = false) {
  const host = document.getElementById('footer-host');
  if (!host) return;
  const lang  = getLang();
  const base  = isRoot ? '' : '../';

  host.innerHTML = `
    <ul class="footer-links">
      <li><a href="https://github.com/abosalehg-ui/steam-cron-studio" target="_blank" rel="noopener">${t('footer_github', lang)}</a></li>
      <li><a href="${base}pages/guide-api-keys.html">${t('footer_docs', lang)}</a></li>
      <li><a href="https://github.com/abosalehg-ui/steam-cron-studio/blob/main/LICENSE" target="_blank" rel="noopener">${t('footer_license', lang)}</a></li>
    </ul>
    <p>${t('footer_made_by', lang)}</p>
    <p class="muted mt-sm">${t('footer_tos_notice', lang)}</p>
  `;
}

// ── Toast Notifications ────────────────────────────────────────
let toastContainer;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'info', duration = 3000) {
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Copy to Clipboard ──────────────────────────────────────────
export async function copyToClipboard(text, successMsg) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMsg || t('toast_copied', getLang()), 'success');
    return true;
  } catch {
    showToast('Failed to copy', 'error');
    return false;
  }
}

// ── Download File ──────────────────────────────────────────────
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast(t('toast_downloaded', getLang()), 'success');
}

// ── Steam ID Validation ────────────────────────────────────────
export function isValidSteamId(id) {
  return /^7656119\d{10}$/.test(String(id).trim());
}

// ── Steam Profile Fetch (Community XML — CORS OK) ──────────────
export async function fetchSteamProfile(steamId) {
  if (!isValidSteamId(steamId)) throw new Error('invalid_id');
  const url = `https://steamcommunity.com/profiles/${steamId}/?xml=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('network');
  const text = await res.text();
  const parser = new DOMParser();
  const xml    = parser.parseFromString(text, 'application/xml');

  const getText = tag => xml.querySelector(tag)?.textContent?.trim() || '';
  return {
    steamId64:   getText('steamID64'),
    name:        getText('steamID'),
    realName:    getText('realname'),
    avatar:      getText('avatarFull') || getText('avatarMedium'),
    profileUrl:  getText('customURL') ? `https://steamcommunity.com/id/${getText('customURL')}/` : `https://steamcommunity.com/profiles/${steamId}/`,
    visibility:  getText('visibilityState'),
    gameCount:   getText('gameCount'),
    memberSince: getText('memberSince'),
  };
}

// ── Tabs ───────────────────────────────────────────────────────
export function initTabs(containerSelector) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panes   = container.querySelectorAll('.tab-pane');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p  => p.classList.remove('active'));
        btn.classList.add('active');
        const target = container.querySelector(`#${btn.dataset.tab}`);
        if (target) target.classList.add('active');
      });
    });

    // Activate first tab
    buttons[0]?.classList.add('active');
    panes[0]?.classList.add('active');
  });
}

// ── Copy Buttons ───────────────────────────────────────────────
export function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.querySelector(btn.dataset.copyTarget);
      if (!target) return;
      const text = target.textContent;
      const ok   = await copyToClipboard(text, t('toast_copied', getLang()));
      if (ok) {
        const orig = btn.textContent;
        btn.textContent = '✓';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
      }
    });
  });
}

// ── Expandable Cards ───────────────────────────────────────────
export function initExpandCards() {
  document.querySelectorAll('.task-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.task-builder-card');
      card?.classList.toggle('expanded');
    });
  });
}

// ── Init Page ──────────────────────────────────────────────────
export function initPage(page, options = {}) {
  loadState();

  const isRoot = page === 'home';
  buildNav(page, isRoot);
  buildFooter(isRoot);
  applyLang(_state.lang);

  initTabs('.tabs-container');
  initCopyButtons();

  if (options.onReady) options.onReady(_state);
}
