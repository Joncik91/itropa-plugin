# /itropa:go — Autonomous Research Pipeline

Run a full ITROPA research pipeline on a human need. Claude makes all decisions autonomously and presents a complete research report at the end.

## Arguments

`<need-name>` — The human need to research (e.g., "Belonging", "Safety", "Creation", "Learning", "Health", "Play", "Status", "Autonomy", "Purpose")

If no argument provided, ask the user what need they want to explore.

## Pre-Flight

1. Read `constraints.json` for builder profile. If missing, use defaults and note it.
2. Read `research/index.json`. If missing, run setup first.
3. Compute the need slug: lowercase, hyphens, no special chars.
4. Compute today's date: `YYYY-MM-DD` format.

### Re-Research Detection

If the need already exists in `research/index.json`:

1. Read `research/{slug}/runs.json` if it exists.
2. Show the user a summary:
   ```
   "{Need}" has been researched before:
     Run 1: {date} — Top industry: {name} ({score}/100, {verdict})
     Run 2: {date} — ...

   Options:
     1. Fresh run (preserves all previous data, creates new timestamped directory)
     2. Continue latest run (add analysis to the most recent run's data)
   ```
3. Proceed based on user's choice.

### Same-Day Collision Handling

If `research/{slug}/{date}/` already exists:
- Append a suffix: `{date}-2`, `{date}-3`, etc.
- Check incrementally until an unused path is found.

Set `RUN_DIR = research/{slug}/{date}` (or `{date}-N` if collision).

## Pipeline

Run these phases in sequence. Do NOT ask for user input between phases — make decisions autonomously.

### Phase 0: Research Agent Dispatch

Format a builder profile summary from `constraints.json`:
```
Builder: {experienceLevel} developer
Stack: {techStack}
Goal: {revenueGoal} ({targetMRR})
Time: {availableTime} ({workStyle})
Preferences: {preferredFormFactors}, B2B={preferB2B}, B2C={preferB2C}
```

If the need name is a role/tool/concept (e.g., "vibecoder"), interpret the underlying human need first, and use the interpreted need for agent dispatch.

Launch 3 research agents **in parallel** using the Agent tool:

1. **Knowledge Researcher** (`itropa:knowledge-researcher`) — Training knowledge + web verification
   - Prompt: "Research the human need '{need}' for the ITROPA pipeline. Builder profile: {profile}. Follow the instructions in your agent file. Return your findings as a single JSON object."
   - Model: sonnet
   - Mines prior art, historical patterns, biomimicry, and abstract transferable mechanisms. Verifies and enriches findings via web search.

2. **Market Researcher** (`itropa:market-researcher`) — Training knowledge + web market data
   - Prompt: "Research the market landscape for the human need '{need}' for the ITROPA pipeline. Builder profile: {profile}. Follow the instructions in your agent file. Return your findings as a single JSON object."
   - Model: sonnet
   - Combines known market knowledge with web search for real companies, funding, pricing, market sizing, and competitive gaps.

3. **Trend Researcher** (`itropa:trend-researcher`) — Training knowledge + web trend data
   - Prompt: "Research recent trends and launches related to the human need '{need}' for the ITROPA pipeline. Builder profile: {profile}. Follow the instructions in your agent file. Return your findings as a single JSON object."
   - Model: sonnet
   - Combines known trend knowledge with web search for recent launches, technology shifts, timing signals, and solo dev opportunities.

Each agent uses a two-pass approach: training knowledge first, then web search to verify and enrich. Every data point is tagged as `knowledgeBased`, `webVerified`, or `webOnly`.

**Fallback:** If WebSearch is unavailable, all agents fall back to training knowledge only. All data points are tagged `knowledgeBased` and the report notes: "Web search was unavailable — all data from training knowledge."

### Phase 1: Consolidate Intelligence

Wait for all 3 agents to complete, then merge their outputs into a unified intelligence brief.

**Merge rules:**
- **Web-verified trumps training knowledge**: If the knowledge agent names a company and the market agent found real data for it, use the real data
- **Add web-only discoveries**: Companies, launches, and trends found only via web search get added to the appropriate prior art categories
- **Preserve knowledge-only insights**: Historical precedents, biomimicry, abstract patterns, and industry landscape from the knowledge agent are kept — these don't need web verification
- **Tag every data point** with its source: `knowledgeBased`, `webVerified`, or `webOnly`

