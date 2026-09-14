# Astra to Codex — Continue Firstlight from Draft D

Prepared 2026-09-14 for Dom. This is an implementation assignment to use when Dom hands it to Codex, not a claim that Codex has already run or that the game has changed. The detailed mechanics proposed here remain testable implementation choices.

## 1. Read current code, not an archive as a replacement checkout

Repository: `xnuonux/eternities-firstlight`.

Observed complete gameplay branch: `gameplay/interchangeable-views`, head `932db44ebfd85bf52e8e165d899c7db48dec5ebd`, PR #7. Observed main: `1aae2f14f2b2ab0ba54a5bf8571bd45bbf32ab46`; it is not the complete gameplay tree. Draft B/C archive: PR #8, branch `archive/story-bible-and-living-canticle-2026-09-13`, head `455a9873e0a623597bf772bd4e3fc0e9ea3992ab`.

Fetch origin, inspect local status, current PR heads and comments, and preserve concurrent work. Read `AGENTS.md`, `docs/CURRENT_STATE.md`, `docs/NEXT_TASK.md`, `docs/PLAYTEST_NOTES.md`, `docs/DECISIONS.md`, this archive's founder answers and Draft D. Use a new review branch from the actual current gameplay head, not main or an old ZIP. Carry documentation by scoped, additive changes; do not replace newer source with an archive tree.

I read the branch list, AGENTS, CURRENT_STATE, and PR #7 discussion during publication. PR #7 had no comments at the read. I did not rerun game tests, inspect the entire implementation, or supply a new human playtest. Current records still leave fresh/returning route, reward, combat enjoyment, and camera-comfort questions open. Preserve that distinction while continuing bounded engineering work; do not invent Dom's answers or make missing taste feedback a reason to return only another roadmap.

## 2. What Dom now prioritizes

An ordinary evening should be worthwhile with the main quest untouched: choose an equipment project, gather, craft, run a repeatable outing, improve a build or appearance, and return with a reason to play again. Traditional chosen classes, multiple characters, rare companions, economy, and real social interactions are longer-term pillars. A past evil character returning to the light retains a different history from a character who never made those choices.

Do not spend this milestone adding another prophecy scene or dimension while the ordinary progression loop stays shallow. Do not implement every axis of Draft D in one branch.

## 3. First bounded milestone: An Upgrade Worth Hunting

Implement one complete LOCAL gear-pursuit loop on existing geography. It must remain useful without advancing the main campaign. This is one staged subset of Draft D section 13, not the whole local-systems list.

### Item and recipe field guide

Project a small, useful selection from actual gear/recipe/source definitions. Show ownership, real effects, compatible weapon family, prerequisites, where it comes from, required materials, and a truthful equipped comparison. Let the player pin one attainable project and see the next concrete action. Persist that choice without touching unrelated state. Unknown or unimplemented sources must not become fake map destinations. Keep earned story rewards distinguishable from repeatable sources.

### One legitimate repeatable outing

Add an explicit ordinary expedition/contract with a separately identified run and declared rewards. Reuse the riverbank or another already-owned suitable route after checking navigation, state ownership, and access. Do NOT make Oren's existing once-only quest, unique boss caches, or beacon-defense replay suddenly pay infinitely by resetting their completion flags.

Use fresh run/encounter identities and a persistent completion/claim ledger. Declare in advance whether a partial run resumes or restarts, then test its reload behavior. Duplicating a claim with a different request ID, re-entering a room, or replaying an earlier completion cannot duplicate that run's reward. Capacity failure preserves earned entitlement and consumes nothing. A deliberate new run remains legitimately rewarding; do not remove repeat rewards to evade economy tests.

The outing can reward bounded craft materials or a clearly described currency, with a modest first-clear distinction if useful. It needs a readable goal, meaningful danger, a return or justified field-claim path, and no new cash shop, real daily deadline, or server-event claim.

### One finite upgrade chain, useful for blade and bow

Connect outing/gathering rewards to one real craft or improvement. Keep existing item identity, sockets, equip state, and unrelated upgrades intact. Preview cost and actual outcome; validate all prerequisites before mutation; apply once per declared step. New equipment does not auto-equip. Refused crafting cannot spend half the materials. Do not create unlimited +attack tempering.

