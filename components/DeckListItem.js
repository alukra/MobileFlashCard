import React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";

const styles = StyleSheet.create({
  touchable: {
    borderBottomColor: "#ff7795",
    borderBottomWidth: 1,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#1d1d1d"
  },
  title: {
    fontSize: 22,
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center"
  },
  cards: {
    fontSize: 18,
    color: "#ffffff"
  }
});

class DeckListItem extends React.Component {
  state = {
    bounceValue: new Animated.Value(0)
  };

  handlePress = () => {
    const { id, navigation } = this.props;
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 20 }),
      Animated.spring(bounceValue, { toValue: 0, friction: 4 })
    ]).start();

    setTimeout(() => {
      navigation.navigate("Deck", { id });
    }, 1000);
  };

  render() {
    const { title, cards } = this.props;
    const { bounceValue } = this.state;
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.handlePress}>
        <Animated.Text style={[styles.title, { paddingBottom: bounceValue }]}>
          {title}
        </Animated.Text>
        <Animated.Text style={styles.cards}>{cards} cards</Animated.Text>
      </TouchableOpacity>
    );
  }
}

export default DeckListItem;
