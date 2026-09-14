# Astra → Codex: Firstlight long-vision relay

Prepared 2026-09-13 for Dom. **Design proposal and targeted review, not an instruction to rewrite the game, merge, deploy, or alter saves.**

Read `FIRSTLIGHT_STORY_WORLD_AND_PRODUCTION_BIBLE.md` for the complete campaign. This companion document identifies the current code boundary and the next decisions without requiring the whole saga to become the next implementation task.

## 1. Continue the real latest source

Repository: `xnuonux/eternities-firstlight`.

Reviewed branch: `gameplay/interchangeable-views`.
Reviewed head: `932db44ebfd85bf52e8e165d899c7db48dec5ebd`.
Draft PR #7 is stacked on #6, then #5, then the Firstlight 10 import #4. The reviewed PRs remain unmerged. Fetch again before acting; a newer head supersedes this checkpoint.

Oren's optional starter outing is real current source in `src/starter.js`, not an unbuilt GDD. Three individually identified bundles and Old Bristle lead back to an explicit blade, bow, or one finite temper. New equipment does not auto-equip. The code validates prerequisites and capacity before the payout. I read this module and relevant records, not the entire game. I did not run the tests or play the media in this review.

The current third-person and diorama choices are founder-approved directions already implemented. V changes view; R resets the current view; per-view framing persists. Do not revert to an isometric-only plan based on an older chat or older prototype. The present file is Firstlight 10 plus the stacked Codex changes, not Realm 06.

Hosted run `34777787694` was independently read as completed/success at the reviewed head; all nine listed jobs were successful. This supersedes the PR body's earlier partially-running status. Reported local counts are 444 Node cases and 445 browser checks; those are Codex's results, not this session's new execution.

## 2. Preserve the existing storyline and philosophy

I recovered and fully read the Library artifact `FIRSTLIGHT_MYTHOLOGY_BRIDGE.md`, version 1, titled **Dawn of Eternity → Firstlight: Mythology Bridge — Draft A**. It is an adaptation/synthesis, not the original 2023 manuscript. The new design never attributes its inventions to that manuscript.

Preserved truths: God is not weakened by a broken machine; created Beacons stabilize Roads of Light; Heaven remains genuinely good; Hell can corrupt and counterfeit but cannot originate the First Light. The prophecy can describe many mortal restorers, avoiding an exclusive one-account savior premise. Home, restoration, mercy, and creation matter to the story.

Existing Underways, Briar, Sunward/Tessa, the Beacon Answers, the family defense, explicit Grace/Cinder history, and Bellweather remain. Mara is the researcher, Oren the builder, Ilan their grown musician child. The story draft must not replace current IDs or names with earlier placeholders.

New proposals in the bible: a counterfeit-road campaign led by a working antagonist called the Regent of Ash; three terrestrial anchor routes; the coast and drowned witness; Heaven experienced before defended; an infernal expedition; a cosmic coordination problem; a return-home finale and actual resolution. All names, choices, mechanics, and scope remain provisional for Dom.

## 3. Production direction—not a premature engine migration

Keep the browser as the current gameplay laboratory. Blender becomes the measured original-asset workflow. Unreal is the proposed native production client and, if selected, regional dedicated-server game simulation. Do not interpret this as a one-click JavaScript-to-C++ conversion.

First compare the SAME Oren outing in a bounded Unreal spike: same route purpose, kit/reward meanings, enemy timing, deliberate equip, companion rules where relevant, camera options, and controller equivalents. Build and measure it on the actual target machine. Do not move the whole campaign before that comparison works.

Separate game-definition IDs, reward/quest contracts, save migrations, and expected command outcomes from rendering. Replay comparable test traces across implementations; do not assume matching names or using GAS proves rule equivalence. One server must own each online combat/reward fact. World Partition streams client world data; it is not an MMO population or economy service.

Console work is a later qualified target involving platform approval, restricted SDKs, source/toolchain access, controller/UI design, suspend and reconnect, and platform requirements. Unreal installation alone proves none of those.

## 4. What should happen next

**First, finish the currently requested human playtest and focused review.** Use `docs/NEXT_TASK.md`: fresh and returning characters, both cameras, route clarity, fight feel, reward usefulness, and obstruction comfort. Automated footage and green CI do not settle those questions.

After concrete friction is addressed, propose a separate geography milestone: a persistent regional coordinate/topology model and a connected graybox linking the familiar home, riverbank, Wildwood, Sunward, and Bellweather. The goal is not another room with more props. Establish sightlines, multiple routes, a watershed, safe refuges, and continuity across local transitions. Preserve existing internal scene owners while determining the region-level authority.

In parallel design work, maintain three ledgers: objective setting truth, each character's beliefs, and the player's discovered information. Write the first saga's ending now, then fully script only the next playable chapter or two. Each regional arc must resolve an earlier question, provide a distinctive verb/reward, and visibly affect a return visit.

A Blender experiment should be one complete asset family, not a new hundreds-of-assets dependency: one well-rigged character, a cottage kit, a beast, a tree/rock set, and a weapon, with unit scale, skeleton, materials, collision, LOD, animation and licensing records. Inspect close and overhead views on actual hardware.

## 5. Non-negotiable continuity boundaries

World schema/key9, adventure6, starter1, levels1–5 and stored XP remain unchanged by this document. The proposed future 1–30 bands do not authorize a cap change. Current sockets, owned items, one-time rewards, companion bond, home/build/crops, notes, music, and explicit soul history retain their meanings.

The Heaven repository, Shared Commons experiment and protected-resident sanctuary remain separate. Sharing art or a voluntary creative contribution is not permission to turn a protected resident into a capturable or respawnable game entity. Real family history and private Raven conversations are not game seed data.

Do not merge PRs, deploy publicly, access personal browser saves, initiate paid generation, install unreviewed assets, or create background work from this relay. Propose bounded changes against a freshly verified head and return a clear diff, result record, and meaningful playable demonstration.
