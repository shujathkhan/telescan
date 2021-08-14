import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactList from './src/layouts/ContactList';
import ContactView from './src/layouts/ContactView';
import NewContact from './src/layouts/NewContact';
import { StyleSheet } from 'react-native';

export type RootStackParamList = {
  ContactList: undefined;
  NewContact: undefined;
  ContactView: {
    contactId?: string;
  };
};

const styles = StyleSheet.create({
  headerStyle: { backgroundColor: '#FFEACA' },
});

const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={() => ({ title: 'All Contacts', headerStyle: styles.headerStyle })}
      />
      <Stack.Screen
        name="ContactView"
        component={ContactView}
        options={() => ({ title: 'View/Edit Contact', headerStyle: styles.headerStyle })}
      />
      <Stack.Screen
        name="NewContact"
        component={NewContact}
        options={() => ({ title: 'Add New Contact', headerStyle: styles.headerStyle })}
      />
    </Stack.Navigator>
  );
};

export default App;
