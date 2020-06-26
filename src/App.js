import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";


// import AppNavigation from './navigators/AppNavigation';
import Root from './navigators/AppNavigation';

export default class App extends Component {

  async componentDidMount() {
    await AsyncStorage.getItem('languageCode').then((obj) => {
      console.log('App.js:============OBJ===================================', obj)
    }).catch((error) => {
      console.log('Err:==================', error)
    })
  }
  render() {
    return (
      <Provider store={store} >
        <Root />
      </Provider>
    );
  }
}
