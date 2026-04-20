# 🚀 Deployment Guide — Steam Cron Studio

Full guide: [guide-deployment.html](../pages/guide-deployment.html)

## Prerequisites

- Python 3.10+
- Playwright + Chromium (for image tasks 1, 3, 8)
- 2GB RAM minimum
- Ubuntu 22+ / Debian 11+

## Method 1: Docker (Recommended)

```bash
# 1. Generate docker-compose.yml from Builder
# 2. Create .env file
cat > .env << 'EOF'
STEAM_WEB_API_KEY=your_key
OPENCLAW_TELEGRAM_BOT_TOKEN=your_token
EOF

# 3. Create state directory and run
mkdir state
docker compose up -d
docker compose logs -f
```

## Method 2: Systemd

```bash
# 1. Generate systemd files from Builder (3 files: service, timer, install.sh)
# 2. Upload to server
scp cron_tasks.yaml openclaw-steam.service openclaw-steam.timer install.sh user@server:~/

# 3. Run installer
sudo ./install.sh
sudo nano /opt/openclaw/.env  # Add your keys

# 4. Check status
systemctl status openclaw-steam
journalctl -u openclaw-steam -f
```

## Method 3: Python + crontab

```bash
python3 -m venv ~/openclaw-env
source ~/openclaw-env/bin/activate
pip install openclaw playwright
playwright install chromium

# Set env vars in ~/.bashrc
export STEAM_WEB_API_KEY="your_key"
export OPENCLAW_TELEGRAM_BOT_TOKEN="your_token"

# Add to crontab
echo '@reboot /bin/bash -c "source ~/.bashrc && ~/openclaw-env/bin/openclaw run ~/cron_tasks.yaml" &' | crontab -
```

## Common Issues

### Chromium fails on headless server
```bash
sudo apt-get install -y libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1
playwright install-deps chromium
```

### Telegram "Bad Request: can't parse entities"
Ensure your YAML uses `parse_mode: HTML` explicitly in every task. The Builder v3.0 includes this automatically.

### Check render errors
```bash
cat ./state/render_errors.log
```
