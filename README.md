# MarketOS

**An AI marketplace intelligence platform.**

MarketOS turns customer behavior, marketplace and operational signals into clear recommendations. Specialized AI agents each watch one lever of a two-sided marketplace and tell the operator what to change and why.

**Impact goal:** cut manual marketplace analysis by 80%.

## The problem

Marketplace teams sit on huge amounts of data but still make pricing, ranking and supply decisions in spreadsheets. By the time the analysis is done, the market has moved.

## What it does

| Agent / module | What it does |
|---|---|
| Pricing Agent | Dynamic and surge pricing recommendations |
| Ranking Agent | Optimizes search and listing ranking |
| Personalization | User affinity and tailored recommendations |
| Demand Agent | Forecasts demand by area and time |
| Supply Agent | Balances supply against forecast demand |
| Driver / supplier view | Flags churn risk on the supply side |
| Experiments | Tests the impact of agent recommendations |
| Dashboard and map | Live marketplace health monitoring |
| Chat | Ask questions about the marketplace in plain language |

## How I built it

I defined the product vision and agent design, then built it in Google AI Studio with Gemini.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · Google Gemini SDK

**Status:** working prototype running on mock marketplace data (`src/data/mockData.ts`).

## Run it locally

```bash
npm install
cp .env.example .env.local   # add your own GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000.

---
Built by [Sumedh Bundele](https://github.com/sumedhbundelework-ship-it), Senior Product Manager.
