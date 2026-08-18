---
name: linear-issue
description: Use when creating or updating individual Linear issues in a project that already exists.
---

# linear-issue

Issue titles and descriptions are written in Portuguese. The team reads them.

An issue describes one outcome. Work that splits into independent outcomes becomes separate issues, tied by a blocking relation.

The body answers three things: what is missing or wrong, the concrete file or route, and what done means.

Every claim that becomes an issue points at a file, route, or symbol checked in the code. A finding relayed by another agent, by automated review, or by an earlier read is suspect until confirmed. Counts and lists are where this fails: "seven affected callers" and "three services hit" become an issue with the wrong number, and the wrong number outlives whoever wrote it.

What could not be confirmed goes in as a question, not as a fact.

Labels come from the workspace's existing list. A new label is a vocabulary decision, so it is a question, never a side effect.

Status, estimate, and cycle are not filled in. Status is the signal a person gives the rest of the team. Priority and deadline are asked when the request does not carry them.

Blocking is a relation, not a sentence in the description. Linear orders by relation and does not read prose.

A duplicate that turns up is flagged in the issue description. Closing or merging someone else's issue is a decision for whoever owns the project.

## MCP

`list_issues` and `list_projects` blow past the server's complexity limit when `fields` asks for too much at once. Ask for only what is needed.

In `patch`, to remove a trailing section use `replace` with the exact text; `replace_range` requires a `to` that stays in place.

Workspace: team `Devs`, key `DEV`.

## Whole projects

To seed a project and its issues from a PR or branch, the skill is `linear-seed`.
