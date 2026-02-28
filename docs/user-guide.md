# ITROPA User Guide

## What is ITROPA?

An innovation research tool that runs inside Claude Code. You name a human need, Claude autonomously researches it, discovers future industries, scores business opportunities, and generates product concepts — all personalized to your builder profile. Everything saves as JSON for cross-session persistence.

## Setup (One Time)

```
/itropa:setup
```

Creates the workspace: `research/` directory, `index.json`, `constraints.json`, `CLAUDE.md`.

## Set Your Profile

```
/itropa:constraints
```

Or just describe yourself naturally:

> "I'm a senior Python/React dev, working on side projects, want $3-5k MRR, prefer SaaS and APIs, high risk tolerance"

This personalizes all scoring, build verdicts, and product concepts.

## Run Research

```
/itropa:go Belonging
```

That's it. Claude runs the full pipeline (takes a few minutes):

1. **Prior art** — Researches existing solutions across 4 categories
2. **Industry tree** — Generates 5 future industries with evolution context
3. **Triage** — Picks the 3 most promising for your profile
4. **Branch** — Expands the top pick into 3 sub-industries
5. **Mechanisms** — Extracts transferable patterns using 5 analytical frameworks
6. **Deep dive** — Business analysis with opportunity scores (0-100) and build/explore/skip verdicts
7. **App concepts** — 5 product ideas for the best-scoring industry
8. **Cross-pollination** — Combines top 2 industries using 5 strategies
9. **Report** — Everything presented ranked and actionable

You get a report like:

```
ITROPA Research Report: Belonging

Top Opportunities:
  1. AI Kinship Networks (82/100) — BUILD
     Time to MVP: 2-4 weeks | Stack: React, Supabase, Claude API
     Best monetization: SaaS $19/mo ($2-5k MRR)

  2. Tribal Intelligence Platforms (71/100) — EXPLORE
     ...

Top Product Concepts:
  1. KinConnect (85/100) — SaaS — 2-4 weeks
     "AI-powered family relationship manager"

  Quick win: Heritage API (weekend, $500-1k MRR)
  Ambitious bet: KinshipOS (1-2 months, $5-10k MRR)
```

## After the Pipeline

Just talk. No commands needed.

| What you say | What happens |
|-------------|-------------|
| "Go deeper on #2" | Branches it, runs mechanisms + deep dive |
| "Cross-pollinate those top two" | 5 combination strategies, hybrid industries |
| "What can I build this weekend?" | Filters concepts by effort, ranks by score |
| "Extract mechanisms from X" | 5-framework mechanism analysis |
| "Generate more concepts for X" | 5 new product ideas |
| "Explore Safety next" | Runs full pipeline on new need |
| "Search for trust patterns" | Searches all research data |
| "Find patterns across my research" | Cross-need pattern analysis |

## Check Your Research

```
/itropa:status
```

Shows: all needs, industry counts, top scores, best concepts, quick wins, and smart suggestions.

```
/itropa:status trust
```

Searches all research for "trust" — industries, mechanisms, concepts, everything.

## Tips

- **Start with one need**, review the report, then explore related needs
- **Your profile matters** — update it if your goals change, all scoring recalculates
- **Cross-pollination gold** — the best ideas often come from combining industries across different needs
- **Session persistence** — close Claude, come back next week, `/itropa:status` shows everything
- **Be lazy** — let Claude decide what to analyze. Say "surprise me" or "what looks promising?"
