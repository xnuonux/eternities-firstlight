# Realm10 example saves

`REALM10_CROSSING_READY_EARNED.json`: command-earned Chapter III completion at the Commons, before all Chapter IV actions. Its previous Grace/cinder choices belong to this test character. Importing replaces the currently loaded world; export yours first.

`REALM10_CHAPTER_III_BASE_EARNED.json`: unchanged earlier-schema input used by the new tests, retained to test actual migration.

The remaining examples are preserved older-version fixtures, not rewritten as newly earned10 saves.

# Optional worlds — read before importing

**Export your current world first. Import replaces the active world; it does not merge progress.** None of these are a private user or protected resident save, and none prove legitimate online achievements.

## New in Realm09

`BEACON_READY_EARNED.json` is a safe exterior checkpoint at the Sunward Road entrance. Chapter II was completed by the existing accepted-command journey; Chapter III has no appearance, rewards, or soul changes. It was created by `tests/beacon_journey.cjs` through accepted walking and chapter entry. The mine and road remain completed; this is not the fresh-world default. Enter the Sunward Road and walk to its lit beacon.

`REALM09_ARMORY_MATERIALS_EARNED.json` and `REALM09_ARMORY_COMPLETE_EARNED.json` are actual current-run outputs of the command-only armory journey. They are explicit browser QA/demo checkpoints, not grants silently added to a new game. The earlier `ARMORY_COMPLETE_EARNED.json` remains unchanged as a migration example.

`REALM09_BOW_CHAPTER_II_COMPLETE_EARNED.json` is the current command-earned ranged-road completion used to qualify the new invasion with a bow.

## Earlier Realm08 examples

- `RANGE_READY_EARNED.json`: chapter I completed through accepted game commands; timber/fibre/stone gathered; trail bow crafted and equipped at Oren’s workshop. The practice medal and gems have not been granted. Enter the court through Armory. Reproducible with `node tests/arsenal_journey.cjs`.
- `ARMORY_COMPLETE_EARNED.json`: the same command-driven run after actual range completion, ore excavation, bow upgrades, and gem fitting. A longbow has a ruby; the trail bow retains amber; a moonstone is loose. This is a demonstration checkpoint, not a new-game default.

## Earlier editions, preserved as migration examples

`CHAPTER_START_EARNED.json`, `CHAPTER_COMPLETED_EARNED.json`, and chapter-II start/completion files originate from earlier automated accepted-command journeys. Their earlier schema versions are intentional.

`OPTIONAL_HOMESTEAD_SAVE.json` additionally used controlled visitor positioning for a labeled visual fixture. It is not a manual playthrough. The shipped fresh game remains a separate starting state.

Keep original exports when changing editions or opening different file paths. Local browser storage is not a portable backup.
