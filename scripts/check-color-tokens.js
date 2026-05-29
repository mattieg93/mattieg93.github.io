#!/usr/bin/env node
/**
 * Color Token Compliance Check
 *
 * Scans src/ for hardcoded color literals in .tsx, .ts, and .css files.
 * Reports violations as warnings. Non-blocking — exits 0 always.
 *
 * Allowlisted:
 *   - Lines that ARE CSS variable definitions (token declarations in globals.css)
 *   - The globals.css file itself (it IS the token source of truth)
 *   - Inline comments
 *
 * Usage:
 *   node scripts/check-color-tokens.js
 *   npm run check:colors
 */

const fs   = require("fs");
const path = require("path");

const SRC_DIR    = path.join(__dirname, "..", "src");
const EXTENSIONS = new Set([".tsx", ".ts", ".css"]);

const COLOR_PATTERNS = [
  // Match only valid CSS hex formats: 3, 6, or 8 hex digits.
  // 4- and 5-digit strings (e.g. '#1843' in badge text) are NOT valid CSS colors and must not be flagged.
  { regex: /#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/, label: "hex literal" },
  { regex: /\brgb\s*\(/,             label: "rgb() literal" },
  { regex: /\brgba\s*\(/,            label: "rgba() literal" },
  { regex: /\bhsl\s*\(/,             label: "hsl() literal" },
  { regex: /\bhsla\s*\(/,            label: "hsla() literal" },
];

// Lines/files we explicitly allow to contain raw color values
const FILE_ALLOWLIST = [
  "globals.css",     // palette token definitions live here
];

const LINE_ALLOWLIST = [
  /^\s*(\/\/|\/\*|\*)/,             // comment lines
  /--[a-z][\w-]+\s*:/,              // CSS custom property declarations
];

function isAllowed(relPath, line) {
  if (FILE_ALLOWLIST.some((f) => relPath.endsWith(f))) return true;
  if (LINE_ALLOWLIST.some((p) => p.test(line))) return true;
  return false;
}

function scanFile(filePath) {
  const relPath  = path.relative(process.cwd(), filePath);
  const lines    = fs.readFileSync(filePath, "utf8").split("\n");
  const warnings = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isAllowed(relPath, line)) continue;

    for (const { regex, label } of COLOR_PATTERNS) {
      if (regex.test(line)) {
        warnings.push({
          file:    relPath,
          lineNum: i + 1,
          label,
          content: line.trim(),
        });
        break; // one warning per line is enough
      }
    }
  }

  return warnings;
}

function walkDir(dir) {
  const files   = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      files.push(...walkDir(fullPath));
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const files       = walkDir(SRC_DIR);
const allWarnings = [];

for (const file of files) {
  allWarnings.push(...scanFile(file));
}

if (allWarnings.length === 0) {
  console.log("✓ color-tokens: no hardcoded color literals found outside token definitions.");
  process.exit(0);
}

console.warn(`\n⚠  color-tokens: ${allWarnings.length} hardcoded color literal(s) found:\n`);

for (const w of allWarnings) {
  console.warn(`  ${w.file}:${w.lineNum}  [${w.label}]`);
  console.warn(`    ${w.content}\n`);
}

console.warn("Fix: replace with a CSS token (e.g. var(--color-action)) instead of a raw value.");
console.warn("Note: this is a warning — the build will continue.\n");

process.exit(0); // always non-blocking
