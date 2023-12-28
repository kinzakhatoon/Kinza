// OrderScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function OrderScreen({ route }) {
  const { order } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Your Order Details
      </Text>
      {order.map((dishName, index) => (
        <Text key={index}>{dishName}</Text>
      ))}
    </View>
  );
}
