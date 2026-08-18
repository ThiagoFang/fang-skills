---
name: linear-issue
description: Use when creating or updating individual Linear issues in a project that already exists.
---

# linear-issue

Uma issue descreve um resultado. Trabalho que se divide em resultados independentes vira issues separadas, ligadas por relação de bloqueio.

O corpo responde três coisas: o que falta ou está errado, o arquivo ou rota concreta, e o que significa estar pronta.

Toda afirmação que vira issue aponta para arquivo, rota ou símbolo conferido no código. Achado vindo de outro agente, de revisão automática ou de leitura anterior é suspeito até ser confirmado. Contagem e lista é onde isso falha: "sete chamadas afetadas" e "três serviços atingidos" viram issue com número errado, e o número errado sobrevive muito depois de quem escreveu ter perdido o contexto.

O que não deu para confirmar entra como pergunta, não como fato.

Labels saem da lista existente do workspace. Label nova é decisão de vocabulário, então é pergunta, nunca efeito colateral.

Status, estimate e cycle não são preenchidos. Status é o sinal que uma pessoa dá ao resto do time. Prioridade e prazo são perguntados quando não vierem no pedido.

Bloqueio é relação, não frase na descrição. O Linear ordena por relação e não lê prosa.

Duplicata encontrada é sinalizada na descrição da issue. Fechar ou mesclar issue alheia é decisão de quem toca o projeto.

## MCP

`list_issues` e `list_projects` estouram o limite de complexidade do servidor quando `fields` pede muita coisa de uma vez. Pedir só o necessário.

Em `patch`, para remover uma seção final use `replace` com o texto exato; `replace_range` exige um `to` que permanece no lugar.

Workspace: time `Devs`, key `DEV`.

## Projeto inteiro

Para semear projeto e issues a partir de PR ou branch, a skill é `linear-seed`.
