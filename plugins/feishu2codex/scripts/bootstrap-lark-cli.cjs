#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const REQUIRED_VERSION = "1.0.73";
const PACKAGE = `@larksuite/cli@${REQUIRED_VERSION}`;
const isWindows = process.platform === "win32";
const commandSuffix = isWindows ? ".cmd" : "";
const quietEnv = {
  ...process.env,
  LARKSUITE_CLI_NO_UPDATE_NOTIFIER: "1",
  LARKSUITE_CLI_NO_SKILLS_NOTIFIER: "1",
};

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: "utf8",
    env: quietEnv,
    shell: isWindows,
    timeout: options.timeout || 30000,
    windowsHide: true,
  });
}

function globalCliPath() {
  const npm = `npm${commandSuffix}`;
  const result = run(npm, ["prefix", "--global"]);
  if (result.status !== 0) return null;

  const prefix = result.stdout.trim();
  if (!prefix) return null;
  return isWindows
    ? path.join(prefix, "lark-cli.cmd")
    : path.join(prefix, "bin", "lark-cli");
}

function candidateCliPaths() {
  const candidates = [
    process.env.FEISHU2CODEX_LARK_CLI_BIN,
    globalCliPath(),
    `lark-cli${commandSuffix}`,
  ];
  return [...new Set(candidates.filter(Boolean))];
}

function inspectCli() {
  for (const command of candidateCliPaths()) {
    const result = run(command, ["--version"]);
    if (result.status !== 0) continue;
    const match = `${result.stdout}\n${result.stderr}`.match(/\b(\d+\.\d+\.\d+)\b/);
    if (match) return { command, version: match[1] };
  }
  return null;
}

function emitSetupContext(summary) {
  const additionalContext = [
    `Feishu2Codex preflight: ${summary}`,
    "Before any Feishu/Lark operation, invoke $lark-setup and complete app configuration plus browser/device OAuth.",
    "Do not treat the plugin as ready until `lark-cli auth status --json --verify` reports `verified: true`, user status `ready`, and token status `valid`.",
  ].join(" ");

  process.stdout.write(`${JSON.stringify({
    systemMessage: "Feishu/Lark setup requires authorization before use.",
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext,
    },
  })}\n`);
}

function conciseFailure(result) {
  const detail = result.error
    ? result.error.message
    : (result.stderr || result.stdout || "unknown npm error").trim();
  return detail.replace(/\s+/g, " ").slice(-800);
}

function installCli() {
  const npm = `npm${commandSuffix}`;
  return run(
    npm,
    ["install", "--global", "--no-audit", "--no-fund", PACKAGE],
    { timeout: 210000 },
  );
}

function isAuthorized(cli) {
  const result = run(cli.command, ["auth", "status", "--json", "--verify"], {
    timeout: 30000,
  });
  if (result.status !== 0) return false;

  try {
    const status = JSON.parse(result.stdout);
    const user = status.identities && status.identities.user;
    return Boolean(
      status.verified === true &&
      user &&
      user.status === "ready" &&
      user.tokenStatus === "valid",
    );
  } catch (_) {
    return false;
  }
}

function writeReadyMarker() {
  const dataDir = process.env.PLUGIN_DATA;
  if (!dataDir) return;
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, "setup-state.json"),
      `${JSON.stringify({ version: REQUIRED_VERSION, verifiedAt: new Date().toISOString() })}\n`,
      { mode: 0o600 },
    );
  } catch (_) {
    // The marker is only an optimization; setup remains valid without it.
  }
}

function wasRecentlyVerified() {
  const dataDir = process.env.PLUGIN_DATA;
  if (!dataDir) return false;
  try {
    const state = JSON.parse(
      fs.readFileSync(path.join(dataDir, "setup-state.json"), "utf8"),
    );
    const verifiedAt = Date.parse(state.verifiedAt);
    return (
      state.version === REQUIRED_VERSION &&
      Number.isFinite(verifiedAt) &&
      Date.now() - verifiedAt < 6 * 60 * 60 * 1000
    );
  } catch (_) {
    return false;
  }
}

function main() {
  let cli = inspectCli();
  if (!cli || cli.version !== REQUIRED_VERSION) {
    const install = installCli();
    if (install.status !== 0) {
      emitSetupContext(
        `automatic installation of ${PACKAGE} failed: ${conciseFailure(install)}`,
      );
      return;
    }
    cli = inspectCli();
  }

  if (!cli || cli.version !== REQUIRED_VERSION) {
    emitSetupContext(`required lark-cli ${REQUIRED_VERSION} is not available after installation`);
    return;
  }

  if (wasRecentlyVerified()) return;

  if (!isAuthorized(cli)) {
    emitSetupContext(`lark-cli ${REQUIRED_VERSION} is installed, but user OAuth is incomplete or invalid`);
    return;
  }

  writeReadyMarker();
}

main();
