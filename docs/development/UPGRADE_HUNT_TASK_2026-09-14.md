# An Upgrade Worth Hunting

Authorized by Dom on 2026-09-14. Base: `932db44ebfd85bf52e8e165d899c7db48dec5ebd`, current PR #7 gameplay head after fetch. Branch: `gameplay/upgrade-worth-hunting`, stacked against `gameplay/interchangeable-views`. PR #9 at `4f225b2ddce3a1fedafb3b97c92d6e58d8f7e952` supplies founder answers, Draft D and the implementation assignment. Those three files were read in full using their archive ref. PR #8 remains the earlier story archive. Neither archive is a gameplay replacement.

## Settled implementation slice

- A field guide projects real weapon/source/craft definitions. Pin one owned weapon or attainable local craft; quest-only weapons stay explicitly once-only and cannot promise an unavailable second choice. Show the selected weapon now, after the next fitting, and against current equipment, including cadence, reach, stamina, guard, health and socket. Local recipes do not require campaign completion.
- A separately accepted **Riverbank materials survey** uses existing riverbank geography. Two survey skitters and two identified material samples earn exactly **3 copper ore, 4 sunmarks and 2 meadow fibre** at Oren, with **0 XP** and no individual enemy caches. The explicit reward is paid on every deliberately completed run. No timer, first-clear bonus or scaling to equipped strength.
- An active survey temporarily owns the riverbank encounter roster. Oren's supplies/Old Bristle pause with every existing flag retained; after claiming the survey, ordinary quest visits resume. Entry, collision, practice target, attacks and retreat use the existing production rules. Defeated survey enemies and samples resume on reload. Undefeated enemies recover on leaving/reload, as existing transient encounters do. Player reload remains at the safe outdoor checkpoint.
- The paid-run ledger is a contiguous sequence: `claimed` means runs 1 through that number were paid exactly once. There can be only one outstanding run, ID `riverbank-survey/<claimed+1>`, terms version 1. Start requires the last claimed number observed by the explicit start action; claim and sample require the exact active run ID. Old commands cannot begin or pay a later run after request receipts expire. Claim capacity failure retains the full entitlement.
- Any owned weapon can receive **River fitting I**, then **River fitting II**, each once per weapon ID. Each step adds exactly **+2 attack**, preserving weapon identity, socket, Oren temper, cadence/range/stamina, armor, health and equip state. Step I costs 3 ore / 4 sunmarks / 2 fibre; step II costs 6 / 8 / 4. Three surveys fund the two-step fitting chain from zero materials. Existing copper and bow crafting remain additional deliberate options with their original costs. A copper band, then pale-metal second band show the actual fitting on weapon and character preview.

## Literal comparison targets

These are implementation tuning choices for playtest. All values use existing level/gear rules; no level cap change.

| Character | Before | Fitting I | Fitting II | Other behavior preserved |
|---|---:|---:|---:|---|
| Fresh kit, trail blade, level 1 | 16 attack | 18 | 20 | .52s / 2.65 reach / 0 stamina, 1 guard, 100 HP |
| Fresh crafted trail bow, level 1 | 13 attack | 15 | 17 | .75s / 11 reach / 6 stamina, 1 guard, 100 HP |
| Level 1 copper blade | 23 attack | 25 | 27 | Blade behavior; old blade retained |
| Level 1 copper bow | 21 attack | 23 | 25 | Bow behavior; trail bow retained |
| Chapter IV Dawn's edge + keeper coat + chime clasp | 42 attack | 44 | 46 | .52s / 2.65 / 0, 13 guard, 200 HP |
| Same veteran after existing Oren temper | 44 attack | 46 | 48 | Existing +2 remains separate; socket bonus remains additive |

## Ownership, persistence and verification

`pursuit.js` owns definitions, guide projections, run/claim ledger and fitting transactions. `pursuit-ui.js` owns the visible field guide, one project tracker and survey interaction. Adventure roster/damage/stat dispatch remains authoritative; starter owns geography. Art only reads state. New **optional adventure.pursuit version 1** defaults to an empty record on older saves; malformed present records refuse import. World9/key9, adventure6, starter1, cameraViews1 and banked XP remain unchanged. No class inference or new character ownership model.

First write regression tests that fail at the real command and persistence boundaries. Then implement rules, UI/art, a command-earned blade/bow/veteran journey and browser tests, including two explicit paid runs, partial/complete reload, stale IDs, atomic refusal, deliberate equip, real practice hits and unchanged creative/story state. Run the current verifier and all browser suites at the release gate because this touches shared combat/save/UI callers; no broad asset regeneration. Record actual normal-RAF gameplay separately from accelerated checks, push a draft stacked PR and reproduce the final build/checks from a fresh remote clone. Human enjoyment and comfortable framing remain pending questions, never inferred from automation.

Roster/classes, rare collecting, online/trading, unresolved paid power/loss/construction decisions and native-engine work stay separate. No main merge, public deployment, protected-resident changes or personal-save access.
