import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('todo_db');

export default function Index() {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState<any[]>([]);

    useEffect(() => {
        db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);
    `);
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        const allRows = db.getAllSync('SELECT * FROM tasks');
        setTaskList(allRows);
    };

    const addTask = () => {
        if (task.trim().length === 0) return;
        db.runSync('INSERT INTO tasks (title) VALUES (?)', [task]);
        setTask('');
        Keyboard.dismiss();
        fetchTasks();
    };

    const deleteTask = (id: number) => {
        db.runSync('DELETE FROM tasks WHERE id = ?', [id]);
        fetchTasks();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мій To-Do (Варіант 2)</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Завдання..."
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity onPress={addTask} style={styles.addButton}>
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={taskList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.title}</Text>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text style={styles.deleteText}>Видалити</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 40, paddingTop: 60, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { flex: 1, borderBottomWidth: 1, marginRight: 10, padding: 5 },
    addButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, width: 45, alignItems: 'center' },
    addText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    taskItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 8 },
    taskText: { fontSize: 16 },
    deleteText: { color: '#FF3B30', fontWeight: 'bold' }
});
