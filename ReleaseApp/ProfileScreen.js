import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Олександр</Text>
                <Text style={styles.email}>nodelex@example.com</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.bioTitle}>Про мене</Text>
                <Text style={styles.bioText}>
                    Студент 2-го курсу спеціальності "Комп'ютерні науки". Відкритий до нових проєктів.
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Редагувати профіль</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.logoutButton]}>
                    <Text style={[styles.buttonText, styles.logoutText]}>Вийти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { alignItems: 'center', padding: 30, paddingTop: 60, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    email: { fontSize: 16, color: '#666', marginTop: 5 },
    infoSection: { padding: 20, backgroundColor: '#fff', marginTop: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ddd' },
    bioTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    bioText: { fontSize: 16, color: '#555', lineHeight: 24 },
    buttonContainer: { padding: 20, marginTop: 10 },
    button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    logoutButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ff3b30' },
    logoutText: { color: '#ff3b30', fontSize: 16, fontWeight: 'bold' }
});
