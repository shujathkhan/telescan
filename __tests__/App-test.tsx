import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('App', async () => {
    const component = render(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
