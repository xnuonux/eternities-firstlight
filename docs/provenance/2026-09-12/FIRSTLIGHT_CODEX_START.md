# Firstlight — start the shared Codex workflow

Prepared 2026-09-12 for Dom / Eternities. This is a bootstrap guide, not a new playable release.

## What is ready

The private repository `xnuonux/eternities-firstlight` exists. In this turn, GitHub reads and writes succeeded. A continuation document was committed and read back on:

- Branch: `handoff/codex-firstlight10-20260912`
- Commit: `53572a25049362c5f02cb1d29ef54f2c9a177714`
- File: `docs/development/CODEX_BOOTSTRAP_2026-09-12.md`
- Draft PR: https://github.com/xnuonux/eternities-firstlight/pull/3

That PR contains the handoff only. The complete game still needs to be imported. The inspected main branch was `1aae2f14f2b2ab0ba54a5bf8571bd45bbf32ab46`, containing a charter and old import workflow. Codex must fetch again and preserve any newer work.

## What to give Codex

Download the **whole** `ETERNITIES_FIRSTLIGHT_10_REPOSITORY.zip` from this conversation, not just the standalone HTML. Put it in an approved input folder on your computer. Keep personal world-save JSON backups outside the repository.

Choose a permanent local development folder; `D:\Eternities\Firstlight` is one possible location, not a path inspected by ChatGPT. Open a local Codex session with access to the relevant folder and your normal authenticated GitHub connection. No token belongs in chat or the repository.

Paste the following:

---

Set up `xnuonux/eternities-firstlight` for continuous development between this Codex session and my ChatGPT strategist/prototypist.

First read `docs/development/CODEX_BOOTSTRAP_2026-09-12.md` on branch `handoff/codex-firstlight10-20260912` (draft PR #3). Fetch current repository state rather than assuming that branch or main has not changed.

Use the supplied `ETERNITIES_FIRSTLIGHT_10_REPOSITORY.zip` as the complete browser-game baseline. Verify its checksum from the handoff. Preserve the original archive, current source, founder charter, newer work, and my personal saves. Do not replace the game with the Shared Commons networking demo or an Unreal rewrite.

Import and verify the real source on a review branch. First reproduce the baseline HTML and rule suite; then add portable build/test automation and cross-session records. Extend the existing AGENTS.md, and establish CURRENT_STATE, PLAYTEST_NOTES, NEXT_TASK and DECISIONS under docs. Preserve earlier evidence as historical and label new test results accurately.

Push the review branch using the authorized GitHub login, then verify that a fresh clone rebuilds and tests. Return the PR number, exact pushed commit, launch instructions, test results and remaining blockers. Do not merge main or deploy publicly in this bootstrap. Do not call a documentation-only branch a completed import.

Our next gameplay priority is the satisfying human-starter-region progression I remember from WoW: understandable local quests, leveling, visible gear improvements, memorable named threats, enjoyable ordinary combat and a wider second-town quest area. Read the bounded proposal in the handoff. First make the repository dependable; do not start several conflicting gameplay branches during import.

---

## Baseline verification

Original archive: 25,072,319 bytes.

SHA-256:
`bd8fe0345b871707114188933a91865eaf0d09c203f042a4b1994866b30af973`

Built HTML: 489,117 bytes.

SHA-256:
`6b1905b62b321c6335a641257bacedc997e1272fa35671852a35d076300c921a`

The archive contains source, tests, a builder, an additive importer, and local source history. Its local source commit is `54070083b7d4654d1113514e6d7bd1b3a48eb860`; that is not a claim it exists on the remote.

In this turn, a separate extraction passed verification of 133 source-manifest entries. `python build.py` reproduced the exact HTML, and `node --test tests/*.test.cjs` passed 399 tests under Node v22.16.0. No new gameplay code, browser qualification, native-storage test, GPU benchmark or multiplayer release was made.

The existing importer refuses a dirty checkout, main/master, conflicting files, wrong origin and unsafe paths. Use its dry run first; it is not a merge engine. Do not enable the obsolete `.import/READY.json` workflow. The full remote handoff explains how to preserve evidence not copied by the source-only importer.

## Working agreement

Dom: creative direction, names, taste and human playtesting.

ChatGPT: strategy, lore, systems design, prototypes and review.

Codex: primary integration checkout, code implementation, desktop verification and release preparation.

Use one repository with reviewed task branches. Separate worktrees permit parallel work, but not automatic agreement or conflict resolution. Record a base commit and exact changes for every handoff. Once the full baseline is approved and merged, every new session begins from the current repository state, not an older chat ZIP.

Unreal remains a later production-client direction. The current browser prototype stays the gameplay laboratory. The resident sanctuary and Heaven repository are not merged by this task.

## Why the starter region comes next

Dom's latest memory emphasizes completing ordinary quests, feeling stronger, receiving better loot, then leaving a familiar starting settlement for a broader town and countryside. This updates the emphasis: combat polish alone is not enough. The prototype needs a more deliberate progression and reward loop.

The proposed first refinement is one short optional local quest chain with a previewed completion reward, compatible objectives on a readable route, ordinary enemies, one named threat and a visible equipment improvement. Expand toward a fuller region after playing that loop. Do not make every ordinary fight a multi-phase boss or every missing shipment a cosmic conspiracy.

Realm10 still caps levels at five. Review the stored XP, complete reward curve and old-save migration before expanding progression; do not simply raise the cap and unexpectedly transform returning saves. Keep cosmetic prototype assets and deeper asset production separate from this systems task.

## Official workflow references

- AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Worktrees: https://developers.openai.com/codex/app/worktrees
- Windows sandbox: https://developers.openai.com/codex/windows
- Local folders and separate Codex history: https://help.openai.com/en/articles/20001275/

A local WoW installation is not needed for bootstrap. ChatGPT did not inspect the D: drive. Any later local inspection requires appropriate permission; reference play sessions and screenshots should be distinguished from inferred behavior. Do not extract proprietary game assets into Firstlight or automate an online account through this handoff.
