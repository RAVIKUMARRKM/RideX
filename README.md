# RideX - Ride Hailing Application

A modern, full-featured ride-hailing application built with React Native for mobile (Android & iOS) and Node.js for the backend.

## 📱 Features Implemented

### Module 1: Authentication & Profile Management
- ✅ Phone number login with OTP verification
- ✅ User registration
- ✅ Profile management
- ✅ JWT-based authentication
- ✅ Social login UI (ready for integration)

### Module 2: Ride Booking & Management
- ✅ Interactive map view with Google Maps
- ✅ Current location detection
- ✅ Destination search
- ✅ Multiple vehicle types (Car, SUV, Bike, Auto)
- ✅ Fare estimation
- ✅ Ride request functionality
- ✅ Ride history

### Module 3: Real-time Features (Basic)
- ✅ Socket.IO integration for real-time updates
- ✅ Ready for driver location tracking
- ✅ Ready for live ride updates

### Module 4: Backend API
- ✅ RESTful API with Express.js
- ✅ PostgreSQL database
- ✅ Authentication endpoints
- ✅ User management
- ✅ Ride management
- ✅ Fare calculation
- ✅ Error handling & validation

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **Framework:** React Native 0.72
- **Navigation:** React Navigation
- **State Management:** Zustand
- **Maps:** React Native Maps (Google Maps)
- **Location:** React Native Geolocation Service
- **HTTP Client:** Axios
- **Real-time:** Socket.IO Client
- **Storage:** Async Storage

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Real-time:** Socket.IO
- **Security:** Helmet, CORS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required for Both Platforms:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Git**
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)

