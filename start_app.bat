@echo off
title Starting Node.js Server and Opening Browser

REM Change directory to your project folder
REM IMPORTANT: Replace "C:\path\to\your\admin-app" with the actual path to your SvelteKit project
REM cd /d "C:\path\to\your\admin-app"

echo Starting Node.js server...
start cmd.exe /k "npm start"

REM Give the server some time to start up (e.g., 5-10 seconds)
REM You might need to adjust this delay depending on your project's startup time
echo Waiting for server to start...
timeout /t 7 /nobreak

REM Open the specific URL in your default web browser
REM IMPORTANT: Replace "http://localhost:5173/dashboard" with your desired URL
echo Opening browser...
start "" "http://localhost:3000/login"

echo Done.
exit