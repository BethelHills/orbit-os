# OrbitOS

AI Operating System for On-Chain Actions

OrbitOS is an Aomi-powered command center that enables users to interact with blockchain protocols through natural language.

Instead of navigating multiple dashboards, users can ask OrbitOS to discover opportunities, analyze protocols, monitor wallets, prepare transactions, and manage on-chain workflows from a single interface.

## Problem

Web3 tools are fragmented.

Users often need to:

- Learn multiple protocols
- Switch between dashboards
- Monitor activity manually
- Understand complex transaction flows
- Manage wallets and protocol interactions separately

This creates friction for creators, traders, and on-chain users.

## Solution

OrbitOS transforms blockchain interactions into conversations.

Users can:

- Discover trending creator coins
- Monitor wallets and balances
- Analyze protocols
- Create alerts
- Review transactions
- Execute Aomi-powered workflows

All from one AI-native operating system.

## Features

### Agent Chat

Aomi-powered AI assistant connected to supported protocols and wallet context.

### Trade / Actions

Quick-launch workflows for common on-chain actions.

### Portfolio

Wallet overview, balances, risk monitoring, and AI recommendations.

### Protocol Universe

Explore supported protocols:

- Zora
- Aerodrome
- Avantis
- Across
- Stargate
- Monad

### Analytics

Market intelligence, protocol activity, and agent insights.

### AI Watchtower

Alert creation and monitoring for:

- Price movements
- Holder growth
- Whale activity
- Volume spikes
- Wallet balances

### Blockchain Timeline

Track staged, signed, confirmed, and failed transactions.

### Skills Hub

Manage Aomi skills and integrations.

### AI Control Center

Configure safety settings, wallet preferences, and agent behavior.

## Technology Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- RainbowKit
- wagmi
- WalletConnect
- Aomi SDK
- Aomi Frame
- Recharts

## Aomi Integration

OrbitOS integrates with:

- Aomi Runtime
- Aomi Frame
- aomi-transact
- aomi-build
- coinbase-agentkit
- goat
- brian-api
- x402
- eliza

## Supported Network

Base Mainnet (8453)

## Screenshots

### Overview

![OrbitOS overview dashboard](assets/screenshots/Overview%20page.png)

### Agent Chat

![Aomi conversation in Agent Chat](assets/screenshots/Aomi%20conversation.png)

### Portfolio

![Portfolio page with wallet and holdings](assets/screenshots/Portfolio%20page.png)

### Protocol Universe

![Protocol Universe page](assets/screenshots/Protocols%20page.png)

### Analytics

![Analytics dashboard](assets/screenshots/Analytics%20page.png)

### AI Watchtower

![AI Watchtower alerts page](assets/screenshots/Alert%20page.png)

### Blockchain Timeline

![Blockchain Timeline transactions page](assets/screenshots/Transaction%20page.png)

## Demo Flow

1. Connect wallet
2. Open Agent Chat
3. Discover trending creator coins
4. Analyze wallet balances
5. Explore protocols
6. Review analytics
7. Create alerts
8. Monitor transactions

## Future Roadmap

- Live protocol analytics
- Advanced portfolio management
- Automated agent workflows
- Multi-chain support
- Expanded protocol integrations

## Built For

Aomi Early Forge

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_ID` | WalletConnect Cloud project ID ([cloud.walletconnect.com](https://cloud.walletconnect.com)) |
| `NEXT_PUBLIC_SITE_URL` | Public app URL for WalletConnect metadata and Open Graph |
| `NEXT_PUBLIC_CHAIN` | EVM chain id — `8453` for Base |
| `NEXT_PUBLIC_BACKEND_URL` | Aomi runtime API for Agent Chat — `https://api.aomi.dev` |

Production defaults live in `.env.production`. Set `NEXT_PUBLIC_WALLETCONNECT_ID` in the Vercel project dashboard before deploying.

Add these **allowed domains** in [WalletConnect Cloud](https://cloud.walletconnect.com) for your project:

- `https://orbit-os-rho.vercel.app` (production)
- `http://localhost:3000` (local dev)

Legacy names `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and `NEXT_PUBLIC_CHAIN_ID` are still supported.

## Monitoring

Sentry is integrated via `@sentry/nextjs`. Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel to enable error and performance monitoring. Optional CI vars: `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` (source maps).

## Aomi execution

OrbitOS uses `@aomi-labs/client` (aomi-transact) for protocol actions on Base:

- **Read chat** (holders, analytics, buyers) → Aomi CLI read prompts
- **Write flow** (launch, alerts) → Aomi prepare → fork simulate → confirm → wallet signs staged calldata
- **Mock fallback** → set `AOMI_USE_MOCK=1` only for local dev without the CLI

## Project structure

```
src/
├── app/              # Routes (dashboard + standalone pages)
├── components/       # UI workspaces (chat, portfolio, alerts, …)
├── hooks/            # Client data hooks
├── lib/              # Aomi adapter, protocol data, env
└── store/            # Shared dashboard state
```

## Aomi skills

```bash
npx skills add aomi-labs/skills
```

Skills live in `.agents/skills/`.
