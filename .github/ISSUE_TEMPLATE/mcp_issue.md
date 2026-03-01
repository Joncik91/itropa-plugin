---
name: MCP Search Issue
about: Problems with the MCP search server (FTS5, indexing, connections)
title: '[MCP] '
labels: mcp
assignees: ''
---

## Describe the issue

What's wrong with the MCP search server?

## MCP server status

- [ ] Server shows as "Active" in Claude Code
- [ ] Server shows as "Failed" in Claude Code
- [ ] Server was never detected

## Steps to reproduce

1. ...
2. ...

## Error output

```
Paste any error messages here
```

## Environment

- **Claude Code version**: (`claude --version`)
- **OS**: Windows / macOS / Linux
- **Node.js version**: (`node --version`)
- **Does `research/` directory exist?**: Yes / No
- **Can you run `cd mcp && node server.js` manually?**: Yes / No (paste error)

## Dependency check

Run this and paste the output:

```bash
ls -la <plugin-cache-path>/mcp/node_modules/better-sqlite3/
```
