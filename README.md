# WiFi Config App

A React Native app for configuring Raspberry Pi WiFi settings through multiple connection methods.

## Features

- **WiFi Hotspot Method**: Connect to Pi's WiFi hotspot and configure
- **QR Code Method**: Scan QR codes to get configuration details
- **Bluetooth Method**: Connect via Bluetooth to configure Pi
- **Modern UI**: Clean, intuitive interface with proper feedback
- **Cross-platform**: Works on iOS and Android

## Connection Methods

### 1. WiFi Hotspot
- Pi creates a WiFi hotspot (e.g., "RaspberryPi_Config")
- App connects to hotspot and sends WiFi credentials
- Pi attempts to connect to specified network

### 2. QR Code
- Pi displays QR code with configuration endpoint
- App scans QR code to get connection details
- App connects to Pi's web interface

### 3. Bluetooth
- Pi broadcasts Bluetooth service
- App discovers and connects to Pi via Bluetooth
- App sends configuration over Bluetooth

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on device/simulator:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Required Permissions

The app requires the following permissions:

- **Location**: For WiFi network scanning
- **Camera**: For QR code scanning
- **Bluetooth**: For Bluetooth device discovery
- **WiFi**: For network connectivity

## Development

### Project Structure
```
src/
├── screens/          # Main app screens
│   ├── HomeScreen.tsx
│   ├── WiFiScanScreen.tsx
│   ├── QRCodeScreen.tsx
│   ├── BluetoothScreen.tsx
│   └── ConfigScreen.tsx
├── components/       # Reusable components
├── services/         # API and device services
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Key Dependencies
- `@react-navigation/native` - Navigation
- `expo-barcode-scanner` - QR code scanning
- `expo-location` - Location services
- `expo-network` - Network utilities
- `react-native-ble-plx` - Bluetooth functionality

## Raspberry Pi Setup

To use this app, your Raspberry Pi needs to be configured to:

1. **WiFi Hotspot Mode**:
   - Create a WiFi access point
   - Run a web server for configuration
   - Accept WiFi credentials via HTTP POST

2. **QR Code Mode**:
   - Display QR code with connection details
   - Run web server for configuration interface

3. **Bluetooth Mode**:
   - Broadcast Bluetooth service
   - Accept configuration via Bluetooth

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 