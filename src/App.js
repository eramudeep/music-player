import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import Root from './navigators/AppNavigation';
import { languageSwitcher } from './helpers/Language';

export default class App extends Component {

  async componentDidMount() {
    console.log("aaasdf");
    const langCode = await languageSwitcher.getCurrentLanguageCode();
    await languageSwitcher.switchTo(langCode);
    await AsyncStorage.getItem('languageCode').then((obj) => {
      console.log('App=', obj)
    }).catch((error) => {
      console.log('Err=', error)
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
