#!/usr/bin/env node
/**
 * Sync .env.local → Vercel (production). Node avoids bash/Terminal hang issues.
 * Usage: node scripts/sync-env-to-vercel.mjs [production|development|all]
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENV_FILE = process.env.ENV_FILE ?? path.join(ROOT, ".env.local");
const ENV_EXAMPLE = path.join(ROOT, ".env.example");
const TARGET = process.argv[2] ?? "production";
const TIMEOUT_MS = 90_000;

const ENVS =
  TARGET === "all"
    ? ["production", "development"]
    : TARGET === "development"
      ? ["development"]
      : ["production"];

function readEnvLocal() {
  const text = fs.readFileSync(ENV_FILE, "utf8");
  const map = new Map();
  for (const line of text.split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    map.set(key, val);
  }
  return map;
}

function exampleKeys() {
  return fs
    .readFileSync(ENV_EXAMPLE, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=")[0].trim())
    .filter(Boolean);
}

function runVercel(args, stdin) {
  return new Promise((resolve) => {
    const child = spawn("vercel", args, {
      cwd: ROOT,
      env: { ...process.env, CI: "1", TERM: "dumb" },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let out = "";
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({ code: 124, out: out + "\n(timed out after 90s)\n" });
    }, TIMEOUT_MS);
    child.stdout.on("data", (d) => {
      out += d;
    });
    child.stderr.on("data", (d) => {
      out += d;
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? 1, out });
    });
    if (stdin) child.stdin.write(stdin);
    child.stdin.end();
  });
}

function succeeded(output) {
  return /Updated|Overrode|Added|Saved/.test(output);
}

async function syncKey(key, value, env) {
  const sensitive = env === "production" ? ["--sensitive"] : [];
  const base = ["--yes", "--non-interactive", ...sensitive];

  process.stdout.write(`→ ${key} (${env}) ... `);

  let { out } = await runVercel(
    ["env", "update", key, env, ...base],
    value,
  );
  if (succeeded(out)) {
    console.log("ok");
    return true;
  }

  ({ out } = await runVercel(
    ["env", "add", key, env, "--force", ...base],
    value,
  ));
  if (succeeded(out)) {
    console.log("ok");
    return true;
  }

  console.log("failed");
  console.log(out.split("\n").slice(-8).join("\n"));
  return false;
}

async function main() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error(`Error: ${ENV_FILE} not found`);
    process.exit(1);
  }
  const values = readEnvLocal();
  console.log(`Syncing to Vercel (${ENVS.join(", ")})...\n`);

  let synced = 0;
  for (const key of exampleKeys()) {
    const value = values.get(key);
    if (value === undefined) {
      console.log(`⊘ skip ${key} (not set in .env.local)`);
      continue;
    }
    if (!value) {
      console.log(`⊘ skip ${key} (empty)`);
      continue;
    }
    for (const env of ENVS) {
      if (!(await syncKey(key, value, env))) process.exit(1);
    }
    synced++;
  }

  console.log(`\nDone — ${synced} variable(s) synced.`);
  console.log("Redeploy: vercel --prod");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
