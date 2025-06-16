// TypeScript type definitions for Scripture Pal

// ===== BIBLE API TYPES =====

export interface Verse {
    id: string;
    orgId: string; //
    bookId: string;
    chapterNumber: number;
    verseNumber: number;
    reference: string;
    text: string;
    translation: string;
}

export interface BibleBook {
    id: string;
    name: string;
    abbreviation: string;
    testament: 'OLD' | 'NEW';
}

export interface BibleTranslation {
    id: string;
    name: string;
    abbreviation: string;
    language: string;
}

export interface BibleAPIResponse {
    data?: {
        id: string;
        orgId: string;
        content: string;
        reference: string;
        verseCount: number;
        copyright: string;
    };
    meta?: {
        fums: string;
        fumsId: string;
        fumsJsInclude: string;
        fumsJs: string;
        fumsNoScript: string;
    };
    error?: {
        code: string;
        message: string;
        details?: string;
    };
}

// ===== USER INPUT & EMOTION TYPES =====

export interface UserRequest {
    originalText: string;
    processedText: string;
    timestamp: Date;
    source: 'voice' | 'text';
}

export interface EmotionAnalysis {
    primaryEmotion: EmotionType;
    confidence: number;
    secondaryEmotions?: EmotionType[];
    keywords: string[];
    context?: string;
}

export type EmotionType =
    | 'anxiety' | 'fear' | 'worry'
    | 'sadness' | 'grief' | 'depression'
    | 'anger' | 'frustration' | 'resentment'
    | 'loneliness' | 'isolation'
    | 'guilt' | 'shame' | 'regret'
    | 'doubt' | 'confusion' | 'uncertainty'
    | 'hope' | 'faith' | 'trust'
    | 'gratitude' | 'joy' | 'peace'
    | 'love' | 'compassion' | 'forgiveness'
    | 'strength' | 'courage' | 'perseverance'
    | 'guidance' | 'wisdom' | 'direction'
    | 'healing' | 'comfort' | 'restoration' | 'lust';

// ===== VOICE INPUT TYPES =====

export interface VoiceInputState {
    isListening: boolean;
    isProcessing: boolean;
    transcript: string;
    confidence: number;
    error?: string;
    wakeWordDetected: boolean;
}

export interface VoiceInputConfig {
    wakePhrase: string;
    language: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    timeoutMs: number;
}

export interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
    isFinal: boolean;
    alternatives?: SpeechAlternative[];
}

export interface SpeechAlternative {
    transcript: string;
    confidence: number;
}

// ===== TEXT-TO-SPEECH TYPES =====

export interface TTSConfig {
    voice?: string;
    rate: number;
    pitch: number;
    volume: number;
    language: string;
}

export interface TTSState {
    isSpeaking: boolean;
    isPaused: boolean;
    currentText?: string;
    progress: number;
    error?: string;
}

// ===== AI VERSE MATCHING TYPES =====

export interface VerseMatchRequest {
    userRequest: UserRequest;
    emotionAnalysis: EmotionAnalysis;
    contextHistory?: UserRequest[];
    preferences?: UserPreferences;
}

export interface VerseMatchResponse {
    primaryVerse: Verse;
    alternativeVerses?: Verse[];
    explanation: string;
    confidence: number;
    matchingReasons: string[];
    category: EmotionType;
}

export interface VerseMatchingStrategy {
    name: string;
    description: string;
    weight: number;
    enabled: boolean;
}

// ===== USER PREFERENCES & SETTINGS =====

export interface UserPreferences {
    preferredTranslation: string;
    voiceSettings: TTSConfig;
    wakePhrase: string;
    debugMode: boolean;
    responseLength: 'short' | 'medium' | 'long';
    includeExplanation: boolean;
    maxAlternativeVerses: number;
}

export interface AppSettings {
    bibleApiKey: string;
    openaiApiKey?: string;
    defaultTranslation: string;
    fallbackVerses: string[];
    enableLogging: boolean;
    voiceInputTimeout: number;
}

