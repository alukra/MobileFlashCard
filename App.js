import React from 'react';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { setLocalNotification } from './utils/notification';

const TabNav = createMaterialTopTabNavigator(
  {
    ['Decks']: { screen: DeckList },
    ['Add a Deck']: { screen: AddDeck },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#99465a',
      },
    },
  }
);

const StackNav = createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#99465a',
        height: 0,
      },
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Questions Deck',
      headerStyle: { backgroundColor: '#99465a' },
    },
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'New Question',
      headerStyle: { backgroundColor: '#99465a' },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerStyle: { backgroundColor: '#99465a' },
    },
  },
});

const RootTab = createAppContainer(StackNav);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return <RootTab theme="dark" />;
  }
}
