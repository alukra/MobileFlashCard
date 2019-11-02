import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from 'react-native';
import { saveDeckTitle } from '../utils/API';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#121212',
    padding: '10%',
  },
  label: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  textInput: {
    height: 40,
    borderColor: '#ff7597',
    color: "#ffffff",
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  button: {
    margin: 30,
  },
});

class AddDeck extends React.Component {
  state = {
    deckTitle: '',
  };

  handleChange = text => {
    this.setState(() => ({
      deckTitle: text,
    }));
  };

  handleSubmit = () => {
    const { deckTitle } = this.state;
    const { navigation } = this.props;
    saveDeckTitle(deckTitle).then(() => {
      this.setState(() => ({ deckTitle: '', }));
      const id = deckTitle;
      navigation.navigate('Deck', { id });
    });
  };

  render() {
    const { deckTitle } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>Write the title of the deck</Text>
        <TextInput
          placeholder={'Deck Title'}
          style={styles.textInput}
          value={deckTitle}
          onChangeText={this.handleChange}
        />
        <Button
          title="Submit"
          style={styles.button}
          disabled={deckTitle === ''}
          onPress={this.handleSubmit}
          color="#ff7597"
        />
      </KeyboardAvoidingView>
    );
  }
}

export default AddDeck;
