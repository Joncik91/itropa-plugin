#!/usr/bin/env node

/**
 * ITROPA MCP Bootstrap
 *
 * Auto-installs dependencies if missing or outdated, then starts the MCP server.
 * This solves the chicken-and-egg problem: the MCP server needs
 * node_modules but there's no postinstall hook in the plugin system.
 */

import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const betterSqlite = join(__dirname, "node_modules", "better-sqlite3");

if (!existsSync(betterSqlite)) {
  try {
    process.stderr.write("ITROPA: Installing MCP server dependencies...\n");
    execSync("npm install --production", { cwd: __dirname, stdio: "pipe" });
    process.stderr.write("ITROPA: Dependencies installed.\n");
  } catch (err) {
    process.stderr.write(`ITROPA: Failed to install dependencies: ${err.message}\n`);
    process.exit(1);
  }
}

// Now load and run the actual server
await import("./server.js");
