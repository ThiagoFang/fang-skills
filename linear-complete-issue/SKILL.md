---
name: linear-complete-issue
description: Use when auditing delivered work against an existing Linear issue, recording verification evidence, and completing it. Do not use for implementation or ordinary issue updates.
---

# linear-complete-issue

Read `workspace.md` next to this file before writing to Linear: it carries the team, the issue key, and the language everything is written in.

Completion is a focused audit of the issue's delivered outcome. Confirm the material acceptance criteria with evidence proportional to the change, reconcile stale issue facts when needed, leave a concise completion record, and move the issue to the team's completed status.

Invoking this skill authorizes updating the target issue, attaching relevant evidence, commenting, and completing it. It does not authorize changing the implementation, creating or publishing commits, merging a PR, or completing related issues.

## Ground truth

Read the issue description, comments, relations, attachments, and current status. Inspect the current code, relevant diff and history, and runtime behavior when it matters. A commit message containing the issue key is a lead, not proof that the commit belongs to the outcome.

Compare the delivered behavior with the material acceptance criteria. Verification depth must be proportional to the issue's risk and surface area: prefer targeted checks for the affected behavior, and use broader repository validation only when the issue or its risk justifies it. Existing implementation evidence may be sufficient when it directly demonstrates a low-risk criterion; do not require exhaustive re-verification by default.

Do not complete when a material criterion is missing, the implementation is partial, a failure attributable to this delivery undermines the outcome, or available evidence contradicts the issue. An unavailable optional check, unrelated suite failure, or unrelated repository problem does not by itself block completion. Keep those findings out of Linear unless they materially affect this issue; report them to the user separately when useful.

## Description

Patch the description when implementation made a factual detail stale: behavior, route, file, symbol, constraint, or acceptance criterion. Preserve the original problem and useful decision context. The description remains the canonical statement of the problem and expected outcome; the completion comment owns the delivery record.

Do not rewrite the description merely to match implementation wording, erase meaningful history, or present an unverified choice as settled. If reconciling it requires a product decision, leave the issue open and ask the question.

## Commits and PRs

Always search for a PR or commit related to the delivered outcome before completing the issue. Check the issue's existing links and comments, the relevant repository history, and available remote PR or commit metadata. Confirm candidates from their actual diffs and relationship to the outcome; an issue key in a title or commit message is only a lead.

When a relevant published PR or commit exists, link it with a stable remote URL. Prefer the PR and canonical merge or squash commit when they represent the durable history; include individual commits only when each adds useful traceability. A local-only SHA is not a link: label it as local if included, do not invent a remote URL, and do not push as part of completion.

The search is required; finding a PR or commit is not. If none exists or none can be verified as relevant, proceed without one and do not treat its absence as a caveat or blocker unless the issue or user explicitly requires published traceability.

Put any verified PR and commit links in the completion comment. Add them as structured issue links only when existing links can be preserved; never replace unrelated links while finalizing.

## Visual evidence (explicit opt-in only)

Do not capture, convert, upload, or attach images unless the user's initial prompt for the current task explicitly requests visual evidence, screenshots, or image attachments. A visual issue does not implicitly activate this workflow, and missing visual evidence does not block completion when it was not explicitly requested.

When explicitly requested, verify the relevant state in the running product and attach an image that demonstrates the criterion. Use an image supplied in the conversation when it is accessible, current, and actually evidences the delivered behavior. Do not attach decorative, redundant, stale, or sensitive images.

Normalize static raster evidence before upload:

- Encode interface screenshots as lossless WebP so text and fine edges remain intact.
- Encode photographic content as high-quality lossy WebP.
- Use the WebP only when it is smaller and visually equivalent; otherwise keep the original.
- Preserve SVG and animated images unless a verified conversion retains their required behavior.

Convert before preparing the Linear upload because MIME type and exact byte size belong to the signed request. Prepare, upload raw bytes with every signed header unchanged, and finalize one attachment before preparing another. Never base64-encode a direct upload.

If requested visual evidence cannot be captured or accessed, do not pretend it was verified. Leave the issue open only when the user or an acceptance criterion makes that evidence a condition of completion; otherwise explain the limitation to the user without adding unrelated commentary to Linear.

## Completion record

Write one concise comment in the workspace language containing:

- what outcome was delivered;
- which checks and runtime behaviors were verified;
- links to the relevant PR and published commits, when available;
- the purpose of each explicitly requested attached visual when it is not self-evident;
- non-blocking caveats only when they are directly relevant to this issue.

State concrete results, not generic claims such as "tests passed" when only a subset ran. Mention only checks, failures, caveats, and repository work that directly evidence or affect this issue. In particular, do not comment on unrelated failures from a broader test, lint, typecheck, build, or pre-submission suite. Surface such failures to the user outside Linear when useful.

Resolve the team's completed status from Linear rather than assuming its name. Submit the reconciled description, attachments, and completion comment before changing status. If the issue is already completed, improve the stale record when requested but do not churn its status.

Completion of this issue does not imply completion of its blockers, blocked issues, parent, children, or related issues.
