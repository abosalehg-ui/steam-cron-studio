# 📝 Prompt Design — Steam Cron Studio

## Overview

Each task in `cron_tasks.yaml` contains a `prompt` field that instructs the AI agent. The prompts are designed with these principles:

## Design Principles

### 1. Role Definition
Every prompt starts with a clear role:
```
You are OpenClaw, a Steam [role] agent for region SA (Saudi Arabia).
```

### 2. Clear Objective
Each prompt has an explicit `OBJECTIVE` section stating exactly what to accomplish.

### 3. Data Sources (ordered)
Sources are numbered and called in sequence, with fallback handling:
```
DATA SOURCES (call in order, merge results)
1. GET https://store.steampowered.com/api/featuredcategories?cc=sa
2. GET https://store.steampowered.com/search/results/?specials=1&cc=sa
3. Enrich each candidate: GET ...appdetails...
```

### 4. Explicit Output Format
```
FINAL STEP — RENDER AS IMAGE + SEND VIA TELEGRAM
output_format: IMAGE
```
or
```
output_format: TEXT
```

### 5. Telegram parse_mode — Critical
All text tasks include this exact instruction:
```
⚠️ CRITICAL: parse_mode MUST be included as an explicit parameter
in the request body. Do NOT rely on any global default config.
```

This was the primary fix in v3.0 that resolved raw HTML tags appearing in messages.

### 6. Privacy High (Task 6)
```
PRIVACY: HIGH — NEVER render as image. Send as text only.
```
Friend data must never be rendered to shareable image format.

### 7. Error Handling
Every task includes fallback behavior:
- Timeout: 10s, retries: 2
- Source fails → log + continue
- All sources fail → send failure alert
- Playwright fails → fall back to text message

## Image Rendering Pattern

Tasks 1, 3, 8 follow this exact render flow:
1. Build HTML page at `./state/renders/{task}_{date}.html` using design_system
2. Render with Playwright (viewport: 1080×1920, device_scale_factor: 2)
3. Send PNG via `sendPhoto`
4. Delete HTML, keep PNG for 30 days
5. On Playwright failure → send text via `sendMessage` with parse_mode: HTML

## Learning / Memory Pattern

Tasks 3 and 4 include adaptive learning:
- **Task 3**: Tracks hit/miss on game picks, adjusts genre weights
- **Task 4**: Tracks achievement unlocks, adjusts rarity thresholds
- **Task 8**: Verifies last week's picks and updates history files

## Customizing Prompts

When you generate YAML from the Builder, the `prompt` field contains a reference to the full prompt. For production use, replace this with the full prompt from `examples/cron_tasks.example.yaml`.

The Builder-generated prompts are intentionally abbreviated to keep YAML readable. The full prompts are in the source `cron_tasks.yaml` in this repository.
