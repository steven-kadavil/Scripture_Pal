import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const handleMethodSelect = (method: string) => {
        switch (method) {
            case 'wifi':
                navigation.navigate('WiFiScan');
                break;
            case 'qr':
                navigation.navigate('QRCode');
                break;
            case 'bluetooth':
                navigation.navigate('Bluetooth');
                break;
            default:
                Alert.alert('Error', 'Method not implemented yet');
        }
    };

    const methods = [
        {
            id: 'wifi',
            title: 'WiFi Hotspot',
            description: 'Connect to Pi\'s WiFi hotspot and configure',
            icon: 'wifi',
            color: '#4CAF50',
        },
        {
            id: 'qr',
            title: 'QR Code',
            description: 'Scan QR code to get configuration',
            icon: 'qr-code',
            color: '#2196F3',
        },
        {
            id: 'bluetooth',
            title: 'Bluetooth',
            description: 'Connect via Bluetooth to configure',
            icon: 'bluetooth',
            color: '#9C27B0',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Raspberry Pi WiFi Config</Text>
                <Text style={styles.subtitle}>
                    Choose a method to configure your Raspberry Pi's WiFi settings
                </Text>
            </View>

            <View style={styles.methodsContainer}>
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={styles.methodCard}
                        onPress={() => handleMethodSelect(method.id)}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: method.color }]}>
                            <Ionicons name={method.icon as any} size={32} color="white" />
                        </View>
                        <View style={styles.methodContent}>
                            <Text style={styles.methodTitle}>{method.title}</Text>
                            <Text style={styles.methodDescription}>{method.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>How it works:</Text>
                <Text style={styles.infoText}>
                    1. Choose your preferred connection method{'\n'}
                    2. Follow the on-screen instructions{'\n'}
                    3. Enter your WiFi credentials{'\n'}
                    4. Your Pi will connect automatically
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
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    methodsContainer: {
        padding: 20,
    },
    methodCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    methodContent: {
        flex: 1,
    },
    methodTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    methodDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
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

export default HomeScreen; 