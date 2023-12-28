// MenuScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image, Alert } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux'; //connect React components to the Redux store
import { setMenuItems, addToCart, removeFromCart } from './redux/actions';
import * as Location from 'expo-location';

import burgerImage from './burger.webp';
import pizzaImage from './pizza.jpg';
import saladImage from './salad.webp';
import nehariImage from './nehari.jpg';
import haleemImage from './haleem.jpg';
import karahiImage from './karahi.jpg';
import biryaniImage from './biryani.jpg';
import drinksImage from './drinks.jpeg';
import chatImage from './chat.jpg';
import butterPaneerImage from './butter_paneer.jpg';
import daalImage from './daal.jpeg';
import greenChickenImage from './greenchicken.jpg';

const MenuScreen = ({
  navigation,
  menuItems,
  setMenuItems,
  addToCart,
  removeFromCart,
  cart,
  deliveryCharge,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        // Request permission for location access
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        // Use OpenCage API to get the address
        const apiKey = '8435bf5008ca4d308a6c7b3ec569dc91';
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=${apiKey}&no_annotations=1`
        );
        const data = await response.json();
        const firstResult = data.results[0];

        if (firstResult) {
          setUserLocation(firstResult.formatted);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    // Fetch menu items and set them in Redux state
    const fetchMenuItems = () => {
      const menuData = [
        { id: 'Burger', name: 'Burger', price: 5.99, image: burgerImage },
        { id: 'Pizza', name: 'Pizza', price: 8.99, image: pizzaImage },
        { id: 'Salad', name: 'Salad', price: 4.49, image: saladImage },
        { id: 'Nihari', name: 'Nihari', price: 12.99, image: nehariImage },
        { id: 'Haleem', name: 'Haleem', price: 10.99, image: haleemImage },
        { id: 'Karahi', name: 'Karahi', price: 15.99, image: karahiImage },
        { id: 'Biryani', name: 'Biryani', price: 11.99, image: biryaniImage },
        { id: 'drinks', name: 'Drinks', price: 9.99, image: drinksImage },
        { id: 'Chat', name: 'Chat', price: 7.99, image: chatImage },
        { id: 'butter_paneer', name: 'Butter Paneer', price: 8.99, image: butterPaneerImage },
        { id: 'Daal', name: 'Daal', price: 6.99, image: daalImage },
        { id: 'greenChicken', name: 'Green Chicken', price: 10.99, image: greenChickenImage },
      ];

      setMenuItems(menuData);
    };
    // Call the fetchMenuItems and getLocationAsync functions when the component mounts
    fetchMenuItems();
    getLocationAsync();
  }, [setMenuItems]);

  const toggleDrawer = () => {
    setDrawerVisible((prevVisible) => !prevVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleAddToCart = (item) => {
    addToCart(item.id);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
  };

  const handleSearch = (text) => {
    // Update the searchQuery state with the current text input
    setSearchQuery(text);

    const lowercaseQuery = text.toLowerCase();
    const filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(lowercaseQuery)
    );
    // Set the filtered menu items in the component state
    setFilteredMenuItems(filteredItems);
    if (filteredItems.length === 0) {
      Alert.alert('Search Not Found', 'No items found for the given search query.');
    }
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    // Loop through each item in the cart
    for (const itemId in cart) {
      // Find the corresponding item details from the menuItems array
      const item = menuItems.find((menuItem) => menuItem.id === itemId);
      // If the item is found, calculate the cost and add it to the total
      if (item) {
        //multiplying the item's price with the quantity in the cart and adding it to the totalCost
        totalCost += item.price * cart[itemId];
      }
    }

    
    if (userLocation && calculateDistance(userLocation) > 3) {
      totalCost += deliveryCharge;
    }

    return totalCost;
  };

  const calculateDistance = (location) => {
    //Uses the Euclidean distance formula to calculate the distance based on latitude and longitude
    const distance = Math.sqrt(
      Math.pow(location.latitude, 2) + Math.pow(location.longitude, 2)
    );

    return distance;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon name="bars" type="font-awesome" color="black" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            {userLocation ? `${userLocation}` : 'Your Location'}
          </Text>
          <Icon
            name="shopping-cart"
            type="font-awesome"
            color="black"
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
        <SearchBar
          placeholder="Search"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {(filteredMenuItems.length > 0 ? filteredMenuItems : menuItems).map((item) => (
          <View key={item.id} style={styles.menuItemContainer}>
            <Image source={item.image} style={styles.menuItemImage} />
            <View style={styles.menuItemInfo}>
              <Text style={styles.optionTitle}>{item.name}</Text>
              <Text style={styles.optionInfo}>Price: ${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
              //removing items froom cart
                onPress={() => handleRemoveFromCart(item)}
                style={styles.incrementDecrementButton}
              >
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity> 
              <Text style={styles.quantityText}>{cart[item.id] || 0}</Text>
              <TouchableOpacity
              //adding items to cart
                onPress={() => handleAddToCart(item)}
                style={styles.incrementDecrementButton}
              >
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {drawerVisible && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeDrawer} />
      )}

      <Modal transparent visible={drawerVisible} animationType="fade">
        <View style={styles.drawer}>
          <TouchableOpacity style={styles.closeIcon} onPress={closeDrawer}>
            <Icon name="times" type="font-awesome" color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              closeDrawer();
              navigation.navigate('Settings');
            }}
          >
            <Text style={styles.drawerText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              closeDrawer();
              navigation.navigate('Invitation');
            }}
          >
            <Text style={styles.drawerText}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              closeDrawer();
              navigation.navigate('Signup');
            }}
          >
            <Text style={styles.drawerText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              closeDrawer();
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.drawerText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F7BF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  locationText: {
    marginTop: 8,
    color: 'black',
  },
  searchBarContainer: {
    backgroundColor: '#F7BF50',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 0,
    marginTop: 8,
    width: '100%',
  },
  searchBarInput: {
    backgroundColor: 'white',
    color: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7BF50',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'flex-start',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  optionInfo: {
    marginTop: 8,
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incrementDecrementButton: {
    backgroundColor: 'black', 
    width: 30, 
    height: 30, 
    borderRadius: 20, 
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  quantityButton: {
    fontSize: 28,
    color: 'white',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
    color: 'black',
  },
  drawer: {
    backgroundColor: 'white',
    width: '65%',
    height: '100%',
    padding: 16,
    paddingTop: 70,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  closeIcon: {
    position: 'absolute',
    paddingTop: 40,
    top: 10,
    right: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  drawerText: {
    color: 'black',
    fontSize: 16,
  },
});
//to map the state from the Redux store to the component's props
const mapStateToProps = (state) => ({
  menuItems: state.menuItems,
  cart: state.cart,
  deliveryCharge: state.deliveryCharge,
});
//to map action creators to the component's props
const mapDispatchToProps = {
  setMenuItems,
  addToCart,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
