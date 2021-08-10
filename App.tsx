import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from './src/layouts/ContactList';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
