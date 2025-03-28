# BarcodeScannerIonic

This is an Ionic/Angular application (`BarcodeScannerIonic`) that allows users to scan barcodes or manually add products, sending the data to a .NET 4.8 Web API backend (`ProductManagerApi`). The app is built using Ionic 7, Angular 18, and Capacitor for native functionality. This README provides detailed instructions to set up the development environment, start the app, and build an APK for Android deployment.

---

## **Prerequisites**

Before starting, ensure you have the following tools installed on your Windows machine. Download links and installation instructions are provided.

### **1. Node.js and npm**
- **Purpose**: Node.js is required to run JavaScript tools, and npm (Node Package Manager) is used to install Ionic and other dependencies.
- **Download**: [Node.js LTS](https://nodejs.org/en/download)
- **Installation**:
  1. Run the installer  .
  2. Follow the prompts → Accept the license → Install with default settings.
  3. Verify installation:
    `node -v`
    `npm -v`

- Expected: `v22.14.0` (Node.js) and `10.8.2` (npm) (Or Something similar).

### **2. Ionic CLI**
- **Purpose**: The Ionic CLI is used to create, develop, and build Ionic apps.
- **Installation**:
- Open Command Prompt (cmd) as Administrator: npm install -g @ionic/cli
- Verify installation: ionic -v
- Expected: `7.2.0` (or latest version).

### **3. Visual Studio Code (Optional, for Development)**
- **Purpose**: A lightweight code editor for editing Ionic/Angular code.
- **Download**: [Visual Studio Code](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user)
- **Installation**:
1. Run the installer.
2. Follow the prompts → Install with default settings.
3. Open VS Code → Install recommended extensions:
 - **Ionic Essentials** (for Ionic support).
 - **Angular Language Service** (for Angular support).

### **4. Android Studio**
- **Purpose**: Required to build the Android APK and manage Android SDKs.
- **Download**: [Android Studio](https://redirector.gvt1.com/edgedl/android/studio/install/2024.2.1.9/android-studio-2024.2.1.9-windows.exe)
- Choose the Windows installer (`.exe`).
- **Installation**:
1. Run the installer (`android-studio-2024.2.1.9-windows.exe`).
2. Follow the prompts → Install with default settings.
3. During setup, ensure the following are checked:
 - Android SDK.
 - Android SDK Platform.
 - Android Virtual Device (for emulator, optional).
4. After installation, open Android Studio → Configure → SDK Manager:
 - Install **Android SDK Platform 34** (or the version matching your `android/targetSdkVersion` in `capacitor.config.ts`).
 - Install **Android SDK Build-Tools**.
 - Note the Android SDK path (e.g., `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`).

### **5. Java Development Kit (JDK)**
- **Purpose**: Required by Android Studio to build APKs.
- **Download**: [JDK 17 (AdoptOpenJDK)](https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.12%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.12_7.msi)
- Choose the Windows x64 installer (`.msi`).
- **Installation**:
1. Run the installer (`OpenJDK17U-jdk_x64_windows_hotspot_17.0.12_7.msi`).
2. Follow the prompts → Install with default settings.
3. Set the `JAVA_HOME` environment variable

### **6. Git (Optional, for Version Control)**
- **Purpose**: To clone repositories or manage version control.
- **Download**: [Git for Windows](https://github.com/git-for-windows/git/releases/download/v2.46.0.windows.1/Git-2.46.0-64-bit.exe)
- Choose the Windows installer (`.exe`).
- **Installation**:
1. Run the installer (`Git-2.46.0-64-bit.exe`).
2. Follow the prompts → Use default settings.
3. Verify: `git --version`

- Expected: `git version 2.46.0.windows.1`.

### **7. Android Debug Bridge (ADB, Optional)**
- **Purpose**: To install the APK on a physical Android device.
- **Note**: ADB is included with Android Studio (in the Android SDK `platform-tools` folder).
- **Verify**: `adb version`
- If not found, add the `platform-tools` folder to your PATH


---

## **Project Setup**

### **1. Clone or Navigate to the Project**

### **2. Install Dependencies**
- Install the project’s dependencies listed in `package.json`: `npm install`
- This installs Ionic, Angular, Capacitor, and other dependencies (e.g., `@capacitor/barcode-scanner`, `@angular/common/http`).

### **3. Verify Capacitor Setup**
- Ensure Capacitor is set up for Android: `npx cap add android`
- If already added, this command will confirm the `android` folder exists.

---

## **Starting the Ionic Application (Development)**

### **1. Run the Backend**
- The Ionic app communicates with a .NET 4.8 Web API backend (`ProductManagerApi`) at `https://localhost:44372/api/products`.
- Open the backend project in Visual Studio 2022
- Press F5 to start the backend → Ensure it runs on `https://localhost:44372`.

### **2. Start the Ionic App**
- Run the Ionic app in the browser for development: `ionic serve`
- This starts a development server at `http://localhost:8100`.
- Open a browser and navigate to `http://localhost:8100` to see the app.
- **Features**:
- **Home Page**: Click “Scan Barcode” to scan a barcode (won’t work in the browser; use a device for testing).
- **Add Product Page**: Manually enter a barcode and submit.

### **3. Debug in the Browser**
- Open Chrome DevTools (F12) to debug JavaScript/TypeScript:
- Inspect network requests to `https://localhost:44372/api/products`.
- Check console logs for errors.

---

## **Building the APK for Android**

### **1. Build the Ionic App**
- Build the Ionic app to generate the web assets: `ionic build --prod`
- This creates the `www` folder with the production-ready web assets.

### **2. Sync Capacitor**
- Sync the web assets with the Android platform: `npx cap sync android`
- This copies the `www` folder to the `android` folder and updates Capacitor dependencies.

### **3. Open the Android Project**
- Open the Android project in Android Studio: `npx cap open android`

### **4. Configure Android Studio**
- In Android Studio:
- Ensure the correct SDK is selected (e.g., Android API 34).
- If prompted, install any missing SDK components.
- Update `android/app/build.gradle` if needed (should already be configured):
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        applicationId "com.example.barcodescannerionic"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
    }
}
```

### **5. Build the APK**
- In Android Studio:
- Go to Build → Build Bundle(s) / APK(s) → Build APK.
- Wait for the build to complete → A notification will appear: “APK(s) generated successfully.”
- Click “Locate” to find the APK (e.g., E:\BarCodeIonic\BarcodeScannerIonic\android\app\build\outputs\apk\debug\app-debug.apk).

Certainly! Here's the entire text you provided in markdown format:

### **6. Install the APK on a Device**

## Option 1: Using ADB (Physical Device):

1. **Enable Developer Options and USB Debugging on your Android device**:
   - Go to **Settings → About Phone → Tap “Build Number” 7 times → Go back → Developer Options → Enable USB Debugging**.

2. **Connect your device via USB**.

3. **Push the APK to the device**:
   ```bash
   adb push E:\BarCodeIonic\BarcodeScannerIonic\android\app\build\outputs\apk\debug\app-debug.apk /sdcard/Download
   ```

4. **Install the APK manually on the device**:
   - On the device, open a file manager → Navigate to **Download** → Tap **app-debug.apk** → **Install**.

## Option 2: Using Android Studio (Emulator or Device):

1. In **Android Studio**, select a device (emulator or connected device) from the device dropdown.

2. Click the **Run** button (green triangle) to build and install the app on the device/emulator.

### **7. Test the App**

## Open the app on your device:

- **Home Page**: Tap “Scan Barcode” → Scan a 1D barcode → Verify the result.
- **Add Product Page**: Enter a barcode (e.g., 3728957328) → Submit → Verify the result.

## Check logs for debugging:
```bash
adb logcat | findstr "chromium"
```
Look for logs like `Sending to backend` and `Backend response`.

# Troubleshooting

## Ionic Serve Fails:
- Ensure `npm install` completed successfully.
- Check for errors in the terminal → Run `npm install` again if needed.

## APK Build Fails:
- Ensure **Android Studio** has the correct SDK (API 34).
- Check `android/app/build.gradle` for errors.
- Run `gradlew assembleDebug --stacktrace` for detailed error logs.

## CORS Errors:
- Ensure the backend (**ProductManagerApi**) is running on `https://localhost:44372`.
- Verify CORS is enabled in **WebApiConfig.cs**:
   ```csharp
   var cors = new EnableCorsAttribute("http://localhost:8100,http://192.168.1.100:8100", "Content-Type,Authorization,X-Api-Key", "GET,POST,OPTIONS");
   config.EnableCors(cors);
   ```

## Network Errors:
- If testing on a device, update **capacitor.config.ts** to use your machine’s IP:
   ```typescript
   server: {
       androidScheme: 'https',
       cleartext: false,
       hostname: '192.168.1.100:44372'
   }
   ```
- Ensure the backend accepts requests from the device’s IP.

## Barcode Scanner Not Working:
- The barcode scanner (`@capacitor/barcode-scanner`) only works on a device, not in the browser.
- Ensure permissions are granted on the device (Camera permission).
