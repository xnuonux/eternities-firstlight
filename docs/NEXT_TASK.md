# Next task: play the new view through the ordinary outing

Dom requested the third-person camera and graphics pass on 2026-09-13. It is implemented on `gameplay/third-person-visual-polish`, stacked against unmerged PR #5. Start at [CURRENT_STATE](CURRENT_STATE.md) and [results](development/THIRD_PERSON_RESULTS_2026-09-13.md). Fetch current branches and comments before extending the work.

Play one fresh-kit case and one returning campaign case on an isolated origin. Start with Adventure at 60 vertical FOV, try 70–80, then compare Follow/Tactical. Record whether the character stays readable, clearance causes uncomfortable pull-in, and the route remains clear during combat. R resets behind the character; drag orbits; wheel changes distance. Name concrete confusing shapes or views when discussing the procedural art.

The original outing questions remain: **did you know where to go, did fights feel better, and did the reward make you want another outing?** Add camera distance/FOV and any obstruction to PLAYTEST_NOTES. A short automated recording is not the proposed 10–20 minute human pacing test.

Astra can review the camera/picking/preference diff, unchanged gameplay rules, footage and fresh verification receipt in the implementation PR. No taste approval or human combat enjoyment follows from automated checks.

Prioritize concrete camera, route, reward or combat friction before a larger asset pipeline or second quest. Keep the original optional story order, browser target, creative/home/companion systems and explicit soul choices. A 1–10 curve needs a separate banked-XP migration decision. Main merge, release tags, public deployment, recurring work, a new realm and an Unreal rewrite remain outside this checkpoint.
