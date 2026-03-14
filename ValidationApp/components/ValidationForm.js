import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const ValidationForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '' }
    });

    const onSubmit = data => console.log('Дані форми:', data);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вхід у систему</Text>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email адреса</Text>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Це поле обов’язкове',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Невірний формат email'
                        }
                    }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                            style={[
                                styles.input,
                                errors.email && styles.inputError
                            ]}
                            placeholder="example@mail.com"
                            placeholderTextColor="#999"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Перевірити</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        backgroundColor: '#F5F7FA',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A1C1E',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: '#1A1C1E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputError: {
        borderColor: '#FF5252',
        backgroundColor: '#FFF8F8',
    },
    errorText: {
        color: '#FF5252',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#007AFF',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ValidationForm;
