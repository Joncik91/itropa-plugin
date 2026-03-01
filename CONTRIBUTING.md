# Contributing to ITROPA

## Project Structure

```
itropa-plugin/
├── agents/                    # Research agent definitions
│   ├── knowledge-researcher.md   # Training data mining (Read only)
│   ├── market-researcher.md      # Web market research (WebSearch, WebFetch)
│   └── trend-researcher.md       # Web trend research (WebSearch, WebFetch)
├── commands/                  # User-invocable commands
│   ├── constraints.md            # Builder profile management
│   ├── go.md                     # Main research pipeline
│   ├── setup.md                  # Workspace initialization
│   └── status.md                 # Dashboard + search
├── docs/
│   └── user-guide.md             # End-user documentation
├── mcp/                       # MCP search server
├── skills/                    # Analysis skill definitions
│   ├── business-analysis/
│   ├── chain-analysis/
│   ├── cross-pollination/
│   ├── itropa-workspace/         # Workspace awareness + data schemas
│   ├── mechanism-analysis/
│   ├── pattern-analysis/
│   └── prior-art-analysis/
├── CHANGELOG.md
└── README.md
```

## Agent Conventions

Agents live in `agents/` and follow these conventions:

### YAML Frontmatter

Every agent file starts with YAML frontmatter:

```yaml
---
name: agent-name          # Lowercase, hyphenated
model: sonnet             # Model to use (sonnet for research agents)
tools: WebSearch, WebFetch # Comma-separated tool list
color: green              # Terminal color for identification
---
```

### Naming

- Files: `{purpose}-researcher.md` or `{purpose}-agent.md`
- Names in frontmatter: lowercase, hyphenated

### Tool Access

- Research agents should use **read-only tools** — they gather data, not modify files
- `knowledge-researcher`: `Read` only (mines training data)
- `market-researcher`: `WebSearch`, `WebFetch` (web market data)
- `trend-researcher`: `WebSearch`, `WebFetch` (web trend data)

### Output Format

- Agents return structured JSON
- Every data point includes a `source` field: `knowledgeBased`, `webVerified`, or `webOnly`
- Agents include confidence indicators where appropriate
- Graceful degradation: if tools fail, return empty results with explanatory notes

## Command Conventions

- Commands live in `commands/`
- Each command is a single `.md` file with structured instructions
- Pipeline phases are numbered sequentially
- Error handling should always allow the pipeline to continue (no hard crashes)

## Skill Conventions

- Skills live in `skills/{skill-name}/`
- Each skill has a `SKILL.md` defining its activation triggers and capabilities
- Skills provide analytical frameworks, not pipeline orchestration
