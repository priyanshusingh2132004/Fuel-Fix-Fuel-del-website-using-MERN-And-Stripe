@echo off
echo Starting Fuel Fix Application...

echo Starting Backend...
start "Fuel Fix Backend" cmd /k "cd backend && npm run server"

echo Starting Admin Panel...
start "Fuel Fix Admin" cmd /k "cd admin && npm run dev"

echo Starting Frontend...
start "Fuel Fix Frontend" cmd /k "cd frontend && npm run dev"

echo All services started!
pause
