import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (restaurant && restaurant.dishes) {
        setDishes(restaurant.dishes);
      }
    };

    fetchData();
  }, [restaurant]);

  const addToOrder = async (dishName, price) => {
    try {
      //Fetch existing orders from local storage
      const existingOrder = await AsyncStorage.getItem('selectedOrders');
      //if there are none, initialize an empty array
      let order = existingOrder ? JSON.parse(existingOrder) : [];
      // Add the new order (dishName and price) to the existing orders
      order = [...order, { dishName, price }];
      // Save the updated orders back to local storage
      await AsyncStorage.setItem('selectedOrders', JSON.stringify(order));

      console.log('Order updated in local storage');
    } catch (error) {
      console.error('Error updating order in local storage:', error);
    }
  };

  const placeOrder = () => {
    navigation.navigate('SummaryScreen');
  };

  const renderDishItem = ({ item }) => (
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <View>
          <Text style={styles.dishName}>{item.dishName}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => addToOrder(item.dishName, item.price)}
        >
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with DetailScreen Title */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{restaurant ? restaurant.name : 'Details'}</Text>
      </View>

      {/* Dish List */}
      <FlatList
        data={dishes}
        renderItem={renderDishItem}
        keyExtractor={(item) => item.dishId.toString()}
        style={styles.list}
      />

      <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8ECC2', // Almond color
    padding: 16,
  },
  header: {
    backgroundColor: '#D4AC0D', // Darker shade of almond color
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowContainer: {
    marginBottom: 10,
  },
  row: {
    backgroundColor: '#F8ECC2', // Almond color
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
    marginBottom: 4,
  },
  price: {
    color: '#F39C12',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#D4AC0D', // Darker shade of almond color
    padding: 10,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  placeOrderButton: {
    backgroundColor: '#D4AC0D', // Darker shade of almond color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  placeOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Details;
