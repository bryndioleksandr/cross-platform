import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const HtmlValidationForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { htmlTag: '' }
    });

    const onSubmit = data => {
        Alert.alert('Валідно', `Тег "${data.htmlTag}" відповідає правилам.`);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.card}>
                <Text style={styles.badge}>Варіант 9</Text>
                <Text style={styles.title}>Перевірка HTML-тегу</Text>
                <Text style={styles.subtitle}>Введіть тег для перевірки синтаксису</Text>

                <View style={styles.inputSection}>
                    <Controller
                        control={control}
                        name="htmlTag"
                        rules={{
                            required: 'Поле не може бути порожнім',
                            pattern: {
                                value: /^<\/?[a-z]+[1-6]?(\s+[^>]*)?>$/i,
                                message: 'Невірний формат (напр. <div> або <h1 class="...">'
                            }
                        }}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.htmlTag && styles.inputError
                                ]}
                                placeholder="<div class='container'>"
                                placeholderTextColor="#ADB5BD"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                autoCapitalize="none"
                                spellCheck={false}
                            />
                        )}
                    />
                    {errors.htmlTag && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errors.htmlTag.message}</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit(onSubmit)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Перевірити синтаксис</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E9ECEF',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        // Тіні для iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        // Тіні для Android
        elevation: 10,
    },
    badge: {
        alignSelf: 'center',
        backgroundColor: '#E7F5FF',
        color: '#228BE6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#212529',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#868E96',
        textAlign: 'center',
        marginBottom: 25,
    },
    inputSection: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1.5,
        borderColor: '#DEE2E6',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        color: '#212529',
    },
    inputError: {
        borderColor: '#FA5252',
        backgroundColor: '#FFF5F5',
    },
    errorContainer: {
        marginTop: 8,
        paddingLeft: 4,
    },
    errorText: {
        color: '#FA5252',
        fontSize: 13,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#28A745',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#28A745',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default HtmlValidationForm;
