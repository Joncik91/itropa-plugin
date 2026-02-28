# ITROPA User Guide

## What is ITROPA?

An innovation research tool that runs inside Claude Code. You name a human need, Claude autonomously researches it, discovers future industries, scores business opportunities, and generates product concepts — all personalized to your builder profile. Everything saves as JSON for cross-session persistence.

## Setup (One Time)

```
/itropa:setup
```

Creates the workspace: `research/` directory, `index.json`, `graph.json` (cross-need connections), `constraints.json`, and `CLAUDE.md`. Also installs the MCP search server dependencies for full-text search.

If you have an existing v1 workspace, setup will detect it and offer to migrate your data to v2 (timestamped directories, digests, graph).

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
9. **Digest** — Generates a compact ~1KB summary for fast session resume
10. **Graph + Run log** — Updates cross-need connections, logs run to history
11. **Report** — Everything presented ranked and actionable

You get a report like:

```
ITROPA Research Report: Belonging
Run: 2026-02-28 | Run #1 for this need

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

Cross-Need Connections:
  "trust-building" shared by Belonging ↔ Status
```

### Re-Researching a Need

Running `/itropa:go` on a need you've already explored creates a **new timestamped run** — all previous data is preserved. Claude shows your run history and asks:

1. **Fresh run** — New research in a new dated directory
2. **Continue latest** — Add analysis to the most recent run

Compare runs later to see how your thinking evolved.

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
| "Search for trust patterns" | FTS5 search via MCP (falls back to file reading) |
| "Find patterns across my research" | Cross-need pattern analysis |
| "Compare my Status runs" | Side-by-side digest comparison across runs |
| "What connects Status and Belonging?" | Shows shared mechanisms from research graph |
| "Show research timeline" | All runs across all needs, chronologically |

## Check Your Research

```
/itropa:status
```

Shows: all needs with run counts, industry/mechanism/concept stats, run history, cross-need connections, top scores, best concepts, quick wins, and smart suggestions.

```
/itropa:status trust
```

Searches all research for "trust" using MCP FTS5 search (falls back to file reading if MCP unavailable).

**Special search operators:**
- `score>80` — Items scoring above 80
- `verdict:build` — Only BUILD recommendations
- `need:status` — Search within a specific need
- `weekend` — Quick-win concepts
- `run:2026-02-28` — Search within a specific run
- `connections` — Show all cross-need connections
- `timeline:status` — All runs for a need
- `compare:status` — Compare runs side-by-side

## Data Structure

All research saves as JSON. Human-readable, git-friendly, yours to keep. Each run creates a timestamped directory.

```
research/
├── index.json                 # Master index (v2.0.0)
├── graph.json                 # Cross-need connections
└── {need-slug}/
    ├── runs.json              # Run history
    └── {YYYY-MM-DD}/          # Timestamped run
        ├── need.json          # Prior art + industry tree
        ├── mechanisms.json    # 5-framework analyses
        ├── deep-dives.json    # Scores + verdicts
        ├── app-concepts.json  # Product ideas
        ├── cross-pollinations.json
        └── digest.json        # Compact summary (~1KB) for fast scanning
```

## Tips

- **Start with one need**, review the report, then explore related needs
- **Your profile matters** — update it if your goals change, all scoring recalculates
- **Re-research freely** — running `/itropa:go` again creates a new timestamped run, preserving all previous data
- **Cross-pollination gold** — the best ideas often come from combining industries across different needs
- **Graph grows over time** — the more needs you research, the more cross-need connections appear. Ask "What connects X and Y?" to find unexpected links
- **Session persistence** — close Claude, come back next week. Digests (~1KB each) enable fast session resume without reading all files
- **Be lazy** — let Claude decide what to analyze. Say "surprise me" or "what looks promising?"
