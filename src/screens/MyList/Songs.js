//import liraries
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import FavourMusicPlayer from './FavourMusicPlayer';
import FavourVideoPlayer from './FavourVideoPlayer';
import Favorites from './Favorites';

const AppStack = createStackNavigator(
  {
    Favorites: {
        screen: Favorites,
      },
    FavourMusicPlayer: {
        screen: FavourMusicPlayer,
    },
    FavourVideoPlayer: {
        screen: FavourVideoPlayer,
    },
 },
 {
   headerMode: 'none',
   navigationOptions: {
     headerVisible: false,
   }
  }
);

const Navigation = createAppContainer( AppStack );

export default class Songs extends Component {
  render() {
    return (
       <Navigation/>
    );
  }
}


