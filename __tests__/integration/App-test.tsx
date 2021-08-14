import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';
import { NavigationContainer } from '@react-navigation/native';

describe('Testing navigation', () => {
  const setup = () => {
    const component = (
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );
    const container = render(component);
    return { container };
  };

  it('App should render ContactList as first navigation', async () => {
    const { container } = setup();
    const { findByText } = container;

    const fallbackMessage = await findByText(/No contacts/);
    const caption = await findByText('Showing 0 contacts');

    expect(fallbackMessage).toBeTruthy();
    expect(caption).toBeTruthy();

    expect(container.toJSON()).toMatchSnapshot();
  });
});
