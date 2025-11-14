@echo off
echo Starting SignalForge OS...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:8080
echo.
echo Press any key to exit...
pause >nul

