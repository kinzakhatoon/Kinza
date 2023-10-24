import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={handleIncrement} color="green" />
        <Button title="Decrement" onPress={handleDecrement} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default App;
