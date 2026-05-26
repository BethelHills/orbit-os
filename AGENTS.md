<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OrbitOS

**Build target: Aomi-powered Zora Creator Assistant on Base.**

A non-crypto creator launches, monitors, and manages a Zora creator coin from one chat interface.

## Aomi skills

Use only:

- **aomi-transact** — chat-based on-chain actions
- **aomi-build** — Zora protocol tools
- **manage-aomi-skill** — skill configuration

Do **not** use yet: coinbase-agentkit, brian-api, goat, eliza, solana-agent-kit, x402, crypto-skill-creator.

See `.cursor/rules/build-target.mdc` and `.cursor/rules/aomi-skills.mdc`.

## Git

**Always commit and push to GitHub** after meaningful work. See `.cursor/rules/git-push.mdc`.

- Remote: https://github.com/BethelHills/orbit-os.git
- Branch: `main` → `origin`
- Never leave unpushed commits
