---
name: linear-seed
description: Use when turning a PR, branch, or written description into a Linear project with its issues, or when a project's description and issues have drifted from the code.
---

# linear-seed

Transformar uma fonte (PR, branch, descrição escrita) em projeto e issues do Linear.

## Verificar antes de registrar

Toda afirmação que vira issue aponta para arquivo, rota ou símbolo conferido na fonte. Achado vindo de outro agente, de revisão automática ou de leitura anterior é suspeito até ser confirmado no código.

Contagem e lista é onde isso falha. "Sete chamadas afetadas" e "três serviços atingidos" viram issue com número errado, e o número errado sobrevive muito depois de quem escreveu ter perdido o contexto. Conferir custa uma busca. Número errado custa uma investigação inteira.

O que não deu para confirmar entra como pergunta, não como fato.

## Campos

Derivar da fonte: título, summary, descrição, decomposição em issues, relações de bloqueio, labels, link para a fonte.

Perguntar, numa chamada só, depois da investigação: prioridade e prazo. Responsável apenas quando a fonte deixa ambíguo. Junto vão as ambiguidades que a leitura levantou, que é a parte que formulário fixo não cobre.

Não preencher: status, estimate, cycle, milestone. Status é o sinal que uma pessoa dá ao resto do time.

## Descrições

A descrição do projeto explica o que mudou estruturalmente e por quê. Estado não entra: as issues já mostram, e a seção de estado envelhece antes do resto do texto.

A issue diz o que falta ou está errado, aponta o lugar concreto, e fecha com o que significa estar pronta.

## Labels

Ler a lista do workspace e escolher dentro dela. Label nova é decisão de vocabulário, então é pergunta, nunca efeito colateral.

## Relações

Bloqueio é relação, não frase na descrição. O Linear ordena por relação e não lê prosa.

Duplicata encontrada é sinalizada na descrição da issue. Fechar ou mesclar issue alheia é decisão de quem toca o projeto.

## Links

O link da fonte vai no projeto. Nas issues, só naquelas que apontam para código específico dentro dela. O mesmo link repetido em toda issue é ruído.

## MCP

`list_projects` e `list_issues` estouram o limite de complexidade do servidor quando `fields` pede muita coisa de uma vez. Pedir só o necessário.

Label de projeto não é criável pelo MCP, só label de issue. As de projeto ficam para a interface.

Em `patch`, para remover uma seção final use `replace` com o texto exato; `replace_range` exige um `to` que permanece no lugar.

Workspace: time `Devs`, key `DEV`.
