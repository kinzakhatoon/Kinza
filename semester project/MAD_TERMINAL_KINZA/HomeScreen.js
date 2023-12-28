import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_ENDPOINT = 'https://658552e2022766bcb8c85fa7.mockapi.io/api/restaurants';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalColor, setModalColor] = useState('#F8ECC2'); 
  const navigation = useNavigation();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setRestaurants(data);
      saveToLocalStorage(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveToLocalStorage = async (data) => {
    try {
      await AsyncStorage.setItem('restaurants', JSON.stringify(data));
      console.log('Data saved to local storage');
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

  const onRestaurantPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalColor('#F5D76E'); // Darker shade of almond color
    setModalVisible(true);
  };

  const onLongPressRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalColor('#F5D76E'); // Darker shade of almond color
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onInstantPress = () => {
    setModalVisible(false);
    navigation.navigate('Details', {
      //passes the selected restaurant as a parameter
      restaurant: selectedRestaurant,
    });
  };

  const renderRatingStars = (rating) => {
    //rounding down the given rating
    const filledStars = Math.floor(rating);
    //if the decimal part of the rating is greater than or equal to 0.5
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<Text key={i} style={{ color: '#F39C12', fontSize: 24 }}>★</Text>);
    }

    if (halfStar === 1) {
      stars.push(<Text key="half" style={{ color: '#F39C12', fontSize: 24 }}>★</Text>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Text key={`empty${i}`} style={{ color: '#BDC3C7', fontSize: 24 }}>★</Text>);
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>From Fork to Phone, A Feast of Choices</Text>
      </View>

      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => onInstantPress()} onLongPress={() => onLongPressRestaurant(item)}>
              <View style={styles.row}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Ratings: </Text>
                  {renderRatingStars(item.ratings)}
                </View>
              </View>
            </TouchableOpacity>
            <Button
              title="OnMap"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Map', {
                  latitude: selectedRestaurant?.latLng.latitude,
                  longitude: selectedRestaurant?.latLng.longitude,
                });
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onCloseModal}
      >
        <TouchableWithoutFeedback onPress={onInstantPress}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: modalColor }]}>
                <Text style={styles.modalText}>ID: {selectedRestaurant?.id}</Text>
                <Text style={styles.modalText}>Rating: {selectedRestaurant?.ratings}</Text>
                <Text style={styles.modalText}>Latitude: {selectedRestaurant?.latLng.latitude}</Text>
                <Text style={styles.modalText}>Longitude: {selectedRestaurant?.latLng.longitude}</Text>
                <Button title="Close" onPress={onCloseModal} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8ECC2', 
    padding: 16,
  },
  header: {
    backgroundColor: '#D4AC0D', 
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    padding: 22,
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row: {
    backgroundColor: '#F8ECC2', 
    borderRadius: 10,
    padding: 16,
    width: '80%',
  },
  restaurantName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#F39C12',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
