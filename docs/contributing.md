# 🤝 Contributing — Steam Cron Studio

Thank you for your interest in contributing! This is a client-side vanilla HTML/JS/CSS project hosted on GitHub Pages.

## Project Structure

```
steam-cron-studio/
├─ index.html              # Landing page
├─ pages/                  # All site pages
├─ css/                    # Design system + components
├─ js/
│  ├─ app.js               # Core: state, nav, toasts
│  ├─ i18n.js              # AR/EN translations
│  ├─ tasks-registry.js    # ← Main data source for all 8 tasks
│  ├─ generators/          # YAML/Docker/Systemd output
│  ├─ providers/           # Steam/ITAD API wrappers
│  └─ utils/               # Cron NL, URL state, diff viewer
├─ assets/icons/           # SVG logo + favicon
├─ examples/               # Reference YAML file
└─ docs/                   # Documentation
```

## How to Contribute

### Add a new task
1. Edit `js/tasks-registry.js`
2. Add a new entry following the existing schema:
```js
{
  id: 'steam_your_task',
  icon: '🎮',
  name: { ar: 'اسم المهمة', en: 'Task Name' },
  description: { ar: '...', en: '...' },
  schedule: '0 12 * * *',
  scheduleHuman: { ar: 'يومياً 12:00', en: 'Daily 12:00 PM' },
  outputFormat: 'text', // or 'image'
  privacyHigh: false,
  defaultEnabled: true,
  requiresItad: false,
  configs: [ /* config definitions */ ],
  telegramPreview: (cfg, lang) => `<b>Preview</b>`,
}
```
3. Add translations to `js/i18n.js`
4. Update `examples/cron_tasks.example.yaml`

### Add a translation key
Edit `js/i18n.js` — add the key to both `ar` and `en` objects.

### Fix a bug
1. Fork the repo
2. Create a branch: `git checkout -b fix/description`
3. Make changes
4. Test by opening `index.html` locally in a browser
5. Submit a Pull Request

## Local Development

No build step required — just a static site:
```bash
# Option 1: Python simple server
python3 -m http.server 8080
open http://localhost:8080

# Option 2: VS Code Live Server extension
# Click "Go Live" in the bottom bar

# Option 3: npx serve
npx serve .
```

## Code Style

- **No frameworks** — Vanilla HTML/CSS/JS only
- **ES Modules** — use `import`/`export` (type="module" in script tags)
- **RTL first** — Arabic is the default direction
- **CSS variables** — use `var(--accent-blue)` etc., never hardcode colors
- **i18n** — all user-facing text must have AR and EN keys

## License

MIT — see [LICENSE](../LICENSE)
