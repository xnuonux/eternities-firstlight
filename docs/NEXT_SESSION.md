# Firstlight10 — next development handoff

Historical edition handoff. For the current assignment read [NEXT_TASK.md](NEXT_TASK.md) and [CURRENT_STATE.md](CURRENT_STATE.md). Dom's subsequent starter-region quest/loot/progression priority supersedes the task ordering below; the original text remains preserved as context.

Begin from this complete source package. Read README.md, VALIDATION.md, and docs/BELLWEATHER_CROSSING.md. Build and test; do not substitute Firstlight06 or Shared Commons07. Preserve the founder's save exports and original09 ZIP. Keep the sanctuary/Heaven repository boundaries intact.

## Ask the next real playthrough, then tune

Can Dom see how to continue from the defended beacon? Does M make services and return travel intuitive? Does Briar's explicit search avoid the previous ambiguity between combat skill4 and exploration? Does the Keeper's safe center teach a genuinely different response? Does the camera cutaway help without distracting visual noise? Is the village worth returning to after the reward?

Automated melee/bow success is not human balancing. No extra mandatory grind, class reassignment or moral surveillance is warranted by this build. The three great regional anchors remain unbuilt; the bell village is their first shared approach.

## Highest-value work

1. Bring retained building/decor drawers into the same visual language without pausing placement. Improve keyboard focus, controller/remapping, and portrait/tooltips as real-device feedback suggests.
2. Make the settlement geography less rectangular and add one actual inn interior, with matched collision and exterior return behavior. Do not add five empty houses before one useful room.
3. Improve hit reactions, enemy facing, audible autoattack feedback and companion obstruction recovery. Test all weapons and the existing soul techniques; keep targets visible and predictable.
4. Plan one genuinely different route toward the monastery or living forest. Make its traversal/puzzle teach a new verb, not only larger health pools.
5. Separately prove the authoritative two-client integration into this renderer. Shared-room chat/trade/invasions must not inherit local pause, editable saves or single-player quest assumptions.

## Source delivery

This turn created no remote commit or deployment. SOURCE.bundle is a local history artifact. Reconcile on a review branch and check current remote changes before publishing. Never force a partial GitHub main, expose tokens or activate a historical import workflow with unrelated payload.

The previous9 browser harness lives as `tests/regression09_browser.py` and runs those existing workflows against the current10 HTML. New coverage is `tests/crossing_browser.py`. Domain acceptance is `tests/crossing_journey.cjs`; its frozen input is `examples/REALM10_CHAPTER_III_BASE_EARNED.json`. It performs real commands, not a planted chapter outcome. The new chapter's two optional commission resource fixtures in the browser test are explicitly separate from earned progression.
