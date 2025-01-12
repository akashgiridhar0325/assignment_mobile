import React from 'react';
import { render } from '@testing-library/react-native';
import Navigation from '../Navigation';

describe('App Navigation', () => {
  it('renders the initial login screen', () => {
    const { getByText } = render(<Navigation />);
    expect(getByText('Login')).toBeTruthy();
  });

  it('navigates between screens correctly', () => {
    const { getByText } = render(<Navigation />);

    // Simulate navigation actions here
  });
});
