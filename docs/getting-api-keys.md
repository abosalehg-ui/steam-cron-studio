# 🔑 Getting API Keys — Steam Cron Studio

Full guide: [guide-api-keys.html](../pages/guide-api-keys.html)

## Quick Reference

| Key | Where to Get | Required |
|-----|-------------|----------|
| `STEAM_WEB_API_KEY` | [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey) | ✅ All tasks |
| `OPENCLAW_TELEGRAM_BOT_TOKEN` | @BotFather on Telegram → `/newbot` | ✅ All tasks |
| `ITAD_API_KEY` | [isthereanydeal.com/apps/my](https://isthereanydeal.com/apps/my/) | ⚠️ Task 7 only |

## Find Your SteamID64

- If your profile URL is `steamcommunity.com/profiles/76561198XXXXXXXXX` → that number is your SteamID64
- If it's `steamcommunity.com/id/USERNAME` → use [steamid.io](https://steamid.io) to convert

## Security Rules

- ✅ Store keys in `.env` file on server
- ✅ Add `.env` to `.gitignore`
- ✅ Use `${ENV_VAR}` placeholders in YAML (not real keys)
- ❌ Never commit `.env` to git
- ❌ Never share Telegram bot token
