// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Retrieve user information from AsyncStorage using the correct key 'myAppUser'
      const storedUser = await AsyncStorage.getItem('myAppUser');

      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (email === user.email && password === user.password) {
          // Navigate to MenuScreen after successful login
          navigation.navigate('Menu');
        } else {
          alert('Invalid email or password');
        }
      } else {
        // If the user doesn't exist, prompt to sign up
        alert('User not found. Please sign up.');
        navigation.navigate('Signup');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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

      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountButton}>Create one</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  createAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  createAccountText: {
    marginRight: 5,
  },
  createAccountButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#F7BF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;
