---
name: linear-seed
description: Use when turning a PR, branch, or written description into a Linear project with its issues, or when a project's description and issues have drifted from the code.
---

# linear-seed

Transformar uma fonte (PR, branch, descrição escrita) em projeto e issues do Linear.

Cada issue segue `linear-issue`, que é a dona das regras de issue: verificação, labels, campos, bloqueio, duplicata e as armadilhas do MCP. Aqui fica o que é do projeto.

## Campos

Derivar da fonte: título, summary, descrição, decomposição em issues, relações de bloqueio, labels, link para a fonte.

Perguntar, numa chamada só, depois da investigação: prioridade e prazo. Responsável apenas quando a fonte deixa ambíguo. Junto vão as ambiguidades que a leitura levantou, que é a parte que formulário fixo não cobre.

Não preencher status nem milestone.

## Descrição

A descrição do projeto explica o que mudou estruturalmente e por quê. Estado não entra: as issues já mostram, e a seção de estado envelhece antes do resto do texto.

## Links

O link da fonte vai no projeto. Nas issues, só naquelas que apontam para código específico dentro dela.

## MCP

Label de projeto não é criável pelo MCP, só label de issue. As de projeto ficam para a interface.
