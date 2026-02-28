# Changelog

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
- MCP server uses `sql.js` (pure JS SQLite) for Windows compatibility — no native build deps
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