**Build `intelligence.json`:**
```json
{
  "priorArt": {
    "currentLeaders": [...],
    "historical": [...],
    "adjacent": [...],
    "nature": [...]
  },
  "marketData": {
    "companies": [{ "name": "...", "url": "...", "funding": "...", "pricing": "...", "limitation": "...", "source": "webVerified" }],
    "marketSize": "...",
    "segments": [...],
    "pricingLandscape": { "freeOptions": [], "lowEnd": "", "midRange": "", "enterprise": "", "commonModels": [] },
    "recentFunding": [...]
  },
  "trends": {
    "hotNow": [...],
    "emerging": [...],
    "technologyEnablers": [...],
    "soloDevOpportunities": [...]
  },
  "patterns": [...],
  "dataSources": {
    "knowledgeBased": 0,
    "webVerified": 0,
    "webOnly": 0
  }
}
```

**Save** `{RUN_DIR}/intelligence.json`.

**Build prior art structure** (same 4 categories as before, now enriched with real data where available) and include it in the need data for Phase 2.

### Phase 2: Industry Evolution Tree

Generate:
- **Pre-Industrial era**: 2-3 historical expressions (strings)
- **Industrial era**: 2-3 expressions (strings)
- **Digital era (2000s-2020)**: 2-3 expressions (strings)
- **Post-AI Era (2025+)**: 5 future industry expressions, each with:
  - `id`: `{slug}-{n}` format
  - `type`: "future"
  - `name`: Creative, specific name
  - `mutation`: Technology/trend/shift that enables it — **reference real technology trends from intelligence.json where available**
  - `insight`: Why it emerges (connected to prior art)
  - `inspirations`: 1-3 items from prior art with `source`, `mechanism`, `twist`
  - `children`: `[]`

**Use intelligence.json data:** Reference real technology enablers and emerging trends from `intelligence.json` when generating mutations. Solo dev opportunities identified by the trend researcher should inform the future industries.
- `icon`: One of Users, Zap, Brain, Heart, Shield, Leaf, Sparkles
- `description`: Brief core need description
- `relatedNeeds`: 3 related needs

**Save** `{RUN_DIR}/need.json` and update `research/index.json`.

### Phase 3: Autonomous Triage

Look at the 5 future industries. Rank them by gut-feel promise based on:
- How well they match the builder's profile (tech stack, time, revenue goal)
- Market timing and novelty
- How actionable they seem for a solo dev

Pick the **top 3** to analyze deeply. Briefly note why you picked them and why the other 2 were deprioritized.

### Phase 4: Branch Top Pick

Take the #1 ranked industry and generate 3 specialized sub-industries as children. Each with:
- `id`: `{parent-id}-{n}`
- `type`: "future"
- Unique `name`, `mutation`, `insight`, `inspirations`
- `children`: `[]`

Update the parent's `children` array in `{RUN_DIR}/need.json`. Update index stats.

### Phase 5: Mechanism Extraction (Top 3)

For each of the top 3 industries, run ALL 5 mechanism frameworks. Use the mechanism-analysis skill for framework details:

1. **Functional Decomposition** — Core functions/principles, what + why
2. **Structural Analysis** — Components, relationships, flows
3. **Causal Chain Mapping** — Cause-effect sequences, intervention points
4. **Constraint-Opportunity** — Limitations that enable opportunities
5. **Scale-Context Transfer** — Behavior across micro/meso/macro scales

Each framework produces: `coreMechanism`, `abstractPattern`, framework-specific fields, `historicalApplications` (2-3 real examples), `untappedDomains` (2-3), `combinationPotential`, and metadata scores.

**Save** all to `{RUN_DIR}/mechanisms.json` keyed by expression ID.

### Phase 6: Deep Dive (Top 3)

For each top 3 industry, run business analysis using the business-analysis skill. Format the builder profile from `constraints.json` as context.

**Use intelligence.json data:** Reference real competitor data, real pricing, and real market sizing from `intelligence.json` for each deep dive. The `keyPlayers` field should contain web-verified companies where available. Use actual pricing landscape data to inform monetization analysis. Competitive gaps identified by the market researcher should inform opportunity assessment.

Produce:
- Market opportunity (size, growth, trajectory) — **use real market sizing from intelligence.json**
- Key enablers, challenges with solutions, timeline
- First mover advantage, prior art leverage, key players (**web-verified where possible**), risks
- **Opportunity Score** (5 metrics 0-100): marketTiming, technicalFit, effortEstimate, monetizationClarity, competitionDensity, overallScore
- **Solo Dev Assessment**: feasibility, timeToMVP, techStack, biggestChallenge, unfairAdvantage
- **Monetization Models**: 2-3 models with pricing and revenue ranges
- **Build Recommendation**: verdict (build/explore/skip), confidence, reasoning, nextStep

**Save** to `{RUN_DIR}/deep-dives.json` keyed by expression ID.

### Phase 7: App Concepts (Best Scoring)

