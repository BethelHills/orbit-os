# OrbitOS

**AI Operating System for On-Chain Actions**

OrbitOS is an Aomi-powered command center on **Base (8453)**. Users interact with DeFi protocols, creator coins, wallets, alerts, and transactions through natural language — from a single AI-native interface.

**Live demo:** [https://orbit-os-rho.vercel.app](https://orbit-os-rho.vercel.app)

Built for **Aomi Early Forge**.

---

## Overview

Web3 tooling is fragmented: dashboards, wallets, protocol UIs, and analytics live in separate silos. OrbitOS unifies them into one **conversation-driven operating system**.

| Layer | What it does |
|-------|----------------|
| **Landing** | Marketing site at `/` — protocols, features, security, launch CTAs |
| **Dashboard** | Command overview at `/dashboard` — matrix, globe, portfolio snapshot |
| **Standalone workspaces** | Portfolio, Protocols, Analytics, Alerts, Transactions, Integrations, Settings |
| **Agent Chat** | Full Aomi Frame shell — wallet-backed reads and staged writes |
| **Trade / Actions** | Quick-launch cards that prefill Agent Chat prompts |

OrbitOS does **not** custody keys. Writes flow through **simulate → review → wallet sign** via Aomi and RainbowKit.

---

## Features

### Landing Page (`/`)

Cyberpunk marketing site with protocol cards, feature grid, dashboard preview, and links to `/dashboard` and `/agent-chat`.

### Agent Chat (`/agent-chat`)

Aomi-powered assistant with thread history, runtime controls, and wallet context on Base. Powered by [Aomi Frame](https://aomi.dev) → `https://api.aomi.dev`.

### Trade / Actions (`/trade-actions`)

Six action cards (Zora, swaps, alerts, etc.) with one-click **Agent Chat** prompts.

### Portfolio (`/portfolio`)

Wallet summary, ETH/USDC balances (live when connected), holdings table, risk panels, and AI recommendation sidebars.

### Protocol Universe (`/protocols`)

Cards for **Zora**, **Aerodrome**, **Avantis**, **Across**, **Stargate**, and **Monad** — each with CTAs to Agent Chat and Trade Actions.

### Analytics (`/analytics`)

Recharts dashboards: agent usage, Zora trending, protocol activity, wallet cards, and market intelligence.

### AI Watchtower (`/alerts`)

Price, holder, whale, volume, and balance alerts — create panel, active rules, and history timeline.

### Blockchain Timeline (`/transactions`)

Summary cards, staged queue, completed table, failed/reverted section, and status badges.

### Skills Hub (`/integrations`)

Installed Aomi skills, WalletConnect / RainbowKit / wagmi status, backend URL, OpenRouter BYOK reminder.

### AI Control Center (`/settings`)

Safety mode, manual confirmation, network (Base 8453), wallet, theme, notifications, agent presets (Safe / Balanced / Autonomous).

---

## Screenshots

### Landing Page

![OrbitOS landing page](assets/screenshots/OrbitOS%20landing%20page.png)

### Dashboard

![OrbitOS dashboard overview](assets/screenshots/Overview%20page.png)

### Agent Chat

![Aomi conversation in Agent Chat](assets/screenshots/Aomi%20conversation.png)

### Portfolio

![Portfolio page](assets/screenshots/Portfolio%20page.png)

### Analytics

![Analytics dashboard](assets/screenshots/Analytics%20page.png)

### Protocol Universe

![Protocol Universe](assets/screenshots/Protocols%20page.png)

### AI Watchtower (Alerts)

![Alerts page](assets/screenshots/Alert%20page.png)

### Blockchain Timeline (Transactions)

![Transactions page](assets/screenshots/Transaction%20page.png)

> **Trade / Actions** — open [`/trade-actions`](https://orbit-os-rho.vercel.app/trade-actions) on the live app (screenshot coming soon).

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     OrbitOS (Next.js 16)                     │
├──────────────┬──────────────────────────────┬───────────────┤
│   Landing    │   Dashboard + Workspaces     │  Agent Chat   │
│      /       │  /dashboard, /portfolio, …   │  /agent-chat  │
├──────────────┴──────────────────────────────┴───────────────┤
│  RainbowKit + wagmi + WalletConnect  │  Mock → Live hooks   │
├──────────────────────────────────────┴──────────────────────┤
│              Aomi Frame  →  api.aomi.dev (runtime)           │
│              aomi-transact / aomi-build (skills)               │
├─────────────────────────────────────────────────────────────┤
│                    Base Mainnet (chain 8453)                 │
│     Zora · Aerodrome · Avantis · Across · Stargate · Monad   │
└─────────────────────────────────────────────────────────────┘
```

### Route map

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/dashboard` | Overview dashboard |
| `/agent-chat` | Aomi Frame workspace |
| `/trade-actions` | Action launcher |
| `/portfolio` | Wallet & holdings |
| `/protocols` | Protocol Universe |
| `/analytics` | Charts & signals |
| `/alerts` | AI Watchtower |
| `/transactions` | Blockchain Timeline |
| `/integrations` | Skills Hub |
| `/settings` | AI Control Center |

### Project structure

```text
src/
├── app/                    # App Router pages + API routes
├── components/
│   ├── landing/            # Marketing landing page
│   ├── dashboard/          # Dashboard shell & widgets
│   ├── chat/               # Agent Chat workspace
│   ├── portfolio/          # Portfolio workspace
│   ├── protocols/          # Protocol Universe
│   ├── analytics/          # Analytics workspace
│   ├── alerts/             # AI Watchtower
│   ├── transactions/       # Blockchain Timeline
│   ├── integrations/       # Skills Hub
│   └── settings/           # AI Control Center
├── hooks/                  # Client data hooks (mock → live swap-in)
├── lib/
│   ├── aomi-auth-adapter/  # Aomi Frame + wagmi session
│   ├── aomi/               # Orbit action execution
│   └── *-data.ts           # Mock data layers per workspace
└── store/                  # Shared dashboard state

.agents/skills/             # Aomi skills (aomi-transact, aomi-build, …)
assets/screenshots/         # README & demo captures
```

Data layers (`*-data.ts` + hooks) use **mock data by default**, structured so Aomi tx lists, wallet history, and live feeds can replace them without UI changes.

---

## Tech stack

| Category | Tools |
|----------|--------|
| Framework | Next.js 16, React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Web3 | RainbowKit, wagmi, WalletConnect, viem |
| AI runtime | Aomi Frame, Aomi SDK, `@aomi-labs/client` |
| Charts | Recharts |
| Motion | Framer Motion (landing) |
| Monitoring | Sentry (optional) |
| Deploy | Vercel |

### Aomi & agent skills

- **Aomi Runtime** + **Aomi Frame** — Agent Chat backend
- **aomi-transact** — simulate → sign flows on Base
- **aomi-build** — scaffold protocol tools from specs
- **coinbase-agentkit**, **goat**, **brian-api**, **x402**, **eliza** — integration catalog in Skills Hub

---

## Installation

### Prerequisites

- Node.js 20+
- npm
- Optional: `@aomi-labs/client` CLI for local write flows

### Setup

```bash
git clone https://github.com/BethelHills/orbit-os.git
cd orbit-os
npm install --legacy-peer-deps
cp .env.example .env.local
# Edit .env.local with your WalletConnect project ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — landing page  
Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) — app overview

### Production build

```bash
npm run build
npm start
```

### Aomi skills (optional)

```bash
npx skills add aomi-labs/skills
```

Skills install to `.agents/skills/`.

---

## Environment variables

Copy `.env.example` → `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_ID` | Yes | WalletConnect Cloud project ID — [cloud.walletconnect.com](https://cloud.walletconnect.com) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public URL for WalletConnect metadata & OG tags |
| `NEXT_PUBLIC_CHAIN` | Yes | EVM chain ID — `8453` for Base |
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Aomi runtime API — `https://api.aomi.dev` |
| `OPENROUTER_API_KEY` | No | BYOK model routing (server/local only — never commit) |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Error monitoring |
| `AOMI_ENABLED` | No | Enable aomi-transact CLI on server |
| `AOMI_USE_MOCK` | No | Force mock Zora tools (local dev only) |

**WalletConnect allowed domains:**

- `https://orbit-os-rho.vercel.app`
- `http://localhost:3000`

Legacy aliases `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and `NEXT_PUBLIC_CHAIN_ID` are supported.

---

## Demo walkthrough

Full judge script: **[DEMO.md](./DEMO.md)**

### Quick flow (10 steps)

1. **Landing** — `/`
2. **Connect wallet** — Base mainnet
3. **Portfolio** — `/portfolio`
4. **Protocol Universe** — `/protocols`
5. **Agent Chat** — ask *“What can I do on Base?”* and *“Show my wallet balance”*
6. **Analytics** — `/analytics`
7. **Alerts** — `/alerts`
8. **Transactions** — `/transactions`
9. **Skills Hub** — `/integrations`
10. **Settings** — `/settings`

---

## Aomi execution model

| Flow | Behavior |
|------|----------|
| **Read** | Natural-language queries → Aomi CLI / runtime (holders, trending, analytics) |
| **Write** | Prepare → fork simulate → user confirm → wallet signs staged calldata |
| **Safety** | Non-custodial; manual confirmation encouraged in Settings |

Mock fallback: set `AOMI_USE_MOCK=1` for local dev without the CLI.

---

## Roadmap

- Live protocol analytics feeds
- Aomi tx list / wallet history replacing mock transaction data
- OpenRouter BYOK wiring in production
- Multi-chain expansion beyond Base
- Trade / Actions screenshot & expanded action catalog

---

## License

MIT — see repository for details.
