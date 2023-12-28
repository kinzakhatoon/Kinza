// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Check if the user already exists
      const storedUser = await AsyncStorage.getItem('myAppUser');
      if (storedUser) {
        alert('User already exists. Please login.');
        return;
      }

      // Save user information to AsyncStorage
      const user = { email, password };
      await AsyncStorage.setItem('myAppUser', JSON.stringify(user));

      // Navigate to MenuScreen
      navigation.replace('Menu');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#F7BF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: '#007BFF',
  },
});

export default SignupScreen;
