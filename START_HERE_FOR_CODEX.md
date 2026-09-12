# Firstlight10 — complete local source

This package extends Firstlight09 with Bellweather Crossing, Chapter IV, a map/waystone interface, actual camera cutaway and the Hushbound Keeper. The original creative and adventure systems remain integrated.

Read README.md, VALIDATION.md, docs/BELLWEATHER_CROSSING.md and docs/NEXT_SESSION.md. Build `python build.py`; run `node --test tests/*.test.cjs`. The source-only history can be restored with `git clone SOURCE.bundle firstlight10-source`. This is **local** history, not a remote commit or deployment receipt.

The target repository remains `xnuonux/eternities-firstlight`. Inspect its current state before any merge. Use a review branch and preserve founder charters and newer external work. `tools/import_into_checkout.py` is an additive dry-run/apply helper which refuses conflicting files; it is not a merge engine. Do not force-push or claim a push without readback. Never put a PAT, service key or personal save into a public repository.

Bellweather residents are conventional game NPCs. This is not a Luna residency host. Its local counters and save format are not trusted online inventory. No multi-user room or persistent online service is supplied by this package.
