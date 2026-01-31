# 🏗️ Building RideX APK in Android Studio - Step by Step

## 📋 Prerequisites Checklist

Before opening Android Studio, ensure:

- [ ] Node.js installed
- [ ] All npm packages installed (`npm install` completed in RideX folder)
- [ ] Google Maps API Key obtained
- [ ] Backend is running (optional for building, required for testing)

## 🚀 Step-by-Step Build Instructions

### Step 1: Configure Google Maps API Key

**IMPORTANT:** You MUST do this before building!

1. Open this file in any text editor:
   ```
   C:\Users\Ravi Kumar\Apps\RideX\android\app\src\main\AndroidManifest.xml
   ```

2. Find this line:
   ```xml
   android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
   ```

3. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual Google Maps API key

4. Save the file

### Step 2: Open Project in Android Studio

1. **Launch Android Studio**

2. Click **"Open an Existing Project"** or **File → Open**

3. Navigate to and select:
   ```
   C:\Users\Ravi Kumar\Apps\RideX\android
   ```

   ⚠️ **IMPORTANT:** Open the `android` folder, NOT the root `RideX` folder!

4. Click **OK**

5. Wait for Android Studio to:
   - Index files
   - Download Gradle if needed
   - Sync project with Gradle files

   **This may take 5-15 minutes on first open**

### Step 3: Sync Gradle (If not auto-synced)

1. If you see a banner saying "Gradle files have changed", click **"Sync Now"**

2. Or manually sync:
   - Click **File → Sync Project with Gradle Files**

3. Wait for sync to complete (look at bottom of Android Studio)

4. Check for errors in the "Build" tab at bottom

### Step 4: Resolve Any Sync Errors

**Common issues and fixes:**

#### Error: "SDK location not found"
1. Go to **File → Project Structure → SDK Location**
2. Set Android SDK location (usually `C:\Users\YourName\AppData\Local\Android\Sdk`)
3. Click **Apply** → **OK**

#### Error: "Please initialize at least one SDK"
1. Open **SDK Manager** (Tools → SDK Manager)
2. Install **Android SDK Platform 33**
3. Install **Android SDK Build-Tools 33.0.0**
4. Click **Apply** → **OK**

#### Error: "Gradle version not supported"
1. File → Settings → Build, Execution, Deployment → Build Tools → Gradle
2. Check "Use Gradle from: 'wrapper'"
3. Click **Apply** → **OK**

### Step 5: Build Debug APK (For Testing)

This is the quickest way to test on your device:

1. Click **Build → Build Bundle(s) / APK(s) → Build APK(s)**

2. Wait for build to complete (2-5 minutes)

3. When done, you'll see a notification in bottom-right:
   ```
   APK(s) generated successfully
   ```

4. Click **locate** in the notification OR find APK at:
   ```
   C:\Users\Ravi Kumar\Apps\RideX\android\app\build\outputs\apk\debug\app-debug.apk
   ```

5. **Transfer this APK to your phone and install it!**

### Step 6: Build Release APK (For Distribution)

For a production-ready APK:

#### 6.1 Generate Signing Key (One-time setup)

1. In Android Studio, click **Build → Generate Signed Bundle / APK**

2. Select **APK** → **Next**

3. Click **"Create new..."** under Key store path

4. Fill in the form:
   ```
   Key store path: C:\Users\Ravi Kumar\Apps\RideX\android\app\ridex-release-key.keystore
   Password: [Create a strong password]
   Confirm: [Same password]

   Alias: ridex-key-alias
   Password: [Same or different password]
   Confirm: [Same password]

   Validity: 25 [years]

   Certificate:
   First and Last Name: Your Name
   Organizational Unit: RideX
   Organization: Your Company
   City or Locality: Your City
   State or Province: Your State
   Country Code: US [or your country]
   ```

5. Click **OK**

6. **IMPORTANT:** Save these passwords! Write them down somewhere safe!

#### 6.2 Configure Gradle Properties

1. Open this file:
   ```
   C:\Users\Ravi Kumar\Apps\RideX\android\gradle.properties
   ```

2. Add these lines at the end (replace with your actual values):
   ```properties
   RIDEX_UPLOAD_STORE_FILE=ridex-release-key.keystore
   RIDEX_UPLOAD_KEY_ALIAS=ridex-key-alias
   RIDEX_UPLOAD_STORE_PASSWORD=your_keystore_password
   RIDEX_UPLOAD_KEY_PASSWORD=your_key_password
   ```

