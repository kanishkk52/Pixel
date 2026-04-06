@echo off

echo 🚀 Starting Face Service...
start cmd /k "cd /d C:\pixal\face_service && python app.py"

timeout /t 2 > nul

echo 🚀 Starting Django Backend...
start cmd /k "cd /d C:\pixal\pixel_backend && python manage.py runserver"

timeout /t 2 > nul

echo 🚀 Starting React Frontend...
start cmd /k "cd /d C:\pixal\Pixel && npm run dev"

echo ✅ All services started!
pause