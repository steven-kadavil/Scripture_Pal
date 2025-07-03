import { AppSettings, UserPreferences, TTSConfig, VoiceInputConfig, SupportedLanguage } from '../types';

// ===== ENVIRONMENT DETECTION =====
// This section figures out WHERE and HOW your app is running

export const Environment = {
    // Are we in development mode? (when you're coding/testing)
    isDevelopment: process.env.NODE_ENV === 'development',

    // Are we in production mode? (when real users use the app)
    isProduction: process.env.NODE_ENV === 'production',

    // Are we running on a phone/tablet? (React Native)
    isNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative',

    // Are we running in a web browser?
    isWeb: typeof window !== 'undefined',

    // Are we running on a Raspberry Pi device?
    isPi: process.env.PLATFORM === 'pi'
} as const;

// ===== ENVIRONMENT VARIABLES =====
// These are helper functions to read configuration from environment variables
// Environment variables are like settings you can change without touching code

/**
 * Gets a REQUIRED environment variable
 * If it doesn't exist, the app will crash (that's intentional for important stuff)
 * Example: BIBLE_API_KEY=abc123 in your .env file
 */
const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = process.env[key];
    if (!value && !defaultValue) {
        throw new Error(`Required environment variable ${key} is not set`);
    }
    return value || defaultValue || '';
};

/**
 * Gets an OPTIONAL environment variable
 * If it doesn't exist, uses the default value (no crash)
 * Example: LOG_LEVEL=debug (optional, defaults to 'info')
 */
const getOptionalEnvVar = (key: string, defaultValue: string = ''): string => {
    return process.env[key] || defaultValue;
};

/**
 * Gets a TRUE/FALSE environment variable
 * Converts text like "true" or "1" to boolean true
 * Example: ENABLE_LOGGING=true
 */
const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
    const value = process.env[key];
    if (!value) return defaultValue;
    return value.toLowerCase() === 'true' || value === '1';
};

/**
 * Gets a NUMBER environment variable
 * Converts text like "5000" to number 5000
 * Example: VOICE_TIMEOUT=10000
 */
const getNumberEnvVar = (key: string, defaultValue: number): number => {
    const value = process.env[key];
    if (!value) return defaultValue;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
};

// ===== API CONFIGURATION =====
// This section configures how your app talks to external services

export const ApiConfig = {
    // OpenAI configuration (for AI features)
    openai: {
        // OpenAI's web address
        baseUrl: 'https://api.openai.com/v1',

        // Your OpenAI API key (optional for now)
        key: getOptionalEnvVar('OPENAI_API_KEY'),

        // Which AI model to use (gpt-3.5-turbo is cheaper than gpt-4)
        model: getOptionalEnvVar('OPENAI_MODEL', 'gpt-3.5-turbo'),

        // How long to wait for AI response (15 seconds)
        timeout: getNumberEnvVar('OPENAI_API_TIMEOUT', 15000)
    }
} as const;

// ===== DEFAULT USER PREFERENCES =====
// What settings the app starts with before user changes them

export const DefaultUserPreferences: UserPreferences = {
    // Which Bible translation to use (default to ESV)
    preferredTranslation: 'de4e12af7f28f599-02', // ESV

    // Voice synthesis settings (how the app speaks)
    voiceSettings: {
        rate: 1.0,        // Speaking speed (1.0 = normal, 2.0 = double speed)
        pitch: 1.0,       // Voice pitch (1.0 = normal, 2.0 = higher)
        volume: 1.0,      // How loud (1.0 = max, 0.5 = half volume)
        language: 'en-US' as SupportedLanguage  // English (US accent)
    },

    // What phrase wakes up the app ("Hey Scripture Friend")
    wakePhrase: 'Hey Scripture Pal',

    // Show debug info? (only in development mode)
    debugMode: Environment.isDevelopment,

    // How long should responses be? (short/medium/long)
    responseLength: 'medium',

    // Should the app explain WHY it chose a verse?
    includeExplanation: true,

    // How many alternative verses to show (besides the main one)
    maxAlternativeVerses: 2
};

