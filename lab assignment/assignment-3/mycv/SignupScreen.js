import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
    
      const user = { email, password };
      await AsyncStorage.setItem('user', JSON.stringify(user));

      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/th.jpeg')} style={styles.background}>
        <View style={styles.signupContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </ImageBackground>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <Text style={styles.goToLogin} onPress={() => navigation.navigate('LoginScreen')}>
          Already have an account? Login here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 0.45,
  },
  signupContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  signupButton: {
    backgroundColor: 'orange',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 20,
  },
  buttonText: {
    color: 'white',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'green',
  },
  linkContainer: {
    flexDirection: 'column',
    borderWidth: 10,
    borderColor: 'rgba(255, 0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  goToLogin: {
    color: 'green',
  },
});

export default SignupScreen;
