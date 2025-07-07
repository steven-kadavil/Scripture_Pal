import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConfigScreenProps {
    navigation: any;
    route: any;
}

const ConfigScreen: React.FC<ConfigScreenProps> = ({ navigation, route }) => {
    const { method, config, device } = route.params || {};

    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSendConfig = async () => {
        if (!ssid.trim()) {
            Alert.alert('Error', 'Please enter a WiFi network name');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Error', 'Please enter a WiFi password');
            return;
        }

        setSending(true);

        // Simulate sending configuration to Pi
        setTimeout(() => {
            setSending(false);
            Alert.alert(
                'Configuration Sent!',
                'Your Raspberry Pi will now attempt to connect to the WiFi network. Check the Pi\'s status LED for connection status.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Home'),
                    },
                ]
            );
        }, 3000);
    };

    const getMethodInfo = () => {
        switch (method) {
            case 'wifi':
                return {
                    title: 'WiFi Hotspot Configuration',
                    description: 'Connected via WiFi hotspot',
                    icon: 'wifi',
                    color: '#4CAF50',
                };
            case 'qr':
                return {
                    title: 'QR Code Configuration',
                    description: `Connected to: ${config?.ssid || 'Unknown'}`,
                    icon: 'qr-code',
                    color: '#2196F3',
                };
            case 'bluetooth':
                return {
                    title: 'Bluetooth Configuration',
                    description: `Connected to: ${device?.name || 'Unknown'}`,
                    icon: 'bluetooth',
                    color: '#9C27B0',
                };
            default:
                return {
                    title: 'WiFi Configuration',
                    description: 'Configure your Pi\'s WiFi settings',
                    icon: 'settings',
                    color: '#666',
                };
        }
    };

    const methodInfo = getMethodInfo();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: methodInfo.color }]}>
                    <Ionicons name={methodInfo.icon as any} size={32} color="white" />
                </View>
                <Text style={styles.title}>{methodInfo.title}</Text>
                <Text style={styles.subtitle}>{methodInfo.description}</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>WiFi Network Settings</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Network Name (SSID)</Text>
                    <TextInput
                        style={styles.input}
                        value={ssid}
                        onChangeText={setSsid}
                        placeholder="Enter WiFi network name"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter WiFi password"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.sendButton, sending && styles.sendButtonDisabled]}
                    onPress={handleSendConfig}
                    disabled={sending}
                >
                    {sending ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Ionicons name="send" size={20} color="white" />
                            <Text style={styles.sendButtonText}>Send Configuration</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>What happens next:</Text>
                <Text style={styles.infoText}>
                    • Your Pi will attempt to connect to the WiFi network{'\n'}
                    • The Pi's status LED will indicate connection status{'\n'}
                    • Once connected, the Pi will be accessible on your network{'\n'}
                    • You can disconnect from the Pi's configuration network
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        marginRight: 8,
    },
    eyeButton: {
        padding: 8,
    },
    sendButton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 8,
        marginTop: 10,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    infoContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default ConfigScreen; 