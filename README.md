# fang-skills

Claude Code skills for working in Linear.

| Skill | When |
|---|---|
| `linear-seed` | Turn a PR, branch, or written description into a project with its issues, or realign a project that has drifted from the code. |
| `linear-issue` | Create or update standalone issues in a project that already exists. |

Both need the Linear MCP connected (`claude mcp add`).

## Install

```sh
git clone git@github.com:ThiagoFang/fang-skills.git ~/fang-skills
ln -s ~/fang-skills/linear-seed  ~/.claude/skills/linear-seed
ln -s ~/fang-skills/linear-issue ~/.claude/skills/linear-issue
```

Symlink rather than copy so `git pull` updates the skills in use. To scope them to a single project, the target is that repository's `.claude/skills/`.

`/linear-seed` and `/linear-issue` then become available, and Claude also loads them on its own when the task matches the description.

## Adapt to your workspace

Each skill reads a `workspace.md` in its own directory for the team, the key, and the language it writes in. That file is not versioned, so copy the template into every skill you installed:

```sh
cp ~/fang-skills/workspace.example.md ~/fang-skills/linear-issue/workspace.md
```

Edit the copy, never the `SKILL.md` — editing a tracked file makes the next `git pull` conflict.
