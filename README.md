![OpenCrawl Logo](https://res.cloudinary.com/asset-cloudinary/image/upload/v1769907898/openclaw-logo-text_w3qcgl.avif)

# Deploy and Host OpenClaw (Prev Clawdbot, Moltbot) – Self-Hosted AI Agents on Railway

**OpenClaw** (formerly Clawdbot/Moltbot) is a powerful, open-source AI agent framework that lets you run **Claude, ChatGPT, or Gemini** as your own self-hosted private personal assistant. 

Chat securely through the built-in web dashboard, or integrate with Telegram, Discord, and Slack. OpenClaw can execute code, browse the web autonomously, schedule cron tasks, and maintain infinite long-term conversation context. Deploy your own privacy-first AI alternative to ChatGPT on Railway in just one click!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-moltbotclawdbot-autonomous-ai-a?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)


## 🚀 Quick Start Deployment Guide

### Step 1: Deploy on Railway

1. Click the **"Deploy on Railway"** button at the top of this page &amp; wait for the initial deployment to complete. The first startup can take several minutes

### Step 2: Note Your Credentials

Check the **Variables** tab and save following:

- **SETUP_PASSWORD**: Your password for accessing the setup wizard

⚠️ **Keep this secure!** You'll need this in the next steps.

### Step 3: Access Setup Wizard

1. Click on the URL provided by Railway in your project dashboard (e.g., `https://your-app-xyz.up.railway.app`)
2. Login prompt appears:
   - **Username**: Leave blank (press Enter)
   - **Password**: Enter your `SETUP_PASSWORD`

### Step 4: Complete the Setup Wizard

1. Select your **provider & auth type**, then enter an API key if requested.
2. Add **channels** if you want to use Telegram, Discord, or Slack. This is optional.
3. Click **Run Setup**. For browser sign-in, open the sign-in URL and enter the code shown by the wizard; keep the setup page open until it completes.
4. Click **Open OpenClaw UI**. If it is still starting, wait for the Gateway to become ready.
5. If OpenClaw asks for a **Gateway secret**, return to `/setup`, click **Copy Gateway Token**, paste it into that field, and click **Connect**.
6. If OpenClaw shows **Approve this browser** or a command such as `openclaw devices approve <requestId>`, keep that tab open. Return to `/setup` → **Pair Devices** → **Approve** the request with the same ID. Then return to OpenClaw; it connects automatically, or you can click **Check now**.
7. Once OpenClaw shows **Connected**, you can start chatting.

For Telegram or Discord, message your bot. If it replies with a pairing code, go to `/setup` → **Approve Channel Access**, choose the channel, and enter that code. This is separate from browser approval.

### Step 5: Start Chatting

1. Click **New conversation** in the OpenClaw sidebar
2. Type your first message
3. Enjoy your self-hosted AI assistant! 🎉

### Upgrading an Existing Installation

This template targets **OpenClaw 2026.10.4**. Keep your existing persistent volume mounted at `/data` when redeploying. The template migrates existing configuration and state during startup; allow the health check to complete before opening the UI. Older `OPENCLAW_VERSION` overrides are raised to this minimum supported version.

Existing users do not need to run setup again. Use `/setup` → **Open OpenClaw UI** after the upgrade. Existing browser approvals are retained; a new browser or an import into another deployment may require pairing. Use **Export Data** first if you want a manual backup. **Reset configuration** and **Wipe all data** are not steps in an ordinary upgrade.

---

## About Hosting OpenClaw (Prev Clawdbot, Moltbot) – Self-Hosted AI Agents

Deploying OpenClaw on Railway traditionally requires interactive terminal access for onboarding, which Railway doesn't provide. This template solves that challenge by wrapping OpenClaw's gateway with a web-based setup wizard. You get a one-click deployment with browser-based configuration—no CLI commands needed. This template lets you deploy OpenClaw in 1 click.

## Common Use Cases

- **Personal AI Assistant**: Chat with Claude/GPT via web interface or messaging apps for research, coding help, writing, and daily tasks
- **Automated Workflows**: Schedule recurring tasks, monitor websites, send notifications, and automate repetitive processes using cron jobs

