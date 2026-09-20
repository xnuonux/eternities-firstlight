# Current checkpoint: a useful outing through Hearthwater

Updated 2026-09-20. Branch `gameplay/earth-connected-outing` starts from Astra's PR #16 (`gameplay/earth-hearthwater-approach`) at **67b4eebc1026ed1027c4f8777ed33da77edc015b**. That newer Earth implementation supersedes the previous local Cosmos checkout. This review remains stacked on PR #16; main and the archives are not gameplay substitutes.

Read the [task](development/EARTH_CONNECTED_OUTING_TASK_2026-09-20.md), [results](development/EARTH_CONNECTED_OUTING_RESULTS_2026-09-20.md), [vision index](design/COMPREHENSIVE_VISION_INDEX.md), NEXT_TASK, PLAYTEST_NOTES and DECISIONS. The PR records the exact pushed head and subsequent independent remote-clone result.

## Play the connected outing

Launch `PLAY_FIRSTLIGHT_WINDOWS.cmd` or `python tools/play_local.py` on the stable loopback origin, port 8780. The launcher refuses a conflicting older server rather than changing your save origin or stopping another process.

1. At Oren's workshop, take the initial expedition kit. Accept his once-only supplies quest or a separately repeatable materials survey. The Field guide still offers one pinned equipment project and two finite fittings.
2. Open **Map → Read the Hearthwater marker → Walk to the lake trail marker**, or walk to `(0,23)`. Press E and confirm entry.
3. Cross the footbridge and take the western orchard lane to the **Riverbank worksite** sign at `(-13,4)`. E shows your current objectives, danger, reward and return route. Confirm the crossing.
4. Complete the existing riverbank work. The southern exit returns an orchard traveller to the orchard. A traveller who used the original workshop entrance still returns to the workshop.
5. From Hearthwater, use **Return to Firstlight**, then return to Oren for the existing reward. The road accepts no job and pays nothing.

**V** switches third person/diorama; **R** resets the current view. Remembered framing, manual movement, target selection, stationary attacks, skills and companion commands remain. Orchard and ridge routes join beneath Bellweather's landmark; the actual chapter entrance retains its Sunward prerequisites.

The scene has a readable worksite spur, split orchard wall and packed load. Distant hills sit outside the walking/camera corridor; the watercourse lies below its banks. Cosmos invitation labels no longer appear in Earth, the riverbank or interiors.

## Save and ownership contract

No migration. World/key **9**, adventure **7**, character envelope/classPath/starter/pursuit/arsenal/cameraViews **1**, levels **1–5**, stored XP **0–9999** remain.

Earth owns transient travel checkpoints. Starter owns Oren's quest; pursuit owns survey identities, claims and fittings; adventure/arsenal own combat and equipment. Scenes retain their original local scale. The worksite crossing is an explicit transition, not seamless streaming.

Browser travel binds simulation, character, saved revision, source position and destination. It saves before crossing and restores the source if construction fails. The outer Firstlight lake checkpoint remains the serialized location, including in the riverbank via Earth. Reload or character switching returns there while retaining earned objectives and unpaid rewards. Death uses the existing spring and clears the temporary route. Personal saves were not used.

Campaign, Cosmos, music/export, housing, crops, notes, gear identities, sockets, Oren temper, fittings, classes, companions and independent characters retain regression coverage. Human enjoyment and visual acceptance remain pending. No main merge, tag, public deployment, paid generation, Unreal rewrite or background automation.
