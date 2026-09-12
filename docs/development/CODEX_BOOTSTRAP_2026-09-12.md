# Firstlight: Codex bootstrap and starter-region direction

Prepared 2026-09-12 for Dom / Eternities.

## Status: handoff, not a new game release

This file establishes a continuation workflow. It does not contain the full game source or claim to finish its upload. The supplied Firstlight10 package is the current complete baseline; no verified Firstlight11 release exists in this conversation. Do not reconstruct code from old chat descriptions.

Live GitHub inspection at preparation found:
- Repository: `xnuonux/eternities-firstlight`, private.
- `main`: `1aae2f14f2b2ab0ba54a5bf8571bd45bbf32ab46`, containing the old import workflow and realm charter, not a runnable game.
- `development/feather-beneath-wildwood`: `68f37b9b211fae0ca758631794045b52159d8375`.
- `development/sunward-road`: `dc8063de7dd6f7aed2fd5d63b0ec25d902d7c101`, a partial handoff with an older road module/test, not the complete application.
- This new handoff branch descends from the observed main. Fetch again before writing; newer remote work wins over these historical observations and must be reconciled.

## 1. Exact source to import

Obtain `ETERNITIES_FIRSTLIGHT_10_REPOSITORY.zip` from Dom's originating ChatGPT conversation. Dom may put it in an approved local input folder; the local path is not known here.

ZIP SHA-256:
`bd8fe0345b871707114188933a91865eaf0d09c203f042a4b1994866b30af973`

ZIP bytes: 25,072,319. Extracted root: `firstlight-10/`.

Built `FIRSTLIGHT_VALLEY.html` / `index.html` SHA-256:
`6b1905b62b321c6335a641257bacedc997e1272fa35671852a35d076300c921a`

HTML bytes: 489,117. Source manifest: 133 files. The package's local source commit is `54070083b7d4654d1113514e6d7bd1b3a48eb860`; that is not a remote commit claim.

In this handoff turn, ChatGPT inspected the archive, verified all 133 source-manifest entries, extracted into a separate working directory, rebuilt the exact HTML, and reran all 399 Node rule tests successfully under Node v22.16.0. No new browser, native-storage, device-performance, multiplayer, or human-balance qualification was performed. The package's older 221 browser checks remain historical evidence for that exact edition, not freshly executed handoff tests.

The game is a custom WebGL2/JavaScript offline application assembled by Python. It is not a Three.js npm project or an Unreal project. The separate Shared Commons multiplayer experiment must not replace this integrated four-chapter game.

## 2. Bootstrap procedure for Codex

Use a local project folder approved by Dom, for example `D:\Eternities\Firstlight`; this is a suggested location, not an observed existing path. Keep the input archive and Dom's personal save backups outside the tracked checkout. Use an existing authorized GitHub login. Do not request tokens in chat, embed credentials in remotes, or use credentials from old transcripts.

1. Inspect the project folder, current Git status, remotes, remote branches, pull requests and instructions before mutation. Preserve uncommitted work. If there is no checkout, clone the existing private repository using normal authorized Git access. Do not create a second repository.
2. Fetch the latest remote state. Read this handoff and the existing founder charter. Start an integration review branch from current main. Bring in this handoff without changing the founder charter. Do not merge obsolete partial runtime files over the Realm10 baseline.
3. Verify the exact ZIP hash and extract it outside the checkout. Read the archive's `AGENTS.md`, `START_HERE_FOR_CODEX.md`, `README.md`, `VALIDATION.md`, `docs/BELLWEATHER_CROSSING.md`, and `docs/GITHUB_PUBLICATION.md`.
4. Rebuild and run baseline tests in that separate extraction before import. Node is required for development tests and Python for the builder; no runtime package install is required to play. If a shell does not expand `tests/*.test.cjs`, enumerate matching files and pass them as individual arguments to `node --test`. Do not mistake shell glob handling for a failed game test.
5. From the extraction, run `python tools/import_into_checkout.py <absolute-checkout-root>` without `--apply`. This is an additive dry run. It refuses main/master, wrong origin, dirty checkout, unsafe paths, symlinks and different existing files. Review it; only then run with `--apply`. If current remote code conflicts, compare and reconcile on the review branch instead of disabling the refusal rules.
6. Preserve provenance. The importer copies only SOURCE_MANIFEST-listed files; it does not automatically carry every evidence file or the manifest itself. Keep the original archive, source manifest, BUILD_PROVENANCE.json, original delivery receipt and SOURCE.bundle as dated provenance/release artifacts. Keep screenshots and large recordings out of routine commits unless deliberately needed. Never stage Dom's personal save or an unrelated local directory.
7. Verify import-only source identity and build hash before adding workflow improvements. Preserve the existing source layout in this first import. Reorganizing it during recovery makes comparison harder.
8. Commit the imported baseline separately from improvements. Push a review branch and verify the remote commit and tree. Open a source-import PR that explicitly includes actual source and tests. Leave main unchanged until review; do not force-push, automatically close old PRs, or activate `.import/READY.json`/the obsolete restore workflow.
9. In a separate commit, add portable verification/CI and continuity documents. The root `AGENTS.md` already exists in the source: extend it carefully, do not replace its save, input, privacy and evidence constraints. Correct stale version references such as the inherited tests README without treating old test counts as current results.

