// WelcomeScreen.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  // Function to handle tap event 
  const handleTap = () => {
    navigation.navigate('Menu'); // Navigate to the Menu screen 
  };

  return (
    // TouchableOpacity container for tap functionality
    <TouchableOpacity style={[styles.container, { backgroundColor: '#F7BF50' }]} onPress={handleTap}>
      <Image source={require('./assets/logo2.png')} style={styles.logo} />
      <View style={styles.tapContainer}>
        <Text style={styles.tapText}>Tap! Tap!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
  tapContainer: {
    marginTop: 20,
  },
  tapText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial', 
    color: 'black',
  },
});

export default WelcomeScreen;
