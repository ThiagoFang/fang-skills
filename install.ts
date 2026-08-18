#!/usr/bin/env bun

import { $ } from "bun";
import { existsSync, lstatSync, readdirSync, realpathSync } from "node:fs";
import { mkdir, readlink, rm, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const CLONE_URL = "git@github.com:ThiagoFang/fang-skills.git";

const HOSTS = [
  { name: "Claude Code", root: join(homedir(), ".claude") },
  { name: "Codex", root: join(homedir(), ".codex") },
];

async function resolveSource() {
  if (existsSync(join(import.meta.dir, ".git"))) {
    return import.meta.dir;
  }

  const fallback = join(homedir(), ".fang-skills");

  if (existsSync(join(fallback, ".git"))) {
    console.log(`Updating ${fallback}`);
    await $`git -C ${fallback} pull --ff-only`.quiet();
    return fallback;
  }

  console.log(`Cloning into ${fallback}`);
  await $`git clone ${CLONE_URL} ${fallback}`.quiet();
  return fallback;
}

function listSkills(source: string) {
  return readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(source, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
}

function pickSkills(available: string[]) {
  console.log("\nSkills:");
  available.forEach((name, index) => console.log(`  ${index + 1}. ${name}`));

  const answer = prompt("Which ones? (numbers, or enter for all)")?.trim();

  if (!answer) {
    return available;
  }

  return answer
    .split(/[\s,]+/)
    .map((token) => available[Number(token) - 1])
    .filter(Boolean);
}

function pickHosts() {
  const installed = HOSTS.filter((host) => existsSync(host.root));

  if (!installed.length) {
    console.error("Neither ~/.claude nor ~/.codex exists. Install one of them first.");
    process.exit(1);
  }

  if (installed.length === 1) {
    console.log(`\nInstalling for ${installed[0].name}, the only one found.`);
    return installed;
  }

  console.log("\nInstall for:");
  installed.forEach((host, index) => console.log(`  ${index + 1}. ${host.name}`));

  const answer = prompt("Which ones? (numbers, or enter for all)")?.trim();

  if (!answer) {
    return installed;
  }

  return answer
    .split(/[\s,]+/)
    .map((token) => installed[Number(token) - 1])
    .filter(Boolean);
}

function askWorkspace() {
  const team = prompt("Linear team name?")?.trim();
  const key = prompt("Linear team key?")?.trim();

  if (!team || !key) {
    console.error("Team and key are required.");
    process.exit(1);
  }

  return { team, key, language: prompt("Language to write in? (English)")?.trim() || "English" };
}

async function linkSkill(name: string, source: string, skillsDir: string) {
  const target = join(skillsDir, name);
  const origin = join(source, name);
  const existing = lstatSync(target, { throwIfNoEntry: false });

  if (existing) {
    if (existing.isSymbolicLink() && realpathSync(target) === origin) {
      console.log(`  ${name}: already linked`);
      return true;
    }

    const current = existing.isSymbolicLink() ? await readlink(target) : "a real directory";

    if (!confirm(`  ${name}: ${target} points at ${current}. Replace it?`)) {
      console.log(`  ${name}: kept, not installed`);
      return false;
    }

    await rm(target, { recursive: true });
  }

  await symlink(origin, target);
  console.log(`  ${name}: linked`);
  return true;
}

async function writeWorkspace(name: string, source: string, values: ReturnType<typeof askWorkspace>) {
  const path = join(source, name, "workspace.md");

  if (existsSync(path)) {
    console.log(`  ${name}: workspace.md kept`);
    return;
  }

  await Bun.write(
    path,
    `# Workspace\n\nTeam: \`${values.team}\`\nKey: \`${values.key}\`\nLanguage for everything written into Linear: ${values.language}\n`,
  );
  console.log(`  ${name}: workspace.md written`);
}

const hosts = pickHosts();

if (!hosts.length) {
  console.error("No host selected.");
  process.exit(1);
}

const source = await resolveSource();
const chosen = pickSkills(listSkills(source));

if (!chosen.length) {
  console.error("No skill selected.");
  process.exit(1);
}

const workspace = askWorkspace();

const installed = new Set<string>();

for (const host of hosts) {
  const skillsDir = join(host.root, "skills");
  await mkdir(skillsDir, { recursive: true });

  console.log(`\n${host.name}`);

  for (const name of chosen) {
    if (await linkSkill(name, source, skillsDir)) {
      installed.add(name);
    }
  }
}

console.log("");

for (const name of installed) {
  await writeWorkspace(name, source, workspace);
}

console.log(`\nDone. Skills live in ${source}; update them with git pull.`);
