// App.js
// Importing necessary modules from React and React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; //makes the redux dtore available for each component in the application

// Importing the Redux store
import store from './redux/store';

// Importing screen components
import WelcomeScreen from './WelcomeScreen';
import MenuScreen from './MenuScreen';
import CartScreen from './CartScreen';
import SettingsScreen from './SettingsScreen';
import InvitationScreen from './InvitationScreen'; 
import SignupScreen from './SignupScreen.js';
import LoginScreen from './LoginScreen';

// Creating a stack navigator
const Stack = createStackNavigator();

// Main component App
const App = () => {
  return (
    // Providing the Redux store to the application
    <Provider store={store}>
      {/* Setting up the navigation container */}
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Welcome">
          
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

          <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: true }} />

          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true }} />

          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />

          <Stack.Screen name="Invitation" component={InvitationScreen} options={{ headerShown: false }} />

          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />

          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
