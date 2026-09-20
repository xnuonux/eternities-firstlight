# Road After Rain — implementation and evidence

Base: PR #17, **26dff6e4fe9b2968c3c351ef317e2c03eab1ff19**. Branch: `gameplay/road-after-rain`, stacked on `gameplay/earth-connected-outing`. The PR records the exact final pushed commit, subsequent clean remote-clone result and hosted checks; this note does not pre-claim those post-push events.

## Playable behavior

After the initial kit, Fenna’s request at the Hearthwater mill-road fork offers three compatible noncombat approaches. Clear/repair Ansel’s headrace gate (explicit2 timber), collect Darric’s designated blocks and pack the grade (no inventory cost), or scout the ridge/shelter and mark the north lane (no inventory cost). Read/decline makes no progress. Task navigation uses existing pathfinding; E prioritizes unfinished, available, nearby work and scrolls to it.

Complete a route, return to Fenna and choose it. The UI explicitly describes offscreen cart travel. Meet her at the west-road handoff, confirm arrival and claim once:3 copper,4 sunmarks,2 fibre,0 XP. Other improvements remain possible without replaying the load or reward. Repaired mechanism, road packing, detour markers, delivered flour/apples and a shared table visibly persist. Three original procedural residents give the route local context.

The handoff is outside Bellweather’s existing chapter gate. This permits fresh-kit completion without main campaign advancement. No new combat encounter, raw-power tier, class requirement, forced soul choice, fluid simulation or scripted escort. The material payment supports existing blade/bow projects; it is explicitly not a universal upgrade for fully fitted veterans.

## Ownership and migration

`earth-story.js` owns stable objectives, route prerequisites, costs, arrival and a permanent claimed flag. `earth-story-ui.js` projects those rules; art has no progress or payout authority. The command validates every prerequisite and all three reward capacities before mutation. Partial/complete/unpaid/paid state survives canonical reload. A refused action leaves inventory and entitlement intact. Changed requests, receipt eviction, later improvements and re-entry cannot repay.

Adventure schema8 requires earthStory1. Schema7 adds empty, unaccepted story state without changing existing canonical fields or stored XP. Missing/malformed/future current state is refused. Older schema7 builds refuse schema8; continue with the newer build. World/key9 and all earlier nested versions remain. Whole-world character ownership, source-side travel checkpoints, both camera styles, combat controls, sockets/temper/fittings, creative systems and old chapter choices remain.

## Executed local checks

Python3.13.15 / Node24.18.0. Optional browser environment: `C:/dev/firstlight-artifacts/bootstrap-2026-09-12/browser-env/Scripts/python.exe`.

```text
python build.py
node --test tests/earth-story.test.cjs
node --test tests/*.test.cjs
node tests/earth_story_journey.cjs
node tests/earth_story_journey.cjs --bow
node tests/earth_story_journey.cjs --veteran --sources-ready
python tools/verify.py --browser
python tests/earth_story_browser.py
```

Final generated HTML files are identical: **695,275 bytes**, SHA256 **1e120649179245d10c3fe1a551c88549a53cfbcd020bf2aa71b111b7dcb298b1**.

Local full preflight passed41 syntax checks,530 Node tests (zero failures/skips),27 Python cases (26 passed,1 Windows symlink capability skip),18 command journeys and13 browser suites. A local interaction-priority refinement landed while that aggregate run was in progress, so it is preflight evidence rather than an assertion that every suite used the final HTML. The final Earth-story browser rerun passed142/142 against the final hash. The independent final-head clone reruns the entire verifier; its actual result belongs in the PR receipt.

Browser counts: Crossing115; prior gameplay/creative regression107; cutaway6; reflection8; native-origin persistence11; starter147; camera51; pursuit145; characters67; classes45; Cosmos75; Earth89; Earth story142. Total1008 assertions. Native persistence and software WebGL checks remain distinct from device performance and human experience.

Failures retained: initial rules test failed because the new module did not yet exist (expected red). The first fresh-bow journey lacked enough legitimately gathered bow materials; the setup now gathers the published recipe costs. The first full preflight stopped at the old Crossing schema7 assertion; it now expects the intentional schema8 migration. No gameplay resources or objectives were injected to repair these failures. The subsequent preflight and final targeted run passed.

## Earned journeys and footage

| Case | Route | Equipment preserved | Payment | XP change |
|---|---|---|---|---|
| Fresh blade | surveyed detour | initial Trail blade |3 copper,4 sunmarks,2 fibre |0 |
| Fresh bow | public quarry blocks | crafted Ashwood trail bow |same |0 |
| Returning strongest weapon | mill repair | Dawn’s edge, socket/temper/fittings retained |same, with2 timber spent |0 |

Each journey reloads accepted, partial, ready, dispatched, arrived-unpaid and paid state. No position edits, inventory grants or planted objectives. The browser independently uses visible controls for all three approaches, per-character restoration, menu input, both cameras, compact layout and a labelled full-ore boundary with successful retry.

[Media/provenance](../evidence/road-after-rain/README.md):92.68seconds,1280×720,silent,normal RAF,37 automated actions on Chrome153.0.8010.52 with RTX3080/D3D11 detected. Encoded25fps is not an FPS measurement. Screenshots were visually inspected; no concept art substitutes for game footage.

## Remaining acceptance

Dom has not played this new story yet. Ask whether directions were clear, the alternatives felt meaningful and the arrival was worthwhile, with one fresh and one returning character. The inn/gathering continuation, animated escort, fluid simulation, larger settlement and repeatable work remain separate scope. No automatic main merge, deployment, tag, paid generation, Unreal rewrite or restarted three-hour automation.