Source import is complete only when a fresh clone of the pushed branch builds the game, passes the rule suite, and contains the expected runtime modules. A docs-only PR, an unreferenced blob, or a local Git bundle is not completion.

## 3. Durable cross-session workflow

Dom remains creative director, naming authority and human playtester. ChatGPT remains strategist, narrative/system designer, prototypist and reviewer. Codex is the primary integration checkout and desktop build/test owner. This is a collaboration protocol, not an automatic live link between chats.

Use one mainline and short-lived task branches. Two agents must not edit the same working directory concurrently. Parallel tasks need separate branches/worktrees and bounded ownership. Every handoff identifies the starting commit, changed files, migrations, tests actually run, known failures and the next acceptance criterion. A patch from ChatGPT is applied against its declared base or deliberately reconciled with newer Codex work; it never replaces a whole newer tree without comparison.

Establish these small files after baseline import:
- `docs/CURRENT_STATE.md`: last verified playable commit/release, launch/test commands, schema versions, supported saves, implemented versus proposed content, known blockers.
- `docs/PLAYTEST_NOTES.md`: preserve Dom's observations separately from engineering interpretations.
- `docs/NEXT_TASK.md`: one bounded deliverable, owner, base commit, acceptance and exclusions.
- `docs/DECISIONS.md`: accepted design changes with rationale; proposals stay labeled.

CI should rebuild offline HTML and run the rule suite on each PR. Add the current browser suites once their executable paths and dependencies are made portable. Browser checks are `tests/crossing_browser.py`, `tests/regression09_browser.py`, `tests/cutaway_browser.py`, and `tests/reflection_browser.py`; several old drivers are historical and must not be summed as current evidence. Linux-specific Chromium paths need configuration for Windows. Native-origin persistence and performance should be tested on the actual host with permission, not presumed from Map-backed storage fixtures. Commit CI configuration only after reviewing its commands and permissions.

Keep the original release intact as an archival checkpoint. Once the imported branch is verified and approved, tag a clearly named browser-prototype baseline and put its playable HTML/ZIP in a release. A future public web deployment is a separate decision. Do not change repository visibility, licenses, paid services, or production hosting in this bootstrap.

## 4. Latest playtest evidence and revised priority

Dom reports personally completing the mine/road progression, beacon defense and Rowan's bell-restoration quest, then returning to the original village. He noticed the better equipment interface, mappings and navigation. The fights work but are not thrilling. Briar's scent discovery was especially memorable; early camera/menu/workbench friction was not.

His latest reference is the human World of Warcraft opening: the starting settlement before Goldshire, increasingly broad quests, Goldtooth's mine, murlocs, Princess the pig, leveling and eagerly replacing weak equipment. This is the founder's memory of a desired experience, not a specification to copy Warcraft assets, quest text, exact geography or enemies.

Interpretation: prioritize the feeling of gradually becoming capable in a place the player learns. Combat feel matters, but hard boss mechanics alone will not supply this. The next region should contain ordinary livelihoods, recognizable local threats, desired loot, multiple short outings and satisfying returns. Not every problem is secretly a demon invasion.

