"""Shared portable Playwright setup for the offline browser checks."""
import os
from pathlib import Path

def chromium_launch_kwargs():
    args = ["--no-sandbox", "--disable-dev-shm-usage", "--enable-webgl", "--ignore-gpu-blocklist", "--disable-gpu-sandbox", "--use-angle=swiftshader"]
    result = {"headless": True, "args": args}
    executable = os.environ.get("FIRSTLIGHT_CHROMIUM_EXECUTABLE")
    if executable:
        result["executable_path"] = executable
    return result

def read_utf8(path: Path):
    return path.read_text(encoding="utf-8")