// ===== DEFAULT VOICE INPUT CONFIG =====
// How the app listens to your voice

export const DefaultVoiceInputConfig: VoiceInputConfig = {
    // What phrase to listen for ("Hey Scripture Friend")
    wakePhrase: DefaultUserPreferences.wakePhrase,

    // What language to expect (English - US)
    language: 'en-US',

    // Keep listening after first phrase? (true = keeps listening)
    continuous: true,

    // Show partial results while you're still talking?
    interimResults: true,

    // How many different interpretations to consider
    maxAlternatives: 3,

    // Stop listening after this many milliseconds (10 seconds)
    timeoutMs: getNumberEnvVar('VOICE_INPUT_TIMEOUT', 10000)
};

// ===== DEFAULT TTS CONFIG =====
// How the app's voice sounds when it talks back

export const DefaultTTSConfig: TTSConfig = {
    rate: 1.0,     // Speaking speed (normal)
    pitch: 1.0,    // Voice pitch (normal)
    volume: 1.0,   // Volume (maximum)
    language: 'en-US'  // English accent
};

// ===== FALLBACK VERSES =====
// If something goes wrong, these are the "emergency" verses to use
// These are famous, comforting Bible verses

export const FallbackVerses = [
    'PSA.23.1-PSA.23.6',    // Psalm 23 (The Lord is my shepherd)
    'JHN.3.16',             // John 3:16 (For God so loved the world)
    'PHP.4.13',             // Philippians 4:13 (I can do all things)
    'ROM.8.28',             // Romans 8:28 (All things work together)
    'JER.29.11',            // Jeremiah 29:11 (Plans to prosper you)
    'ISA.41.10',            // Isaiah 41:10 (Fear not, for I am with you)
    'MAT.11.28-MAT.11.30',  // Matthew 11:28-30 (Come unto me)
    'PHP.4.6-PHP.4.7',      // Philippians 4:6-7 (Be anxious for nothing)
    'PSA.46.1',             // Psalm 46:1 (God is our refuge)
    'PRO.3.5-PRO.3.6'       // Proverbs 3:5-6 (Trust in the Lord)
] as const;

// ===== APP SETTINGS =====
// Main configuration for the entire app

export const DefaultAppSettings: AppSettings = {
    // Your OpenAI key (optional, from API config above)
    openaiApiKey: ApiConfig.openai.key,

    // Default Bible translation
    defaultTranslation: 'de4e12af7f28f599-02', // ESV

    // Copy of the emergency verses
    fallbackVerses: [...FallbackVerses],

    // Should the app save logs? (yes in development, customizable in production)
    enableLogging: getBooleanEnvVar('ENABLE_LOGGING', Environment.isDevelopment),

    // Voice input timeout (same as voice config)
    voiceInputTimeout: DefaultVoiceInputConfig.timeoutMs
};

// ===== VERSE CATEGORIES MAPPING =====
// When you say "I'm anxious", these are the verses the app will consider
// Each emotion has 5 carefully chosen Bible verses

