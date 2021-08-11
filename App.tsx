import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from './src/layouts/ContactList';
import ContactView from './src/layouts/ContactView';

export type RootStackParamList = {
  'All Contacts': undefined;
  'View/Edit Contact': {
    contactId?: string;
  };
};

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="All Contacts" component={ContactList} />
        <Stack.Screen name="View/Edit Contact" component={ContactView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
