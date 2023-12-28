import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { clearCart } from './redux/actions';

const CartScreen = ({ cart, menuItems, navigation, clearCart }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEmptyCartMessageVisible, setEmptyCartMessageVisible] = useState(false);

  const toggleModal = () => {
    if (Object.keys(cart).length === 0) {
      setEmptyCartMessageVisible(true);
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  const toggleEmptyCartMessage = () => {
    setEmptyCartMessageVisible(!isEmptyCartMessageVisible);
  };

  const renderCartItem = (itemId, quantity) => {
    const item = menuItems.find((menuItem) => menuItem.id === itemId);

    if (!item) {
      return null;
    }

    const totalItemCost = quantity * item.price;

    return (
      <View key={itemId} style={styles.cartItemContainer}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemTitle}>{item.name}</Text>
          <Text style={styles.cartItemQuantity}>Quantity: {quantity}</Text>
        </View>
        <Text style={styles.cartItemCost}>${totalItemCost.toFixed(2)}</Text>
      </View>
    );
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    for (const [itemId, quantity] of Object.entries(cart)) {
      // Find the item in the menuItems array based on itemId
      const item = menuItems.find((menuItem) => menuItem.id === itemId);
      // If the item is not found, return null (won't render anything for this item)
      if (item) {
        // Calculate the total cost for the quantity of this item
        totalAmount += quantity * item.price;
      }
    }

    return totalAmount;
  };

  const handleCheckout = () => {
    toggleModal();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    // Call clearCart() only when the modal is closed after successful order
    clearCart();
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}
      //  iterate over the entries (key-value pairs) of the cart
      >
        {Object.entries(cart).map(([itemId, quantity]) => renderCartItem(itemId, quantity))}  
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount: ${calculateTotalAmount().toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Empty Cart Message */}
      {isEmptyCartMessageVisible && (
        <View style={styles.emptyCartMessage}>
          <Text style={styles.emptyCartMessageText}>Your cart is empty. Add items to checkout.</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
            <Text style={styles.closeMessageText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for Checkout Message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order placed successfully!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Close</Text>
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
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'flex-start',
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cartItemQuantity: {
    marginTop: 8,
    color: 'black',
  },
  cartItemCost: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: '#F7BF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Empty Cart Message styles
  emptyCartMessage: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  emptyCartMessageText: {
    fontSize: 16,
    color: 'red',
  },
  closeMessageText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 8,
  },
  // Modal styles
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
  modalButton: {
    backgroundColor: '#F7BF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = {
  clearCart,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  menuItems: state.menuItems,
});

const ConnectedCartScreen = connect(mapStateToProps, mapDispatchToProps)(CartScreen);

export default ConnectedCartScreen;

