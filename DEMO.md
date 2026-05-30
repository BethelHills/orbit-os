# OrbitOS Demo Script

Step-by-step walkthrough for judges and evaluators.  
**Live app:** [https://orbit-os-rho.vercel.app](https://orbit-os-rho.vercel.app)

---

## Before you start

- Use a browser with a Web3 wallet extension (Rainbow, MetaMask, Coinbase Wallet, etc.)
- Network: **Base Mainnet (8453)**
- Optional: connect wallet for live portfolio reads; mock data works when disconnected

---

## Demo flow (≈10 minutes)

### 1. Open landing page

- Go to `/` — the OrbitOS marketing landing page
- Review hero, protocol cards (Zora, Aerodrome, Avantis, Across, Stargate, Monad), and feature sections
- Click **Launch OrbitOS** or **Launch App** → `/dashboard`

### 2. Connect wallet

- Click **Connect Wallet** in the dashboard header or control bar
- Approve connection on **Base**
- Confirm address appears in the UI

### 3. Open Portfolio

- Sidebar → **Portfolio** (`/portfolio`)
- Show wallet summary, balance cards, and holdings table
- Note live ETH/USDC when connected, or mock creator coin preview when disconnected

### 4. Open Protocol Universe

- Sidebar → **Protocols** (`/protocols`)
- Browse protocol cards: Zora, Aerodrome, Avantis, Across, Stargate, Monad
- Open **Agent Chat** CTA on any card to stage a protocol-specific prompt

### 5. Ask Agent Chat

- Sidebar → **Agent Chat** (`/agent-chat`)
- Wait for Aomi Frame to load (backend: `https://api.aomi.dev`)

**Prompt 1:**

```
What can I do on Base?
```

**Prompt 2:**

```
Show my wallet balance
```

- Show threaded responses, runtime controls, and wallet-backed context when connected

### 6. Open Analytics

- Sidebar → **Analytics** (`/analytics`)
- Walk through agent usage charts, Zora trending panel, protocol activity, and AI signals

### 7. Open Alerts

- Sidebar → **Alerts** (`/alerts`)
- Show active watch rules, create-alert panel, and alert history timeline
- Optional CTA: stage a new alert via Agent Chat

### 8. Open Transactions

- Sidebar → **Transactions** (`/transactions`)
- Show summary cards, staged queue, completed table, and failed/reverted section

### 9. Open Skills Hub

- Sidebar → **Integrations** (`/integrations`)
- Show installed Aomi skills, WalletConnect/RainbowKit/wagmi status, and Aomi backend URL

### 10. Open Settings

- Sidebar → **Settings** (`/settings`)
- Show safety mode, manual confirmation, agent presets (Safe / Balanced / Autonomous), and security warning

---

## Optional extras

| Page | Route | Highlight |
|------|-------|-----------|
| Trade / Actions | `/trade-actions` | Quick-launch action cards with prefilled Agent Chat prompts |
| Dashboard overview | `/dashboard` | Protocol matrix, globe, portfolio overview |
| Blockchain Timeline | `/transactions` | Staged → confirmed tx lifecycle |

---

## Suggested closing line

> OrbitOS is an AI operating system for on-chain actions — one interface to discover, analyze, alert, and execute across Base protocols through Aomi.

---

## Built For

**Aomi Early Forge**
