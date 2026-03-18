# AETHER — AI Operating System

> **Think. Execute. Evolve.**

AETHER is a modular AI agent system — not just a chatbot. It **thinks** with advanced reasoning, **executes** real-world tasks, and delivers a **premium mobile experience**.

---

## 🧠 Architecture

```
AETHER/
├── backend/          # Node.js / Express AI backend
│   └── src/
│       ├── controllers/   # Request handlers
│       ├── services/      # AI, Tool execution, Memory
│       ├── routes/        # API route definitions
│       ├── middleware/    # Error handling
│       └── config/       # Database config
└── mobile/           # React Native (Expo) mobile app
    └── src/
        ├── screens/       # ChatScreen, DashboardScreen
        ├── components/    # ChatBubble, TypingIndicator, BentoCard
        ├── services/      # API client
        └── theme/         # Design tokens
```

---

## ⚙️ System Layers

| Layer | Tech | Purpose |
|-------|------|---------|
| **AI (Cognition)** | OpenAI GPT-4 | Reasoning, conversation, coding |
| **Execution** | Node.js `child_process` | Safe command execution |
| **Memory** | MongoDB / in-memory | Chat history, session context |
| **API** | Express.js | REST endpoints, rate limiting |
| **Mobile UI** | React Native / Expo | iOS-style dark glass interface |

---

## 🚀 Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env        # Add your OpenAI API key
npm run dev                 # Start on http://localhost:3000
```

### Mobile App

```bash
cd mobile
npm install
npx expo start              # Scan QR code with Expo Go
```

---

## 📡 API Reference

### `POST /api/chat`
Send a message to AETHER.

**Body:**
```json
{
  "message": "List the files in this directory",
  "sessionId": "optional-session-uuid"
}
```

**Response:**
```json
{
  "sessionId": "abc-123",
  "message": "Here are the files: ...",
  "toolUsed": true,
  "toolResult": "file1.js\nfile2.js"
}
```

### `GET /api/chat/history/:sessionId`
Retrieve conversation history for a session.

### `DELETE /api/chat/history/:sessionId`
Clear conversation history for a session.

### `GET /health`
Backend health check.

---

## 🛡️ Tool Execution (Safety Layer)

AETHER can execute real system commands through an **allow-list only** approach:

| Intent | Command |
|--------|---------|
| `list files` / `ls` | `ls -la` |
| `current directory` / `pwd` | `pwd` |
| `disk usage` | `df -h` |
| `uptime` | `uptime` |
| `current time` | `date` |
| `echo <text>` | `echo` (sanitized) |

All commands run with a 5-second timeout. No arbitrary shell execution is permitted.

---

## 📱 Mobile UI Features

- **Dark glassmorphism design** — iOS 17 aesthetic
- **Chat screen** — bubbles, typing indicator, auto-scroll
- **Bento dashboard** — animated card grid with entry animations
- **Bottom tab navigation** — Dashboard ↔ Chat
- **Error handling** — graceful degradation

---

## 🧪 Testing

```bash
cd backend
npm test
```

Tests cover:
- API endpoints (chat, history, clear)
- Tool service (intent parsing, safe command execution)
- Memory service (in-memory store isolation)

---

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `OPENAI_API_KEY` | OpenAI API key | — |
| `OPENAI_MODEL` | Model to use | `gpt-4-turbo-preview` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/aether` |
| `AI_PROVIDER` | `openai` or `anthropic` | `openai` |

---

## 🔥 What Makes AETHER Powerful

- ✅ **Not response-only** — it performs real actions
- ✅ **Multi-layer intelligence** — AI + tools + memory
- ✅ **Developer-focused** — write, run, debug code
- ✅ **Extensible** — add voice, automation, agents
- ✅ **Safe by design** — command allow-listing, rate limiting, helmet