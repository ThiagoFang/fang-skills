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

It asks what to install and where, then clones into `~/.fang-skills` and symlinks. Running it again is safe, and `git pull` in the clone updates every install at once.

## Workspace settings

Team, key, and language live in a `workspace.md` inside each skill directory, written by the installer and never versioned.

Edit that file, never the `SKILL.md` — editing a tracked file makes the next `git pull` conflict.
