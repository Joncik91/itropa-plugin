# Contributing to ITROPA

## Setup

```bash
git clone https://github.com/Joncik91/itropa-plugin.git
cd itropa-plugin
```

## Development

Test the plugin locally:

```bash
claude --plugin-dir ./itropa-plugin
```

All commands will be available as `/itropa:setup`, `/itropa:go`, etc. Changes to commands and skills take effect on the next invocation — no build step.

### MCP Server

The MCP search server lives in `mcp/` and auto-installs its own dependencies via `bootstrap.js` on first start. To develop on it:

```bash
cd mcp
npm install
node server.js
```

The server uses `better-sqlite3` for SQLite FTS5 full-text search. It runs as a stdio MCP server registered via `.mcp.json`.

## Project Structure

```
itropa-plugin/
├── .claude-plugin/
│   ├── plugin.json          # Plugin manifest
│   └── marketplace.json     # Marketplace registry
├── commands/                # Slash commands (4 total)
│   ├── setup.md             # /itropa:setup — workspace init + migration
│   ├── go.md                # /itropa:go — full research pipeline
│   ├── status.md            # /itropa:status — dashboard + search
│   └── constraints.md       # /itropa:constraints — builder profile
├── skills/                  # Internal analysis skills (7, not user-visible)
│   ├── itropa-workspace/    # Session awareness + data structure
│   ├── mechanism-analysis/  # 5-framework mechanism extraction
│   ├── business-analysis/   # Opportunity scoring + verdicts
│   ├── cross-pollination/   # Industry combination strategies
│   ├── prior-art-analysis/  # Competitive landscape analysis
│   ├── pattern-analysis/    # Cross-need pattern discovery
│   └── chain-analysis/      # Innovation chain tracing
├── mcp/                     # MCP search server
│   ├── bootstrap.js         # Auto-installs deps, then loads server
│   ├── server.js            # SQLite FTS5 search (4 tools)
│   ├── package.json         # Dependencies (better-sqlite3, MCP SDK)
│   └── package-lock.json
├── docs/
│   └── user-guide.md
├── .mcp.json                # MCP server registration
├── .gitignore
├── CHANGELOG.md
├── README.md
└── CONTRIBUTING.md
```

## Conventions

### Commands (`commands/*.md`)
- Markdown with phased workflows
- Each phase has a clear goal and actions
- `/itropa:go` is fully autonomous — no approval gates by design

### Skills (`skills/*/SKILL.md`)
- YAML frontmatter with `user-invocable: false` (internal only)
- Loaded on-demand by the pipeline, not shown to users
- Each skill encodes one analytical framework

### MCP Server (`mcp/`)
- ES modules (`"type": "module"`)
- `better-sqlite3` for FTS5 (native build, not WASM)
- Graceful degradation — pipeline works without MCP server running
- In-memory SQLite fallback when `research/` doesn't exist yet

### Data (`research/`)
- All research saves as JSON — human-readable, git-friendly
- Timestamped run directories: `research/{slug}/{YYYY-MM-DD}/`
- `digest.json` (~1KB) enables fast session resume
- `graph.json` tracks cross-need connections
- Never overwrite existing research data

## Submitting Changes

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Test with `claude --plugin-dir ./itropa-plugin` — run the affected commands
4. If you changed the MCP server, verify it starts: `cd mcp && node server.js`
5. Open a PR with a clear description of what changed and why

## Reporting Issues

Use [GitHub Issues](https://github.com/Joncik91/itropa-plugin/issues). Include:

- Claude Code version (`claude --version`)
- Which command you ran (`/itropa:go`, `/itropa:setup`, etc.)
- What you expected vs what happened
- Any error output
- Whether MCP search server was active

## Architecture Decisions

- **Claude IS the engine** — no external APIs, no wrapper scripts. Commands encode methodology; Claude does the thinking.
- **MCP is enhancement, not dependency** — all features must work without MCP server running.
- **Skills are internal** — users see 4 commands, not 11 menu items.
- **Data is sacred** — never overwrite research. Timestamped directories preserve history.
- **Bootstrap, don't require setup** — MCP deps auto-install on first start via `bootstrap.js`.
