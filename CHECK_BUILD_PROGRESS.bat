@echo off
echo ============================================
echo RideX Build Progress Checker
echo ============================================
echo.
echo Checking build output...
echo.

set OUTPUT_FILE=C:\Users\lenovo\AppData\Local\Temp\claude\C--Users-Ravi-Kumar-Apps\tasks\b2554fa.output

if exist "%OUTPUT_FILE%" (
    echo Last 30 lines of build output:
    echo ----------------------------------------
    powershell -Command "Get-Content '%OUTPUT_FILE%' -Tail 30"
    echo ----------------------------------------
    echo.
    echo Press any key to refresh...
    pause >nul
    goto :eof
) else (
    echo Build output file not found yet...
    echo The build might still be initializing.
)

echo.
pause
