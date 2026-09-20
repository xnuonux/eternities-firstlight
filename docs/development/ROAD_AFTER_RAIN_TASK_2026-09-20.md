# Road After Rain — bounded Earth E2 contract

Base: PR #17, `26dff6e4fe9b2968c3c351ef317e2c03eab1ff19`. Branch: `gameplay/road-after-rain`. Origin fetched; no newer gameplay work or comments. Dom asked to keep developing. The recovered Earth prototype/story atlas inform this implementation; they are proposals, not founder approval of names, prices or pacing.

Fenna's flour-and-apples load is waiting at the mill-road fork. After Oren's initial kit, inspect the job and explicitly accept. No combat, class, main chapter or soul choice is required. Three compatible approaches use existing qualified Earth ground:

* Ansel: clear the mill root at (6,-3), then repair/test the gate at (7,-7), explicitly spending **2 timber** once. This restores the small headrace mechanism; it does not introduce fluid simulation or make the pond walkable.
* Darric: collect designated public repair blocks at (12,-26), then pack the cart grade at (14,-13). These are quest-owned blocks; no normal inventory grant or cost.
* Fenna: survey the ridge (13,-13), check the shelter (-12,-23), then mark the north lane (0,-35). No inventory cost. These observations can be made in either order; the lane requires both.

After any route is ready, return to Fenna at (7,5) and deliberately send the delivery by that route. She travels offscreen; the UI explicitly says to meet her at the west-road handoff (0,-43), not follow an animated escort. Confirm arrival there, then explicitly claim **3 copper ore, 4 sunmarks, 2 fibre, 0 XP**, once per character. This is one existing-survey-equivalent payment, not a new power tier or a universally useful veteran upgrade. No automatic equip. Completed public improvements may all be finished; none pays twice or strands the load again.

The west-road handoff keeps fresh characters outside the gated Chapter IV town. Delivered sacks, a small shared table and Fenna's recognition appear there; Nella's actual inn/gathering and the Bellweather chapter remain separate. No new enemies, dynamic road closures, escort AI, daily reset or repeatable story.

Rules: `earth-story.js`; state `adventure.earthStory` version 1, adventure schema **8**. World/key9 and all prior nested versions stay. Schema7 migrates by adding an unaccepted empty story only; current-schema missing/malformed/future state is refused. State fields: accepted, unique stable steps, dispatch route, arrived, claimed. IDs: `road-after-rain`, routes `mill/quarry/detour`, steps `mill-root/mill-gate/quarry-reserve/quarry-grade/detour-ridge/detour-shelter/detour-mark`. Dispatch requires its complete route; arrival requires dispatch; claim requires arrival. Costs and all reward capacities validate before mutation. New request IDs, receipt eviction, reload and other routes cannot repay. Failed actions leave canonical data untouched. Saves preserve whole-character ownership and resume at the existing valley checkpoint.

UI projects rules into the existing Earth atlas/readings, local E interaction and tracker. Art reads state for gate, grade, route markers and delivery, without granting progress. No geography collision change. Both camera styles and menu input boundaries remain.

Evidence required: red-then-green rules tests for eligibility, prerequisites, noncombat alternatives, atomic costs/capacity, duplication, migrations and independent characters; command-earned fresh blade/bow and veteran routes; browser controls, reload, maps, visuals and both cameras; complete verifier, fresh remote clone, actual normal-time gameplay clip. Human route clarity, choice meaning and enjoyment remain pending.
