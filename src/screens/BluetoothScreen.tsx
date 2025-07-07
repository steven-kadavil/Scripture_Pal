import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BluetoothDevice {
    id: string;
    name: string;
    isPi?: boolean;
    rssi?: number;
}

interface BluetoothScreenProps {
    navigation: any;
}

const BluetoothScreen: React.FC<BluetoothScreenProps> = ({ navigation }) => {
    const [devices, setDevices] = useState<BluetoothDevice[]>([]);
    const [scanning, setScanning] = useState(false);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

    useEffect(() => {
        checkBluetoothStatus();
    }, []);

    const checkBluetoothStatus = async () => {
        // In a real app, you'd check actual Bluetooth status
        // For now, we'll simulate it
        setBluetoothEnabled(true);
    };

    const scanDevices = async () => {
        setScanning(true);

        // Simulate Bluetooth scanning
        setTimeout(() => {
            const mockDevices: BluetoothDevice[] = [
                {
                    id: '1',
                    name: 'RaspberryPi_Config',
                    isPi: true,
                    rssi: -45,
                },
                {
                    id: '2',
                    name: 'iPhone_Steven',
                    rssi: -60,
                },
                {
                    id: '3',
                    name: 'Samsung_Galaxy',
                    rssi: -70,
                },
                {
                    id: '4',
                    name: 'MacBook_Pro',
                    rssi: -55,
                },
            ];

            setDevices(mockDevices);
            setScanning(false);
        }, 3000);
    };

    const connectToDevice = async (device: BluetoothDevice) => {
        if (!device.isPi) {
            Alert.alert('Not a Pi Device', 'Please select a Raspberry Pi device');
            return;
        }

        Alert.alert(
            'Connect to Pi',
            `Connect to ${device.name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Connect',
                    onPress: () => {
                        navigation.navigate('Config', {
                            method: 'bluetooth',
                            device: device
                        });
                    },
                },
            ]
        );
    };

    const renderDevice = ({ item }: { item: BluetoothDevice }) => (
        <TouchableOpacity
            style={[
                styles.deviceItem,
                item.isPi && styles.piDeviceItem,
            ]}
            onPress={() => connectToDevice(item)}
        >
            <View style={styles.deviceInfo}>
                <View style={styles.deviceHeader}>
                    <Text style={[
                        styles.deviceName,
                        item.isPi && styles.piDeviceName,
                    ]}>
                        {item.name}
                    </Text>
                    {item.isPi && (
                        <View style={styles.piBadge}>
                            <Text style={styles.piBadgeText}>PI</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.deviceDetails}>
                    Signal: {item.rssi} dBm
                </Text>
            </View>
            <View style={styles.signalIndicator}>
                <Ionicons
                    name="bluetooth"
                    size={24}
                    color={item.rssi && item.rssi > -60 ? '#4CAF50' : item.rssi && item.rssi > -70 ? '#FF9800' : '#F44336'}
                />
            </View>
        </TouchableOpacity>
    );

    if (!bluetoothEnabled) {
        return (
            <View style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="bluetooth-outline" size={64} color="#ccc" />
                    <Text style={styles.errorTitle}>Bluetooth Required</Text>
                    <Text style={styles.errorText}>
                        Please enable Bluetooth to scan for Raspberry Pi devices
                    </Text>
                    <TouchableOpacity style={styles.enableButton}>
                        <Text style={styles.enableButtonText}>Enable Bluetooth</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bluetooth Devices</Text>
                <Text style={styles.subtitle}>
                    Look for a device named "RaspberryPi_Config" or similar
                </Text>
            </View>

            <TouchableOpacity
                style={styles.scanButton}
                onPress={scanDevices}
                disabled={scanning}
            >
                {scanning ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Ionicons name="bluetooth" size={20} color="white" />
                        <Text style={styles.scanButtonText}>Scan Devices</Text>
                    </>
                )}
            </TouchableOpacity>

            {devices.length > 0 && (
                <FlatList
                    data={devices}
                    renderItem={renderDevice}
                    keyExtractor={(item) => item.id}
                    style={styles.deviceList}
                />
            )}

            {!scanning && devices.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="bluetooth-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>No devices found</Text>
                    <Text style={styles.emptySubtext}>
                        Tap "Scan Devices" to search for Bluetooth devices
                    </Text>
                </View>
            )}
        </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    scanButton: {
        backgroundColor: '#9C27B0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        margin: 20,
        borderRadius: 8,
    },
    scanButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    deviceList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    deviceItem: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    piDeviceItem: {
        borderColor: '#9C27B0',
        borderWidth: 2,
    },
    deviceInfo: {
        flex: 1,
    },
    deviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    piDeviceName: {
        color: '#9C27B0',
    },
    piBadge: {
        backgroundColor: '#9C27B0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginLeft: 8,
    },
    piBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    deviceDetails: {
        fontSize: 12,
        color: '#666',
    },
    signalIndicator: {
        marginLeft: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 22,
    },
    enableButton: {
        backgroundColor: '#9C27B0',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    enableButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BluetoothScreen; 