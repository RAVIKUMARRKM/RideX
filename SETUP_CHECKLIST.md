# ✅ RideX Setup Checklist

Use this checklist to ensure everything is set up correctly before building.

## 📋 Pre-Development Checklist

### System Requirements
- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] PostgreSQL installed and running
- [ ] Android Studio installed (for Android)
- [ ] Xcode installed (for iOS, Mac only)
- [ ] Git installed

### Google Cloud Setup
- [ ] Google Cloud Console account created
- [ ] New project created or existing selected
- [ ] Maps SDK for Android enabled
- [ ] Maps SDK for iOS enabled (if building for iOS)
- [ ] Directions API enabled
- [ ] Places API enabled
- [ ] API Key generated
- [ ] API Key has no restrictions (for development) or proper restrictions (for production)

## 🗄️ Database Setup Checklist

- [ ] PostgreSQL service is running
- [ ] Database `ridex_db` created
- [ ] Can connect to database via pgAdmin or terminal
- [ ] Schema file executed successfully
- [ ] All 9 tables created (run: `\dt` in psql to verify)
- [ ] Database credentials saved securely

**Verify Tables Exist:**
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

Should show:
- users
- drivers
- rides
- ratings
- payments
- promo_codes
- notifications
- otp_codes

## 🔧 Backend Setup Checklist

### Installation
- [ ] Navigated to `backend` folder
- [ ] Ran `npm install` successfully
- [ ] No error messages during installation

### Configuration
- [ ] `.env` file created (copied from `.env.example`)
- [ ] `PORT` set (default: 3000)
- [ ] `DB_HOST` configured
- [ ] `DB_PORT` configured
- [ ] `DB_NAME` set to `ridex_db`
- [ ] `DB_USER` configured
- [ ] `DB_PASSWORD` configured correctly
- [ ] `JWT_SECRET` set (minimum 32 characters)
- [ ] `GOOGLE_MAPS_API_KEY` added

### Testing
- [ ] Backend starts without errors (`npm run dev`)
- [ ] See message: "RideX API Server running"
- [ ] See message: "Database connected successfully"
- [ ] Can access http://localhost:3000/health in browser
- [ ] Health endpoint returns {"status": "OK"}

## 📱 Mobile App Setup Checklist

### Installation
- [ ] Navigated to RideX root folder
- [ ] Ran `npm install` successfully
- [ ] No error messages during installation
- [ ] Dependencies installed (check `node_modules` exists)

