# Scripture Pal - Project Structure

## 📁 **Cross-Platform Architecture**

This project is designed for **maximum code reuse** between React Native (mobile) and future web/Raspberry Pi versions using the `.native.js` extension pattern.

```
Scripture_Pal/
├── src/
│   ├── core/                    # 🔄 SHARED: Business logic across ALL platforms
│   │   ├── ai/
│   │   │   └── verseMatching.js      # AI verse matching engine
│   │   ├── api/
│   │   │   └── bibleAPI.js           # Bible API service
│   │   └── ScripturePalService.js    # Main orchestration service
│   │
│   ├── services/                # 🎯 PLATFORM-SPECIFIC: Different implementations
│   │   ├── voiceInput.js             # 🌐 Web/Pi: Web Speech API
│   │   └── voiceInput.native.js      # 📱 React Native: Expo Audio/Speech
│   │
│   ├── components/              # 🎯 PLATFORM-SPECIFIC: UI components
│   │   ├── ScripturePalApp.js        # 🌐 Web/Pi version (future)
│   │   └── ScripturePalApp.native.js # 📱 React Native version
│   │
│   └── config/
│       └── environment.js            # 🔄 SHARED: Configuration management
│
├── App.js                       # React Native entry point
├── package.json                 # Dependencies
└── PROJECT_STRUCTURE.md         # This file
```

## 🔄 **Code Reuse Strategy**

### **✅ 100% Shared Code (Platform Agnostic)**
- **`src/core/ai/verseMatching.js`** - AI logic for matching user emotions to Bible verses
- **`src/core/api/bibleAPI.js`** - Bible API communication (uses standard `fetch`)
- **`src/core/ScripturePalService.js`** - Main service orchestrating all components
- **`src/config/environment.js`** - Configuration and environment management

### **🎯 Platform-Specific Code**

#### **Voice Input Services:**
- **`voiceInput.js`** (Web/Pi) - Uses Web Speech API
- **`voiceInput.native.js`** (React Native) - Uses Expo Speech/Audio APIs

#### **UI Components:**
- **`ScripturePalApp.js`** (Web/Pi) - React web components
- **`ScripturePalApp.native.js`** (React Native) - React Native components

## 🚀 **How the .native.js Pattern Works**

When you import:
```javascript
import { VoiceInputService } from '../services/voiceInput.js';
```

**Metro Bundler (React Native) picks:**
- `voiceInput.native.js` ✅

**Web Bundlers (Webpack, Vite, etc.) pick:**
- `voiceInput.js` ✅

## 📱 **Current Implementation: React Native**

### **Key Features:**
- ✅ Voice input with wake word detection ("Hey Scripture Friend")
- ✅ AI-powered verse matching based on emotions/context
- ✅ Text-to-speech responses
- ✅ Beautiful mobile UI with state indicators
- ✅ Error handling and fallback verses
- ✅ Debug mode for development

### **Dependencies:**
```json
{
  "expo-speech": "Voice synthesis",
  "expo-av": "Audio recording and playback"
}
```

## 🌐 **Future: Web/Raspberry Pi Version**

### **What Will Be Reused (90% of code):**
- All AI logic (`src/core/`)
- Bible API service
- Main orchestration service
- Configuration management

### **What Will Be Different:**
- `voiceInput.js` - Web Speech API instead of Expo
- `ScripturePalApp.js` - React web components instead of React Native
- Hardware integration for Raspberry Pi (GPIO, speakers, etc.)

## 🛠 **Development Workflow**

### **Phase 1: React Native App (Current)**
1. ✅ Set up cross-platform architecture
2. ✅ Implement core AI and API services
3. ✅ Create React Native UI
4. 🔄 Add Bible API key and test
5. 🔄 Enhance voice recognition
6. 🔄 Add more verse categories

### **Phase 2: Web Version (Future)**
1. Create `voiceInput.js` with Web Speech API
2. Create `ScripturePalApp.js` with React web components
3. Test cross-platform code reuse
4. Deploy as PWA

### **Phase 3: Raspberry Pi Hardware (Future)**
1. Extend web version for Pi
2. Add hardware controls (buttons, LEDs)
3. Optimize for kiosk mode
4. Add offline capabilities

## 🔧 **Configuration**

### **Required Setup:**
1. **Get Bible API Key:** https://scripture.api.bible/
2. **Update config:** `src/config/environment.js`
3. **Install dependencies:** `npm install`
4. **Run:** `npx expo start`

### **Environment Variables:**
```bash
BIBLE_API_KEY=your-api-key-here
```

## 📊 **Code Reuse Metrics**

| Component | Shared % | Platform-Specific % |
|-----------|----------|-------------------|
| AI Logic | 100% | 0% |
| Bible API | 100% | 0% |
| Main Service | 100% | 0% |
| Voice Input | 0% | 100% |
| UI Components | 0% | 100% |
| **Overall** | **~70%** | **~30%** |

This architecture ensures that when you build the web/Pi version, you'll reuse **70% of your codebase** while only needing to implement platform-specific voice and UI layers.

## 🎯 **Next Steps**

1. **Get your Bible API key** and update the config
2. **Test the React Native app** on your device
3. **Enhance the AI** with more emotion categories
4. **Plan the web version** using the same core services
5. **Design the Raspberry Pi hardware** integration