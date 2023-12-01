import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUser = await getStoredUser();
      if (storedUser) {
        const user = JSON.parse(storedUser);

       
        if (email === user.email && password === user.password) {
      
          navigation.navigate('CVFormScreen');
        } else {
          alert('Invalid email or password');
        }
      } else {
        alert('No user found. Please sign up.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getStoredUser = async () => {
    try {
      if (window.localStorage) {
        return window.localStorage.getItem('user');
      } else {
        return await AsyncStorage.getItem('user');
      }
    } catch (error) {
      console.error('Error getting stored user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/th.jpeg')} style={styles.background}>
        <View style={styles.loginContainer}>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.createAccount} onPress={() => navigation.navigate('SignupScreen')}>
          Create New Account
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
  loginContainer: {
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
  loginButton: {
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
  forgotPassword: {
    color: 'green',
  },
  createAccount: {
    color: 'green',
  },
});

export default LoginScreen;
