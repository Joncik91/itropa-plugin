# ITROPA Workspace Awareness

This skill activates when working in an ITROPA research workspace. It provides data structure knowledge, session continuity, and conversational research capabilities.

## Trigger

Activate when:
- The current directory contains `research/index.json`
- The user mentions ITROPA, needs, industries, mechanisms, or innovation research
- Any `/itropa:*` command is invoked
- The user asks conversational research questions (e.g., "go deeper on #2", "what should I build?")

## Session Resume Protocol

On new session:
1. Read `constraints.json` for builder profile
2. Read `research/index.json` for research state
3. Greet with brief status:

```
Welcome back! You have {N} needs explored, {M} industries discovered.
Top opportunity: {name} ({score}/100, verdict: {verdict})
Ready to continue? Try /itropa:status or just tell me what you want to explore.
```

## Commands (4 total)

| Command | Purpose |
|---------|---------|
| `/itropa:setup` | Initialize workspace |
| `/itropa:go <need>` | Full autonomous pipeline: prior art → tree → triage → branch → mechanisms → deep-dive → concepts → cross-pollinate → report |
| `/itropa:status [search]` | Dashboard + search |
| `/itropa:constraints` | Builder profile |

## Conversational Research

After a pipeline completes (or anytime with existing data), the user can just talk. Handle these naturally:

- **"Go deeper on X"** → Branch the industry, run mechanisms, deep-dive
- **"Cross-pollinate X + Y"** → Find both industries in data, run 5 combination strategies
- **"What can I build this weekend?"** → Filter concepts by effortEstimate, rank by score
- **"Explore {need} next"** → Run the /itropa:go pipeline
- **"Search for {term}"** → Search all research data
- **"Extract mechanisms from X"** → Run 5-framework mechanism analysis
- **"Do a deep dive on X"** → Run business analysis with scoring
- **"Generate concepts for X"** → Run app concept generation
- **"Analyze the prior art for X"** → Run 5-framework prior art analysis
- **"Find patterns across my research"** → Run cross-need pattern analysis
- **"Trace the inspiration chain for X"** → Run 5-framework chain analysis

All analysis capabilities from the 7 skills are available conversationally. The user never needs to remember a command name — they describe what they want and Claude uses the appropriate skill.

## Workspace Data Structure

```
claudes-itropa/
├── CLAUDE.md                  # Session instructions
├── constraints.json           # Builder profile
└── research/
    ├── index.json             # Master index
    └── {need-slug}/
        ├── need.json          # Need + prior art + industry tree
        ├── mechanisms.json    # 5-framework analyses per industry
        ├── deep-dives.json    # Business analyses per industry
        ├── app-concepts.json  # Product concepts per industry
        ├── cross-pollinations.json
        ├── prior-art.json     # 5-framework prior art analysis
        ├── patterns.json      # Cross-need pattern analyses
        └── chains.json        # Chain analyses per industry
```

## File Schemas

### index.json
```json
{
  "version": "1.0.0",
  "createdAt": "ISO timestamp",
  "lastUpdated": "ISO timestamp",
  "needs": {
    "need-slug": {
      "name": "Need Name",
      "slug": "need-slug",
      "icon": "Users",
      "description": "Brief description",
      "createdAt": "ISO timestamp",
      "lastUpdated": "ISO timestamp",
      "stats": {
        "industries": 5,
        "mechanisms": 0,
        "deepDives": 0,
        "appConcepts": 0,
        "crossPollinations": 0,
        "chains": 0
      }
    }
  },
  "totalNeeds": 1,
  "totalIndustries": 5
}
```

### constraints.json
```json
{
  "techStack": ["React", "TypeScript", "Node.js"],
  "experienceLevel": "intermediate",
  "hasAIAccess": true,
  "availableTime": "2-4 weeks",
  "workStyle": "side-project",
  "revenueGoal": "side-income",
  "targetMRR": "$1-5k",
  "preferredFormFactors": ["saas", "tool", "api"],
  "avoidCategories": [],
  "preferB2B": true,
  "preferB2C": true,
  "riskTolerance": "medium",
  "lastUpdated": "ISO timestamp"
}
```

### need.json
```json
{
  "id": "slug",
  "name": "Need Name",
  "icon": "Users",
  "description": "Core need description",
  "priorArt": {
    "currentLeaders": [{"name": "", "domain": "", "mechanism": "", "limitation": ""}],
    "historicalPrecedents": [{"name": "", "era": "", "mechanism": "", "lesson": ""}],
    "adjacentDomains": [{"name": "", "originalDomain": "", "mechanism": "", "transferPotential": ""}],
    "natureSolutions": [{"name": "", "mechanism": "", "biomimicryPotential": ""}]
  },
  "eras": [
    {"name": "Pre-Industrial", "expressions": [""]},
    {"name": "Industrial", "expressions": [""]},
    {"name": "Digital (2000s-2020)", "expressions": [""]},
    {"name": "Post-AI Era (2025+)", "expressions": [
      {"id": "", "type": "future", "name": "", "mutation": "", "insight": "", "inspirations": [{"source": "", "mechanism": "", "twist": ""}], "children": []}
    ]}
  ],
  "relatedNeeds": []
}
```

### mechanisms.json, deep-dives.json, app-concepts.json, cross-pollinations.json, chains.json, patterns.json, prior-art.json

All keyed by expression ID (or pattern slug / cross-key). Each entry has a timestamp and the framework-specific analysis data. See the corresponding skill files for detailed schemas.

## Helper Patterns

**Finding an industry by name:** Search all `need.json` files → `eras[3].expressions` and recursively through `children`.

**Generating slugs:** Lowercase, replace spaces with hyphens, remove special characters.

**Updating index stats:** After any write, recount entries in data files and update `index.json`.

**ID format:** `{slug}-{n}` for expressions, `{parent-id}-{n}` for children, `cross-{n}` for hybrids.
