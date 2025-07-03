// React Native component for Scripture Pal
// TODO: Implement React Native UI components 

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { processSpeech, stopSpeech } from '../services/voiceInput.native';

const ScripturePalApp: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const handleStartListening = async () => {
        if (isListening) {
            stopSpeech();
            setIsListening(false);
            return;
        }

        setIsListening(true);
        setTranscript('Listening...');

        try {
            const result = await processSpeech();
            setTranscript(result);
            console.log('✅ Final result:', result);
        } catch (error) {
            console.error('❌ Speech error:', error);
            setTranscript('Error: ' + error);
            Alert.alert('Error', 'Failed to process speech');
        } finally {
            setIsListening(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Scripture Pal</Text>
                <Text style={styles.subtitle}>Tap the microphone to start</Text>

                <TouchableOpacity
                    style={[styles.micButton, isListening && styles.micButtonActive]}
                    onPress={handleStartListening}
                >
                    <Text style={styles.micButtonText}>
                        {isListening ? '🛑 Stop' : '🎤 Start'}
                    </Text>
                </TouchableOpacity>

                {transcript && (
                    <View style={styles.transcriptContainer}>
                        <Text style={styles.transcriptLabel}>You said:</Text>
                        <Text style={styles.transcriptText}>{transcript}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 40,
        textAlign: 'center',
    },
    micButton: {
        backgroundColor: '#3498db',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 30,
    },
    micButtonActive: {
        backgroundColor: '#e74c3c',
    },
    micButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    transcriptContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        maxWidth: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    transcriptLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    transcriptText: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: '500',
    },
});

export default ScripturePalApp; 