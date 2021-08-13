import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from './src/layouts/ContactList';
import ContactView from './src/layouts/ContactView';
import NewContact from './src/layouts/NewContact';

export type RootStackParamList = {
  ContactList: undefined;
  NewContact: undefined;
  ContactView: {
    contactId?: string;
  };
};

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactList} options={() => ({ title: 'All Contacts' })} />
        <Stack.Screen name="ContactView" component={ContactView} options={() => ({ title: 'View/Edit Contact' })} />
        <Stack.Screen name="NewContact" component={NewContact} options={() => ({ title: 'Add New Contact' })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
