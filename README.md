# 🎮 Steam Cron Studio

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-blue?logo=github)](https://abosalehg-ui.github.io/steam-cron-studio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Made for Arabic](https://img.shields.io/badge/Language-Arabic%20%2B%20English-green)](/)
[![No Backend](https://img.shields.io/badge/Backend-None%20(client--side)-purple)](/)<br>

**[🚀 Open the Builder](https://abosalehg-ui.github.io/steam-cron-studio/pages/builder.html)** &nbsp;|&nbsp;
**[📖 Docs (AR)](#arabic-docs)** &nbsp;|&nbsp;
**[📖 Docs (EN)](#english-docs)**

</div>

---

<div dir="rtl">

## 🇸🇦 الوثائق بالعربي {#arabic-docs}

**Steam Cron Studio** هو أداة بصرية مجانية لبناء ملف `cron_tasks.yaml` لوكيل **OpenClaw** ومحرّكات AI الأخرى لمراقبة Steam.

### ✨ المميزات
- **8 مهام جاهزة**: ماسح 100%، مراقب قائمة الرغبات، لعبة الأسبوع، صائد الإنجازات، أسعار إقليمية، إهداء الأصدقاء، مقارنة المتاجر، تقرير أسبوعي.
- **معاينة فورية**: شوف رسالة Telegram و YAML مباشرةً.
- **عربي كامل**: واجهة RTL، Cron Translator بالعربي، مخرجات بالعربي.
- **بدون خوادم**: يعمل كاملاً في متصفحك — مفاتيح API محلية 100%.
- **تصدير متعدد**: YAML / Docker Compose / Systemd Service.
- **مشاركة بـ URL**: شارك إعداداتك بضغطة.

### 🚀 كيف تستخدمه
1. افتح [صفحة البناء](https://abosalehg-ui.github.io/steam-cron-studio/pages/builder.html)
2. أدخل **Steam ID** و **Telegram Chat ID**
3. فعّل المهام التي تريدها وخصّصها
4. اضغط **تحميل YAML** وانسخه إلى سيرفرك

### 📋 المتطلبات (للتشغيل على السيرفر)
| المتطلب | الاستخدام |
|---------|-----------|
| `STEAM_WEB_API_KEY` | كل المهام |
| `OPENCLAW_TELEGRAM_BOT_TOKEN` | الإشعارات |
| `ITAD_API_KEY` | المهمة 7 (مقارنة المتاجر) — اختياري |
| Python + Playwright | الرندر كصور (المهام 1، 3، 8) |

### 🔒 الأمان والخصوصية
- مفاتيح API **لا تُرسَل لأي خادم** — تُحفظ في localStorage فقط.
- بيانات الأصدقاء في المهمة 6 **لا تُصيَّر كصورة** أبدًا.
- YAML المولَّد يستخدم `${ENV_VARS}` — المفاتيح الحقيقية في `.env` على سيرفرك.

</div>

---

## 🇬🇧 English Docs {#english-docs}

**Steam Cron Studio** is a free visual builder for `cron_tasks.yaml` — the configuration file for the **OpenClaw** AI agent and other AI frameworks to monitor Steam.

### ✨ Features
- **8 Ready Tasks**: 100% discount scanner, wishlist monitor, game of the week, achievement hunter, regional pricing, friend gifts, cross-platform prices, weekly wrap-up.
- **Live Preview**: See your Telegram message and YAML in real time.
- **Full Arabic Support**: RTL interface, Arabic Cron Translator, Arabic outputs.
- **No Backend**: Runs entirely in your browser — API keys stay local.
- **Multi-format Export**: YAML / Docker Compose / Systemd Service.
- **URL Sharing**: Share your configuration with a single link.

### 🚀 Quick Start
1. Open the [Builder](https://abosalehg-ui.github.io/steam-cron-studio/pages/builder.html)
2. Enter your **Steam ID** and **Telegram Chat ID**
3. Enable and customize the tasks you want
4. Click **Download YAML** and deploy to your server

### 📋 Server Requirements
| Requirement | Used By |
|-------------|---------|
| `STEAM_WEB_API_KEY` | All tasks |
| `OPENCLAW_TELEGRAM_BOT_TOKEN` | Notifications |
| `ITAD_API_KEY` | Task 7 (cross-platform) — optional |
| Python + Playwright | Image rendering (Tasks 1, 3, 8) |

### 🤝 Compatible Frameworks
| Framework | Supported |
|-----------|-----------|
| OpenClaw | ✅ Full |
| LangGraph | ✅ Full |
| Autogen | ✅ Full |
| n8n | ⚠️ Partial (image tasks need extra setup) |
| CrewAI | ⚠️ Partial |
| Plain cron + Python | ✅ Full |

### 🔒 Security
- API keys are **never sent to any server**.
- Friend data in Task 6 is **never rendered as shareable images**.
- Generated YAML uses `${ENV_VARS}` placeholders.

---

## 📁 Project Structure

```
steam-cron-studio/
├─ index.html                 # Landing page
├─ pages/
│  ├─ builder.html            # Main builder UI
│  ├─ library.html            # Task library explorer
│  ├─ compatibility.html      # Framework compatibility matrix
│  ├─ guide-api-keys.html     # API keys guide
│  └─ guide-deployment.html   # Deployment guide
├─ css/
│  ├─ steam-theme.css         # Design system
│  └─ components.css          # Component styles
├─ js/
│  ├─ app.js                  # Core app (state, nav, toasts)
│  ├─ i18n.js                 # AR/EN translations
│  ├─ tasks-registry.js       # All 8 tasks definition
│  ├─ generators/             # YAML, Docker, Systemd generators
│  ├─ providers/              # Steam, ITAD API wrappers
│  └─ utils/                  # Cron NL, URL state, diff viewer
├─ assets/icons/              # Logo & favicon SVGs
├─ examples/                  # Reference cron_tasks.yaml
└─ docs/                      # Extended documentation
```

---

## 📄 License

MIT © 2025 Abdulkarim (abosalehg-ui)

Steam is a trademark of Valve Corporation. This tool is unofficial and not affiliated with Valve.
