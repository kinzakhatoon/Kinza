import React from 'react';
import { View, ScrollView, Text, StyleSheet} from 'react-native';

const CVScreen = ({ route }) => {
  const { cvData } = route.params;

  const {
    fullName,
    email,
    phone,
    address,
    education,
    experience,
  } = cvData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{fullName}</Text>
        <Text>{email}</Text>
        <Text>{phone}</Text>
        <Text>{address}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Education</Text>
        <Text style={styles.infoText}>{education}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Experience</Text>
        <Text style={styles.infoText}>{experience}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  section: {
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CVScreen;
