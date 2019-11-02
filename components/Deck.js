import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import LoadState from './LoadState';
import { getDeck } from '../utils/API';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: '#121212',
    padding: '10%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  cards: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ff7597',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

class Deck extends React.Component {
  state = {
    title: null,
    cards: 0,
  };

  handlePressAddCard = () => {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    navigation.navigate('AddQuestion', { deckId: id });
  };

  handlePressStartQuiz = () => {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    navigation.navigate('Quiz', { deckId: id });
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.addListener('didFocus', payload => {
      getDeck(id).then(deck => {
        const title = deck.title;
        const cards = deck.questions.length;
        this.setState(() => ({
          title,
          cards,
        }));
      });
    });
  }

  render() {
    const { title, cards } = this.state;

    if (!title) {
      return <LoadState />;
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cards}>{cards} cards</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Add Card"
            onPress={this.handlePressAddCard}
            color="#ff7597"
          />
          <Button
            color="black"
            title="Start Quiz"
            onPress={this.handlePressStartQuiz}
            disabled={cards === 0 ? true : false}
          />
        </View>
      </View>
    );
  }
}

export default Deck;
