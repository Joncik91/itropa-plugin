# ITROPA

**Name a human need. Go make coffee. Come back to a full research report with scored product ideas.**

ITROPA is a Claude Code plugin that turns Claude into an autonomous innovation research engine. You say `/itropa:go Belonging` and Claude runs a 9-phase pipeline — prior art research, future industry discovery, mechanism extraction, business analysis, product concepts — all personalized to your builder profile. No configuration, no APIs, no prompting. Just results.

```
/itropa:go Status

 Starting full research pipeline on "Status"...

 Phase 1: Prior Art ✓ (16 solutions across 4 categories)
 Phase 2: Industry Tree ✓ (5 future industries generated)
 Phase 3: Triage ✓ (Top 3 selected for your profile)
 Phase 4: Branch ✓ (#1 expanded into 3 sub-industries)
 Phase 5: Mechanisms ✓ (15 framework analyses)
 Phase 6: Deep Dive ✓ (3 industries scored)
 Phase 7: App Concepts ✓ (5 product ideas generated)
 Phase 8: Cross-Pollinate ✓ (top 2 combined, 5 hybrids)
 Phase 8.5: Digest ✓ (compact summary generated)
 Phase 8.7: Graph + Runs ✓ (connections updated)
 Phase 9: Report ✓

 Top Opportunities:
   1. Reputation Intelligence API (84/100) — BUILD
      Time to MVP: 2-4 weeks | $2-5k MRR
   2. Credibility Graph Networks (71/100) — EXPLORE
   3. Status-as-a-Service Platform (68/100) — EXPLORE

 Quick win: CredScore CLI (weekend, $500-1k MRR)
 Ambitious bet: ReputationOS (1-2 months, $5-10k MRR)
```

## Install

```bash
claude plugin marketplace add Joncik91/itropa-plugin
claude plugin install itropa-plugin@itropa-marketplace
```

## Use

```bash
mkdir my-research && cd my-research
claude
```

```
/itropa:setup              # One time — sets up workspace + builder profile
/itropa:constraints        # "I'm a senior dev, side project, want $5k MRR"
/itropa:go Belonging       # Full autonomous pipeline
```

> **Note:** `/itropa:setup` creates the workspace structure and asks for your builder profile. The MCP search server installs its own dependencies automatically on first start. You only need to run setup once per workspace.

Then just talk:

```
"Go deeper on #2"
"Cross-pollinate those top two"
"What can I build this weekend?"
"Explore Safety next"
"Compare my Status runs"
"What connects Status and Belonging?"
/itropa:status
```

4 commands total (`setup`, `go`, `status`, `constraints`). Everything else is conversation.

## What Makes This Different

**Claude IS the engine.** No external APIs, no wrapper scripts, no token costs beyond your Claude subscription. The plugin encodes ITROPA's 5-framework analysis methodology as skills — Claude does all the thinking.

**Fully autonomous.** You don't pick which industry to analyze or which framework to run. Claude triages, prioritizes, and chains 9 phases without asking. You review the output, not manage the process.

**Personalized to you.** Describe yourself once — tech stack, goals, risk tolerance, available time. Every score, every verdict, every product concept is filtered through your profile.

**Persistent across sessions.** Everything saves as JSON. Close Claude, come back next week, `/itropa:status` shows exactly where you left off. Digests (~1KB each) enable fast session resume.

## v2.0 Features

- **Timestamped runs** — Re-research a need without losing previous data. Each run gets its own dated directory.
- **Research graph** — Shared mechanisms and themes across needs are tracked automatically.
- **MCP search** — Full-text search across all research data using SQLite FTS5.
- **Run comparison** — Compare how your research evolved across multiple runs.
- **Digest-first resume** — New sessions load compact summaries (~1KB each) instead of reading all files.
- **v1 migration** — Existing v1 workspaces are automatically detected and can be migrated.

## The Pipeline

| Phase | What happens |
|-------|-------------|
| Prior Art | 16+ existing solutions across 4 categories (leaders, historical, adjacent, nature) |
| Industry Tree | 4-era evolution ending with 5 AI-era future industries |
| Triage | Ranks by your profile, picks top 3 |
| Branch | Expands #1 into 3 specialized sub-industries |
| Mechanisms | 5 frameworks x 3 industries (Functional, Structural, Causal, Constraint-Opportunity, Scale-Context) |
| Deep Dive | Opportunity scoring (0-100), solo dev assessment, monetization models, build/explore/skip verdict |
| App Concepts | 5 product ideas with viability scores, effort estimates, tech stacks |
| Cross-Pollinate | Combines top 2 industries using 5 strategies (Additive, Substitution, Complementary, Sequential, Contradiction) |
| Digest + Graph | Compact summary, cross-need connections, run history |
| Report | Everything ranked, scored, actionable |

## After the Pipeline

No commands needed. Claude remembers the research and responds to natural language:

| You say | Claude does |
|---------|-----------|
| "Go deeper on #2" | Branches it, extracts mechanisms, runs business analysis |
| "Cross-pollinate those top two" | 5 combination strategies, hybrid industries |
| "What can I build this weekend?" | Filters by effort, ranks by your profile |
| "Find patterns across my research" | Cross-need pattern analysis |
| "Compare my Status runs" | Side-by-side digest comparison |
| "What connects Status and Belonging?" | Shows shared mechanisms from graph |
| "Explore Learning next" | Runs another full pipeline |

## Data

All research persists as JSON. Human-readable, git-friendly, yours to keep. Each run creates a timestamped directory.

```
research/
├── index.json                 # Master index (v2.0.0)
├── graph.json                 # Cross-need connections
└── belonging/
    ├── runs.json              # Run history
    └── 2026-02-28/            # Timestamped run
        ├── need.json          # Prior art + industry tree
        ├── mechanisms.json    # 5-framework analyses
        ├── deep-dives.json    # Scores + verdicts
        ├── app-concepts.json  # Product ideas
        ├── cross-pollinations.json
        └── digest.json        # Compact summary for fast scanning
```

## License

MIT
