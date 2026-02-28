# /itropa:setup — Initialize ITROPA Research Workspace

Initialize this directory as an ITROPA innovation research workspace.

## What to do

1. **Check if already initialized** — If `research/index.json` already exists, inform the user and offer to show status instead.

2. **Create the directory structure:**
   ```
   research/
   ```

3. **Create `research/index.json`** with initial content:
   ```json
   {
     "version": "1.0.0",
     "createdAt": "<current ISO timestamp>",
     "lastUpdated": "<current ISO timestamp>",
     "needs": {},
     "totalNeeds": 0,
     "totalIndustries": 0
   }
   ```

4. **Create `constraints.json`** with default builder profile:
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

5. **Create `CLAUDE.md`** with session instructions:
   ```markdown
   # ITROPA Research Workspace

   This is an ITROPA innovation research workspace. On session start:

   1. Read `constraints.json` for the builder's profile
   2. Read `research/index.json` for research state
   3. Greet with a brief status summary

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

   ## Data

   All research saves as JSON in `research/`. See `research/index.json` for the master index.
   ```

6. **Confirm setup:**
   ```
   ITROPA workspace ready!

   1. Set your builder profile: /itropa:constraints
      (or just describe yourself: "I'm a senior Python dev, side project, want $5k MRR")

   2. Run your first research pipeline: /itropa:go Belonging
      (Claude handles everything autonomously — takes a few minutes)

   Other needs to try: Safety, Creation, Learning, Health, Play, Status, Autonomy, Purpose
   ```
