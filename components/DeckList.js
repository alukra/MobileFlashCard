import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import DeckListItem from './DeckListItem';
import Empty from './Empty';
import LoadState from './LoadState';
import { getDecks } from '../utils/API';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#121212',
  },
});

class DeckList extends React.Component {
  state = {
    deckListData: null,
  };

  componentDidMount() {
    this.props.navigation.addListener('didFocus', payload => {
      getDecks().then(decks => {
        decks
          ? this.setState(() => ({
              deckListData: Object.entries(decks)
                .map(([key, value]) => ({
                  id: key,
                  title: value.title,
                  cards: value.questions.length,
                }))
                .reverse(),
            }))
          : //Send empty state if no decks are in the database
            this.setState(() => ({ deckListData: [] }));
      });
    });
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return <DeckListItem {...item} navigation={navigation} />;
  };

  render() {
    const { deckListData } = this.state;
    if (!deckListData) {
      return <LoadState />;
    }
    if (deckListData.length === 0) {
      return <Empty />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={deckListData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default DeckList;
