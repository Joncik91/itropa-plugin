# /itropa:status — Research Dashboard & Search

Display a comprehensive dashboard of all ITROPA research, with optional search.

## Arguments

`[search-term]` — Optional. If provided, search across all research data instead of showing the dashboard.

## Dashboard Mode (no arguments)

1. **Read `constraints.json`** for builder profile summary.
2. **Read `research/index.json`** for master overview.
3. **For each need**, read its data files to get current counts and scores.

**Display:**

```
ITROPA Research Dashboard
══════════════════════════

Builder: {experience} dev | {techStack} | {workStyle} | {revenueGoal}

Explored Needs ({count}):
┌──────────────┬────────────┬──────┬───────┬──────────┬─────────┐
│ Need         │ Industries │ Mech │ Dives │ Concepts │ Crosses │
├──────────────┼────────────┼──────┼───────┼──────────┼─────────┤
│ Belonging    │ 12         │ 5    │ 3     │ 5        │ 1       │
└──────────────┴────────────┴──────┴───────┴──────────┴─────────┘

Top Opportunities:
  1. {Name} ({score}/100) — {verdict} — "{next step}"
  2. {Name} ({score}/100) — {verdict}

Best Product Concepts:
  1. {Name} ({score}/100) — {formFactor} — {effortEstimate}
  2. {Name} ({score}/100) — {formFactor}

Quick Wins (buildable this weekend):
  - {concept name} — {tagline}

What you can do:
  - "Explore {related need}" or /itropa:go {need}
  - "Go deeper on {industry}" — branch, mechanisms, or concepts
  - "Cross-pollinate {A} + {B}"
  - "What should I build?" — I'll recommend based on your profile
  - /itropa:status {search term} — search your research
```

**If workspace is empty:**
```
No research yet! Start with:
  /itropa:go Belonging    — Social connection & community
  /itropa:go Safety       — Security, protection, insurance
  /itropa:go Creation     — Making, building, expressing
  /itropa:go Learning     — Education, knowledge, growth
  /itropa:go Health       — Wellness, fitness, longevity
```

## Search Mode (with argument)

Search across ALL research data files:

- `need.json`: names, descriptions, industry names, mutations, insights, prior art
- `mechanisms.json`: coreMechanism, abstractPattern, keyPrinciples, untappedDomains
- `deep-dives.json`: marketOpportunity, keyEnablers, buildRecommendation
- `app-concepts.json`: concept names, taglines, problems, features
- `cross-pollinations.json`: hybrid names, insights, combination types
- `chains.json`, `patterns.json`, `prior-art.json`: all analysis text

**Special operators:**
- `score>N` — Find items with score above N
- `verdict:build` / `verdict:explore` — Filter by recommendation
- `need:{name}` — Search within a specific need
- `weekend` or `quick` — Find quick-win concepts

**Display results grouped by type** with context snippets showing why each matched.