Take the industry with the highest overallScore from Phase 6. Generate 5 product concepts using the business-analysis skill:

Each concept: `id`, `name`, `tagline`, `formFactor`, `targetUser`, `problemSolved`, `coreFeature`, `monetization` (model, pricing, revenueEstimate), `techStack`, `mvpScope`, `effortEstimate`, `competitiveEdge`, `risks`, `score`.

Rules:
- Diverse form factors (not all SaaS)
- At least one "quick win" (weekend-2 weeks)
- At least one "ambitious bet" (1-2 months)
- Scores personalized to builder profile

**Save** to `{RUN_DIR}/app-concepts.json` keyed by expression ID.

### Phase 8: Cross-Pollination (Top 2)

Take the two highest-scoring industries from Phase 6 and cross-pollinate them using the cross-pollination skill. Generate 5 hybrid industries using 5 strategies:

1. **Additive Integration** — Both side-by-side
2. **Substitution** — Replace A's component with B's strength
3. **Complementary** — One fills the other's gaps
4. **Sequential Enablement** — A creates conditions for B
5. **Contradiction Synthesis** — Resolve conflicts into new category

Each hybrid: `id`, `type`, `name`, `mutation`, `insight`, `combinationType`, `synergyScore`, `noveltyFactor`, `marketFit`, `challenges`, `inspirations`.

**Save** to `{RUN_DIR}/cross-pollinations.json`.

### Phase 8.5: Generate Digest

After all data is saved, generate a compact `digest.json` (~1KB) in the run directory. This is what Claude reads first for fast scanning in future sessions.

**Extract from the run's data:**
```json
{
  "need": "{Need Name}",
  "runDate": "{YYYY-MM-DD or YYYY-MM-DD-N}",
  "constraintsSnapshot": {
    "experienceLevel": "...",
    "targetMRR": "...",
    "techStack": ["..."],
    "availableTime": "...",
    "workStyle": "..."
  },
  "industries": [
    {
      "id": "...",
      "name": "...",
      "score": 85,
      "verdict": "BUILD"
    }
  ],
  "topMechanisms": ["trust-building", "reputation-signaling"],
  "topConcepts": [
    { "name": "...", "score": 80, "effort": "weekend" }
  ],
  "tags": ["reputation", "trust", "credibility"],
  "keyInsights": ["Insight 1", "Insight 2", "Insight 3"],
  "dataSources": {
    "knowledgeBased": 0,
    "webVerified": 0,
    "webOnly": 0
  }
}
```

**How to populate each field:**
- `constraintsSnapshot` — copy key fields from current `constraints.json`
- `industries` — from deep-dives.json, extract id/name/overallScore/verdict for each analyzed industry
- `topMechanisms` — from mechanisms.json, extract the most frequently mentioned abstract patterns (top 3-5)
- `topConcepts` — from app-concepts.json, top 3 concepts by score with name/score/effortEstimate
- `tags` — combine recurring themes from all data (aim for 5-10 tags)
- `keyInsights` — 3-5 most important takeaways from the entire run
- `dataSources` — copy from `intelligence.json` dataSources field (counts of knowledgeBased, webVerified, webOnly data points)

**Save** to `{RUN_DIR}/digest.json`.

### Phase 8.7: Update Graph, Runs, and Index

**Step 1 — Update `runs.json`:**

Read or create `research/{slug}/runs.json`:
```json
{
  "need": "{Need Name}",
  "slug": "{slug}",
  "runs": [
    {
      "date": "{run date}",
      "constraintsSnapshot": { ... },
      "stats": {
        "industries": 8,
        "mechanisms": 15,
        "deepDives": 3,
        "appConcepts": 5,
        "crossPollinations": 5
      },
      "topIndustry": {
        "name": "...",
        "score": 84,
        "verdict": "BUILD"
      },
      "tags": ["reputation", "trust"]
    }
  ]
}
```
Append a new entry for this run. Stats come from counting items in each saved file.

**Step 2 — Update `graph.json`:**

Read `research/graph.json`. If this is the first need researched, just initialize with empty connections. If other needs have been researched:

1. Read digests from ALL other needs' latest runs.
2. Compare this run's `topMechanisms` and `tags` against other needs' digests.
3. For each shared mechanism or theme, add a connection:
   ```json
   {
     "type": "shared-mechanism",
     "source": { "need": "{this-slug}", "run": "{this-date}", "item": "{expression-id}" },
     "target": { "need": "{other-slug}", "run": "{other-date}", "item": "{expression-id}" },
     "mechanism": "{shared mechanism name}",
     "strength": 0.85
   }
   ```