### For Android Development:
- **Android Studio** - [Download](https://developer.android.com/studio)
- **JDK** (Java Development Kit 11 or higher)
- **Android SDK** (installed via Android Studio)
- **Android Emulator** or physical Android device

### For iOS Development (Mac only):
- **Xcode** (v12 or higher) - [Mac App Store](https://apps.apple.com/app/xcode/id497799835)
- **CocoaPods** - Install via: `sudo gem install cocoapods`
- **iOS Simulator** or physical iOS device
- **Apple Developer Account** (for physical device testing)

### Additional Requirements:
- **Google Maps API Key** - [Get one here](https://developers.google.com/maps/documentation/javascript/get-api-key)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
cd "C:\Users\Ravi Kumar\Apps"
# Repository is already in RideX folder
cd RideX
```

### Step 2: Backend Setup

#### 2.1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2.2. Set Up Environment Variables

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env file with your actual values
notepad .env
```

**Required Environment Variables:**
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ridex_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRES_IN=7d

GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

#### 2.3. Create PostgreSQL Database

Open PostgreSQL command line or pgAdmin and run:

```sql
CREATE DATABASE ridex_db;
```

#### 2.4. Run Database Migrations

```bash
# Create tables
psql -U postgres -d ridex_db -f src/database/schema.sql

# Or if using pgAdmin, open schema.sql and execute the script
```

#### 2.5. Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 RideX API Server running on port 3000
📱 Environment: development
🌐 http://localhost:3000
✅ Database connected successfully
```

### Step 3: Mobile App Setup

#### 3.1. Install Mobile App Dependencies

```bash
# From RideX root directory
npm install
```

#### 3.2. Set Up Environment Variables

```bash
# Copy the example file
copy .env.example .env

# Edit with your values
notepad .env
```

**Required Variables:**
```env
API_URL=http://10.0.2.2:3000/api
SOCKET_URL=http://10.0.2.2:3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Note:** `10.0.2.2` is used for Android Emulator to access localhost.
For physical devices, use your computer's IP address (e.g., `http://192.168.1.100:3000/api`)

#### 3.3. Configure Google Maps API Key

**For Android:**
Edit `android/app/src/main/AndroidManifest.xml` and add:

```xml
<application>
  ...
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
</application>
```

**For iOS:**
Edit `ios/RideX/AppDelegate.mm` and add at the top:

```objc
#import <GoogleMaps/GoogleMaps.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];
  // ... rest of the code
}
```

### Step 4: Platform-Specific Setup

#### For Android:

1. **Start Android Emulator:**
   - Open Android Studio
   - Go to Tools → Device Manager
   - Create/Start an Android Virtual Device (AVD)

2. **Or connect physical Android device:**
   - Enable Developer Options on your device
   - Enable USB Debugging
   - Connect via USB

#### For iOS (Mac only):

1. **Install iOS dependencies:**

```bash
cd ios
pod install
cd ..
```

2. **Open Xcode:**
   - Open `ios/RideX.xcworkspace` in Xcode
   - Select your development team in Signing & Capabilities
   - Choose a simulator or connect physical device

## 📱 Building & Running the App

### Development Mode

#### Run on Android:

```bash
# Make sure backend is running (in backend folder: npm run dev)

# In a new terminal, from RideX root:
npm run android
```

#### Run on iOS (Mac only):

```bash
# Make sure backend is running

# In a new terminal:
npm run ios
```

### Production Build

#### Build Android APK:

```bash
cd android

# For Windows:
gradlew assembleRelease

# The APK will be generated at:
# android/app/build/outputs/apk/release/app-release.apk
```

#### Build iOS IPA (Mac only):

```bash
# Open Xcode
open ios/RideX.xcworkspace

# Then in Xcode:
# 1. Select "Any iOS Device (arm64)" as target
# 2. Product → Archive
# 3. Once archived, click "Distribute App"
# 4. Choose distribution method (App Store, Ad Hoc, Enterprise, or Development)
# 5. Follow the wizard to create IPA
```

## 🧪 Testing the App

### Test Credentials (Development Mode)

The app works with OTP verification. In development mode, the OTP is returned in the API response.

**Test Flow:**
1. Open the app
2. Enter any phone number (e.g., `1234567890`)
3. Click "Send OTP"
4. Check the backend console - it will log the OTP
5. Enter the OTP in the app
6. Complete registration or login

### API Testing

You can test the backend APIs using Postman or curl:

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Send OTP:**
```bash
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"phoneNumber\": \"1234567890\"}"
```

## 📁 Project Structure

```
RideX/
├── android/                 # Android native code
├── ios/                     # iOS native code
├── src/
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   └── main/           # Main app screens
│   ├── navigation/         # Navigation configuration
│   ├── store/              # State management (Zustand)
│   ├── services/           # API services
│   └── App.tsx             # Root component
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── database/       # Database schemas
│   └── server.js           # Server entry point
├── package.json            # Mobile app dependencies
└── README.md              # This file
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Unable to connect to backend"
- Ensure backend is running on port 3000
- For Android Emulator, use `10.0.2.2` instead of `localhost`
- For physical device, use your computer's IP address
- Check firewall settings

#### 2. "Database connection failed"
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database `ridex_db` exists

#### 3. "Metro bundler issues"
- Clear cache: `npx react-native start --reset-cache`
- Delete `node_modules` and reinstall

#### 4. "Android build fails"
- Clean build: `cd android && ./gradlew clean`
- Check Java/JDK version
- Ensure ANDROID_HOME environment variable is set

#### 5. "iOS build fails"
- Run `pod install` in ios folder
- Clean build folder in Xcode (Shift + Cmd + K)
- Update CocoaPods: `sudo gem install cocoapods`

#### 6. "Google Maps not showing"
- Verify API key is correct
- Enable required APIs in Google Cloud Console:
  - Maps SDK for Android
  - Maps SDK for iOS
  - Directions API
  - Places API

## 🎯 Next Steps

The current implementation includes **4 core modules**:
1. ✅ Authentication & Profile
2. ✅ Ride Booking & Maps
3. ✅ Basic Real-time Setup
4. ✅ Backend API

**To complete the full app, you can add:**
- Module 5: Payment Integration (Stripe/Razorpay)
- Module 6: Driver App (separate views)
- Module 7: Live Ride Tracking
- Module 8: Rating & Reviews
- Module 9: Chat functionality
- Module 10: Push Notifications
- Module 11: Admin Dashboard

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review the code comments in the source files
- Check backend logs for API errors

## 📝 License

This is a demo project for educational purposes.

---

**Built with ❤️ using React Native & Node.js**
