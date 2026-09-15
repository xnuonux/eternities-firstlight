# Current checkpoint: the Near Expanse and complete vision intake

Updated 2026-09-15 after Dom resumed development and asked for the comprehensive Earth, Heaven, Hell, Atlantis and Cosmos material. The prior timed window ended on 2026-09-14; this work is a separately authorized bounded milestone, with no background schedule. Branch `gameplay/cosmos-near-expanse` starts from PR #13 (`gameplay/outing-readability`) at **bdad75b70b7762f6ef89fe0982ebc07cd4ddef0c**. It is stacked against that branch while the earlier review chain remains unmerged.

Start with the [comprehensive vision index](design/COMPREHENSIVE_VISION_INDEX.md), [M1 task](development/COSMOS_M1_TASK_2026-09-15.md), [fresh results](development/COSMOS_M1_RESULTS_2026-09-15.md), [NEXT_TASK](NEXT_TASK.md), [PLAYTEST_NOTES](PLAYTEST_NOTES.md) and [DECISIONS](DECISIONS.md). PR metadata and its final clone receipt identify the exact pushed head. The archive in PR #14 is design/provenance, never a replacement gameplay checkout.

## Play this slice

Use `PLAY_FIRSTLIGHT_WINDOWS.cmd` or `python tools/play_local.py` for the stable loopback origin. An existing server serving a different revision is deliberately not replaced; use the verified versioned preview URL recorded with the delivery, or close the conflicting server yourself before launching this checkout.

Open **Map → Near Expanse invitation → Walk to the invitation**, or walk to the small light beside the valley observatory at `(14,-5)`. Press **E**, read the route/return terms and explicitly enter. No kit, class, chapter or equipment prerequisite is required.

Three Lamps is inhabited by Teren. The roofed refuge has an approachable bench. Rootcut Lane and the open road connect around a solid ridge and climb 3.2 world units to Anik's occupied observatory. Paths, slopes, cover and surface picking use the same local geometry. The large moon and stars are remote sky images, with no selectable ground or reward authority.

**V** swaps third person and diorama. Existing FOV, per-view framing and reduced motion remain. **M** opens a local route atlas; its bearings walk through the physical paths. **Return to Firstlight** works from anywhere. At the arrival gate, **E** also returns to the exact valley position. The existing combat, companion and menu controls remain; this first visit has no encounters or payout.

## Saves and characters

Cosmos M1 adds no durable record and no schema migration. World/key **9**, adventure **7**, character envelope/classPath/starter/pursuit/arsenal/cameraViews **1** remain. Levels stay **1–5** and stored XP stays **0–9999**. No automatic equipment, class or soul choice is made.

Entry saves the valley checkpoint before constructing the destination. Confirmation binds the simulation, active character, saved revision, source position and destination. Failed writes refuse entry; failed construction rolls back. Saving, reopening or switching characters resumes on the acknowledged valley side. This is disclosed before travelling. The transient trip does not serialize enemy, reward or journey history.

Following companions travel on valid ground. Stay remains an explicit command and does not silently follow a scene change; Follow can recall Briar. Inventories, equipment identities, sockets, Oren temper, finite fittings, quest/run claims, housing, crops, notes, music, completed chapters and soul history retain their existing owners. Personal saves were not read or modified in testing.

## Existing game remains available

Oren's once-only supplies quest, the separately repeatable declared-reward survey, one pinned equipment project and finite blade/bow fittings remain. Up to three complete local characters and the optional Hunter/Magician technique remain. Explicit Tab/click targeting, stationary attacks, guard/retreat and both cameras retain their checks. Prior implementation details live in the dated starter, camera, pursuit, character, class and outing records.

Earth remains the lived home. Cosmos M1 is a geography/return experiment, not the full Cosmos campaign. Heaven, Hell and Atlantis are retrieved designs and separate future implementation lanes. Human pacing, beauty, comfort and enjoyment remain pending. No main merge, tag, public deployment, Unreal qualification or live AI integration is implied.
