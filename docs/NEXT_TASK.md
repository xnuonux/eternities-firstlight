# Next task: play the outing with both camera styles

Dom approved the graphics direction and requested interchangeable third-person and 2.5D diorama views on 2026-09-13. They are implemented on `gameplay/interchangeable-views`, stacked against unmerged PR #6. Start at [CURRENT_STATE](CURRENT_STATE.md) and [results](development/INTERCHANGEABLE_VIEWS_RESULTS_2026-09-13.md). Fetch current branches and comments before extending the work.

Play one fresh-kit case and one returning campaign case on an isolated origin. Start with third person at 60 vertical FOV, try 70–80, then use V to compare Diorama/Tactical. Each view keeps its framing; R resets only the current style. Record whether the character stays readable, clearance causes uncomfortable pull-in, and the route remains clear during combat. Drag orbits; wheel changes distance/zoom. Name concrete confusing shapes or views when discussing the procedural art.

The original outing questions remain: **did you know where to go, did fights feel better, and did the reward make you want another outing?** Add camera distance/FOV and any obstruction to PLAYTEST_NOTES. A short automated recording is not the proposed 10–20 minute human pacing test.

Astra can review the framing/persistence/input diff, unchanged gameplay rules, footage and fresh verification receipt in the implementation PR. Dom's visual approval is recorded separately from the unanswered gameplay questions. Automated checks do not establish human comfort or combat enjoyment.

Prioritize concrete camera, route, reward or combat friction before a larger asset pipeline or second quest. Keep the original optional story order, browser target, creative/home/companion systems and explicit soul choices. A 1–10 curve needs a separate banked-XP migration decision. Main merge, release tags, public deployment, recurring work, a new realm and an Unreal rewrite remain outside this checkpoint.
