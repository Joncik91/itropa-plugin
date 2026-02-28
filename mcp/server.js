#!/usr/bin/env node

/**
 * ITROPA MCP Search Server
 *
 * Provides full-text search across ITROPA research data using SQLite FTS5.
 * Runs as a stdio MCP server registered via .mcp.json.
 *
 * Tools:
 *   search_research  — FTS5 search across all research content
 *   find_connections  — Read graph.json for shared mechanisms/themes
 *   get_timeline      — Read runs.json + digests for a need
 *   reindex           — Rebuild SQLite index from all JSON files
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import Database from "better-sqlite3";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Walk a directory tree, yield absolute paths that match a test. */
function walkSync(dir, test) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkSync(full, test));
    } else if (test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/** Safely read + parse JSON, return null on failure. */
function readJSON(path) {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
}

/** Flatten nested object values into a single string for indexing. */
function flattenValues(obj, depth = 0) {
  if (depth > 8) return "";
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return obj;
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (Array.isArray(obj)) return obj.map((v) => flattenValues(v, depth + 1)).join(" ");
  if (typeof obj === "object") {
    return Object.values(obj)
      .map((v) => flattenValues(v, depth + 1))
      .join(" ");
  }
  return "";
}

/**
 * Extract indexable items from a research JSON file.
 * Returns array of { need, runDate, fileType, itemId, title, content, tags }.
 */
function extractItems(filePath, need, runDate) {
  const data = readJSON(filePath);
  if (!data) return [];

  const fileName = filePath.split(/[\\/]/).pop();
  const fileType = fileName.replace(".json", "");
  const items = [];

  if (fileType === "need") {
    items.push({
      need,
      runDate,
      fileType: "need",
      itemId: data.id || need,
      title: data.name || need,
      content: flattenValues(data),
      tags: (data.relatedNeeds || []).join(","),
    });
  } else if (fileType === "digest") {
    items.push({
      need,
      runDate,
      fileType: "digest",
      itemId: `${need}-digest-${runDate}`,
      title: `${data.need || need} digest ${runDate}`,
      content: flattenValues(data),
      tags: (data.tags || []).join(","),
    });
  } else if (fileType === "mechanisms" || fileType === "deep-dives" || fileType === "app-concepts" || fileType === "cross-pollinations") {
    if (typeof data === "object" && !Array.isArray(data)) {
      for (const [id, entry] of Object.entries(data)) {
        if (id === "_meta") continue;
        const title =
          entry.name ||
          entry.coreMechanism ||
          entry.tagline ||
          id;
        const tags = [];
        if (entry.tags) tags.push(...entry.tags);
        if (entry.buildRecommendation?.verdict) tags.push(entry.buildRecommendation.verdict);
        if (entry.formFactor) tags.push(entry.formFactor);
        if (entry.effortEstimate) tags.push(entry.effortEstimate);
        items.push({
          need,
          runDate,
          fileType,
          itemId: id,
          title: String(title),
          content: flattenValues(entry),
          tags: tags.join(","),
        });
      }
    }
  } else {
    items.push({
      need,
      runDate,
      fileType,
      itemId: `${need}-${fileType}-${runDate}`,
      title: `${need} ${fileType}`,
      content: flattenValues(data),
      tags: "",
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------

let db;
let researchDir;

function initDB() {
  const dbPath = join(researchDir, ".search.db");

  // Try to open existing db
  if (existsSync(dbPath)) {
    try {
      db = new Database(dbPath);
      // Verify the FTS table exists
      db.prepare("SELECT COUNT(*) FROM research_fts").get();
      return;
    } catch {
      // Corrupted or missing table — rebuild
      try { db.close(); } catch { /* ignore */ }
    }
  }

  // Create new db
  db = new Database(dbPath);
  createTables();
  indexAll();
}

function createTables() {
  db.exec(`DROP TABLE IF EXISTS research_fts;`);
  db.exec(`
    CREATE VIRTUAL TABLE research_fts USING fts5(
      need, run_date, file_type, item_id, title, content, tags,
      tokenize='porter unicode61'
    );
  `);
}

/**
 * Scan all research JSON files and insert into FTS table.
 * Handles both v2 (timestamped dirs) and v1 (flat) structures.
 */
function indexAll() {
  if (!existsSync(researchDir)) return;

  const insert = db.prepare(
    `INSERT INTO research_fts (need, run_date, file_type, item_id, title, content, tags)
     VALUES (?, ?, ?, ?, ?, ?, ?);`
  );

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(item.need, item.runDate, item.fileType, item.itemId, item.title, item.content, item.tags);
    }
  });

  const allItems = [];

  for (const needEntry of readdirSync(researchDir, { withFileTypes: true })) {
    if (!needEntry.isDirectory()) continue;
    const needSlug = needEntry.name;
    const needDir = join(researchDir, needSlug);

    for (const child of readdirSync(needDir, { withFileTypes: true })) {
      if (child.isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(child.name)) {
        // v2 timestamped run directory
        const runDate = child.name;
        const runDir = join(needDir, runDate);
        const jsonFiles = walkSync(runDir, (f) => f.endsWith(".json"));
        for (const fp of jsonFiles) {
          allItems.push(...extractItems(fp, needSlug, runDate));
        }
      } else if (child.isFile() && child.name.endsWith(".json") && child.name !== "runs.json") {
        // v1 flat file
        const fp = join(needDir, child.name);
        allItems.push(...extractItems(fp, needSlug, "legacy"));
      }
    }
  }

  insertMany(allItems);
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "itropa-search",
  version: "2.0.0",
});

// --- search_research ---
server.tool(
  "search_research",
  "Full-text search across all ITROPA research content. Returns matching items with context snippets.",
  {
    query: z.string().describe("Search query (supports FTS5 syntax: AND, OR, NOT, phrases)"),
    need: z.string().optional().describe("Filter to a specific need slug"),
    type: z.string().optional().describe("Filter by file type: need, mechanisms, deep-dives, app-concepts, cross-pollinations, digest"),
    limit: z.number().optional().default(20).describe("Max results (default 20)"),
  },
  async ({ query, need, type, limit }) => {
    if (!db) {
      return { content: [{ type: "text", text: "Search index not initialized. Run reindex first." }] };
    }

    limit = Math.min(limit || 20, 100);

    let sql = `
      SELECT need, run_date, file_type, item_id, title,
             snippet(research_fts, 5, '>>>', '<<<', '...', 40) AS snippet,
             tags, rank
      FROM research_fts
      WHERE research_fts MATCH ?
    `;
    const params = [query];

    if (need) {
      sql += ` AND need = ?`;
      params.push(need);
    }
    if (type) {
      sql += ` AND file_type = ?`;
      params.push(type);
    }

    sql += ` ORDER BY rank LIMIT ?`;
    params.push(limit);

    try {
      const rows = db.prepare(sql).all(...params);

      if (rows.length === 0) {
        return { content: [{ type: "text", text: `No results found for "${query}".` }] };
      }

      const results = rows.map((row) => ({
        need: row.need,
        runDate: row.run_date,
        fileType: row.file_type,
        itemId: row.item_id,
        title: row.title,
        snippet: row.snippet,
        tags: row.tags ? row.tags.split(",").filter(Boolean) : [],
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ query, resultCount: results.length, results }, null, 2),
          },
        ],
      };
    } catch (err) {
      return { content: [{ type: "text", text: `Search error: ${err.message}` }] };
    }
  }
);

