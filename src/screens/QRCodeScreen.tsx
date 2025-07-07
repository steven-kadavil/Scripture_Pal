import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

interface QRCodeScreenProps {
    navigation: any;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);

        try {
            // Parse QR code data (expected format: JSON with WiFi config)
            const config = JSON.parse(data);

            if (config.type === 'wifi-config') {
                Alert.alert(
                    'Configuration Found',
                    `SSID: ${config.ssid}\nIP: ${config.ip}`,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Configure',
                            onPress: () => {
                                navigation.navigate('Config', {
                                    method: 'qr',
                                    config: config
                                });
                            },
                        },
                    ]
                );
            } else {
                Alert.alert('Invalid QR Code', 'This QR code is not a valid WiFi configuration');
            }
        } catch (error) {
            Alert.alert('Invalid QR Code', 'Could not parse the QR code data');
        }
    };



    const resetScanner = () => {
        setScanned(false);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Ionicons name="camera-outline" size={64} color="#ccc" />
                <Text style={styles.permissionText}>No access to camera</Text>
                <Text style={styles.permissionSubtext}>
                    Camera permission is required to scan QR codes
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Scan QR Code</Text>
                    <Text style={styles.headerSubtext}>
                        Point camera at Raspberry Pi configuration QR code
                    </Text>
                </View>

                <View style={styles.scanArea}>
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />
                </View>

                <View style={styles.controls}>
                    {scanned && (
                        <TouchableOpacity style={styles.scanAgainButton} onPress={resetScanner}>
                            <Text style={styles.scanAgainText}>Scan Again</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');
const scanAreaSize = Math.min(width, height) * 0.6;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    header: {
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    headerSubtext: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    scanArea: {
        position: 'absolute',
        top: (height - scanAreaSize) / 2,
        left: (width - scanAreaSize) / 2,
        width: scanAreaSize,
        height: scanAreaSize,
    },
    cornerTL: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#2196F3',
    },
    cornerTR: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#2196F3',
    },
    cornerBL: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#2196F3',
    },
    cornerBR: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#2196F3',
    },
    controls: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    controlButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    scanAgainButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginLeft: 20,
    },
    scanAgainText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    permissionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    permissionSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 40,
    },
});

export default QRCodeScreen; 