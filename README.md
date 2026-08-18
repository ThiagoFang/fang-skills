# fang-skills

Skills for working in Linear, for Claude Code and Codex.

| Skill | When |
|---|---|
| `linear-seed` | Turn a PR, branch, or written description into a project with its issues, or realign a project that has drifted from the code. |
| `linear-issue` | Create or update standalone issues in a project that already exists. |

Both need the Linear MCP connected (`claude mcp add`).

## Install

```sh
bunx github:ThiagoFang/fang-skills
```

It asks which skills to install, whether they go to Claude Code, Codex, or both, and for your Linear team, key, and language. Then it clones into `~/.fang-skills` and symlinks the chosen skills into `~/.claude/skills`, `~/.codex/skills`, or both. Only hosts already on the machine are offered. Run it from an existing clone and it uses that clone instead. Running it again is safe: links already in place and answers already given are left alone.

Symlinks rather than copies, so `git pull` in the clone updates every install at once.

`/linear-seed` and `/linear-issue` then become available, and the agent also loads them on its own when the task matches the description.

To scope a skill to a single project instead, symlink it into that repository's `.claude/skills/`.

## Workspace settings

Team, key, and language live in a `workspace.md` inside each skill directory, written by the installer and never versioned. `workspace.example.md` is the template if you would rather write it yourself.

Edit that file, never the `SKILL.md` — editing a tracked file makes the next `git pull` conflict.
