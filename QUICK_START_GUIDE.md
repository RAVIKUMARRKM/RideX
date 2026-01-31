# 🚀 RideX - Quick Start Guide

This guide will get you up and running in **15-20 minutes**.

## ⚡ Quick Setup (For Testing)

### Step 1: Install Prerequisites (5 min)

**Install Node.js:**
- Download from: https://nodejs.org/
- Install LTS version (v18 or higher)
- Verify: Open CMD and run `node --version`

**Install PostgreSQL:**
- Download from: https://www.postgresql.org/download/windows/
- Install with default settings
- Remember the password you set for 'postgres' user

**Install Android Studio (For Android APK):**
- Download from: https://developer.android.com/studio
- During installation, make sure to install:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device

### Step 2: Set Up Database (3 min)

1. Open **pgAdmin** (installed with PostgreSQL)
2. Connect to PostgreSQL server (use password you set)
3. Right-click "Databases" → Create → Database
4. Name it: `ridex_db`
5. Click Save

### Step 3: Configure Backend (3 min)

Open terminal in `C:\Users\Ravi Kumar\Apps\RideX\backend`:

```bash
cd "C:\Users\Ravi Kumar\Apps\RideX\backend"

# Install dependencies
npm install

# Create .env file
copy .env.example .env
notepad .env
```

**Edit .env file with these values:**
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ridex_db
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

JWT_SECRET=ridex_super_secret_key_2024_development_only

GOOGLE_MAPS_API_KEY=GET_FROM_GOOGLE_CLOUD_CONSOLE
```

**Create database tables:**
```bash
# Run schema file
psql -U postgres -d ridex_db -f src/database/schema.sql
```

If psql command doesn't work, open `src/database/schema.sql` in pgAdmin and execute it.

**Start backend:**
```bash
npm run dev
```

Keep this terminal open. You should see:
```
🚀 RideX API Server running on port 3000
✅ Database connected successfully
```

### Step 4: Configure Mobile App (3 min)

Open a NEW terminal in `C:\Users\Ravi Kumar\Apps\RideX`:

```bash
cd "C:\Users\Ravi Kumar\Apps\RideX"

# Install dependencies
npm install

# Create .env file
copy .env.example .env
notepad .env
```

**Edit .env file:**
```env
API_URL=http://10.0.2.2:3000/api
SOCKET_URL=http://10.0.2.2:3000
GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

### Step 5: Get Google Maps API Key (5 min)

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable these APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
4. Go to Credentials → Create Credentials → API Key
5. Copy the API key
6. Paste it in both `.env` files (backend and mobile app)

**Configure for Android:**
Edit `android/app/src/main/AndroidManifest.xml`:

Find `<application>` tag and add inside it:
```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
```

### Step 6: Run the App (2 min)

**Option A: On Android Emulator**

1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Create a new device (if not exists) and start it
4. In terminal, run:

```bash
npm run android
```

**Option B: On Physical Android Device**

1. Enable Developer Options on your phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back → Developer Options → Enable USB Debugging
2. Connect phone via USB
3. Run:

```bash
npm run android
```

## 🎯 Testing the App

### Login Flow:
1. App will open with Splash Screen
2. Click through to Login
3. Enter any phone number (e.g., `1234567890`)
4. Click "Send OTP"
5. **Check backend terminal** - it will show the OTP
6. Enter the OTP (e.g., `4762`)
7. Fill in registration details
8. You're in!

### Test Ride Booking:
1. On Home screen, tap "Where to?"
2. Select any destination
3. Choose vehicle type
4. Click "Request Ride"
5. You'll see a confirmation (demo mode)

## 📦 Building APK for Physical Testing

### For Windows:

```bash
cd android

# Build release APK
gradlew assembleRelease

# APK location:
# android\app\build\outputs\apk\release\app-release.apk
```

### Transfer APK to Phone:

1. Connect phone via USB
2. Copy APK from: `android\app\build\outputs\apk\release\app-release.apk`
3. Paste to phone storage
4. On phone, open file manager → tap APK → Install

**Note:** You might need to allow "Install from unknown sources" in phone settings.

## 🐛 Quick Troubleshooting

### Backend won't start:
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <process_id> /F
```

### Can't connect to backend from app:
- Make sure backend terminal shows "Server running"
- For emulator, use `10.0.2.2:3000`
- For physical device, use your PC's IP (e.g., `192.168.1.100:3000`)

### Database connection error:
- Verify PostgreSQL is running (check Services in Windows)
- Double-check password in .env file
- Make sure database `ridex_db` exists

### Metro bundler error:
```bash
npx react-native start --reset-cache
```

### Android build error:
```bash
cd android
gradlew clean
cd ..
npm run android
```

## 📱 Getting Your PC's IP Address (for physical device testing)

```bash
ipconfig
```

Look for "IPv4 Address" under your active network adapter.
Use this IP in your .env file instead of `10.0.2.2`.

## ✅ Success Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `ridex_db` created
- [ ] Backend running on port 3000
- [ ] Google Maps API key configured
- [ ] Android emulator or device ready
- [ ] App launches successfully
- [ ] Can send and verify OTP
- [ ] Can see map on home screen
- [ ] Can search destinations
- [ ] Can select ride type

## 🎉 You're Ready!

The app has:
✅ Authentication (Login/Register)
✅ Maps Integration
✅ Location Detection
✅ Ride Booking
✅ Multiple Vehicle Types
✅ Fare Estimation
✅ Profile Management

## 📞 Need Help?

Check the main README.md for detailed troubleshooting.

---

**Happy Coding! 🚗💨**
