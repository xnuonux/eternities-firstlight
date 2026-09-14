# Separate character lives: bounded autonomous milestone

Dom authorized continued implementation until 2026-09-14 07:00 America/Chicago. Current check at acceptance was 03:41, so the explicit 07:00 cutoff governs. Branch `gameplay/character-roster` starts at PR10 head `af332a2dcc1affa35aaf0efd7cdcdd5086fc8054`, all ten hosted jobs passing. PR9 founder answers, Draft D and assignment were reread. Their sequenced next lane is independent character ownership and later explicit classes. This step implements the roster; classes stay unassigned, with no invented mechanics or inferred identity. Main and all previous PRs remain unmerged.

## Observable result

Create a new named character while keeping the existing returning one. Switch between up to three complete independent local character/world snapshots, with distinct appearance, equipment, quest/project progress, companion, notes, music, housing, crops, resident schedules and camera choices. Export any character as a normal compatible world JSON. Preview a valid imported world, then add it as a new slot. Delete only an inactive character after typing its exact name. The current and last character cannot be deleted. These are separate local worlds, not shared servers or online avatars.

The existing appearance rules already support name, skin, cloak and hair palettes. Reuse them in creation. No earned gear, XP, class, profession or world progress is copied into a newly created character. Import is an explicit copy of a supplied offline world, never authority for a future online item economy.

## Ownership and save contract

`core.js` remains the sole world validator and Simulation snapshot owner. `app.js` has a reusable applyWorld path for resetting transient simulations/UI. Add `characters.js` as a small validated storage boundary and `characters-ui.js`/CSS for the selection flow. Integrate the existing save/import/reset paths so a managed character never writes another slot or the old single-world key.

A version-1 character library at `eternities.realm10.characters.v1` contains active ID, monotonic next ID, revision and at most three full validated world records. One bounded envelope permits each save/create/switch/delete to be one atomic localStorage setItem rather than a sequence of independent pointer/payload writes. A 1.5-million-character serialized envelope limit bounds storage; browser quota can still refuse a write. Refusal leaves stored bytes, active identity and all other characters unchanged. The original Realm10 and older keys are retained when the first new character creates the library. Before opt-in, the established single-world save flow remains compatible.

Creation stores the current validated snapshot and a truly fresh character together. Switching persists the outgoing safe outdoor snapshot and the active pointer in the same envelope before restoring the target. No per-character economy or story history is shared. Unknown/corrupt present library data blocks writes instead of falling through to an older save. Import validates before mutation and always uses a new monotonic character ID. Deleted IDs are never reused and an existing library never resurrects the old recovery key automatically.

Managed libraries use one exclusive Web Lock for the editing tab and verify their exact stored source before writes. A second tab is read-only for this library; it can export but must explicitly reload to adopt newer data. If browser locking is unavailable, character-library mutations are refused with a clear recovery path. Existing single-world mode is retained. This is local coordination, not account authentication. References: [Web Locks](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API), [HTML storage semantics](https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface).

## Evidence and boundaries

Meaningful rule tests cover legacy adoption, independent snapshots, no gear grants, monotonic IDs, invalid/full imports, byte/capacity/quota refusal, stale revisions, conflicting stored data, inactive-only confirmed deletion and malformed library preservation. Browser tests must use actual UI and native localStorage in isolated profiles, exercise two tabs, reload, export/import, new-character commands, returning-state preservation and input/runtime cleanup. Verify both cameras and original campaign/creative suites at integration. Keep human character-selection taste and personal saves untested. Record actual video and exact commits; push a separate stacked review PR and verify a fresh clone.

Stop adding features early enough to finish evidence by 07:00. Three slots, full local-world ownership and inactive-only deletion are prototype implementation choices, not founder decisions about final account/server architecture. Classes, rare-pet allocation, online play/trading, monetization, offline loss, construction scale, Unreal and Luna remain separate.