export const VerseCategoriesConfig = {
    // When someone is anxious or worried
    anxiety: [
        'PHP.4.6-PHP.4.7',     // Be anxious for nothing
        'MAT.6.25-MAT.6.26',   // Do not worry about tomorrow
        'ISA.41.10',           // Fear not, for I am with you
        'PSA.55.22',           // Cast your burden on the Lord
        '1PE.5.7'              // Cast all your anxiety on him
    ],

    // When someone is afraid or scared
    fear: [
        'ISA.41.10',           // Fear not, for I am with you
        'JOS.1.9',             // Be strong and courageous
        'PSA.27.1',            // The Lord is my light
        '2TI.1.7',             // God has not given us a spirit of fear
        'DEU.31.6'             // Be strong and courageous
    ],

    // When someone is sad or depressed
    sadness: [
        'PSA.34.18',           // The Lord is close to the brokenhearted
        'MAT.5.4',             // Blessed are those who mourn
        'REV.21.4',            // He will wipe every tear
        'PSA.147.3',           // He heals the brokenhearted
        'JHN.16.22'            // Your hearts will rejoice
    ],

    // When someone is angry or frustrated
    anger: [
        'EPH.4.26-EPH.4.27',   // Be angry and do not sin
        'PRO.15.1',            // A soft answer turns away wrath
        'JAM.1.19-JAM.1.20',   // Slow to speak, slow to anger
        'COL.3.8',             // Put away anger and wrath
        'PSA.37.8'             // Refrain from anger
    ],

    // When someone feels lonely or isolated
    loneliness: [
        'HEB.13.5',            // I will never leave you
        'PSA.68.6',            // God sets the lonely in families
        'ISA.41.10',           // I am with you
        'MAT.28.20',           // I am with you always
        'DEU.31.8'             // The Lord goes before you
    ],

    // When someone feels guilty or ashamed
    guilt: [
        '1JN.1.9',             // If we confess our sins
        'PSA.103.12',          // As far as the east is from the west
        'ROM.8.1',             // No condemnation in Christ Jesus
        'ISA.43.25',           // I will not remember your sins
        'MIC.7.19'             // You will cast all our sins
    ],

    // When someone needs hope
    hope: [
        'JER.29.11',           // Plans to prosper you
        'ROM.15.13',           // May the God of hope fill you
        'LAM.3.22-LAM.3.23',   // His mercies are new every morning
        'PSA.42.11',           // Hope in God
        'HEB.11.1'             // Faith is the assurance of things hoped for
    ],

    // When someone needs strength or courage
    strength: [
        'PHP.4.13',            // I can do all things through Christ
        'ISA.40.31',           // Those who hope in the Lord
        'EPH.6.10',            // Be strong in the Lord
        '2CO.12.9',            // My grace is sufficient
        'PSA.28.7'             // The Lord is my strength
    ],

    // When someone needs direction or guidance
    guidance: [
        'PRO.3.5-PRO.3.6',     // Trust in the Lord with all your heart
        'PSA.119.105',         // Your word is a lamp
        'ISA.30.21',           // This is the way, walk in it
        'JHN.16.13',           // The Spirit will guide you
        'PSA.25.9'             // He guides the humble
    ],

    // When someone needs peace or calm
    peace: [
        'JHN.14.27',           // Peace I leave with you
        'PHP.4.7',             // The peace of God
        'ISA.26.3',            // Perfect peace
        'ROM.5.1',             // We have peace with God
        'COL.3.15'             // Let the peace of Christ rule
    ]
} as const;

// ===== LOGGING CONFIGURATION =====
// How the app saves information about what it's doing (for debugging)

export const LoggingConfig = {
    // Should logging be enabled?
    enabled: DefaultAppSettings.enableLogging,

    // What level of detail? debug=everything, info=important stuff, warn=problems, error=crashes
    level: getOptionalEnvVar('LOG_LEVEL', 'info') as 'debug' | 'info' | 'warn' | 'error',

    // Include timestamps in logs? (when did this happen?)
    includeTimestamp: true,

    // Include extra context info? (only in development)
    includeContext: Environment.isDevelopment,

    // Maximum number of log entries to keep (1000)
    maxLogSize: getNumberEnvVar('MAX_LOG_SIZE', 1000),

    // Save logs to a file? (usually false for mobile apps)
    logToFile: getBooleanEnvVar('LOG_TO_FILE', false)
} as const;

// ===== PERFORMANCE CONFIGURATION =====
// Settings that affect how fast/responsive the app is

export const PerformanceConfig = {
    // Voice input timeout (10 seconds)
    voiceInputTimeout: DefaultVoiceInputConfig.timeoutMs,

    // API timeout (15 seconds for OpenAI)
    apiTimeout: ApiConfig.openai.timeout,

    // How many times to retry failed requests (3)
    maxRetryAttempts: 3,

    // How long to wait between retries (1 second)
    retryDelay: 1000,

    // Should the app remember recent verses? (yes, saves time)
    cacheEnabled: getBooleanEnvVar('CACHE_ENABLED', true),

    // How long to remember cached verses (5 minutes)
    cacheTTL: getNumberEnvVar('CACHE_TTL', 300000), // 5 minutes

    // Maximum number of verses to remember (100)
    maxCacheSize: getNumberEnvVar('MAX_CACHE_SIZE', 100)
} as const;

