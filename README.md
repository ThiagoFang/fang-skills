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

Two things are specific to where these were written. `linear-issue` ends with a team and key (`Devs`, `DEV`) — swap in yours, or delete the line and answer when Claude asks. Both skills also state that everything written into Linear is in Portuguese; change that to your team's language.
