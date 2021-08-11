import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from './src/layouts/ContactList';
import ContactView from './src/layouts/ContactView';

export type RootStackParamList = {
  ContactList: undefined;
  ContactView: { contactId: string };
};

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="ContactView" component={ContactView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
