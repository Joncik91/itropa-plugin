# /itropa:status — Research Dashboard & Search

Display a comprehensive dashboard of all ITROPA research, with optional search.

## Arguments

`[search-term]` — Optional. If provided, search across all research data instead of showing the dashboard.

## Dashboard Mode (no arguments)

1. **Read `constraints.json`** for builder profile summary.
2. **Read `research/index.json`** for master overview.
3. **Read `research/graph.json`** for cross-need connection count.
4. **For each need**, read its `runs.json` for run count and latest digest for scores.

**Display:**

```
ITROPA Research Dashboard (v2.1.1)
══════════════════════════════════

Builder: {experience} dev | {techStack} | {workStyle} | {revenueGoal}

Explored Needs ({count}):
┌──────────────┬──────┬────────────┬──────┬───────┬──────────┬─────────┐
│ Need         │ Runs │ Industries │ Mech │ Dives │ Concepts │ Crosses │
├──────────────┼──────┼────────────┼──────┼───────┼──────────┼─────────┤
│ Status       │ 2    │ 12         │ 15   │ 3     │ 5        │ 5       │
│ Belonging    │ 1    │ 8          │ 10   │ 3     │ 5        │ 5       │
└──────────────┴──────┴────────────┴──────┴───────┴──────────┴─────────┘

Run History:
  Status:     2026-02-28 (run #1), 2026-03-15 (run #2, latest)
  Belonging:  2026-03-01 (run #1, latest)

Cross-Need Connections ({N} total):
  - "trust-building" shared by Status ↔ Belonging (strength: 0.85)
  - "reputation" theme appears in 2 needs

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
  - "Compare my Status runs" — see how research evolved
  - "What connects Status and Belonging?" — cross-need insights
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

### Step 1: Try MCP Search First

If the MCP tool `search_research` is available, use it:
- Call `search_research` with the user's query
- Display results grouped by type with context snippets
- This is faster and more accurate than file scanning

### Step 2: Fall Back to File Reading

If MCP is not available, search across ALL research data files by reading them directly:

For **v2 (timestamped) structure**, read from latest run directories:
- `{slug}/{latest-run}/need.json`: names, descriptions, industry names, mutations, insights, prior art
- `{slug}/{latest-run}/mechanisms.json`: coreMechanism, abstractPattern, keyPrinciples, untappedDomains
- `{slug}/{latest-run}/deep-dives.json`: marketOpportunity, keyEnablers, buildRecommendation
- `{slug}/{latest-run}/app-concepts.json`: concept names, taglines, problems, features
- `{slug}/{latest-run}/cross-pollinations.json`: hybrid names, insights, combination types
- `{slug}/{latest-run}/digest.json`: tags, key insights, top mechanisms

Also check `research/graph.json` for connection-related queries.

For **v1 (legacy) structure**, read from flat directories (if not yet migrated).

### Special Operators

- `score>N` — Find items with score above N
- `verdict:build` / `verdict:explore` — Filter by recommendation
- `need:{name}` — Search within a specific need
- `weekend` or `quick` — Find quick-win concepts
- `run:{date}` — Search within a specific run date
- `connections` — Show all cross-need connections from graph.json
- `timeline:{need}` — Show all runs for a need (uses MCP `get_timeline` if available)
- `compare:{need}` — Compare runs for a need side-by-side using digests

**Display results grouped by type** with context snippets showing why each matched.
