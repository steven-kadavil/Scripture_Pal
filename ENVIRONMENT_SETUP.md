# Scripture Pal Environment Setup Guide

## 🔧 **Quick Setup**

### 1. **Get Your Bible API Key**
1. Go to [https://scripture.api.bible/](https://scripture.api.bible/)
2. Sign up for a free account
3. Create a new application
4. Copy your API key (UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2. **Set Environment Variables**

Create a `.env.local` file in your project root:

```bash
# Required
BIBLE_API_KEY=your-bible-api-key-here

# Optional
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=development
ENABLE_LOGGING=true
```

### 3. **For React Native Development**

Add to your `.env.local`:
```bash
# React Native specific
EXPO_PUBLIC_BIBLE_API_KEY=your-bible-api-key-here
EXPO_PUBLIC_NODE_ENV=development
```

## 📋 **Complete Environment Variables**

### **Required Variables**
```bash
BIBLE_API_KEY=your-bible-api-key-here
```

### **Optional API Configuration**
```bash
# OpenAI Integration (optional)
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# API Timeouts (milliseconds)
BIBLE_API_TIMEOUT=10000
BIBLE_API_RETRY_ATTEMPTS=3
BIBLE_API_RETRY_DELAY=1000
OPENAI_API_TIMEOUT=15000
```

### **App Configuration**
```bash
# Environment
NODE_ENV=development  # or 'production'
PLATFORM=native       # 'native', 'web', or 'pi'
APP_VERSION=1.0.0

# Voice Input
VOICE_INPUT_TIMEOUT=10000

# Logging
ENABLE_LOGGING=true
LOG_LEVEL=debug      # 'debug', 'info', 'warn', 'error'
LOG_TO_FILE=false
MAX_LOG_SIZE=1000
```

### **Performance & Caching**
```bash
CACHE_ENABLED=true
CACHE_TTL=300000     # 5 minutes in milliseconds
MAX_CACHE_SIZE=100
```

### **Feature Flags**
```bash
FEATURE_VOICE_INPUT=true
FEATURE_TTS=true
FEATURE_OPENAI=false
FEATURE_OFFLINE=false
FEATURE_ANALYTICS=false
FEATURE_CRASH_REPORTING=false
```

## 🚀 **Getting Started**

### **Step 1: Clone and Install**
```bash
git clone <your-repo>
cd Scripture_Pal
npm install
```

### **Step 2: Configure Environment**
```bash
# Create your local environment file
cp .env.example .env.local

# Edit with your API keys
nano .env.local
```

### **Step 3: Get Bible API Key**
1. Visit [scripture.api.bible](https://scripture.api.bible/)
2. Sign up (free - 5,000 requests/day)
3. Create app → Copy API key
4. Add to `.env.local`: `BIBLE_API_KEY=your-key-here`

### **Step 4: Test Configuration**
```bash
npm start
# or
npx expo start
```

### **Step 5: Validate Setup**
The app will automatically validate your configuration on startup and show any errors.

## 🔍 **Configuration Validation**

The app includes built-in configuration validation:

```typescript
import { Config } from './src/config/environment';

// Check if configuration is valid
const { isValid, errors } = Config.validate();

if (!isValid) {
    console.error('Configuration errors:', errors);
}

// Get environment info
const info = Config.getInfo();
console.log('Environment:', info);
```

## 📱 **Platform-Specific Setup**

### **React Native (Mobile)**
```bash
# Required for Expo
EXPO_PUBLIC_BIBLE_API_KEY=your-key
EXPO_PUBLIC_NODE_ENV=development

# Test on device
npx expo start
```

### **Web Development** (Future)
```bash
# Standard web environment
REACT_APP_BIBLE_API_KEY=your-key
REACT_APP_NODE_ENV=development
```

### **Raspberry Pi** (Future)
```bash
# Pi-specific settings
PLATFORM=pi
FEATURE_OFFLINE=true
LOG_TO_FILE=true
```

## 🛠 **Available Configurations**

The `src/config/environment.ts` file provides:

- **✅ Environment Detection** - Automatically detects platform (Native/Web/Pi)
- **✅ API Configuration** - Bible API, OpenAI settings with timeouts
- **✅ User Preferences** - Default voice, TTS, response settings
- **✅ Verse Categories** - Pre-configured verses for emotions
- **✅ Fallback Verses** - Always-available verses when API fails
- **✅ Feature Flags** - Enable/disable features per environment
- **✅ Validation** - Automatic config validation with helpful errors
- **✅ Performance** - Caching, timeouts, retry logic

## 🔐 **Security Notes**

1. **Never commit API keys** to version control
2. **Use `.env.local`** for sensitive data (already in .gitignore)
3. **Bible API key** is safe for client-side use
4. **OpenAI API key** should be server-side only (if using)

## 🎯 **Next Steps**

1. **Get your Bible API key** and add to `.env.local`
2. **Run the app** with `npm start`
3. **Test voice input** on your device
4. **Customize verse categories** in `environment.ts`
5. **Add OpenAI key** for enhanced AI features (optional)

## 🐛 **Troubleshooting**

### Common Issues:

**"Required environment variable BIBLE_API_KEY is not set"**
- Create `.env.local` file with your API key
- Make sure it's in the project root
- Restart your development server

**"BIBLE_API_KEY appears to be invalid"**
- Verify your API key is in UUID format
- Check it was copied correctly from scripture.api.bible
- Test the key directly in their API explorer

**Voice input not working**
- Check microphone permissions
- Try on a physical device (not simulator)
- Enable `FEATURE_VOICE_INPUT=true`

**TTS not speaking**
- Test on physical device
- Check volume settings
- Enable `FEATURE_TTS=true`

---

## 📊 **Configuration Summary**

Your `environment.ts` is fully set up with:
- ✅ **313 lines** of comprehensive configuration
- ✅ **Platform detection** (Native/Web/Pi)
- ✅ **API management** (Bible API, OpenAI)
- ✅ **Voice & TTS settings**
- ✅ **Verse categories** for 10+ emotions
- ✅ **Fallback verses** for offline use
- ✅ **Performance optimization**
- ✅ **Validation & error handling**

Just add your **Bible API key** and you're ready to go! 🚀 