## Dependencies for OpenClaw (Prev Clawdbot, Moltbot) – Self-Hosted AI Agents Hosting

- **AI Provider Access**: An API key or a supported browser sign-in method for your chosen provider

### Deployment Dependencies

- [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw) - Source code for the AI agent framework
- [Anthropic API Keys](https://platform.claude.com/) - Claude AI models (recommended)
- [OpenAI API Keys](https://platform.openai.com/) - GPT models (alternative)
- [Google AI Studio](https://aistudio.google.com/) - Gemini models (alternative)
- [Telegram BotFather](https://t.me/botfather) - Create Telegram bots for messaging
- [Discord Developer Portal](https://discord.com/developers/applications) - Create Discord bots

---

## 🔑 How to Get API Keys for Different AI Providers

### How to Get an Anthropic API Key? (Claude - Recommended)

1. Visit [Anthropic Console](https://platform.claude.com/dashboard)
2. Sign up/log in → Navigate to **"API Keys"** in the left sidebar → Click **"Create Key"**
3. Name your key (e.g., "OpenClaw Railway") → Copy the key → Paste into the setup wizard

### How to Get an OpenAI API Key? (GPT)

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in → Click on your profile → **"View API Keys"**
3. Click **"Create new secret key"** → Name it (optional) and click **"Create"**
4. Copy the key → Paste into the setup wizard

### How to Get a Google Gemini API Key?

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click **"Get API Key"** in the left menu
4. Select existing project or create new
5. Click **"Create API Key"**
6. Copy the generated key
7. Paste into the setup wizard

---

## 💬 How to Add Messaging Channels to OpenClaw

### How to Add a Telegram Bot?

**Step 1: Create Your Bot**
1. Open Telegram and search for `@BotFather`
2. Send the command: `/newbot`
3. Choose a display name: "My OpenClaw Assistant"
4. Choose a username: `my_openclaw_bot` (must end with 'bot')
5. BotFather will give you a token (format: `123456789:ABCdef...`)
6. Copy this token

**Step 2: Add to OpenClaw**

During initial setup:

1. Go to your setup wizard: `/setup`
2. Scroll to **"Optional: Channels"** section
3. Paste token in **"Telegram bot token"** field
4. Click **"Run Setup"**
5. Wait for completion

If setup is already complete, add the bot in the OpenClaw UI under **Settings → Channels**.

**Step 3: Start Chatting**
1. Search for your bot username in Telegram
2. Click **"Start"** or send `/start`
   If the bot replies with a pairing code, enter it in `/setup` → **Approve Channel Access** → **Telegram**.
3. Begin chatting with your AI agent!

### How to Add a Discord Bot?

**Step 1: Create Discord Application**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Name it (e.g., "OpenClaw Bot")
4. Go to **"Bot"** tab in left sidebar
5. Click **"Add Bot"** → Confirm

**Step 2: Configure Bot**
1. Under **"Privileged Gateway Intents"**:
   - ✅ Enable **"MESSAGE CONTENT INTENT"** (Required!)
2. Click **"Reset Token"** → Copy the token
3. Save the token securely

**Step 3: Invite Bot to Your Server**
1. Go to **"OAuth2"** → **"URL Generator"**
2. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select permissions:
   - ✅ Read Messages/View Channels
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Embed Links
4. Copy the generated URL
5. Open URL in browser → Select server → Authorize

**Step 4: Add to OpenClaw**

During initial setup:

1. Go to your setup wizard: `/setup`
2. Paste token in **"Discord bot token"** field
3. Click **"Run Setup"**
4. Open **Settings → Channels** in OpenClaw to configure the servers and channels the bot can access.

If setup is already complete, add the bot in **Settings → Channels**. If a Discord DM returns a pairing code, enter it in `/setup` → **Approve Channel Access** → **Discord**.

---


## ❓ Frequently Asked Questions (FAQ)

### What is the difference between OpenClaw, Clawdbot, and Moltbot?

OpenClaw is the current official name of the project. It was previously known as "Clawdbot" and "Moltbot" - these are older names for the same framework. 

### Can I use multiple AI providers at once in OpenClaw?

Currently, OpenClaw is configured to use one primary AI provider at a time. However, you can switch providers by editing the configuration via the setup wizard's config editor or by re-running the setup wizard.

### How much does it cost to run OpenClaw on Railway?

**Railway costs**: $5-10/month on the Hobby plan ($5/month subscription + ~$5 usage). Free tier available with limitations.

**AI API costs**: Varies by usage and provider:
- Anthropic Claude: ~$5-30/month for moderate personal use
- OpenAI GPT: ~$5-40/month depending on model and usage
- Google Gemini: Often free for personal use

### Is my data private and secure on OpenClaw?

Yes! OpenClaw is self-hosted, meaning:
- All data stays on your Railway instance
- API keys are encrypted and stored in your volume
- Communication between browser and gateway is encrypted (HTTPS)

### Can I migrate my OpenClaw instance off Railway?

Absolutely! That's the beauty of self-hosting:

1. Open `/setup` → **Export Data** and download the password-protected `.zip` file.
2. Run a compatible copy of this template on your destination platform (VPS, Docker, or home server).
3. Open **Import Data** on the destination and use the source deployment's `SETUP_PASSWORD` to unlock the ZIP.
4. Open the destination's OpenClaw UI and pair your browser again if prompted.

### Why is my OpenClaw UI gateway showing "Disconnected" after setup?

Follow the message shown by OpenClaw:

- **Starting up**: wait for the Gateway to become ready.
- **This Gateway expects its token** or **Gateway secret rejected**: use `/setup` → **Copy Gateway Token**, paste it into **Gateway secret**, then click **Connect**. For an existing connection, these settings are under **Settings → Gateway**.
- **Approve this browser**: keep that tab open and approve its matching request in `/setup` → **Pair Devices**. Return to OpenClaw and use **Check now** if needed.

If the problem continues, check Railway logs. After an update, refresh the OpenClaw tab if it is still showing the previous interface. You do not need to wipe your data to reconnect a browser.

### Can I use OpenClaw without any messaging channels?

Yes! The web UI at `/` provides a full-featured chat interface. Telegram, Discord, and Slack are optional additions for convenience. You can use OpenClaw entirely through the web interface if you prefer.

### How do I access OpenClaw from my phone?

- **Web Interface**: Just visit your Railway URL in your mobile browser
- **Telegram**: Add the Telegram bot and chat from the Telegram app
- **Discord**: Use Discord mobile app with your bot
- **Slack**: Use Slack mobile app with your bot

### Can I run multiple OpenClaw instances?

Yes! Each Railway service can run its own independent OpenClaw instance. Just deploy this template multiple times for separate personal, work, or testing environments.

### How to fix: disconnected (1008): pairing required

Keep the OpenClaw tab open. Return to `/setup` → **Pair Devices** and approve the request with the same ID shown by OpenClaw. Then return to the waiting tab; it connects automatically, or you can click **Check now**. The command shown by OpenClaw is an alternative; you can use this template's buttons for browser approval.

### 🖥️ How do I access the Terminal UI (TUI)?

If you prefer a hacker-style terminal interface over the web dashboard, you can access the OpenClaw TUI! Ensure you have set the `ENABLE_WEB_TUI` to True in Railway Variables. You can access the TUI at /tui.

### 🔌 How do I add more channels (Telegram/Discord) later?

Open **Settings → Channels** in the OpenClaw UI to add or update a channel. If a Telegram or Discord bot replies with a pairing code, enter it in `/setup` → **Approve Channel Access**.

The original provider/channel form is hidden after setup completes. To intentionally run that wizard again, use `/setup` → **Reset configuration** first. This removes `openclaw.json` while retaining chat history, memory, credentials, paired devices, and the Gateway token.

---

## 🤝 Found an Issue? Need Help?

Notice a bug with this Railway template (like API key errors, UI glitches, or broken deployment flows)? 

👉 **[Raise an issue on GitHub here!](https://github.com/praveen-ks-2001/openclaw-railway-template-enhanced/issues)**

We actively monitor feedback to ensure your self-hosted AI agents run smoothly.

