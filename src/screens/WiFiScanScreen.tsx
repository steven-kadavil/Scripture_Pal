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
import * as Location from 'expo-location';
import * as Network from 'expo-network';

interface WiFiNetwork {
    ssid: string;
    strength: number;
    security: string;
    isPiHotspot?: boolean;
}

interface WiFiScanScreenProps {
    navigation: any;
}

const WiFiScanScreen: React.FC<WiFiScanScreenProps> = ({ navigation }) => {
    const [networks, setNetworks] = useState<WiFiNetwork[]>([]);
    const [scanning, setScanning] = useState(false);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Location permission is needed to scan WiFi networks'
            );
        }
    };

    const scanNetworks = async () => {
        setScanning(true);

        // Simulate WiFi scanning (in real app, you'd use native WiFi scanning)
        setTimeout(() => {
            const mockNetworks: WiFiNetwork[] = [
                {
                    ssid: 'RaspberryPi_Config',
                    strength: 90,
                    security: 'Open',
                    isPiHotspot: true,
                },
                {
                    ssid: 'HomeWiFi',
                    strength: 75,
                    security: 'WPA2',
                },
                {
                    ssid: 'NeighborWiFi',
                    strength: 45,
                    security: 'WPA2',
                },
                {
                    ssid: 'GuestNetwork',
                    strength: 60,
                    security: 'Open',
                },
            ];

            setNetworks(mockNetworks);
            setScanning(false);
        }, 2000);
    };

    const connectToPi = async (network: WiFiNetwork) => {
        if (!network.isPiHotspot) {
            Alert.alert('Not a Pi Hotspot', 'Please select the Raspberry Pi configuration network');
            return;
        }

        Alert.alert(
            'Connect to Pi',
            `Connect to ${network.ssid}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Connect',
                    onPress: () => {
                        setConnected(true);
                        navigation.navigate('Config', { method: 'wifi' });
                    },
                },
            ]
        );
    };

    const renderNetwork = ({ item }: { item: WiFiNetwork }) => (
        <TouchableOpacity
            style={[
                styles.networkItem,
                item.isPiHotspot && styles.piNetworkItem,
            ]}
            onPress={() => connectToPi(item)}
        >
            <View style={styles.networkInfo}>
                <View style={styles.networkHeader}>
                    <Text style={[
                        styles.networkName,
                        item.isPiHotspot && styles.piNetworkName,
                    ]}>
                        {item.ssid}
                    </Text>
                    {item.isPiHotspot && (
                        <View style={styles.piBadge}>
                            <Text style={styles.piBadgeText}>PI</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.networkDetails}>
                    Security: {item.security} • Signal: {item.strength}%
                </Text>
            </View>
            <View style={styles.signalIndicator}>
                <Ionicons
                    name="wifi"
                    size={24}
                    color={item.strength > 70 ? '#4CAF50' : item.strength > 40 ? '#FF9800' : '#F44336'}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Networks</Text>
                <Text style={styles.subtitle}>
                    Look for a network named "RaspberryPi_Config" or similar
                </Text>
            </View>

            <TouchableOpacity
                style={styles.scanButton}
                onPress={scanNetworks}
                disabled={scanning}
            >
                {scanning ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Ionicons name="refresh" size={20} color="white" />
                        <Text style={styles.scanButtonText}>Scan Networks</Text>
                    </>
                )}
            </TouchableOpacity>

            {networks.length > 0 && (
                <FlatList
                    data={networks}
                    renderItem={renderNetwork}
                    keyExtractor={(item) => item.ssid}
                    style={styles.networkList}
                />
            )}

            {!scanning && networks.length === 0 && (
                <View style={styles.emptyState}>
                    <Ionicons name="wifi-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>No networks found</Text>
                    <Text style={styles.emptySubtext}>
                        Tap "Scan Networks" to search for available WiFi networks
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
        backgroundColor: '#2196F3',
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
    networkList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    networkItem: {
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
    piNetworkItem: {
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    networkInfo: {
        flex: 1,
    },
    networkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    networkName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    piNetworkName: {
        color: '#4CAF50',
    },
    piBadge: {
        backgroundColor: '#4CAF50',
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
    networkDetails: {
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
});

export default WiFiScanScreen; 