4. Update the `themes` map: for each tag in this run's digest, add an occurrence entry.

Save `research/graph.json`.

**Step 3 — Update `index.json` to v2 schema:**

Update the need entry in `research/index.json`:
```json
{
  "need-slug": {
    "name": "Need Name",
    "slug": "need-slug",
    "icon": "Users",
    "description": "Brief description",
    "createdAt": "ISO timestamp",
    "lastUpdated": "ISO timestamp",
    "totalRuns": 2,
    "latestRun": "2026-02-28",
    "latestTopIndustry": { "name": "...", "score": 84, "verdict": "BUILD" },
    "tags": ["reputation", "trust"],
    "stats": {
      "industries": 5,
      "mechanisms": 15,
      "deepDives": 3,
      "appConcepts": 5,
      "crossPollinations": 5,
      "chains": 0
    }
  }
}
```
Set `index.json` version to `"2.0.0"`. Recompute `totalNeeds` and `totalIndustries`.

**Step 4 — Reindex (optional):**

If the MCP tool `reindex` is available, call it to rebuild the search index. If MCP is not running, skip gracefully — this is an enhancement, not a requirement.

### Phase 9: Research Report

Present a complete report to the user:

```
ITROPA Research Report: {Need Name}
════════════════════════════════════
Run: {date} | Run #{N} for this need

Data Sources: {knowledgeBased} knowledge-based | {webVerified} web-verified | {webOnly} web-only

Prior Art Highlights:
  - {Top leader}: {mechanism} (but misses: {limitation})
  - {Best historical lesson}
  - {Most promising cross-domain transfer}

Industry Evolution:
  Pre-Industrial → Industrial → Digital → Post-AI
  5 future industries generated, top 3 analyzed:

  1. {#1 Name} — Score: {X}/100 — Verdict: {BUILD/EXPLORE/SKIP}
     "{insight}"
     Time to MVP: {time} | Stack: {stack}
     Best monetization: {model} ({revenue range})

  2. {#2 Name} — Score: {X}/100 — Verdict: {VERDICT}
     ...

  3. {#3 Name} — Score: {X}/100 — Verdict: {VERDICT}
     ...

  Also discovered (not deep-dived):
  4. {#4 Name} — "{insight}"
  5. {#5 Name} — "{insight}"

Branched from #1:
  └─ {Child 1}, {Child 2}, {Child 3}

Top Product Concepts (from {best industry}):
  1. {Name} ({formFactor}) — Score: {X}/100
     "{tagline}"
     {mvpScope} | {effortEstimate} | {revenueEstimate}

  2. {Name} — Score: {X}/100
     ...

  Quick win: {name} ({effort})
  Ambitious bet: {name} ({effort})

Best Cross-Pollination:
  {Industry A} × {Industry B} →
  - {Hybrid name} (synergy: {X}, novelty: {X}) — "{insight}"

Cross-Need Connections:
  {Show any shared mechanisms/themes found with other needs, or "First need — run more to find connections"}

Key Transferable Mechanisms:
  - {abstractPattern 1} — found in {domain}, untapped in {domain}
  - {abstractPattern 2} — ...

What to do next:
  - "Go deeper on {best concept}" — I'll flesh out a build plan
  - "Explore {related need}" — Run another pipeline
  - "Cross-pollinate {X} + {Y}" — Combine specific industries
  - "What can I build this weekend?" — I'll filter for quick wins
  - "Compare my {Need} runs" — See how research evolved
  - /itropa:status — See all your research
```

## Quality Standards

- Future industries: SPECIFIC and NOVEL, not generic predictions
- Each draws clear inspiration from prior art
- Mutations reference real technologies or trends
- Names are evocative and memorable
- Historical applications in mechanisms are REAL, verifiable examples
- Scores use the full 0-100 range meaningfully
- Build verdicts are honest — not everything is "build"
- The report should be actionable — the user should know what to do next
- Digest should be compact (~1KB) — just enough for fast scanning
- Market data should be web-verified where possible. Clearly note which data points are from web search vs training knowledge
- When web search data is available, prefer it over training knowledge for companies, pricing, funding, and market sizing

## Error Handling

- If `constraints.json` doesn't exist, use defaults and note it
- If `research/index.json` doesn't exist, run setup first
- If the need already exists, show run history and offer fresh run or continue latest
- If same-day directory collision, append suffix (`-2`, `-3`, etc.)
- If MCP reindex fails or MCP not available, skip gracefully
- If `graph.json` doesn't exist, create it with empty connections
- If web research agents fail (WebSearch unavailable or errors), proceed with knowledge-researcher output only and note it in the report
- If web agents return empty results, still proceed — knowledge-only research is better than no research
