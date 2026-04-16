@echo off
echo ============================================
echo Apex Pro Cleaners - Server Setup
echo ============================================
echo.

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    exit /b 1
)
echo.

echo [2/3] Syncing database...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma client
    exit /b 1
)

call npx prisma db push --skip-generate
if errorlevel 1 (
    echo WARNING: Database sync failed, creating new database...
    call npx prisma migrate reset --force --skip-generate --skip-seed
)
echo.

echo [3/3] Starting server...
echo.
echo Server will start on http://localhost:3001
echo Press Ctrl+C to stop
echo.

call npm run dev
