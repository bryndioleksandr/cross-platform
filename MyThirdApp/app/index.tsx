import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Index() {
    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function setupDatabase() {
            try {
                const database = await SQLite.openDatabaseAsync('todo_db');
                setDb(database);

                // Створюємо таблицю
                await database.execAsync(`
          CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT);
        `);

                // Завантажуємо дані
                const allRows = await database.getAllAsync('SELECT * FROM tasks');
                setTaskList(allRows);
            } catch (error) {
                console.error("Помилка БД:", error);
            } finally {
                setIsLoading(false);
            }
        }

        setupDatabase();
    }, []);

    const fetchTasks = async () => {
        if (!db) return;
        const allRows = await db.getAllAsync('SELECT * FROM tasks');
        setTaskList(allRows);
    };

    const addTask = async () => {
        if (task.trim().length === 0 || !db) return;
        try {
            await db.runAsync('INSERT INTO tasks (title) VALUES (?)', [task]);
            setTask('');
            Keyboard.dismiss();
            await fetchTasks();
        } catch (error) {
            console.error("Не вдалося додати:", error);
        }
    };

    const deleteTask = async (id: number) => {
        if (!db) return;
        try {
            await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
            await fetchTasks();
        } catch (error) {
            console.error("Не вдалося видалити:", error);
        }
    };

    if (isLoading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#007AFF" /></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мій To-Do (Async)</Text>

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
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { flex: 1, borderBottomWidth: 1, marginRight: 10, padding: 5 },
    addButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, width: 45, alignItems: 'center' },
    addText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    taskItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 8 },
    taskText: { fontSize: 16 },
    deleteText: { color: '#FF3B30', fontWeight: 'bold' }
});
