import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#121212'
  },
  downerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  hddIcon: { padding: 15 },
  upperText: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 5,
    color: '#ffffff',
  },
  downerText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  spacer: { flex: 3 },
});

const Empty = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.downerContainer}>
        <AntDesign name="hdd" color="#fff" size={128} style={styles.hddIcon} />
        <Text style={styles.upperText}>No decks availables.</Text>
        <Text style={styles.downerText}>
          Go to the ADD DECK tab to add a Deck.
        </Text>
      </View>
      <View style={styles.spacer} />
    </View>
  );
};

export default Empty;
