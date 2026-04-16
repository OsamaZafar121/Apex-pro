# Start server in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\osama\apex\server; node src/index.js" -WindowStyle Hidden
Start-Sleep -Seconds 3
cd C:\Users\osama\apex\server
node test-booking.js