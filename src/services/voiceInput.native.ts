// Voice input service for React Native
// Using expo-speech-recognition (works with Expo Go!)

import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

/**
 * Simple voice input function
 * Processes real speech and returns the transcript
 */
export async function processSpeech(): Promise<string> {
    console.log('🎤 Starting speech recognition...');

    // Request permissions first
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
        console.log('Microphone permission denied');
        return 'Permission denied';
    }

    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: true,
        continuous: false
    });

    return new Promise((resolve) => {
        const resultListener = ExpoSpeechRecognitionModule.addListener('result', (event) => {
            const transcript = event.results[0]?.transcript;
            console.log('🎤 Heard:', transcript);

            if (event.isFinal) {
                resultListener.remove();
                resolve(transcript || 'No speech detected');
            }
        });

        // Add error listener
        const errorListener = ExpoSpeechRecognitionModule.addListener('error', (event) => {
            console.log('❌ Speech recognition error:', event.error);
            resultListener.remove();
            errorListener.remove();
            resolve('Error: ' + event.error);
        });

        // Add end listener
        const endListener = ExpoSpeechRecognitionModule.addListener('end', () => {
            console.log('🛑 Speech recognition ended');
            resultListener.remove();
            errorListener.remove();
            endListener.remove();
        });
    });
}

/**
 * Stop speech recognition
 */
export function stopSpeech(): void {
    console.log('🛑 Stopping speech recognition...');
    ExpoSpeechRecognitionModule.stop();
} 