// ===== FEATURE FLAGS =====
// These let you turn features on/off without changing code
// Useful for testing or if something breaks

export const FeatureFlags = {
    // Can users talk to the app? (yes)
    voiceInput: getBooleanEnvVar('FEATURE_VOICE_INPUT', true),

    // Can the app talk back? (yes)
    textToSpeech: getBooleanEnvVar('FEATURE_TTS', true),

    // Use OpenAI for smarter responses? (no, not implemented yet)
    openaiIntegration: getBooleanEnvVar('FEATURE_OPENAI', false),

    // Work without internet? (no, not implemented yet)
    offlineMode: getBooleanEnvVar('FEATURE_OFFLINE', false),

    // Track user behavior? (no, privacy first)
    analytics: getBooleanEnvVar('FEATURE_ANALYTICS', false),

    // Report crashes automatically? (yes in production, no in development)
    crashReporting: getBooleanEnvVar('FEATURE_CRASH_REPORTING', Environment.isProduction)
} as const;

// ===== VALIDATION FUNCTIONS =====
// This checks if your configuration is set up correctly

export const validateConfiguration = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Check if OpenAI API key exists (optional for now)
    if (!ApiConfig.openai.key) {
        console.log('OpenAI API key not set - ChatGPT features will be disabled');
    }

    // Check timeout values aren't too short
    if (ApiConfig.openai.timeout < 1000) {
        errors.push('OPENAI_API_TIMEOUT should be at least 1000ms (1 second)');
    }

    if (DefaultVoiceInputConfig.timeoutMs < 5000) {
        errors.push('VOICE_INPUT_TIMEOUT should be at least 5000ms (5 seconds)');
    }

    // Check voice settings are reasonable
    const { rate, pitch, volume } = DefaultTTSConfig;
    if (rate < 0.1 || rate > 10) {
        errors.push('TTS rate should be between 0.1 and 10 (0.1 = very slow, 10 = very fast)');
    }
    if (pitch < 0 || pitch > 2) {
        errors.push('TTS pitch should be between 0 and 2 (0 = very low, 2 = very high)');
    }
    if (volume < 0 || volume > 1) {
        errors.push('TTS volume should be between 0 and 1 (0 = silent, 1 = maximum)');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// ===== ENVIRONMENT INFO =====
// This function tells you everything about how the app is currently configured

export const getEnvironmentInfo = () => ({
    // What platform are we running on?
    platform: Environment.isNative ? 'native' : Environment.isWeb ? 'web' : 'pi',

    // Development or production mode?
    environment: Environment.isDevelopment ? 'development' : 'production',

    // App version
    version: process.env.APP_VERSION || '1.0.0',

    // When was this built?
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),

    // What features are enabled?
    features: Object.entries(FeatureFlags)
        .filter(([, enabled]) => enabled)
        .map(([feature]) => feature),

    // API status
    apis: {
        openai: {
            configured: !!ApiConfig.openai.key,  // Do we have an OpenAI API key?
            model: ApiConfig.openai.model
        }
    }
});

// ===== EXPORT MAIN CONFIG =====
// This bundles everything together for easy importing

export const Config = {
    Environment,                    // Platform detection
    Api: ApiConfig,                // API configurations
    UserPreferences: DefaultUserPreferences,  // Default user settings
    VoiceInput: DefaultVoiceInputConfig,       // Voice listening settings
    TTS: DefaultTTSConfig,         // Voice speaking settings
    App: DefaultAppSettings,       // Main app settings
    Logging: LoggingConfig,        // Debug logging settings
    Performance: PerformanceConfig, // Speed/performance settings
    Features: FeatureFlags,        // Feature on/off switches
    VerseCategories: VerseCategoriesConfig,  // Emotion -> verses mapping
    FallbackVerses,               // Emergency verses
    validate: validateConfiguration,  // Check if config is valid
    getInfo: getEnvironmentInfo   // Get current configuration info
} as const;

export default Config; 