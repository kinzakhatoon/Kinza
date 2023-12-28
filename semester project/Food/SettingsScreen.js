// Remove the original Picker import

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.label}>Choose Language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="Urdu" value="es" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="es" />
        <Picker.Item label="Korean" value="es" />
      </Picker>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#F7BF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
