import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: 'white',
        paddingVertical: 14,
    },
    label: {
        color: 'black',
        fontSize: 17,
        flex: 5
    },
    value: {
        color: '#8E8E93',
        fontSize: 17,
        flex: 7,
        textAlign: 'right'
    }
});

export default ({ label, value }) => (
    <View style={styles.container}>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>{value}</Text>
    </View>
);