// --- find_connections ---
server.tool(
  "find_connections",
  "Find cross-need connections from graph.json. Returns shared mechanisms, themes, and industry overlaps.",
  {
    need_a: z.string().describe("First need slug"),
    need_b: z.string().optional().describe("Second need slug (if omitted, returns all connections for need_a)"),
  },
  async ({ need_a, need_b }) => {
    const graphPath = join(researchDir, "graph.json");
    const graph = readJSON(graphPath);

    if (!graph) {
      return { content: [{ type: "text", text: "No graph.json found. Run a research pipeline to generate cross-need connections." }] };
    }

    let connections = graph.connections || [];

    connections = connections.filter(
      (c) => c.source?.need === need_a || c.target?.need === need_a
    );

    if (need_b) {
      connections = connections.filter(
        (c) =>
          (c.source?.need === need_a && c.target?.need === need_b) ||
          (c.source?.need === need_b && c.target?.need === need_a)
      );
    }

    const themes = {};
    if (graph.themes) {
      for (const [theme, data] of Object.entries(graph.themes)) {
        const relevant = (data.occurrences || []).filter(
          (o) => o.need === need_a || o.need === need_b
        );
        if (relevant.length > 0) {
          themes[theme] = { ...data, occurrences: relevant };
        }
      }
    }

    const result = {
      need_a,
      need_b: need_b || null,
      connectionCount: connections.length,
      connections,
      themes,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// --- get_timeline ---
server.tool(
  "get_timeline",
  "Get the research timeline for a need: all runs with their digest summaries.",
  {
    need: z.string().describe("Need slug (e.g., 'status', 'belonging')"),
  },
  async ({ need }) => {
    const needDir = join(researchDir, need);
    if (!existsSync(needDir)) {
      return { content: [{ type: "text", text: `No research found for need "${need}".` }] };
    }

    const runsPath = join(needDir, "runs.json");
    const runs = readJSON(runsPath);

    const digests = [];
    for (const entry of readdirSync(needDir, { withFileTypes: true })) {
      if (entry.isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(entry.name)) {
        const digestPath = join(needDir, entry.name, "digest.json");
        const digest = readJSON(digestPath);
        if (digest) {
          digests.push({ runDate: entry.name, ...digest });
        }
      }
    }

    digests.sort((a, b) => b.runDate.localeCompare(a.runDate));

    const result = {
      need,
      totalRuns: runs?.runs?.length || digests.length,
      runs: runs?.runs || [],
      digests,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// --- reindex ---
server.tool(
  "reindex",
  "Rebuild the search index from all research JSON files. Use after manual edits or migration.",
  {},
  async () => {
    try {
      createTables();
      indexAll();

      const row = db.prepare("SELECT COUNT(*) as cnt FROM research_fts").get();
      const count = row?.cnt || 0;

      return {
        content: [
          {
            type: "text",
            text: `Reindex complete. ${count} items indexed across all research data.`,
          },
        ],
      };
    } catch (err) {
      return { content: [{ type: "text", text: `Reindex error: ${err.message}` }] };
    }
  }
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  const cwd = process.cwd();
  researchDir = join(cwd, "research");

  if (!existsSync(researchDir)) {
    const candidates = [
      join(cwd, "research"),
      join(cwd, "..", "research"),
      join(cwd, "..", "..", "research"),
    ];
    for (const candidate of candidates) {
      if (existsSync(candidate)) {
        researchDir = resolve(candidate);
        break;
      }
    }
  }

  initDB();

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`ITROPA MCP server error: ${err.message}\n`);
  process.exit(1);
});
