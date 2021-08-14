import React from 'react';
import { render } from '@testing-library/react-native';
import ContactList from '../../src/layouts/ContactList';

describe('All Contacts Screen', () => {
  const navigation = {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    goBack: jest.fn(),
  };
  it('should render ContactList screen', async () => {
    const tree = render(<ContactList navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
