# Hearthwater outing evidence

- `HEARTHWATER_OUTING.mp4`: actual 73.12-second Chrome session, normal real-time RAF, automated accepted movement/combat/UI, silent. Both cameras, orchard/worksite crossings and one real survey payout.
- `VIDEO_ACTIONS.json`: all31 scripted actions. No accelerated ticks or gameplay state grants during recording.
- `BOW_SURVEY_SOURCE.json` and `SOURCE_RECEIPT.json`: command-earned initial-kit/crafted-bow/Magician source with one accepted survey; generated through `tests/pursuit_journey.cjs --earth --bow`. Source generation uses accelerated ticks. This is labelled automation data, not a personal save.
- `MEDIA_RECEIPT.json`: exact source/build/video hashes, browser, detected renderer, dimensions, encoding and final claim/balances. The encoded25fps and HUD frame counter are not a qualified GPU benchmark.
- `BROWSER_REPORT.json` and screenshots: final isolated software-WebGL Earth UI run, including full survey, reload, both cameras, character isolation and compact navigation.
- `JOURNEY_SUMMARY.json`: summaries of the three newly command-earned progression cases. Detailed generated action/economy logs remain under ignored `evidence10/pursuit/earth-*` and can be reproduced by the verifier.

Record again with `tools/record_browser_gameplay.py --fixture docs/evidence/earth-outing/BOW_SURVEY_SOURCE.json --actions docs/evidence/earth-outing/VIDEO_ACTIONS.json --output <outside-git-directory>` using a qualified local Chromium executable. Personal browser storage is not needed.

Human pacing, beauty, combat enjoyment and camera comfort remain pending.
