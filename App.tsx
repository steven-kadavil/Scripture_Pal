import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import WiFiScanScreen from './src/screens/WiFiScanScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import BluetoothScreen from './src/screens/BluetoothScreen';
import ConfigScreen from './src/screens/ConfigScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#2196F3',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'WiFi Config' }}
                    />
                    <Stack.Screen
                        name="WiFiScan"
                        component={WiFiScanScreen}
                        options={{ title: 'Scan WiFi' }}
                    />
                    <Stack.Screen
                        name="QRCode"
                        component={QRCodeScreen}
                        options={{ title: 'QR Code' }}
                    />
                    <Stack.Screen
                        name="Bluetooth"
                        component={BluetoothScreen}
                        options={{ title: 'Bluetooth' }}
                    />
                    <Stack.Screen
                        name="Config"
                        component={ConfigScreen}
                        options={{ title: 'Configure Pi' }}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
}); 