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
