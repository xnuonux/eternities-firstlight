# Next task: one starter-region quest and equipment loop

Status: proposed next playable milestone, not implemented by bootstrap. Priority is accepted; final names, geography, rewards and any level-curve expansion remain design proposals.

Owner: Codex implements/integrates; ChatGPT develops/reviews the concrete design; Dom directs taste/names and human playtest. Begin from the reviewed source-import branch head, not old partial branches or a replacement ZIP. Runtime baseline is `d7c57ee47833dad4fb9ec3332d352468abf32109`. Suggested next branch: `gameplay/starter-region-progression`, to be created from the actual accepted head when work starts.

## Bounded deliverable

One optional outing in the existing starter region: an ordinary person's understandable problem, two compatible objectives on a readable route, one ordinary enemy and one named dangerous variation, ordinary loot, and a guaranteed useful equipment reward. Preview it against actual equipment before acceptance. Return, turn in, equip it visibly, feel the change, and hear about the next place without being forced there.

A damaged mill/orchard, riverbank obstruction or stolen worksite supplies are candidate themes, not settled names or copied Warcraft quests. Keep ordinary lives and recognizable stakes alongside the cosmic story.

## First implementation decisions

1. Audit XP/reward sources and representative old level-five saves. XP is retained to 9999 while level caps at five. Specify migration before changing thresholds; preserve stored XP and never replay old rewards. A 1–10 curve is an evaluation proposal, not required in this chain.
2. Define stable quest/objective/reward IDs and a small reusable quest definition/state boundary. Reuse validated commands, equipment comparisons and save transactions.
3. Set a useful reward path for sword and bow users, including a returning character wearing current strongest gear. Avoid fake slots, automatic equipping or unbounded stats.

## Acceptance

- Fresh and returning characters can understand the goal, route and actual reward before committing; the objectives combine into one satisfying outing and return.
- Progress/reward state survives reload. Duplicate turn-in and invalid/full inventory cases cause no extra reward, lost materials or partial mutation.
- Supported old saves retain creative work, companion, equipment, XP, completed quest flags and explicit soul choices. Earlier browser keys remain unchanged.
- Sword and bow complete the chain through real commands/UI. The named threat has a readable tell, recoverable mistake and useful opening. Normal enemies remain approachable.
- Target selection, stationary autoattack and skills are readable; brief hit reactions/feedback make useful attacks perceptible. Do not impose a compulsory high-input action scheme.
- Targeted rule tests and current browser/journey regressions pass. Dom separately assesses whether completion, the upgrade and ordinary combat feel rewarding.

Excluded: another realm, large mountain chapter, story reorder, automatic class/soul choice, empty gear slots, online economy, resident/Heaven integration, public deployment, proprietary asset extraction or Unreal rewrite. Preserve music and homestead capabilities.
