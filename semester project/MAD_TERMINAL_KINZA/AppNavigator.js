// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Details from './Details';
import SummaryScreen from './SummaryScreen';
import MapScreen from './MapScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;



