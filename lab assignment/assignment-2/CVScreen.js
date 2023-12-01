import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Linking } from 'react-native';

const CVScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./assets/pfp.avif')}
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>Kinza Fatima</Text>
        <Text style={styles.skills}>Skills: JavaScript, React Native, UI/UX Design</Text>
      </View>
      <View style={styles.line}></View>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About Me</Text>
          <Text style={styles.infoText}>
            A passionate software engineer with expertise in mobile app development using React Native. I'm dedicated to creating elegant and efficient solutions for complex problems.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          <Text style={styles.infoText}>
            - Bachelor of Science in Software Engineering
          </Text>
          <Text style={styles.infoText}>
            - University: Comsats, Attock
          </Text>
          <Text style={styles.infoText}>
            - Graduation Year: 2024
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Work Experience</Text>
          <Text style={styles.infoText}>
            - Software Engineer at XYZ Tech (2022-Present)
          </Text>
          <Text style={styles.infoText}>
            - UI/UX Designer at ABC Solutions (2020-2022)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  skills: {
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  section: {
    padding: 20,
    marginBottom: 20,
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
