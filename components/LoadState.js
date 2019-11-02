import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: { padding: 15 }
});

const LoadState = ({ id, title, cards }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#ff7597" size={40} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadState;