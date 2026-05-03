# Botguru - WhatsApp Bot

## Project Overview
Botguru is a feature-rich WhatsApp bot built with Node.js using the Baileys library for WhatsApp connectivity. It includes an extensive plugin system and an Express web server for a status dashboard.

## Tech Stack
- **Runtime:** Node.js >= 20.x
- **WhatsApp Library:** @whiskeysockets/baileys (GitHub fork)
- **Web Server:** Express (serves status page on port 5000)
- **Database:** SQLite (via better-sqlite3 for bot config) + PostgreSQL (via Sequelize, uses DATABASE_URL env var)
- **Process:** Runs directly with `node index.js`

## Project Structure
- `index.js` - Main entrypoint: sets up WhatsApp connection, Express server, and plugin loader
- `settings.js` - Configuration (reads from config.env, environment variables, or database)
- `settingss.js` - Default settings fallback
- `plugins/` - Feature plugin files (auto-loaded at startup)
- `lib/` - Helper libraries + marisel.html (dashboard served by Express)
- `data/` - Database helpers, presence control, message storage
- `autos/` - Auto-reply/sticker/media configuration files
- `sessions/` - WhatsApp auth state (creds.json)

## Configuration
Key environment variables (can also be set in `config.env`):
- `SESSION_ID` - WhatsApp session ID (format: `Botguru~<base64>`)
- `OWNER_NUMBER` - Owner's WhatsApp number
- `PREFIX` - Command prefix (default: `.`)
- `MODE` - Bot mode: public/private/group/inbox (default: private)
- `DATABASE_URL` - PostgreSQL connection string (auto-provided by Replit)
- `PORT` - Server port (default: 7860, set to 5000 in workflow)

## Running the Application
- **Workflow:** `PORT=5000 node index.js`
- **Port:** 5000 (Express web server, bound to 0.0.0.0)
- The bot also connects to WhatsApp via Baileys websocket

## Authentication
Without a `SESSION_ID`, the bot prompts for a phone number in the terminal to generate a pairing code. Set `SESSION_ID` to a valid base64-encoded session to auto-login.

## Deployment
- Deployment type: VM (always-running bot)
- Run command: `node index.js`
