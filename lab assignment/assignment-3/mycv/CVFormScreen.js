import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CVFormScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    const cvData = {
      fullName,
      email,
      phone,
      address,
      education,
      experience,
    };

    navigation.navigate('CVScreen', { cvData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CV Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Education"
        value={education}
        onChangeText={(text) => setEducation(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience"
        value={experience}
        onChangeText={(text) => setExperience(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Generate CV</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CVFormScreen;
