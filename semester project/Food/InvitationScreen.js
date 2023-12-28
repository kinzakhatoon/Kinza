// InvitationScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';

const InvitationScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleInviteFriends = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./happyfood.jpg')} style={styles.backgroundImage} />

      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
        <Text style={styles.closeIconText}>x</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.boldText}>Invite Friends, Get $5</Text>
        <Text style={styles.inviteText}>1. Your friend gets $10</Text>
        <Text style={styles.inviteText}>2. Then you get $5</Text>
      </View>

      <TouchableOpacity style={styles.inviteButton} onPress={handleInviteFriends}>
        <Text style={styles.inviteButtonText}>Invite Friends</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Thanks for sharing!</Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '37.5%', 
    resizeMode: 'cover',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Ensure it's above other elements
  },
  closeIconText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    paddingHorizontal: 16,
    marginTop: 25, // Adjusted the gap
  },
  inviteText: {
    fontSize: 22,
    marginBottom: 14,
    color: 'black',
    textAlign: 'left', // left text horizontally
  },
  boldText: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    textAlign: 'left', // left text horizontally
  },
  inviteButton: {
    backgroundColor: '#F7BF50',
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%', 
  },
  inviteButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center text within the button
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#F7BF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default InvitationScreen;
