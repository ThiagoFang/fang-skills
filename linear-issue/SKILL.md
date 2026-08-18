---
name: linear-issue
description: Use when creating or updating individual Linear issues in a project that already exists.
---

# linear-issue

Uma issue descreve um resultado. Trabalho que se divide em resultados independentes vira issues separadas, ligadas por relação de bloqueio.

O corpo responde três coisas: o que falta ou está errado, o arquivo ou rota concreta, e o que significa estar pronta. Sem as três, quem pegar a issue refaz a investigação do zero.

Verificar no código antes de registrar. Achado repassado por outro agente ou por revisão automática é suspeito até ser confirmado, e contagem é onde isso falha com mais frequência.

Labels saem da lista existente do workspace. Criar label é decisão de vocabulário, então é pergunta.

Status, estimate e cycle não são preenchidos. Prioridade e prazo são perguntados quando não vierem no pedido.

Bloqueio é relação, não frase na descrição.

Duplicata encontrada é sinalizada. Fechar ou mesclar issue alheia é decisão de quem toca o projeto.

Para semear um projeto inteiro a partir de PR ou branch, a skill é `linear-seed`.
