import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

describe('ForgotPasswordScreen', () => {
  it('renders forgot password form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <ForgotPasswordScreen />
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByText('Reset Password')).toBeTruthy();
  });

  it('validates empty email field', async () => {
    const { getByText } = render(<ForgotPasswordScreen />);
    fireEvent.press(getByText('Reset Password'));

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
    });
  });

  it('handles password reset for valid email', async () => {
    const mockResetPassword = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ForgotPasswordScreen onResetPassword={mockResetPassword} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
    fireEvent.press(getByText('Reset Password'));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('user@example.com');
    });
  });
});
