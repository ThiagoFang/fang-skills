---
name: linear-complete-issue
description: Use when auditing delivered work against an existing Linear issue, recording verification evidence, and completing it. Do not use for implementation or ordinary issue updates.
---

# linear-complete-issue

Read `workspace.md` next to this file before writing to Linear: it carries the team, the issue key, and the language everything is written in.

Completion is an audit, not a status change. Confirm the delivered outcome against the issue, reconcile stale facts, leave a durable completion record, and only then move the issue to the team's completed status.

Invoking this skill authorizes updating the target issue, attaching relevant evidence, commenting, and completing it. It does not authorize changing the implementation, creating or publishing commits, merging a PR, or completing related issues.

## Ground truth

Read the issue description, comments, relations, attachments, and current status. Inspect the current code, relevant diff and history, and runtime behavior when it matters. A commit message containing the issue key is a lead, not proof that the commit belongs to the outcome.

Compare the delivered behavior with every material acceptance criterion. Verification depth follows the risk and surface area of the change. Use the repository's own validation commands and distinguish failures caused by the delivery from unrelated pre-existing failures.

Do not complete when a material criterion is missing, the implementation is partial, a delivery-caused check fails, critical behavior cannot be verified, or the evidence contradicts the issue. Leave the status unchanged and report the exact gap.

## Description

Patch the description when implementation made a factual detail stale: behavior, route, file, symbol, constraint, or acceptance criterion. Preserve the original problem and useful decision context. The description remains the canonical statement of the problem and expected outcome; the completion comment owns the delivery record.

Do not rewrite the description merely to match implementation wording, erase meaningful history, or present an unverified choice as settled. If reconciling it requires a product decision, leave the issue open and ask the question.

## Commits and PRs

Identify relevant commits from their actual diffs and relationship to the delivered outcome. Link published commits with stable remote URLs. Prefer the PR and canonical merge or squash commit when they represent the durable history; include individual commits only when each adds useful traceability.

For repository-backed work, a local-only SHA is not a link. Do not invent a remote URL or push as part of completion. If no relevant published commit exists, leave the issue open unless the user explicitly accepts completion with SHA-only traceability.

Put the verified PR and commit links in the completion comment. Add them as structured issue links only when existing links can be preserved; never replace unrelated links while finalizing.

## Visual evidence

For frontend or otherwise visual outcomes, verify the relevant state in the running product and attach a screenshot that demonstrates the criterion. Use an image supplied in the conversation when it is accessible, current, and actually evidences the delivered behavior. Do not attach decorative, redundant, stale, or sensitive images.

Normalize static raster evidence before upload:

- Encode interface screenshots as lossless WebP so text and fine edges remain intact.
- Encode photographic content as high-quality lossy WebP.
- Use the WebP only when it is smaller and visually equivalent; otherwise keep the original.
- Preserve SVG and animated images unless a verified conversion retains their required behavior.

Convert before preparing the Linear upload because MIME type and exact byte size belong to the signed request. Prepare, upload raw bytes with every signed header unchanged, and finalize one attachment before preparing another. Never base64-encode a direct upload.

If critical visual evidence cannot be captured or the supplied image cannot be accessed, do not pretend it was verified. Leave the issue open when that visual verification is material.

## Completion record

Write one concise comment in the workspace language containing:

- what outcome was delivered;
- which checks and runtime behaviors were verified;
- links to the relevant PR and published commits;
- the purpose of each attached visual when it is not self-evident;
- non-blocking caveats that remain relevant.

State concrete results, not generic claims such as "tests passed" when only a subset ran. Do not include unrelated repository work or duplicate the full issue description.

Resolve the team's completed status from Linear rather than assuming its name. Submit the reconciled description, attachments, and completion comment before changing status. If the issue is already completed, improve the stale record when requested but do not churn its status.

Completion of this issue does not imply completion of its blockers, blocked issues, parent, children, or related issues.
