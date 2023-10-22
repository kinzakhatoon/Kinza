import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import CVScreen from './CVScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide the header for LoginScreen
        />
        <Stack.Screen name="CVScreen" component={CVScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