3. Save the file

4. In Android Studio, click **File → Sync Project with Gradle Files**

#### 6.3 Build the Release APK

1. Click **Build → Generate Signed Bundle / APK**

2. Select **APK** → **Next**

3. Your key store should now be pre-filled (if you just created it)
   - If not, browse to: `C:\Users\Ravi Kumar\Apps\RideX\android\app\ridex-release-key.keystore`
   - Enter passwords
   - Click **Next**

4. Select build variant:
   - ✅ Check **release**
   - ✅ Check **V1 (Jar Signature)**
   - ✅ Check **V2 (Full APK Signature)**
   - Destination folder: Leave as default
   - Click **Finish**

5. Wait for build (3-8 minutes)

6. Success! APK is at:
   ```
   C:\Users\Ravi Kumar\Apps\RideX\android\app\release\app-release.apk
   ```

### Step 7: Install APK on Your Phone

#### Method 1: Via USB (Recommended)

1. Enable Developer Options on your phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. Connect phone to PC via USB

3. In Android Studio, you should see your device in the device dropdown

4. Click the **Run** button (green play icon) or press **Shift + F10**

5. App will install and launch on your device!

#### Method 2: Manual Transfer

1. Copy the APK file to your phone (via USB cable, email, or cloud)

2. On your phone:
   - Open file manager
   - Navigate to the APK
   - Tap to install
   - You may need to allow "Install from Unknown Sources" in Settings

#### Method 3: Using ADB

Open Command Prompt in Android Studio (View → Tool Windows → Terminal):

```bash
adb install app-release.apk
```

### Step 8: Test the App

1. Open RideX app on your phone

2. Test basic flow:
   - Splash screen appears
   - Login screen loads
   - Enter phone number
   - (Make sure backend is running to test OTP)
   - Complete login
   - Map should load

## 🐛 Troubleshooting Build Issues

### Build fails with "Execution failed for task ':app:mergeReleaseResources'"

**Fix:**
```bash
# In Android Studio Terminal:
cd android
gradlew clean
cd ..
```
Then rebuild

### Build fails with "Duplicate resources"

**Fix:**
1. Build → Clean Project
2. Build → Rebuild Project

### "Could not resolve all dependencies"

**Fix:**
1. Check internet connection
2. File → Invalidate Caches / Restart
3. Try again

### "Unsupported class file major version"

**Fix:**
1. File → Project Structure → SDK Location
2. Ensure JDK 11 or higher is selected
3. If not installed, download from Settings → Build Tools → Gradle JDK

### Build is very slow

**Fix:** Edit `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
org.gradle.parallel=true
org.gradle.daemon=true
```

### Maps not showing in app

**Fix:**
1. Verify Google Maps API key in AndroidManifest.xml
2. In Google Cloud Console:
   - Enable "Maps SDK for Android"
   - Remove any API key restrictions (for testing)

## ✅ Success Checklist

After successful build:

- [ ] No errors in Build output
- [ ] APK file generated
- [ ] APK installs on phone without errors
- [ ] App launches successfully
- [ ] App icon visible in launcher
- [ ] Can navigate through screens

## 📊 Expected Build Times

| Build Type | First Build | Subsequent Builds |
|------------|-------------|-------------------|
| Debug APK | 5-10 min | 2-3 min |
| Release APK | 8-15 min | 3-5 min |

## 🎯 Build Outputs

**Debug APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
Size: ~35-45 MB
```

**Release APK:**
```
android/app/build/outputs/apk/release/app-release.apk
Size: ~25-35 MB (smaller due to optimization)
```

## 🔐 Important Security Notes

**NEVER commit these files to Git:**
- ❌ `ridex-release-key.keystore`
- ❌ `gradle.properties` (with passwords)
- ❌ `local.properties`

**DO backup:**
- ✅ Your keystore file (ridex-release-key.keystore)
- ✅ Your keystore passwords
- You'll need them for ALL future app updates!

## 🎉 You're Done!

You now have:
- ✅ Working APK file
- ✅ Can install on any Android device
- ✅ Ready to share with testers
- ✅ Ready to publish to Play Store (after completing app listing)

## 📱 Next Steps

1. **Test thoroughly** on multiple devices if possible
2. **Share APK** with friends/testers
3. **Gather feedback**
4. **Make improvements**
5. **Prepare for Play Store** submission

---

**Need Help?** Check the main README.md or QUICK_START_GUIDE.md
