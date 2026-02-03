# SSH Access Guide for OpenClaw on Railway

This guide explains how to access your OpenClaw deployment via SSH when it's running on Railway.

## Option 1: Railway Shell (Recommended)

Railway provides a built-in shell access through the Railway CLI.

### Prerequisites
1. Install the Railway CLI: https://docs.railway.app/guides/cli
2. Authenticate: `railway login`

### Steps

```bash
# Link to your project (run in any directory)
railway link

# Open a shell session to your service
railway shell
```

This opens an interactive shell inside your Railway container where you can run OpenClaw CLI commands:

```bash
# Check status
openclaw status

# View logs
openclaw logs --follow

# Run health check
openclaw health

# Access the TUI (Terminal UI)
openclaw tui --url ws://127.0.0.1:18789 --token $OPENCLAW_GATEWAY_TOKEN
```

---

## Option 2: SSH Tunnel for Local Access

If you need to access the OpenClaw Gateway WebSocket from your **local machine** (e.g., for the TUI or custom integrations), you can set up an SSH tunnel.

### Prerequisites
- SSH access to a server that can reach your Railway deployment
- Your Railway service's public URL (e.g., `openclaw-xxx.up.railway.app`)

### Method A: Using Railway's TCP Proxy

Railway supports TCP proxying for database-like services. However, for HTTP/WebSocket services like OpenClaw, you typically access them via the public URL with the token.

### Method B: Local Port Forwarding via SSH

If you have a bastion/jump server, you can tunnel through it:

```bash
ssh -L 18789:openclaw-xxx.up.railway.app:443 user@your-bastion-server
```

Then access locally:
```bash
openclaw tui --url wss://localhost:18789 --token YOUR_GATEWAY_TOKEN
```

---

## Option 3: Direct WebSocket Connection

The easiest method for remote access is connecting directly to the Railway public URL with your gateway token:

```bash
# Connect TUI directly to Railway deployment
openclaw tui --url wss://openclaw-xxx.up.railway.app --token YOUR_GATEWAY_TOKEN
```

Your gateway token can be found in:
- Railway environment variables: `OPENCLAW_GATEWAY_TOKEN`
- The Setup UI (once connected)

---

## Troubleshooting

### "unauthorized" or Error 1008
- Ensure you're passing the correct `OPENCLAW_GATEWAY_TOKEN`
- The token is **case-sensitive**

### Connection Refused
- Wait 15-20 seconds after deployment for the gateway to initialize
- Check Railway logs for errors

### Cannot Find Token
1. Go to Railway Dashboard → Your Project → Variables
2. Look for `OPENCLAW_GATEWAY_TOKEN`
3. If not present, the wrapper generates one automatically; check the setup page

---

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `OPENCLAW_GATEWAY_TOKEN` | Authentication token for the Gateway API |
| `SETUP_PASSWORD` | Password for accessing the `/setup` UI |
| `PORT` | HTTP port (Railway sets this automatically) |

---

## Further Reading

- [OpenClaw Documentation](https://docs.openclaw.ai/)
- [Railway CLI Guide](https://docs.railway.app/guides/cli)
- [OpenClaw TUI Reference](https://docs.openclaw.ai/tui)
