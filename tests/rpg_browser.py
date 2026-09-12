"""Compatibility entrypoint: current build, inherited RPG UI acceptance."""
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name("regression09_browser.py")),run_name="__main__")
