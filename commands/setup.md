# /itropa:setup — Initialize ITROPA Research Workspace

Initialize this directory as an ITROPA innovation research workspace.

## What to do

1. **Check if already initialized** — If `research/index.json` already exists, check its version and handle accordingly:
   - **Version 2.0.0**: Inform the user the workspace is already set up. Offer to show status instead.
   - **Version 1.0.0 (or no version)**: Offer to migrate to v2.0.0 (see Migration section below).
   - **No index.json**: Fresh setup.

2. **Create the directory structure:**
   ```
   research/
   ```

3. **Create `research/index.json`** with initial content:
   ```json
   {
     "version": "2.0.0",
     "createdAt": "<current ISO timestamp>",
     "lastUpdated": "<current ISO timestamp>",
     "needs": {},
     "totalNeeds": 0,
     "totalIndustries": 0
   }
   ```

4. **Create `research/graph.json`** with empty structure:
   ```json
   {
     "version": "1.0.0",
     "connections": [],
     "themes": {}
   }
   ```

5. **Create `constraints.json`** with default builder profile:
   ```json
   {
     "techStack": ["React", "TypeScript", "Node.js"],
     "experienceLevel": "intermediate",
     "hasAIAccess": true,
     "availableTime": "2-4 weeks",
     "workStyle": "side-project",
     "revenueGoal": "side-income",
     "preferredFormFactors": ["saas", "tool", "api"],
     "avoidCategories": [],
     "preferB2B": true,
     "preferB2C": true,
     "riskTolerance": "medium",
     "lastUpdated": "<current ISO timestamp>"
   }
   ```

6. **Create `CLAUDE.md`** with session instructions:
   ```markdown
   # ITROPA Research Workspace (v2.0)

   This is an ITROPA innovation research workspace. On session start:

   1. Read `constraints.json` for the builder's profile
   2. Read `research/index.json` for research state
   3. Read digests for quick context: `research/{slug}/{latest-run}/digest.json` for each need
   4. Greet with a brief status summary

   ## Commands

   - `/itropa:go <need>` — Run full autonomous research pipeline on a human need
   - `/itropa:status [search]` — Dashboard & search
   - `/itropa:constraints` — Update builder profile

   ## Conversational (no command needed)

   After a pipeline completes, just talk:
   - "Go deeper on #2" — branch, mechanisms, or deep-dive
   - "Cross-pollinate those top two"
   - "What can I build this weekend?"
   - "Explore Safety next"
   - "Search my research for trust patterns"
   - "Compare my Status runs" — see how research evolved
   - "What connects Status and Belonging?" — cross-need connections

   ## Data (v2.0 — Timestamped Runs)

   Research saves as JSON in `research/`. Each research run gets its own timestamped directory, preserving all previous data.

   ```
   research/
   ├── index.json              # Master index (v2.0.0)
   ├── graph.json              # Cross-need connections
   └── {need-slug}/
       ├── runs.json           # Run history for this need
       └── {YYYY-MM-DD}/       # Timestamped run directory
           ├── need.json
           ├── mechanisms.json
           ├── deep-dives.json
           ├── app-concepts.json
           ├── cross-pollinations.json
           └── digest.json     # Compact summary (~1KB) — read this first
   ```

   ## MCP Search

   The ITROPA search MCP server provides full-text search across all research data. Use these MCP tools if available:
   - `search_research` — FTS5 search across all content
   - `find_connections` — Cross-need shared mechanisms/themes
   - `get_timeline` — Run history + digests for a need
   - `reindex` — Rebuild search index

   If MCP tools are not available, fall back to reading files directly.
   ```

7. **Confirm setup:**
   ```
   ITROPA workspace ready! (v2.0)

   1. Set your builder profile: /itropa:constraints
      (or just describe yourself: "I'm a senior Python dev, side project, want $5k MRR")

   2. Run your first research pipeline: /itropa:go Belonging
      (Claude handles everything autonomously — takes a few minutes)

   Other needs to try: Safety, Creation, Learning, Health, Play, Status, Autonomy, Purpose
   ```

## v1 → v2 Migration

If `research/index.json` exists with version `"1.0.0"` (or no version field), offer migration:

```
Existing ITROPA v1 workspace detected with {N} needs researched.
v2 adds timestamped runs (re-research without data loss), cross-need connections, and search.

Migrate to v2? (Your existing data will be preserved in timestamped directories)
```

If user agrees, perform these steps for **each need** in the index:

1. **Create timestamped directory:** `research/{slug}/2026-02-28/` (use today's date, or parse `lastUpdated` from index entry if available)

2. **Move data files:** Move all JSON files from `research/{slug}/` into the timestamped directory:
   - `need.json`, `mechanisms.json`, `deep-dives.json`, `app-concepts.json`, `cross-pollinations.json`
   - Also move `prior-art.json`, `patterns.json`, `chains.json` if they exist

3. **Generate `digest.json`** from existing data:
   - Read the moved `deep-dives.json` for scores/verdicts, `mechanisms.json` for top mechanisms, `app-concepts.json` for top concepts
   - Build digest following the schema from `/itropa:go` Phase 8.5

4. **Create `runs.json`** with one entry for the existing run:
   ```json
   {
     "need": "{Need Name}",
     "slug": "{slug}",
     "runs": [{
       "date": "{migration date}",
       "constraintsSnapshot": { "experienceLevel": "...", ... },
       "stats": { "industries": N, "mechanisms": N, ... },
       "topIndustry": { "name": "...", "score": N, "verdict": "..." },
       "tags": [...]
     }]
   }
   ```

5. **Create `research/graph.json`** — scan all migrated digests for shared mechanisms/themes across needs.

6. **Update `research/index.json`** to v2.0.0 schema:
   - Set `version` to `"2.0.0"`
   - Add `totalRuns`, `latestRun`, `latestTopIndustry`, `tags` to each need entry

7. **Install MCP deps:** Run `npm install --prefix {PLUGIN_ROOT}/mcp/`

8. **Update `CLAUDE.md`** with v2 template (from step 7 above).

9. Confirm:
   ```
   Migration complete! {N} needs migrated to v2.0.
   - Data preserved in timestamped directories
   - Digests generated for fast scanning
   - Graph initialized with cross-need connections
   - Run /itropa:status to see the updated dashboard
   ```
