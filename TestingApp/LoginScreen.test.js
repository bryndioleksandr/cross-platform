import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen, { validateEmail, validatePassword } from './LoginScreen';

describe('Unit Tests: Validation', () => {
    test('valid email passes validation', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });
    test('invalid email fails validation', () => {
        expect(validateEmail('wrong@')).toBe(false);
    });
    test('short password fails validation', () => {
        expect(validatePassword('123')).toBe(false);
    });
});

describe('Component Tests: LoginScreen UI', () => {
    test('shows error message on invalid login', () => {
        const { getByTestId } = render(<LoginScreen />);

        fireEvent.changeText(getByTestId('emailInput'), 'invalidEmail');
        fireEvent.changeText(getByTestId('passwordInput'), '123');
        fireEvent.press(getByTestId('loginButton'));

        expect(getByTestId('messageText').props.children).toBe('Invalid email format');
    });
});
