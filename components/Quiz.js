import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import LoadState from './LoadState';
import FlipCard from './FlipCard';
import { getDeck } from '../utils/API';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notification';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: '#121212',
    color: '#ffffff',
    padding: '10%',
    position: 'relative',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  counter: {
    position: 'absolute',
    margin: '13%',
  },
  text: {
    color: '#ffffff'
  }
});

export default class Quiz extends React.Component {
  state = {
    questions: null,
    currentQuestion: 1,
    score: 0,
  };

  handlePressCorrect = () => {
    const { currentQuestion, questions, score } = this.state;
    const questionsQ = questions.length;
    currentQuestion < questionsQ
      ? this.setState(() => ({
          currentQuestion: currentQuestion + 1,
          score: score + 1,
        }))
      : this.showDialog(score + 1, questionsQ);
  };

  handlePressIncorrect = () => {
    const { currentQuestion, questions, score } = this.state;
    const questionsQ = questions.length;
    currentQuestion < questionsQ
      ? this.setState(() => ({
          currentQuestion: currentQuestion + 1,
        }))
      : this.showDialog(score, questionsQ);
  };

  showDialog = (score, questionsQ) => {
    Alert.alert(
      'Score',
      `You answered correctly ${score} of  ${questionsQ} questions!!!`,
      [
        { text: 'Restart Quiz', onPress: () => this.restartQuiz() },
        { text: 'Back to Deck', onPress: () => this.props.navigation.goBack() },
      ],
      { cancelable: false }
    );
  };

  restartQuiz = () => {
    this.setState(() => ({
      currentQuestion: 1,
      score: 0,
    }));
  };

  componentDidMount() {
    const { deckId } = this.props.navigation.state.params;
    // Reset the all the notifications
    clearLocalNotification().then(setLocalNotification);
    // Get the questions.
    getDeck(deckId).then(deck => {
      const questions = deck.questions;
      this.setState(() => ({
        questions,
      }));
    });
  }

  render() {
    const { questions, currentQuestion } = this.state;

    if (!questions) {
      return <LoadState />;
    }
    const questionsQ = questions.length;

    return (
      <View style={styles.mainContainer}>
        {currentQuestion <= questionsQ && (
          <FlipCard data={questions[currentQuestion - 1]} />
        )}
        <View style={styles.buttonsContainer}>
          <Button
            color="#03DAC6"
            title="Correct"
            onPress={this.handlePressCorrect}
          />
          <Button
            color="#B00020"
            title="Incorrect"
            onPress={this.handlePressIncorrect}
          />
        </View>
        <View style={styles.counter}>
          <Text style={styles.text}>
            {currentQuestion} / {questionsQ}
          </Text>
        </View>
      </View>
    );
  }
}
