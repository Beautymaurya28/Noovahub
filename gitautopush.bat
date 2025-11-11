@echo off
cd /d "D:\NoovaHub"
:loop
git add .
git commit -m "Auto update at %date% %time%" >nul 2>&1
git push origin main >nul 2>&1
timeout /t 60 >nul
goto loop
