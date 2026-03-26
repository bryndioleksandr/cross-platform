import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputEchoScreen from './InputEchoScreen';

describe('Variant 3: InputEchoScreen', () => {
    test('updates text dynamically below the input', () => {
        const { getByTestId } = render(<InputEchoScreen />);

        const inputElement = getByTestId('echoInput');
        const textElement = getByTestId('echoText');

        fireEvent.changeText(inputElement, 'React Native Lab');

        expect(textElement.props.children).toBe('React Native Lab');
    });
});
