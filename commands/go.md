# /itropa:go — Autonomous Research Pipeline

Run a full ITROPA research pipeline on a human need. Claude makes all decisions autonomously and presents a complete research report at the end.

## Arguments

`<need-name>` — The human need to research (e.g., "Belonging", "Safety", "Creation", "Learning", "Health", "Play", "Status", "Autonomy", "Purpose")

If no argument provided, ask the user what need they want to explore.

## Pipeline

Run these phases in sequence. Do NOT ask for user input between phases — make decisions autonomously. Read `constraints.json` before starting to personalize all analysis.

### Phase 1: Prior Art Research

Research existing solutions for this human need across 4 categories:
- **Current Leaders**: 3-4 modern solutions — name, domain, mechanism, limitation
- **Historical Precedents**: 3-4 historical solutions — name, era, mechanism, lesson
- **Adjacent Domains**: 3-4 cross-domain solutions — name, original domain, mechanism, transfer potential
- **Nature Solutions**: 3-4 biomimicry examples — natural example, mechanism, application potential

If the need name is a role/tool/concept (e.g., "vibecoder"), interpret the underlying human need first.

### Phase 2: Industry Evolution Tree

Generate:
- **Pre-Industrial era**: 2-3 historical expressions (strings)
- **Industrial era**: 2-3 expressions (strings)
- **Digital era (2000s-2020)**: 2-3 expressions (strings)
- **Post-AI Era (2025+)**: 5 future industry expressions, each with:
  - `id`: `{slug}-{n}` format
  - `type`: "future"
  - `name`: Creative, specific name
  - `mutation`: Technology/trend/shift that enables it
  - `insight`: Why it emerges (connected to prior art)
  - `inspirations`: 1-3 items from prior art with `source`, `mechanism`, `twist`
  - `children`: `[]`
- `icon`: One of Users, Zap, Brain, Heart, Shield, Leaf, Sparkles
- `description`: Brief core need description
- `relatedNeeds`: 3 related needs

**Save** `research/{slug}/need.json` and update `research/index.json`.

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

Update the parent's `children` array in `need.json`. Update index stats.

### Phase 5: Mechanism Extraction (Top 3)

For each of the top 3 industries, run ALL 5 mechanism frameworks. Use the mechanism-analysis skill for framework details:

1. **Functional Decomposition** — Core functions/principles, what + why
2. **Structural Analysis** — Components, relationships, flows
3. **Causal Chain Mapping** — Cause-effect sequences, intervention points
4. **Constraint-Opportunity** — Limitations that enable opportunities
5. **Scale-Context Transfer** — Behavior across micro/meso/macro scales

Each framework produces: `coreMechanism`, `abstractPattern`, framework-specific fields, `historicalApplications` (2-3 real examples), `untappedDomains` (2-3), `combinationPotential`, and metadata scores.

**Save** all to `research/{slug}/mechanisms.json` keyed by expression ID.

### Phase 6: Deep Dive (Top 3)

For each top 3 industry, run business analysis using the business-analysis skill. Format the builder profile from `constraints.json` as context.

Produce:
- Market opportunity (size, growth, trajectory)
- Key enablers, challenges with solutions, timeline
- First mover advantage, prior art leverage, key players, risks
- **Opportunity Score** (5 metrics 0-100): marketTiming, technicalFit, effortEstimate, monetizationClarity, competitionDensity, overallScore
- **Solo Dev Assessment**: feasibility, timeToMVP, techStack, biggestChallenge, unfairAdvantage
- **Monetization Models**: 2-3 models with pricing and revenue ranges
- **Build Recommendation**: verdict (build/explore/skip), confidence, reasoning, nextStep

**Save** to `research/{slug}/deep-dives.json` keyed by expression ID.

### Phase 7: App Concepts (Best Scoring)

Take the industry with the highest overallScore from Phase 6. Generate 5 product concepts using the business-analysis skill:

Each concept: `id`, `name`, `tagline`, `formFactor`, `targetUser`, `problemSolved`, `coreFeature`, `monetization` (model, pricing, revenueEstimate), `techStack`, `mvpScope`, `effortEstimate`, `competitiveEdge`, `risks`, `score`.

Rules:
- Diverse form factors (not all SaaS)
- At least one "quick win" (weekend-2 weeks)
- At least one "ambitious bet" (1-2 months)
- Scores personalized to builder profile

**Save** to `research/{slug}/app-concepts.json` keyed by expression ID.

### Phase 8: Cross-Pollination (Top 2)

Take the two highest-scoring industries from Phase 6 and cross-pollinate them using the cross-pollination skill. Generate 5 hybrid industries using 5 strategies:

1. **Additive Integration** — Both side-by-side
2. **Substitution** — Replace A's component with B's strength
3. **Complementary** — One fills the other's gaps
4. **Sequential Enablement** — A creates conditions for B
5. **Contradiction Synthesis** — Resolve conflicts into new category

Each hybrid: `id`, `type`, `name`, `mutation`, `insight`, `combinationType`, `synergyScore`, `noveltyFactor`, `marketFit`, `challenges`, `inspirations`.

**Save** to `research/{slug}/cross-pollinations.json`.

### Phase 9: Research Report

Present a complete report to the user:

```
ITROPA Research Report: {Need Name}
════════════════════════════════════

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

Key Transferable Mechanisms:
  - {abstractPattern 1} — found in {domain}, untapped in {domain}
  - {abstractPattern 2} — ...

What to do next:
  - "Go deeper on {best concept}" — I'll flesh out a build plan
  - "Explore {related need}" — Run another pipeline
  - "Cross-pollinate {X} + {Y}" — Combine specific industries
  - "What can I build this weekend?" — I'll filter for quick wins
  - /itropa:status — See all your research
```

Update all index.json stats after completion.

## Quality Standards

- Future industries: SPECIFIC and NOVEL, not generic predictions
- Each draws clear inspiration from prior art
- Mutations reference real technologies or trends
- Names are evocative and memorable
- Historical applications in mechanisms are REAL, verifiable examples
- Scores use the full 0-100 range meaningfully
- Build verdicts are honest — not everything is "build"
- The report should be actionable — the user should know what to do next

## Error Handling

- If `constraints.json` doesn't exist, use defaults and note it
- If `research/index.json` doesn't exist, run setup first
- If the need already exists, inform user and ask: re-research or run analysis on existing data?
