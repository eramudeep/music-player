import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Song from './MyList/Songs';

export default class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Song/>
    );
  }
}
