# Actual connected-outing evidence

This folder records the generated Firstlight build with SHA-256 `643107c97521ebfc336d8bb41e03bb041bd9ab3be46622df1074b595b9bcff80` (611,694 bytes). The implementation PR records the exact source head and separate fresh remote-clone result. This evidence uses isolated synthetic worlds and never reads Dom's personal saves.

## Watch the playable flow

[workshop-to-upgrade.mp4](workshop-to-upgrade.mp4) is a **63.96-second, silent, 1280 × 720, 25 fps** recording of the actual game running in Chrome 153.0.8010.36 on the RTX 3080 through ANGLE Direct3D11. It contains two real excerpts from the complete 200.76-second recording: seconds **0–24** and **160.76–200.76**. The intervening time is omitted. There is no generated animation or simulated footage.

The full run starts fresh, earns the expedition kit, chooses Magician explicitly, and follows the practice and field-guide links. It completes five deliberately accepted materials surveys with ten actual skitter defeats, ten samples and five claims, then crafts the copper blade, applies both finite fittings, equips deliberately and confirms a 27-point practice impact. The final world has **0 stored XP**, so this equipment progress does not require advancing the main campaign. Oren's original supplies quest remains unaccepted and unpaid.

[FULL_OUTING_RECORDING.json](FULL_OUTING_RECORDING.json) records completion of all 177 scripted steps, the returned command/check results, final state, renderer, source hash and video hashes. [full-outing-actions.json](full-outing-actions.json) reproduces the journey through the existing recording helper. Commands still pass the actual game rules; movement and combat use normal elapsed time, without position edits, reward grants or accelerated simulation. The complete uncropped recording remains at `C:/dev/firstlight-artifacts/outing-readability-2026-09-14/full-outing-video-final/full-outing.mp4` (55,591,665 bytes, SHA-256 `3026f4bcb4eaf2b6348f981b1ee9ab617fcc39f2362b372265bd854f709c1ebc`). The short clip's SHA-256 is `fb77c89d3c17551f21b701d76f50aed688b771af2a529af20c3a8aea33477874`.

Screenshots retain [Oren's service page](OREN_SERVICE.png), [the walk toward practice](CLASS_PRACTICE_LINK.png), [the final equipped upgrade and confirmed impact](FINAL_UPGRADE.png), [saved class identity in the roster](CLASS_ROSTER.png), and [the narrow class view](CLASS_NARROW.png). The walking screenshot's historical filename does not mean it shows the class card itself.

## Verification and hardware sample

[LOCAL_VERIFICATION.json](LOCAL_VERIFICATION.json) records the complete browser gate and subsequent launcher/source gate at the same game hash: **489 Node rules, 26 Python passes plus one explicit Windows symlink-privilege skip, 10 command journeys and 702 browser assertions**. The browser checks use software WebGL and are separate from the hardware measurement. The retained character/class/pursuit reports include the new visible-flow checks and delayed-file ownership regressions.

[RTX_FRAME_REPORT.json](RTX_FRAME_REPORT.json) records a separate normal-time hardware sample: installed Chrome 153, NVIDIA RTX 3080 with 10,240 MiB VRAM, driver 610.74, D3D11, balanced quality, actual 1920 × 1080 drawing buffer, and CDP-confirmed WebGL/GPU compositing. Six contexts cover village, riverbank and active bow practice in both third person and diorama. Each retains 2,160 raw RAF intervals after a 1.5-second warmup. Across 12,960 intervals, each context has p50 6.9 ms, p95 7.0 ms and p99 7.1 ms; maximum 27.8 ms, with no intervals over 33.333 ms or 50 ms. The setup and fixture are identified by hash, and six rendered scene captures are retained.

This is a headless browser-frame measurement, not GPU completion time, monitor presentation, input latency, thermal qualification, all-scene performance or human comfort. No browser tests or video capture ran concurrently with the sample. The scripted journey duration and green checks cannot establish whether repetition or class combat is enjoyable.

## Pending founder playtest

Try one fresh Magician and a returning bow Hunter. Was it clear where to go? Did the fights and technique feel better? Did the resulting equipment make another outing appealing? Class balance and permanent-choice acceptance remain open. Neither this evidence nor the review PR merges main or deploys the game.
