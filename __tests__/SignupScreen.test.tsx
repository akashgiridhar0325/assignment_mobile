import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from '../screens/SignupScreen';

describe('SignupScreen', () => {
  it('renders signup form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen />);

    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Signup')).toBeTruthy();
  });

  it('validates input fields on signup', async () => {
    const { getByText } = render(<SignupScreen />);
    fireEvent.press(getByText('Signup'));

    await waitFor(() => {
      expect(getByText('Username is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('handles successful signup', async () => {
    const mockSignup = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SignupScreen onSignup={mockSignup} />
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'newuser');
    fireEvent.changeText(getByPlaceholderText('Email'), 'newuser@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Signup'));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      });
    });
  });
});
