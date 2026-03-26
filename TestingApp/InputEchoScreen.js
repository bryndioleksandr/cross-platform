import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function InputEchoScreen() {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Введіть що-небудь:</Text>
            <TextInput
                style={styles.input}
                testID="echoInput"
                placeholder="Писати тут..."
                onChangeText={setText}
                value={text}
            />
            <Text style={styles.resultLabel}>Ви ввели:</Text>
            <Text style={styles.echoText} testID="echoText">{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    label: { fontSize: 16, marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16 },
    resultLabel: { fontSize: 16, marginTop: 20, color: 'gray' },
    echoText: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: 'blue' }
});