### Configuration
- [ ] `.env` file created in root
- [ ] `API_URL` configured (http://10.0.2.2:3000/api for emulator)
- [ ] `SOCKET_URL` configured
- [ ] `GOOGLE_MAPS_API_KEY` added

### Android Configuration
- [ ] Opened `android/app/src/main/AndroidManifest.xml`
- [ ] Added Google Maps API key in `<meta-data>` tag
- [ ] Saved file
- [ ] Android Studio can open project without errors

### iOS Configuration (Mac only)
- [ ] Ran `cd ios && pod install` successfully
- [ ] Opened `ios/RideX.xcworkspace` in Xcode
- [ ] Build configuration set
- [ ] Team selected in Signing & Capabilities

## 🏃 Running the App Checklist

### Backend Running
- [ ] Backend terminal is open
- [ ] Backend running on port 3000
- [ ] No error messages in console
- [ ] Can make API requests

### Android Emulator/Device
- [ ] Android Emulator running OR
- [ ] Physical device connected via USB
- [ ] USB Debugging enabled (for physical device)
- [ ] Device visible in `adb devices`

### iOS Simulator/Device (Mac only)
- [ ] iOS Simulator running OR
- [ ] Physical iPhone connected
- [ ] Device trusted on Mac
- [ ] Certificates valid

### App Launch
- [ ] Ran `npm run android` OR `npm run ios`
- [ ] Metro bundler started
- [ ] App installed on device/emulator
- [ ] App launches without crashing
- [ ] Splash screen appears
- [ ] Login screen loads

## 🧪 Feature Testing Checklist

### Authentication
- [ ] Can enter phone number
- [ ] "Send OTP" button works
- [ ] OTP appears in backend console
- [ ] Can enter OTP
- [ ] OTP verification works
- [ ] Registration screen appears for new user
- [ ] Can complete registration
- [ ] User logged in successfully

### Home Screen
- [ ] Map view loads
- [ ] Current location detected
- [ ] Blue dot shows on map
- [ ] Menu button works
- [ ] Location button works
- [ ] "Where to?" search box visible
- [ ] Recent places list shows

### Destination Selection
- [ ] Tapping "Where to?" opens destination screen
- [ ] Can type in destination
- [ ] Suggestions appear
- [ ] Can select a destination
- [ ] Navigates to ride confirmation

### Ride Booking
- [ ] Ride confirmation screen loads
- [ ] All 4 vehicle types visible (Car, SUV, Bike, Auto)
- [ ] Can select different vehicle types
- [ ] Prices display correctly
- [ ] Fare breakdown shows
- [ ] "Request Ride" button works
- [ ] Confirmation alert appears

### Profile
- [ ] Profile screen accessible from menu
- [ ] User name displays
- [ ] Stats show correctly
- [ ] Menu items visible
- [ ] Logout works

## 🔒 Security Checklist

### Development
- [ ] `.env` files NOT committed to git
- [ ] `.env` added to `.gitignore`
- [ ] Database password is secure
- [ ] JWT secret is long and random

### Production (Before Deployment)
- [ ] Change all default passwords
- [ ] Use strong JWT secret (64+ characters)
- [ ] Enable HTTPS for backend
- [ ] Restrict Google Maps API key
- [ ] Remove console.log statements
- [ ] Set NODE_ENV=production
- [ ] Enable database backups

## 📦 Build Checklist (Before Creating APK/IPA)

### Pre-Build
- [ ] All features tested
- [ ] No console errors
- [ ] App works on emulator/simulator
- [ ] Backend points to production (if deploying)
- [ ] Version number updated in package.json
- [ ] Version code incremented (Android)
- [ ] Icons and splash screens configured

### Android APK
- [ ] Keystore generated
- [ ] Keystore backed up safely
- [ ] gradle.properties configured
- [ ] build.gradle signing config added
- [ ] Ran `gradlew clean`
- [ ] Ran `gradlew assembleRelease`
- [ ] APK generated successfully
- [ ] APK tested on physical device

### iOS IPA (Mac only)
- [ ] Pods installed
- [ ] Archive created
- [ ] Signing configured
- [ ] IPA exported
- [ ] IPA tested on physical device

## 🚀 Deployment Checklist

### Backend Deployment
- [ ] Hosting platform selected (Railway/Render/AWS)
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Backend deployed
- [ ] Backend accessible via HTTPS
- [ ] API endpoints tested

### App Deployment
- [ ] API URLs updated to production
- [ ] Production build created
- [ ] App tested with production backend
- [ ] Screenshots taken for store listing
- [ ] App description written
- [ ] Privacy policy created
- [ ] Terms of service created

### Google Play Store (Android)
- [ ] Developer account created ($25)
- [ ] App listing created
- [ ] AAB file uploaded
- [ ] Store listing completed
- [ ] Content rating completed
- [ ] Pricing and distribution set
- [ ] Submitted for review

### Apple App Store (iOS)
- [ ] Developer account created ($99/year)
- [ ] App created in App Store Connect
- [ ] IPA uploaded
- [ ] App information completed
- [ ] Screenshots uploaded
- [ ] Privacy details completed
- [ ] Submitted for review

## 📊 Final Verification

### Functionality
- [ ] All core features work
- [ ] No crashes or errors
- [ ] Smooth user experience
- [ ] Fast load times
- [ ] Maps load quickly
- [ ] API responses fast

### Performance
- [ ] App size reasonable (<50MB)
- [ ] Loads in <3 seconds
- [ ] No memory leaks
- [ ] Battery usage acceptable
- [ ] Data usage reasonable

### Quality
- [ ] UI looks professional
- [ ] Icons and images high quality
- [ ] Consistent design
- [ ] Good user feedback
- [ ] Error messages helpful

## ✅ Ready for Launch!

When all items are checked:
- ✅ Development environment ready
- ✅ App fully functional
- ✅ Builds successfully
- ✅ Tested thoroughly
- ✅ Production ready

**Congratulations! Your RideX app is ready! 🎉**

---

**Tips:**
- Print this checklist and check items as you complete them
- Keep this file updated with your progress
- Use it for every new build/deployment
- Share with your team

**Need Help?**
- Check README.md for detailed documentation
- Review QUICK_START_GUIDE.md for setup help
- See BUILD_INSTRUCTIONS.md for build issues
