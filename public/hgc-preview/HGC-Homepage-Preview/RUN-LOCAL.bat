@echo off
cd /d "%~dp0"
start "HGC Website Preview" http://localhost:8001
python -m http.server 8001
pause
