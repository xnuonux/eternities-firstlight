# Chosen class experiment: implementation evidence

Base PR #11: `93cf94ec2327d700007534e458293aff408acf07`. Implementation branch `gameplay/chosen-class-experiment`. Prepared during the 2026-09-14 autonomous window ending 07:00 Central. Final exact pushed head and remote-clone verification belong in the delivery PR receipt.

## Implemented behavior, comparisons and observed effects

Optional explicit Hunter/Magician choice, exact visible preview and confirmation, separate X technique, authoritative damage/LOS/stamina/cooldown, original colored effects, durable class cooldown, transient encounter-specific mark, and independent character restoration. No grants or implicit assignment. World9/character-envelope1 remain; adventure6 migrates to7 with classPathv1.

| Equipment context | Attack | Hunter next confirmed normal impact | Magician spell |
|---|---:|---:|---:|
| Initial trail blade | 16 | 24 | 20 |
| Initial trail bow | 13 | 20 | 18 |
| Command-earned fitted copper blade | 27 | 41 | 28 |
| Command-earned fitted copper bow | 25 | 38 | 27 |
| Command-earned strongest Dawn's edge fixture | 48 | 72, capped +24 | 44 |

Hunter costs15 stamina, cooldown8 seconds, range11, mark8 seconds. Magician costs25, cooldown10 seconds, range8. Blade/bow cooldowns, range, sockets and weapon skills remain unchanged. Both techniques use confirmed target resolution; a miss or obstruction cannot manufacture successful-hit feedback. The initial kit and equipped copper-bow cases were exercised through actual browser inputs. The table evaluates the production formula under the named real loadouts. Directly observed impacts include initial blade24/20, initial bow20, fitted blade spell28 and fitted bow38; the veteran preview confirms the +24 cap. Other table cells are computed comparisons, not separate gameplay recordings. Enjoyment is unmeasured.

## Work found during verification

The class choice UI initially referenced nonexistent delegated APIs and passed a simulation where canonical adventure state was required. Root wired it to the actual production command/definition/status interfaces, corrected numeric color rendering and put the technique in the existing compact row. Rendered wide/narrow screens were inspected.

The first drafted class journey incorrectly recreated the simulation for every command and lost transient scene/target state; a later draft failed to re-enable autoattack after the first target died. Root replaced it with a persistent simulation journey, legitimate navigation, class use, confirmed weapon impacts, both survey objectives and atomic claim. The completed journey uses **42 accepted game commands and 8 deliberate refusals**, two independent `riverbank-survey/6` claims, and a separate strongest veteran choosing without changes to equipment, socket, upgrades, XP563 or soul history. Imported sources are explicitly labelled; no position edits, grants or planted defeats are used. Movement ticks are accelerated.

The first full browser run stopped at an old test's hard-coded adventure version6 expectation. The test now asserts the intentional version7 migration. A second run caught the old assertion counting seven total skill DOM nodes. It now verifies seven visible original skills and a hidden optional class button for an unassigned character; the class browser suite separately verifies eight visible controls after choosing. No game rule or gameplay assertion was removed to hide a failure.

## Verification status

The final local `python tools/verify.py --browser` passed: **33 source syntax checks, 489 Node rules, 19 Python helper passes plus one explicit Windows symlink-privilege skip, ten command journeys and all 688 browser assertions across ten suites**. Browser breakdown: Crossing115, prior gameplay/creative107, cutaway6, reflections8, native restart11, starter147, cameras51, equipment pursuit142, characters63 and classes38. There are no final failures. The earlier version/slot assertion failures remain described above and their logs are retained.

Both checked-in HTML outputs rebuild identically at **608,460 bytes**, SHA-256 `e5d203dc6912388c5c2a962aaf08a90638f9a164dbcd6c2bd6c0af3e69253b76`. Full local logs: `C:/dev/firstlight-artifacts/chosen-class-2026-09-14/full-verification-3/`. The development Python environment supplied Playwright; ordinary source verification also ran with the system Python. The exact-head fresh remote clone must pass the complete verifier after push; the PR delivery receipt records that separate result.

## Actual gameplay

[The 50.08-second actual recording](../evidence/classes/hunter-and-magician.mp4) joins a fresh Magician and a separately earned bow Hunter. Both choose through the visible UI, exercise practice and real survey combat, and switch camera styles. Chrome153 at1280×720 reported RTX3080 through ANGLE D3D11. These are silent, scripted normal-frame sessions, distinct from software-WebGL tests and from a frame-time benchmark. [Receipts and reproducible inputs](../evidence/classes/README.md) retain each session's exact build, initial state and accepted actions. Both recordings completed without browser errors. Still frames were visually inspected.

## Limits and next acceptance

One technique per class is a bounded experiment. No class-specific gear, tree, level-cap expansion, soul change, respec economy, pet allocation or online authority is implied. Choice is once per character in this prototype and stated before confirmation. Personal saves were not accessed. Older schema6 builds refuse a newly saved schema7 world; the current save destination is updated normally and managed legacy keys remain present.

Dom's class fantasy, combat enjoyment, reward motivation and camera comfort remain pending. The command journey's quick fights with upgraded gear do not establish fresh-player pacing. Exact fresh/returning human questions are in PLAYTEST_NOTES. No merge, release tag, deployment or Unreal work occurred.
