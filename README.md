# ITROPA

A Claude Code plugin for AI-powered innovation research. Tell it a human need, go make coffee, come back to a full research report with scored product concepts.

## Quickstart

```bash
# Install the plugin
claude plugin install itropa-plugin@itropa-marketplace

# Create a workspace directory and cd into it
mkdir my-research && cd my-research

# Initialize and run
claude
/itropa:setup
/itropa:constraints
/itropa:go Belonging
```

Claude runs the entire pipeline autonomously: prior art research, industry evolution tree, triage, branching, 5-framework mechanism extraction, business analysis with scoring, product concept generation, and cross-pollination. Presents a ranked research report at the end.

## Commands (4)

| Command | What you do | What Claude does |
|---------|------------|-----------------|
| `/itropa:setup` | Run once | Creates workspace |
| `/itropa:go <need>` | Kick off | Full autonomous pipeline → research report |
| `/itropa:status [search]` | Check in | Dashboard, scores, search |
| `/itropa:constraints` | Describe yourself | Sets builder profile for personalized scoring |

## After That, Just Talk

```
"Go deeper on #2"
"Cross-pollinate those top two"
"What can I build this weekend?"
"Explore Safety next"
"Search my research for trust patterns"
```

No commands to remember. Claude knows the skills, knows where the data is, handles everything.

## What the Pipeline Does

1. **Prior Art** — Current leaders, historical precedents, adjacent domains, nature solutions
2. **Industry Tree** — 4-era evolution (Pre-Industrial → Industrial → Digital → Post-AI with 5 future industries)
3. **Triage** — Ranks industries by builder fit, picks top 3
4. **Branch** — Expands #1 into 3 sub-industries
5. **Mechanisms** — 5 frameworks × 3 industries (Functional, Structural, Causal, Constraint-Opportunity, Scale-Context)
6. **Deep Dive** — Business analysis with opportunity scoring (0-100), solo dev assessment, monetization models, build/explore/skip verdict
7. **App Concepts** — 5 product concepts for the best-scoring industry
8. **Cross-Pollinate** — Combines top 2 industries using 5 strategies
9. **Report** — Everything ranked, scored, actionable

## Data

All research saves as JSON in `research/`. Persists across sessions.

```
research/
├── index.json              # Master index
└── {need-slug}/
    ├── need.json           # Need + prior art + industry tree
    ├── mechanisms.json     # 5-framework mechanism analyses
    ├── deep-dives.json     # Business analyses + scoring
    ├── app-concepts.json   # Product concepts
    └── cross-pollinations.json
```

## Architecture

- **Plugin** — 4 commands + 7 analytical skill sets
- **Workspace** — Any directory you initialize with `/itropa:setup`
- **Engine** — Claude itself. No external APIs. All analysis is Claude's reasoning guided by ITROPA's frameworks.

## License

MIT
