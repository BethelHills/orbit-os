# OrbitOS

**Aomi-powered Zora Creator Assistant on Base.**

OrbitOS helps non-crypto creators launch, monitor, and manage a Zora creator coin from one chat interface — powered by [Aomi](https://aomi.dev) on Base.

## Features

- **Aomi Chat** — plain-English commands for coin launch and management
- **Zora tools** — mint, pricing, pool funding, metadata, holders, volume, buyers, alerts
- **Dashboard** — protocol cards, agent execution log, analytics, network visualization

## Stack

- Next.js 16 · TypeScript · Tailwind · shadcn/ui
- Aomi skills: `aomi-transact`, `aomi-build`
- Protocol: Zora on Base (chain id 8453)

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
| `NEXT_PUBLIC_CHAIN` | EVM chain id — `8453` for Base |
| `NODE_ENV` | Set to `production` automatically on Vercel / `next build` |

Production defaults live in `.env.production`. Set `NEXT_PUBLIC_WALLETCONNECT_ID` in the Vercel project dashboard before deploying.

Legacy names `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and `NEXT_PUBLIC_CHAIN_ID` are still supported.

## Monitoring

Sentry is integrated via `@sentry/nextjs`. Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel to enable error and performance monitoring. Optional CI vars: `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` (source maps).

## Project structure

```
src/
├── app/           # Routes + /api/chat
├── components/    # Dashboard UI
├── lib/zora/      # Zora tool registry + executor
└── store/         # Shared dashboard state
```

## Aomi skills

```bash
npx skills add aomi-labs/skills
```

Skills live in `.agents/skills/`.
