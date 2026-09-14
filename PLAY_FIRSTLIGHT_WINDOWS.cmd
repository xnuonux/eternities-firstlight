@echo off
setlocal
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 (
  where py >nul 2>nul
  if errorlevel 1 (
    echo Python is needed to start the local game. Install Python 3, then open this launcher again.
    pause
    exit /b 1
  )
  py -3 tools\play_local.py %*
) else (
  python tools\play_local.py %*
)
if errorlevel 1 pause
