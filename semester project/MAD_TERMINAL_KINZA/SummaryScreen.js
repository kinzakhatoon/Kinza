import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryScreen = ({ navigation }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    loadSelectedOrders();
  }, []);

  const loadSelectedOrders = async () => {
    try {
      const existingSelectedOrders = await AsyncStorage.getItem('selectedOrders');
      if (existingSelectedOrders) {
        const orders = JSON.parse(existingSelectedOrders);
        // Update the state with the loaded orders
        setSelectedOrders(orders);
      }
    } catch (error) {
      console.error('Error loading selected orders:', error);
    }
  };

  // Calculate total price of the selected orders
  const totalPrice = selectedOrders.reduce((total, order) => total + order.price, 0);

  const clearOrderSummary = async () => {
    try {
      // Clear the selected orders in AsyncStorage
      await AsyncStorage.removeItem('selectedOrders');
      console.log('Order summary cleared in local storage');
    } catch (error) {
      console.error('Error clearing order summary in local storage:', error);
    }

    navigation.goBack();
  };

  const renderOrderItem = ({ item, index }) => (
    <View key={index} style={styles.orderBox}>
      <Text style={styles.orderText}>{item.dishName} - ${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>

      <FlatList
        data={selectedOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => `${index}`}
        style={styles.orderList}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={clearOrderSummary}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8ECC2', 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#D4AC0D', 
  },
  orderBox: {
    backgroundColor: '#D4AC0D', 
    padding: 16,
    marginBottom: 8,
    borderRadius: 10,
  },
  orderText: {
    color: 'white',
    fontSize: 16,
  },
  orderList: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12', 
  },
  closeButton: {
    backgroundColor: '#D4AC0D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SummaryScreen;
