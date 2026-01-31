@echo off
echo ============================================
echo RideX APK Build Script
echo ============================================
echo.

echo Step 1: Checking environment...
where java >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 from: https://adoptium.net/
    pause
    exit /b 1
)

echo Java found!
java -version

echo.
echo Step 2: Navigating to android directory...
cd /d "%~dp0android"

echo.
echo Step 3: Cleaning previous builds...
if exist "app\build" (
    rmdir /s /q "app\build"
    echo Cleaned app\build directory
)

echo.
echo Step 4: Running Gradle wrapper...
echo This will download Gradle 8.5 (first time only)
echo Please wait...

call gradlew.bat clean

echo.
echo Step 5: Building Debug APK...
echo This may take 5-10 minutes on first build...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo SUCCESS! APK Built Successfully!
    echo ============================================
    echo.
    echo Your APK is located at:
    echo %~dp0android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo File size:
    dir app\build\outputs\apk\debug\app-debug.apk | find "app-debug.apk"
    echo.
    echo You can now install this APK on your Android device!
    echo.
) else (
    echo.
    echo ============================================
    echo BUILD FAILED!
    echo ============================================
    echo Please check the errors above.
    echo.
    echo Common fixes:
    echo 1. Make sure Java 17 is installed
    echo 2. Check your internet connection
    echo 3. Try running this script again
    echo.
)

pause
