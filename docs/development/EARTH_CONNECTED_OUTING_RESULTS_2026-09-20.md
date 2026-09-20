# Hearthwater connected outing: implementation and local evidence

Base: **67b4eebc1026ed1027c4f8777ed33da77edc015b**, PR #16, `gameplay/earth-hearthwater-approach`. Branch: `gameplay/earth-connected-outing`. The PR identifies the final pushed commit, subsequent clean remote-clone verification and hosted run. This note records evidence available before that push; it does not pre-claim those later checks.

## Playable change

The orchard worksite sign now connects Hearthwater's geography to the existing riverbank outings. It previews the currently accepted survey or Oren objectives, requires the initial kit, and explains the exact return route. E at the southern riverbank exit returns an orchard traveller to the orchard; the original workshop entrance retains its original exit. Rewards are still accepted and claimed at Oren under unchanged starter/pursuit rules.

Both camera styles remain. The worksite has a path spur, split wall, sign and packed load. Background hills no longer overlap the walking/camera corridor. The local watercourse is below its banks, and Cosmos labels no longer leak into other scenes. Earth marker text now describes routes and work instead of engineering qualification details.

## Ownership and migration

No migration: world/key9, adventure7 and existing nested v1 records remain. Levels1–5, stored XP, equipment IDs, sockets, Oren temper, finite fittings and story history are unchanged. Earth holds a temporary orchard checkpoint under the original saved valley checkpoint. Scene-local combat geometry is not scaled or relocated. This is an explicit scene crossing, not seamless streaming.

Browser transitions bind character, simulation, saved revision, source position and destination; save failure refuses travel, and build failure restores source room/position/runtime. Reload/switch resumes at the lake and keeps earned objectives/unpaid rewards. Death recovery clears travel and returns to the existing spring. The old workshop path remains compatible. No personal saves or default browser profile were inspected.

## Executed checks

Python3.13.15, Node24.18.0. Browser Python: `C:/dev/firstlight-artifacts/bootstrap-2026-09-12/browser-env/Scripts/python.exe`.

```text
python build.py
node --test tests/earth_outing.test.cjs tests/earth.test.cjs
python tools/verify.py --browser --output verification/earth-connected-final
python tools/verify.py --output verification/earth-connected-source-final
python tests/earth_browser.py
```

Final generated files are identical: **675,202 bytes**, SHA-256 **6eb1ffca780025e1f168a9e9ea164c3ad01fc09add3587622a2f79268bdad008**.

- Final source run: **39** JS syntax checks; **516/516** Node rule tests, zero failures/skips; Python **26 passed, 1 skipped** (Windows symlink capability), 27 discovered; **15** command journeys passed.
- Earlier full local run passed the first eleven browser suites. Its Earth extension then failed on a test locator that retained `legacy` after the character store correctly migrated it to `character-1`. The corrected final Earth suite passed **87/87**, zero browser errors. An earlier iteration also used the wrong enemy-ID delimiter in the test harness; it was corrected to the existing `run:objective` format.
- Presentation fixes landed during local verification. Therefore the early aggregate run is preflight evidence, not a claim that every local suite ran against the final HTML. The independent final-head clone runs the complete verifier again; its actual result belongs in the PR receipt.
- New rule cases cover both exit origins, stale/replayed/failed transitions, live encounter preservation on failed return, partial Oren bundles, completed unpaid surveys, class cooldown, companion arrival, death recovery, scenery clearance and label scene ownership. Existing campaign, music/export, housing, camera, reflection, cutaway, persistence, class and roster suites stay in the verifier.

## Command-earned progression

`tests/pursuit_journey.cjs --earth` follows the new route on every survey, using production walking and combat. No position edits, inventory grants or planted defeats. Simulation ticks are accelerated; these are not human completion times.

| Character | Surveys | Confirmed practice impact before → after | Final weapon | Campaign XP |
|---|---:|---:|---|---:|
| Fresh unassigned blade | 5 | 16 → 27 | Copper blade, two fittings | 0 → 0 |
| Fresh bow, explicit Magician | 5 | 13 → 25 | Copper bow, two fittings | 0 → 0 |
| Returning strongest weapon, explicit Hunter | 3 | 44 → 48 | Dawn's edge, two fittings, existing temper | 563 → 563 |

The returning bow Hunter browser fixture independently completes a survey through the same entrance, reloads partial and completed unpaid state, returns via the orchard and claims exactly 3 ore/4 sunmarks/2 fibre. A changed request cannot pay again. New character creation while away preserves independent worlds and restores the original character at its lake checkpoint.

## Actual gameplay footage

See [media and provenance](../evidence/earth-outing/README.md). The final **73.12-second**, silent, **1280×720** recording uses normal RAF, real browser movement/combat/UI and a command-earned fresh bow/Magician source. It takes both scene crossings, switches cameras, finishes a survey and collects once at Oren. Chrome153.0.8010.52 reports ANGLE/NVIDIA RTX3080/D3D11. The video is encoded at25fps; that is not a rendering-performance claim. No GPU frame-time benchmark was run for this change.

## Limits and next acceptance

The road adds a choice of route to existing work; it does not add the Road After Rain story, a new reward economy or a full seamless province. Bellweather still has its established chapter prerequisites. Reload returns to the disclosed valley checkpoint. The route's names, pacing, art and convenience remain prototype choices pending Dom's fresh/returning playtest.

Next: ask whether he knew where to go, whether combat felt better and whether the reward motivated another outing. Then scope Earth E2's Road After Rain with explicit objectives, costs, finite rewards, claims and migration. No main merge, tag, public deployment, new engine, paid generation or background schedule was performed.
