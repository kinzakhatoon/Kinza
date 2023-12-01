import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import CVFormScreen from './CVFormScreen';
import CVScreen from './CVScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignupScreen">
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Signup' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="CVFormScreen" component={CVFormScreen} options={{ title: 'CV Form' }} />
        <Stack.Screen name="CVScreen" component={CVScreen} options={{ title: 'CV' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
