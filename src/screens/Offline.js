//import liraries
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DownMusicPlayer from './Downlists/DownMusicPlayer';
import DownVideoPlayer from './Downlists/DownVideoPlayer';
import Down from './Downlists/Down';

const AppStack = createStackNavigator(
  {
    Down: {
      screen: Down,
    },
    DownMusicPlayer: {
      screen: DownMusicPlayer,
    },
    DownVideoPlayer: {
      screen: DownVideoPlayer,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const Navigation = createAppContainer(AppStack);

export default class Songs extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}





