import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: "center",
    margin: 5,
    color: "#ffffff"
  },
  textInfo: {
    fontSize: 8,
    textAlign: "center",
    margin: 5,
    color: "#ffffff"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 5,
    color: "#ff7597"
  },
  textContainer: {
    flex: 3,
    justifyContent: "center"
  }
});

export default class FlipCard extends React.Component {
  state = {
    flipped: false
  };

  handlePress = () => {
    const { flipped } = this.state;
    this.setState(() => ({
      flipped: !flipped
    }));
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState(() => ({
      flipped: false
    }));
  }

  render() {
    const { data } = this.props;
    const { flipped } = this.state;
    if(flipped){
      return (
      <TouchableOpacity style={styles.textContainer} onPress={this.handlePress}>
        <Text style={styles.title}>Is correct the Answer?</Text>
        <Text style={styles.text}>{data.answer}</Text>
        <Text style={styles.textInfo}> Tap to hide the Answer </Text>
      </TouchableOpacity>
    );
    }
    return (
      <TouchableOpacity style={styles.textContainer} onPress={this.handlePress}>
        <Text style={styles.title}>Question</Text>
        <Text style={styles.text}>{data.question}</Text>
        <Text style={styles.textInfo}> Tap to show the Answer </Text>
      </TouchableOpacity>
    );
    
  }
}