Audit a fresh blade user, a fresh bow user, and a strong returning Chapter IV loadout before selecting the reward. Consider cooldown, reach, stamina, guard, health, sockets and existing Oren temper rather than attack alone. Give returning players a useful bounded project or clearly label starter-tier applicability instead of calling junk a universal upgrade. Do not secretly scale enemies or rewards to the currently equipped weapon.

### A visible result

Show the improvement on the character or weapon where practical, in the compare panel, and through real accepted hits on Oren's practice target. Let the player unpin/choose another project. Keep current Tab/click selection, explicit stationary autoattack, current skills, both camera styles, and text/menu input priorities. Original code/art only.

## 4. Acceptance evidence

Use new synthetic or command-earned fixtures, not Dom's personal browser data. Demonstrate:

- Fresh blade and bow characters can inspect, pin, earn, craft, deliberately equip/use, and compare the project without major story advancement.
- A returning campaign character keeps all existing progress and receives an honest, useful offering or an explicitly bounded starter-only result.
- Two deliberately initiated runs provide their proper rewards; duplicate completion/claim, reload, new request IDs and capacity failures cannot multiply one entitlement or lose spent resources.
- Closing/reopening and switching cameras preserve the pinned project, inventory, socket, quest history and unrelated creative work.
- Material/currency inflow and consumption per run and upgrade are recorded. A price table alone is not economy validation.

Run the current portable build/rule/browser gates according to the latest `tests/README.md` and `tools/verify.py`, with new tests for this feature. Record commands, fresh results, skips, failures, migration decisions and outstanding human questions. Return an actual short gameplay recording and before/after comparisons, not concept art or a rendered sequence presented as real-time play. Push one review branch/PR and reproduce its build/tests from a fresh clone. No automatic merge or public deployment.

## 5. Compatibility and scope

Observed contracts: world schema/key 9 / `eternities.realm10.save.v9`, adventure 6, starter 1, levels 1-5, optional `cameraViews` version 1. Re-read current code before asserting them. A necessary additive migration must be documented, tested against old saves and failure cases, and must not erase stored XP, owned items, rewards, sockets, companion bond, construction, furnishings, crops, notes, music or explicit Grace/Cinder/renunciation history. Do not raise the level cap in this milestone.

Keep existing characters class-unassigned until an explicit class-selection migration is designed. Do not infer Hunter from bow use or lock an old blade build out of its equipment. Continue using blade/bow as existing weapon families; traditional Hunter/Magician class systems are the next separate design/implementation lane.

## 6. Sequenced work after this playable loop

1. Independent character roster and explicit chosen-class experiment. Audit current state ownership first; test switching, import/export, deletion confirmation, cross-slot isolation, and non-destructive migration. A dropdown over one shared save is not a roster.
2. Blue/gold fox event and collection test. Preserve the 30-minute/10% example and probability note; leave single-winner versus cooperative eligibility for an explicit design decision. No local simulation should be called a server-wide event.
3. Two real clients meet, chat, share an encounter, receive eligible loot, and gift an item through atomic trade. Server-owned inventory cannot trust offline JSON. Do not fabricate market participants or NPC friendship as multiplayer acceptance.
4. Persistent exchange, commissions and profession demand; then authored, opt-in interest-aware invitations; then guild estates and bounded frontier risk.

Do not begin with an Unreal rewrite, auction-house mock population, unbounded generated quests, offline punishment, forced rare-pet allocation, paid power, or a live Luna integration. Document unsettled founder choices without turning an assistant recommendation into ratified policy. Preserve the separate sanctuary and Heaven boundaries and the complete future Briar loss-and-return chapter; do not ship only his death.

## 7. Reference study

Observe permitted game UI and official documentation; record version and what was actually observed. Installed WoW/GW2 clients are not their server source. Use original code/assets and avoid copied models, sounds, quests, private asset databases, bypasses, or unattended actions on Dom's live accounts. Research is not a reason to postpone a bounded playable result indefinitely.
