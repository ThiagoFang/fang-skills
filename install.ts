#!/usr/bin/env bun

import * as p from "@clack/prompts";
import { $ } from "bun";
import { existsSync, lstatSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { mkdir, readlink, rm, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const CLONE_URL = "https://github.com/ThiagoFang/fang-skills.git";

const FALLBACK = { team: "Devs", key: "DEV", language: "Portuguese" };

const LANGUAGES = ["Portuguese", "English", "Spanish", "French", "German"];

const HOSTS = [
  { name: "Claude Code", root: join(homedir(), ".claude") },
  { name: "Codex", root: join(homedir(), ".codex") },
];

function unwrap<T>(value: T | symbol) {
  if (p.isCancel(value)) {
    p.cancel("Nothing installed.");
    process.exit(0);
  }

  return value as T;
}

async function resolveSource() {
  if (existsSync(join(import.meta.dir, ".git"))) {
    return import.meta.dir;
  }

  const fallback = join(homedir(), ".fang-skills");
  const spinner = p.spinner();

  if (existsSync(join(fallback, ".git"))) {
    spinner.start(`Updating ${fallback}`);
    await $`git -C ${fallback} pull --ff-only`.quiet();
    spinner.stop(`Updated ${fallback}`);
    return fallback;
  }

  spinner.start(`Cloning into ${fallback}`);
  await $`git clone ${CLONE_URL} ${fallback}`.quiet();
  spinner.stop(`Cloned into ${fallback}`);
  return fallback;
}

function listSkills(source: string) {
  return readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(source, entry.name, "SKILL.md")))
    .map((entry) => ({
      value: entry.name,
      label: entry.name,
      hint: readFileSync(join(source, entry.name, "SKILL.md"), "utf8").match(/^description:\s*(.+)$/m)?.[1],
    }))
    .sort((a, b) => a.value.localeCompare(b.value));
}

function needsWorkspace(source: string, name: string) {
  return readFileSync(join(source, name, "SKILL.md"), "utf8").includes("workspace.md");
}

function readDefaults(source: string, skills: string[]) {
  for (const name of skills) {
    const path = join(source, name, "workspace.md");

    if (!existsSync(path)) {
      continue;
    }

    const text = readFileSync(path, "utf8");

    return {
      team: text.match(/^Team:\s*`?([^`\n]+)`?$/m)?.[1] ?? FALLBACK.team,
      key: text.match(/^Key:\s*`?([^`\n]+)`?$/m)?.[1] ?? FALLBACK.key,
      language: text.match(/^Language[^:]*:\s*(.+)$/m)?.[1] ?? FALLBACK.language,
    };
  }

  return FALLBACK;
}

async function pickHosts() {
  const installed = HOSTS.filter((host) => existsSync(host.root));

  if (!installed.length) {
    p.cancel("Neither ~/.claude nor ~/.codex exists. Install one of them first.");
    process.exit(1);
  }

  if (installed.length === 1) {
    p.log.info(`Installing for ${installed[0].name}, the only one found.`);
    return installed;
  }

  const chosen = unwrap(
    await p.multiselect({
      message: "Install for",
      options: installed.map((host) => ({ value: host.root, label: host.name })),
      initialValues: installed.map((host) => host.root),
    }),
  );

  return installed.filter((host) => chosen.includes(host.root));
}

async function askLanguage(initial: string) {
  const options = LANGUAGES.includes(initial) ? LANGUAGES : [initial, ...LANGUAGES];

  const chosen = unwrap(
    await p.select({
      message: "Language to write in",
      options: [...options.map((value) => ({ value, label: value })), { value: "", label: "Other" }],
      initialValue: initial,
    }),
  );

  if (chosen) {
    return chosen;
  }

  return unwrap(
    await p.text({
      message: "Which language",
      validate: (value) => (value.trim() ? undefined : "Required."),
    }),
  ).trim();
}

async function askWorkspace(defaults: ReturnType<typeof readDefaults>) {
  return {
    team: unwrap(
      await p.text({
        message: "Linear team name",
        initialValue: defaults.team,
        validate: (value) => (value.trim() ? undefined : "Required."),
      }),
    ).trim(),
    key: unwrap(
      await p.text({
        message: "Linear team key",
        initialValue: defaults.key,
        validate: (value) => (value.trim() ? undefined : "Required."),
      }),
    ).trim(),
    language: await askLanguage(defaults.language),
  };
}

async function linkSkill(name: string, source: string, skillsDir: string) {
  const target = join(skillsDir, name);
  const origin = join(source, name);
  const existing = lstatSync(target, { throwIfNoEntry: false });

  if (existing) {
    if (existing.isSymbolicLink() && realpathSync(target) === origin) {
      p.log.step(`${name}: already linked`);
      return true;
    }

    const current = existing.isSymbolicLink() ? await readlink(target) : "a real directory";

    if (!unwrap(await p.confirm({ message: `${name} already points at ${current}. Replace it?`, initialValue: false }))) {
      p.log.warn(`${name}: kept, not installed`);
      return false;
    }

    await rm(target, { recursive: true });
  }

  await symlink(origin, target);
  p.log.step(`${name}: linked`);
  return true;
}

async function writeWorkspace(name: string, source: string, values: Awaited<ReturnType<typeof askWorkspace>>) {
  const path = join(source, name, "workspace.md");

  if (existsSync(path)) {
    return;
  }

  await Bun.write(
    path,
    `# Workspace\n\nTeam: \`${values.team}\`\nKey: \`${values.key}\`\nLanguage for everything written into Linear: ${values.language}\n`,
  );
  p.log.step(`${name}: workspace.md written`);
}

p.intro("fang-skills");

const hosts = await pickHosts();

if (!hosts.length) {
  p.cancel("No host selected.");
  process.exit(1);
}

const source = await resolveSource();
const available = listSkills(source);

const chosen = unwrap(
  await p.multiselect({
    message: "Skills",
    options: available,
    initialValues: available.map((skill) => skill.value),
  }),
);

const configurable = chosen.filter((name) => needsWorkspace(source, name));
const workspace = configurable.length ? await askWorkspace(readDefaults(source, configurable)) : undefined;
const installed = new Set<string>();

for (const host of hosts) {
  const skillsDir = join(host.root, "skills");
  await mkdir(skillsDir, { recursive: true });

  p.log.info(host.name);

  for (const name of chosen) {
    if (await linkSkill(name, source, skillsDir)) {
      installed.add(name);
    }
  }
}

if (workspace) {
  for (const name of configurable.filter((name) => installed.has(name))) {
    await writeWorkspace(name, source, workspace);
  }
}

p.outro(`Skills live in ${source}. Update them with git pull.`);
