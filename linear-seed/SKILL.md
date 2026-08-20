---
name: linear-seed
description: Use when turning a PR, branch, or written description into a Linear project with its issues, or when a project's description and issues have drifted from the code.
---

# linear-seed

Turn a source (PR, branch, written description) into a Linear project and its issues.

Each issue follows `linear-issue`, which owns the issue rules: verification, labels, fields, blocking, duplicates, and the MCP traps. What is left here belongs to the project.

Read `workspace.md` next to this file before writing to Linear: it carries the team, the project key, and the language everything is written in.

## Fields

Derive from the source: title, summary, description, the split into issues, blocking relations, labels, link to the source.

Ask, in a single call, after the investigation: priority and deadline. Assignee only when the source leaves it ambiguous. The ambiguities the read turned up go in the same call, and that is the part a fixed form does not cover.

Do not fill status or milestone.

## Description

The project description explains what changed structurally and why. Current state stays out: the issues already show it, and a state section ages before the rest of the text.

## Links

The source link goes on the project. On issues, only the ones pointing at specific code inside it.

## MCP

Project labels cannot be created through the MCP, only issue labels. Project ones are left to the interface.

## Completion

When delivered work is ready to be audited and closed, use `linear-complete-issue`. This skill does not verify delivery or complete issues.
