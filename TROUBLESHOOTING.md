# Troubleshooting Guide

## Metro Bundler Issues

### 1. iOS Simulator Device ID Errors

**Problem:** `Error: xcrun simctl boot [DEVICE_ID] exited with non-zero code: 148 - Invalid device or device pair`

**Symptoms:**
- Expo tries to boot a specific simulator device ID that doesn't exist
- Error mentions invalid device or device pair
- Clearing Expo cache doesn't fix the issue

**Solution:**
```bash
# Clear Watchman cache (this is the key fix!)
watchman watch-del-all

# Clear Expo cache and restart
npx expo start --clear
```

**Why this happens:** Expo caches simulator device IDs in Watchman, and when simulators are deleted or corrupted, Watchman still tries to reference the old device ID.

**Alternative solutions if above doesn't work:**
```bash
# Create new simulator manually
xcrun simctl create "ScripturePal" "iPhone 16 Pro" "com.apple.CoreSimulator.SimRuntime.iOS-18-3"
xcrun simctl boot "ScripturePal"

# Or use tunnel mode
npx expo start --tunnel
```

### 2. Watchman Cache Issues

**Problem:** Build gets stuck or Metro bundler hangs after clearing Watchman cache.

**Symptoms:**
- Metro bundler starts but never completes
- App doesn't load on simulator/device
- Terminal shows no error but process is stuck

**Solution:**
```bash
# Clear Watchman cache completely
watchman watch-del-all

# Clear Expo cache and restart
npx expo start --clear
```

**Why this happens:** Watchman can get into an inconsistent state after manual cache clearing, causing file watching to fail.

### 3. Asset Resolution Errors

**Problem:** `Unable to resolve asset "./assets/icon.png" from "icon" in your app.json`

**Symptoms:**
- Build fails with asset not found errors
- References to non-existent image files

**Solution:**
Remove image references from `app.json`:
```json
{
  "expo": {
    "name": "Scripture_Pal",
    "slug": "Scripture_Pal",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "edgeToEdgeEnabled": true
    }
  }
}
```

**Note:** Custom icons are optional for development. Remove `icon`, `splash.image`, `adaptiveIcon.foregroundImage`, and `web.favicon` properties.

### 4. Expo Router Conflicts

**Problem:** App structure conflicts between expo-router and simple App.tsx setup.

**Symptoms:**
- Import errors with expo-router
- Navigation structure conflicts
- Unused dependencies causing confusion

**Solution:**
Choose one approach:
- **Simple:** Use direct App.tsx → component imports
- **Router:** Use expo-router with app/ directory structure

For simple apps, remove expo-router:
```bash
npm uninstall expo-router expo-splash-screen
```

### 5. Deprecated Package Warnings

**Problem:** `WARN [expo-av]: Expo AV has been deprecated and will be removed in SDK 54`

**Solution:**
```bash
# Install new package
npm install expo-audio

# Update imports
import { Audio } from 'expo-audio';  // instead of 'expo-av'

# Remove deprecated package
npm uninstall expo-av
```

### 6. General Metro Bundler Fixes

**When Metro gets stuck:**
```bash
# Kill all Metro processes
npx react-native start --reset-cache

# Or for Expo
npx expo start --clear

# If still stuck, restart terminal and try again
```

**When simulator shows wrong device:**
```bash
# Force specific device
npx expo start --ios --simulator="iPhone 16"

# Or change in simulator: Device → Device → iPhone 16
```

## Prevention Tips

1. **Don't manually clear Watchman** unless necessary
2. **Use `--clear` flag** instead of manual cache clearing
3. **Keep app.json minimal** during development
4. **Update deprecated packages** when warnings appear
5. **Restart Metro** when making structural changes

## Quick Fix Commands

```bash
# All-in-one fix for most issues
watchman watch-del-all && npx expo start --clear

# Reset everything
rm -rf node_modules && npm install && npx expo start --clear

# to see if app is healthy
npx expo-doctor
``` 

