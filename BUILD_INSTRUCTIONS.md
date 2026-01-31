# 📦 RideX - Build Instructions

Complete guide for building production APK and IPA files.

## 🤖 Building Android APK

### Prerequisites
- Android Studio installed
- JDK 11 or higher
- Android SDK properly configured

### Step 1: Prepare for Release Build

#### 1.1 Generate Signing Key

Open terminal in `android/app`:

```bash
cd android\app

# Generate keystore (one-time setup)
keytool -genkeypair -v -storetype PKCS12 -keystore ridex-release-key.keystore -alias ridex-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**You'll be asked for:**
- Keystore password (remember this!)
- Key password (can be same as keystore password)
- Your name, organization, city, etc.

**IMPORTANT:** Keep `ridex-release-key.keystore` file safe! You'll need it for all future updates.

#### 1.2 Configure Gradle

Create `android/gradle.properties` (if not exists) and add:

```properties
RIDEX_UPLOAD_STORE_FILE=ridex-release-key.keystore
RIDEX_UPLOAD_KEY_ALIAS=ridex-key-alias
RIDEX_UPLOAD_STORE_PASSWORD=your_keystore_password
RIDEX_UPLOAD_KEY_PASSWORD=your_key_password
```

Edit `android/app/build.gradle`:

Find `android { ... }` block and add:

```gradle
android {
    ...

    signingConfigs {
        release {
            if (project.hasProperty('RIDEX_UPLOAD_STORE_FILE')) {
                storeFile file(RIDEX_UPLOAD_STORE_FILE)
                storePassword RIDEX_UPLOAD_STORE_PASSWORD
                keyAlias RIDEX_UPLOAD_KEY_ALIAS
                keyPassword RIDEX_UPLOAD_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 2: Build Release APK

#### 2.1 Clean Previous Builds

```bash
cd android
gradlew clean
```

#### 2.2 Build APK

```bash
# Build release APK
gradlew assembleRelease

# Or for Windows PowerShell:
.\gradlew assembleRelease
```

Build will take 2-5 minutes. Watch for errors.

#### 2.3 Find Your APK

APK will be generated at:
```
android\app\build\outputs\apk\release\app-release.apk
```

**File size:** Approximately 30-50 MB

### Step 3: Test the APK

#### On Emulator:
```bash
adb install android\app\build\outputs\apk\release\app-release.apk
```

#### On Physical Device:
1. Connect device via USB
2. Enable USB Debugging
3. Run:
```bash
adb install android\app\build\outputs\apk\release\app-release.apk
```

Or simply copy APK to phone and install manually.

### Step 4: Build AAB (For Play Store)

If you want to publish to Google Play Store:

```bash
cd android
gradlew bundleRelease
```

AAB will be at:
```
android\app\build\outputs\bundle\release\app-release.aab
```

## 🍎 Building iOS IPA (Mac Only)

### Prerequisites
- Mac with macOS 11+
- Xcode 12+
- Apple Developer Account (free or paid)
- CocoaPods installed

### Step 1: Install Dependencies

```bash
cd ios
pod install
cd ..
```

### Step 2: Open in Xcode

```bash
open ios/RideX.xcworkspace
```

**NEVER open the .xcodeproj file, always use .xcworkspace**

### Step 3: Configure Signing

1. In Xcode, select the project in the navigator
2. Select "RideX" target
3. Go to "Signing & Capabilities" tab
4. Select your "Team" (Apple Developer Account)
5. Xcode will automatically create a provisioning profile

### Step 4: Set Build Configuration

1. In Xcode menu: Product → Scheme → Edit Scheme
2. Select "Run" on left sidebar
3. Change "Build Configuration" to "Release"
4. Close the window

### Step 5: Build for Testing (Development)

For testing on your iPhone:

1. Connect your iPhone via USB
2. Select your iPhone in the device dropdown (top toolbar)
3. Click the Play button (or Cmd + R)
4. App will install and run on your device

### Step 6: Create Archive (For Distribution)

For distributing to others or App Store:

1. In Xcode menu: Product → Destination → "Any iOS Device (arm64)"
2. Product → Archive
3. Wait for archive to complete (5-10 minutes)
4. Archive window will open automatically

### Step 7: Export IPA

1. In Archives window, select your archive
2. Click "Distribute App"
3. Choose distribution method:
   - **Development:** For testing on registered devices
   - **Ad Hoc:** For distributing to testers (up to 100 devices)
   - **App Store:** For App Store submission
4. Follow the wizard:
   - Select distribution options
   - Re-sign if needed
   - Export
5. Choose save location
6. IPA will be generated

### Step 8: Install IPA on Device

**Method 1: Using Xcode**
- Window → Devices and Simulators
- Select your device
- Drag and drop IPA file

**Method 2: Using Apple Configurator**
- Download Apple Configurator from App Store
- Connect device
- Add IPA file

**Method 3: Using TestFlight (for wider distribution)**
- Upload to App Store Connect
- Invite testers via email
- Testers install via TestFlight app

## 🔄 Version Management

### Updating Version Number

**For Android:**

Edit `android/app/build.gradle`:

```gradle
defaultConfig {
    ...
    versionCode 2          // Increment this for each release
    versionName "1.0.1"    // User-visible version
}
```

**For iOS:**

In Xcode:
1. Select project → Select target
2. General tab
3. Update "Version" (e.g., 1.0.1)
4. Update "Build" (e.g., 2)

## 🎯 Build Optimization

### Reduce APK Size

1. Enable ProGuard (already configured in release build)
2. Remove unused resources
3. Use APK Analyzer:
   ```bash
   Build → Analyze APK → Select your APK
   ```

### Reduce IPA Size

1. Enable Bitcode (Xcode setting)
2. Remove unused assets
3. Use App Thinning (automatic on App Store)

## ✅ Pre-Release Checklist

Before building final release:

- [ ] Test all features thoroughly
- [ ] Update version numbers
- [ ] Check app icons and splash screens
- [ ] Verify API endpoints (use production URLs)
- [ ] Remove console.log statements
- [ ] Test on multiple devices
- [ ] Check app permissions
- [ ] Verify Google Maps is working
- [ ] Test with production backend
- [ ] Review and update app metadata

## 🚀 Publishing to Stores

### Google Play Store

1. Create Google Play Console account ($25 one-time fee)
2. Create new app
3. Upload AAB file
4. Fill in store listing
5. Complete content rating questionnaire
6. Set pricing and distribution
7. Submit for review (1-3 days)

### Apple App Store

1. Create App Store Connect account ($99/year)
2. Create new app
3. Upload IPA via Xcode or Transporter
4. Fill in app information
5. Complete App Privacy details
6. Submit for review (1-3 days)

## 🐛 Build Troubleshooting

### Android Build Fails

**Error: "SDK location not found"**
```bash
# Create local.properties in android folder
echo "sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk" > android\local.properties
```

**Error: "Execution failed for task ':app:packageRelease'"**
- Check signing configuration
- Verify keystore file exists
- Check passwords in gradle.properties

**Out of memory error:**
Edit `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
```

### iOS Build Fails

**Error: "Code signing failed"**
- Verify Apple Developer account is active
- Check Team selection in Signing settings
- Try: Product → Clean Build Folder

**Error: "Library not found"**
```bash
cd ios
rm -rf Pods
pod install
```

**Error: "The path does not exist"**
- Always use .xcworkspace, not .xcodeproj
- Re-run pod install

## 📊 Build Times

**Expected build times:**

| Platform | Debug Build | Release Build |
|----------|-------------|---------------|
| Android | 2-3 min | 5-8 min |
| iOS | 3-5 min | 8-12 min |

**Factors affecting build time:**
- CPU/RAM of your machine
- Number of dependencies
- First build vs subsequent builds
- Network speed (for downloading dependencies)

## 💾 Backup Important Files

Always backup these files:

**Android:**
- `android/app/ridex-release-key.keystore`
- `android/gradle.properties`
- `android/app/build.gradle`

**iOS:**
- All certificates and provisioning profiles
- Xcode project settings

## 🎉 Success!

After successful build, you'll have:

✅ **Android:** APK file ready to install
✅ **iOS:** IPA file or app on device

You can now:
- Install on physical devices
- Distribute to testers
- Publish to app stores

---

**Questions?** Refer to the main README.md for detailed documentation.