Current Realm10 level cap is five despite continued chapter XP. Inspect its actual stored XP and reward economy before designing a larger progression curve. Do not merely add a level number, retroactively replay rewards, or silently erase accumulated progress. Preserve completed quest flags and existing saves while testing a revised curve separately.

## 5. Recommended first playable improvement after bootstrap

Working task title: **Starter-region progression and combat feel**. This is a proposal, not a claim of implemented Realm11 content.

Start with one compact optional quest chain around the existing region rather than shipping Heaven, replacing the renderer, or opening a large mountain chapter. Then expand it into a few connected outings as playtesting supports it.

The representative chain should let a fresh or returning character:
- meet an ordinary local person with an understandable problem;
- see the reward and compare it against actual equipment before committing;
- take two compatible objectives along one readable route;
- encounter one simple enemy and one dangerous named variation with a readable tell, recoverable mistake and useful punish window;
- find ordinary loot and a guaranteed useful completion reward;
- return, turn in, visibly equip an improvement and immediately feel its effect;
- hear about the next place without being forced there.

Suggested original outing families: a damaged mill and orchard; a riverbank obstruction; a supply theft at an abandoned worksite. Final names, rewards and exact layouts remain proposals. Avoid recreating Princess/Goldtooth/murlocs with only substituted names.

Acceptance focuses on understandable goals, rewarding completion, readable target/autoattack/skill input, brief enemy hit reactions, a sensible upgrade cadence and preserved earlier progress. Normal fights need not all be boss puzzles. A stationary autoattack baseline plus a few meaningful decisions can serve ordinary questing; rare threats and bosses carry the peaks. Do not replace the requested GW2-like tab/skill combat with a compulsory high-input action game.

Propose a compact 1–10 early curve for evaluation, not a locked cap or permission to inflate stats. Identify what each level unlocks and what happens to old level-five saves. Test both sword and bow; verify that a useful reward exists for each. Do not add empty armor-slot buttons before their slots, items, rules and save migration exist. Add scalable quest definitions and stable IDs before authoring dozens of one-off quest handlers.

No main-story reorder, auto-selected class, forced infernal choice, loss of homestead/music, or prototype-to-Unreal rewrite belongs in this first refinement. The cosmic story remains, but Earth must be enjoyable before its context expands.

## 6. Canon and reference boundaries

Preserve Heaven's bone-white, gold, Burmese-ruby and prismatic-dawn direction; Earth's living greens/blues/wood/stone; Hell's coal/iron/ember dread; later cosmic/oceanic possibilities. Keep the completed Dawn of Eternity synthesis, adaptation bridge and original manuscripts distinct. Those files are not assumed to exist inside this code archive; request the exact supplied lore package when a lore task needs it, rather than inventing recovered text.

Unreal is a later production-client direction under Dom's current decision. Browser prototype work remains useful, but JavaScript rules and saves will need deliberate porting/adapters; this is not a promise of an automatic engine switch. Keep stable IDs, rules, presentation and versioned data separated now.

Firstlight is a game with conventional NPCs and tameable creatures. The protected resident sanctuary remains separate. Do not import live Luna history or hosts, merge the Heaven repository, or treat editable offline saves as authoritative multiplayer inventory.

A suspected WoW installation on D: is not required for bootstrap. This handoff does not authorize an entire-drive scan, modification of Blizzard files, extraction of proprietary assets, account actions or automated online play. User-directed screenshots/play sessions can supply reference observations. Record the edition and distinguish observed behavior from inference.

## 7. What to send back to ChatGPT

Return the source-import PR number, exact pushed head commit, a fresh-clone build result and HTML hash, actual test results, any blockers, and the next task branch. Then both sessions can read the same code and continue without treating the chat transcript as the only project memory.

Official workflow references consulted for this handoff:
- https://developers.openai.com/codex/guides/agents-md
- https://developers.openai.com/codex/app/worktrees
- https://developers.openai.com/codex/windows

Repository observations were live reads on 2026-09-12. Local source/hash/test observations were performed on a separate extraction during this handoff turn. Recommendations above are separately identified; no new gameplay release is claimed.