// ===== APP STATE TYPES =====

export interface AppState {
    isInitialized: boolean;
    isConnected: boolean;
    currentMode: AppMode;
    voiceState: VoiceInputState;
    ttsState: TTSState;
    lastResponse?: ScripturePalResponse;
    error?: AppError;
    debugInfo?: DebugInfo;
}

export type AppMode =
    | 'idle'           // Waiting for wake phrase
    | 'listening'      // Recording user input
    | 'processing'     // Analyzing and finding verses
    | 'responding'     // Speaking the response
    | 'error'          // Error state
    | 'offline';       // No internet connection

export interface ScripturePalResponse {
    verseMatch: VerseMatchResponse;
    audioResponse?: string;
    timestamp: Date;
    processingTimeMs: number;
    userRequest: UserRequest;
}

// ===== ERROR HANDLING TYPES =====

export interface AppError {
    code: ErrorCode;
    message: string;
    details?: string;
    timestamp: Date;
    context?: Record<string, any>;
    recoverable: boolean;
}

export type ErrorCode =
    | 'BIBLE_API_ERROR'
    | 'VOICE_INPUT_ERROR'
    | 'TTS_ERROR'
    | 'AI_PROCESSING_ERROR'
    | 'NETWORK_ERROR'
    | 'MICROPHONE_PERMISSION_DENIED'
    | 'WAKE_WORD_TIMEOUT'
    | 'INVALID_CONFIG'
    | 'UNKNOWN_ERROR';

// ===== SERVICE INTERFACE TYPES =====

export interface IBibleAPIService {
    getVerse(reference: string, translation?: string): Promise<Verse>;
    searchVerses(query: string, translation?: string): Promise<Verse[]>;
    getRandomVerse(translation?: string): Promise<Verse>;
    getTranslations(): Promise<BibleTranslation[]>;
}

export interface IVoiceInputService {
    startListening(config?: Partial<VoiceInputConfig>): Promise<void>;
    stopListening(): Promise<void>;
    getState(): VoiceInputState;
    onResult(callback: (result: SpeechRecognitionResult) => void): void;
    onError(callback: (error: AppError) => void): void;
}

export interface IVerseMatchingService {
    findMatchingVerses(request: VerseMatchRequest): Promise<VerseMatchResponse>;
    analyzeEmotion(text: string): Promise<EmotionAnalysis>;
    getStrategies(): VerseMatchingStrategy[];
}

export interface IScripturePalService {
    initialize(settings: AppSettings): Promise<void>;
    processUserInput(input: string): Promise<ScripturePalResponse>;
    getState(): AppState;
    updatePreferences(preferences: Partial<UserPreferences>): void;
    onStateChange(callback: (state: AppState) => void): void;
}

// ===== DEBUG & DEVELOPMENT TYPES =====

export interface DebugInfo {
    version: string;
    buildTime: string;
    platform: 'native' | 'web' | 'pi';
    apiEndpoints: Record<string, string>;
    performanceMetrics?: PerformanceMetrics;
    lastErrors?: AppError[];
}

export interface PerformanceMetrics {
    voiceInputLatency: number;
    apiResponseTime: number;
    aiProcessingTime: number;
    ttsLatency: number;
    totalResponseTime: number;
}

// ===== UTILITY TYPES =====

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Callback<T = void> = (value: T) => void;

export type AsyncCallback<T = void> = (value: T) => Promise<void>;

export type ServiceStatus = 'initializing' | 'ready' | 'error' | 'offline';

// ===== CONSTANTS =====

export const DEFAULT_WAKE_PHRASE = "Hey Scripture Friend";

export const DEFAULT_TRANSLATION = "de4e12af7f28f599-02"; // ESV

export const SUPPORTED_LANGUAGES = ['en-US', 'en-GB', 'es-ES', 'fr-FR'] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];