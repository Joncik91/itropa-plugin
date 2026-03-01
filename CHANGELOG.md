# Changelog

## [2.1.1] - 2026-03-01

### Added
- **Research agents**: 3 parallel agents (`knowledge-researcher`, `market-researcher`, `trend-researcher`) run at pipeline start, each combining training knowledge with web search
- **`intelligence.json`**: new per-run file consolidating web-verified and knowledge-based research data
- **Data source tagging**: every data point tagged as `knowledgeBased`, `webVerified`, or `webOnly`
- **Source citations**: every web-verified/web-only data point includes a `sourceUrl` for traceability
- **Confidence ratings**: every data point across all agents rated `high`, `medium`, or `low`
- **Cross-agent referencing**: Phase 1 explicitly compares findings across agents — upgrades knowledge entries with market data, flags contradictions, surfaces cross-agent insights
- **`dataSources` field in digest**: counts of knowledge-based, web-verified, and web-only data points
- **Role-based agent personas**: each agent has a specific analyst identity (Prior Art Analyst, Competitive Intelligence Analyst, Technology Scout) for stronger, more focused output
- `agents/` directory with agent definitions (YAML frontmatter + structured prompts)
- `CONTRIBUTING.md` with agent conventions and project structure

### Changed
- `/itropa:go` pipeline restructured: new Phase 0 (Research Agent Dispatch) and Phase 1 (Consolidate Intelligence) replace old Phase 1 (Prior Art Research)
- All agents use parallel search execution within rounds for faster, more comprehensive coverage
- Phase 2 (Industry Tree) now references real technology trends from intelligence.json
- Phase 6 (Deep Dive) uses real competitor data, pricing, and market sizing from intelligence.json
- Phase 8.5 (Digest) includes `dataSources` counts
- Phase 9 (Report) shows data source breakdown
- Pipeline gracefully degrades to knowledge-only if WebSearch is unavailable

## [2.1.0] - 2026-02-28

### Fixed
- **MCP server FTS5 crash**: switched from `sql.js` (WASM build lacks FTS5) to `better-sqlite3` (native, FTS5 built in)
- **MCP deps not installed after plugin install**: added `bootstrap.js` that auto-installs `node_modules` on first server start — no manual `npm install` needed
- **Internal skills visible to users**: added `user-invocable: false` frontmatter to all 7 skills — users now only see the 4 commands
- **Constraints auto-populated with defaults**: setup now asks the user to describe themselves instead of silently writing a generic profile
- **Stale command references**: removed `/itropa:mechanisms`, `/itropa:deep-dive`, etc. from skill docs (these were never real commands)
- **Dead `statSync` import** in server.js
- **Hardcoded workspace name** in SKILL.md replaced with `{workspace}/`

### Changed
- MCP server uses `better-sqlite3` instead of `sql.js` for reliable FTS5 support
- MCP `.mcp.json` points to `bootstrap.js` (auto-installs deps) instead of `server.js` directly
- `docs/user-guide.md` fully rewritten for v2 (timestamped runs, digest/graph phases, new conversational commands)
- README clarifies that `/itropa:setup` is required before MCP search works

## [2.0.0] - 2026-02-28

### Added
- **Timestamped research runs**: each `/itropa:go` creates a dated directory (`research/{slug}/{YYYY-MM-DD}/`), preserving all previous data
- **Research graph** (`graph.json`): cross-need connections tracking shared mechanisms, themes, and industry overlaps
- **Digest files** (`digest.json`): compact ~1KB summaries per run for fast session resume and cross-referencing
- **Run history** (`runs.json`): per-need log of all research runs with stats and top results
- **MCP search server**: SQLite FTS5 full-text search across all research content via 4 MCP tools (`search_research`, `find_connections`, `get_timeline`, `reindex`)
- **Same-day re-run handling**: date suffix (`-2`, `-3`) prevents directory collisions
- **v1 → v2 migration**: `/itropa:setup` detects v1 workspaces and offers automatic migration
- New `/itropa:status` operators: `run:{date}`, `connections`, `timeline:{need}`, `compare:{need}`
- Cross-need connection discovery during pipeline (Phase 8.7)
- Digest-first session resume (reads ~1KB per need instead of full data files)
- New conversational capabilities: "Compare my Status runs", "What connects Status and Belonging?", "Show research timeline"

### Changed
- `index.json` schema updated to v2.0.0 — adds `totalRuns`, `latestRun`, `latestTopIndustry`, `tags` per need
- `/itropa:go` pipeline expanded: new Phase 8.5 (digest generation) and Phase 8.7 (graph + runs + index update)
- `/itropa:go` re-research flow: shows run history, offers "fresh run" or "continue latest" instead of overwrite
- `/itropa:setup` now creates `graph.json` and installs MCP server dependencies
- `/itropa:status` dashboard shows run counts, run history, and cross-need connections
- `/itropa:status` search uses MCP FTS5 first, falls back to file reading
- SKILL.md workspace awareness updated for v2 data structure and digest-first patterns
- `CLAUDE.md` template updated with v2 data structure and MCP tool documentation

### Technical
- MCP server uses `better-sqlite3` with FTS5 — bootstraps its own dependencies on first start
- MCP is enhancement, not dependency — all features work without MCP server running
- Research graph updated by Claude during pipeline, not by MCP server

## [1.0.0] - 2026-02-28

### Added
- 4 commands: `setup`, `go`, `status`, `constraints`
- `go` command runs full autonomous 9-phase research pipeline (prior art → industry tree → triage → branch → mechanisms → deep dive → app concepts → cross-pollination → report)
- `status` command with dashboard and search functionality
- `constraints` command for builder profile setup
- 7 analytical skills: mechanism-analysis, business-analysis, cross-pollination, prior-art-analysis, pattern-analysis, chain-analysis, itropa-workspace
- 5-framework mechanism extraction (Functional, Structural, Causal, Constraint-Opportunity, Scale-Context)
- 5-framework prior art analysis (Competitive Landscape, Gap Analysis, Evolution Pattern, Innovation Potential, Strategic Positioning)
- 5-framework pattern analysis (Frequency, Need-Mapping, Evolution, Combination, Transfer)
- 5-framework chain analysis (Lineage, Influence, Divergence, Velocity, Coherence)
- 5 cross-pollination strategies (Additive, Substitution, Complementary, Sequential, Contradiction)
- Business analysis with opportunity scoring (5 metrics, 0-100) and build/explore/skip verdicts
- App concept generation with viability scoring personalized to builder profile
- JSON-based persistence for cross-session research continuity
- Conversational follow-up after pipeline completes (no commands needed)
- README and user guide documentation
