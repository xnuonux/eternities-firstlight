# Current checkpoint: Road After Rain

Updated 2026-09-20. `gameplay/road-after-rain` is stacked on PR #17 (`gameplay/earth-connected-outing`) at **26dff6e4fe9b2968c3c351ef317e2c03eab1ff19**. Origin and comments were inspected before branching. Main and design archives are not gameplay substitutes. The implementation PR records the exact pushed head, hosted checks and fresh remote-clone receipt.

Read [task](development/ROAD_AFTER_RAIN_TASK_2026-09-20.md), [results](development/ROAD_AFTER_RAIN_RESULTS_2026-09-20.md), NEXT_TASK, PLAYTEST_NOTES and DECISIONS. The recovered Earth prototype/story atlas informed this bounded E2 implementation; names, tuning and pacing remain prototype choices.

## Play

Launch `PLAY_FIRSTLIGHT_WINDOWS.cmd` or `python tools/play_local.py` on the stable loopback origin, port8780. The launcher refuses a different build already serving there rather than changing the save origin or stopping an unrelated process.

1. Take Oren’s initial expedition kit. No main chapter, class or soul choice is required.
2. Map → Hearthwater marker → walk to the lake marker. E, then confirm entry. Cross the footbridge and take the right fork to Fenna at `(7,5)`.
3. E previews all three approaches and the exact reward before acceptance. Repair Ansel’s mill gate for **2 timber**, use Darric’s designated public blocks for **no inventory cost**, or survey Fenna’s ridge/shelter/north-lane detour for **no inventory cost**. Task buttons walk real paths; nearby E presents the available local work.
4. Complete any route, return to Fenna and explicitly send the load by that route. The cart travels offscreen; walk to the west-road handoff beneath the bell `(0,-43)`.
5. Confirm arrival, then explicitly claim **3 copper, 4 sunmarks, 2 fibre, 0 XP**. The delivered load/table and completed public improvements remain. Other improvements stay optional and do not pay again.

**M** opens the local map and delivery review; click the Earth tracker to review active work. **V** switches third person/diorama; **R** resets the current view. Oren’s separate supplies quest, repeat surveys, finite fittings and the orchard riverbank connection remain available. Bellweather’s main chapter entrance retains its Sunward prerequisites.

## State and compatibility

Adventure **8**, new required `earthStory` **1**. Schema7 migrates to an unaccepted story, preserving all older canonical data. World/key9 and character envelope/classPath/starter/pursuit/arsenal/cameraViews1 remain. Levels1–5 and stored XP0–9999 are unchanged. An older schema7 writer rejects schema8 rather than silently erasing delivery history; use this newer build for continued play.

The story owns only accepted tasks, selected delivery route, arrival and one claimed flag. Rules validate location, prerequisites, explicit costs and every reward capacity before mutation. Completed unpaid work remains retryable after a capacity refusal. New request IDs, reload or later improvements cannot repay. Quest blocks never occupy normal inventory. No automatic equip or extra upgrade tier.

Travel remains transient: saving/reopening or switching characters returns to the Firstlight lake while retaining the entire character’s earned work. Personal saves were not used. Both cameras, combat controls, campaign, companion, housing, crops, music/exports, notes, sockets, temper, fittings and explicit choices retain regression checks.

This is a quiet local delivery with procedural residents, not an animated escort, simulated fluid system, expanded town, multiplayer event or recurring contract. Human enjoyment and route-choice acceptance remain pending. No merge, tag, deployment, paid service, new engine or background schedule.
