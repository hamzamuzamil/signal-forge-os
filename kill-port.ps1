# Kill process on port 3001
Write-Host "🔍 Finding process on port 3001..." -ForegroundColor Yellow

$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($process) {
    Write-Host "🛑 Stopping process $process..." -ForegroundColor Red
    Stop-Process -Id $process -Force
    Write-Host "✅ Port 3001 is now free!" -ForegroundColor Green
} else {
    Write-Host "✅ Port 3001 is already free!" -ForegroundColor Green
}

Write-Host ""
Write-Host "You can now start your servers with: npm run dev:all" -ForegroundColor Cyan

