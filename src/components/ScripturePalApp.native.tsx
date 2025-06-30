// React Native component for Scripture Pal
// TODO: Implement React Native UI components 

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ScripturePalApp: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Scripture Pal</Text>
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
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
});

export default ScripturePalApp; 