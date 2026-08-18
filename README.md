# fang-skills

Skills do Claude Code para trabalhar no Linear.

| Skill | Quando |
|---|---|
| `linear-seed` | Transformar uma PR, branch ou descrição escrita em projeto com issues, ou realinhar um projeto que ficou defasado do código. |
| `linear-issue` | Criar ou atualizar issues avulsas em um projeto que já existe. |

As duas exigem o MCP do Linear conectado (`claude mcp add`).

## Instalar

```sh
git clone git@github.com:ThiagoFang/fang-skills.git ~/fang-skills
ln -s ~/fang-skills/linear-seed  ~/.claude/skills/linear-seed
ln -s ~/fang-skills/linear-issue ~/.claude/skills/linear-issue
```

Symlink em vez de cópia para que `git pull` atualize as skills em uso. Para valer só em um projeto, o destino é `.claude/skills/` do repositório.

Depois, `/linear-seed` e `/linear-issue` ficam disponíveis, e o Claude também as carrega sozinho quando a tarefa bate com a descrição.

## Adaptar ao seu workspace

`linear-seed` termina com o time e a key do workspace onde foi escrita (`Devs`, `DEV`). Troque pelos seus, ou apague a linha e responda quando o Claude perguntar.
