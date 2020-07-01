import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
import { BASE_PATH } from '../api/config';

export default class OfflineVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full: true,
      clicked: '',
      modalVisible: false,
      successVisible: false
    };
  }

  componentWillMount() {
    this.setState({
      clicked: this.props.navigation.getParam('clicked')
    })
  }

  async addfavour() {
    const body = this.state.clicked;
    axios.post(BASE_PATH + '/api/content/favorupload', body, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
      }
    })
      .then((response) => {
        console.log(response)
        this.setState({ modalVisible: false, successVisible: true })
      }, (err) => {
        console.log(err, alert(err, ' error'))
      });
  }

  render() {
    return (
      <View style={styles.container} >
        <Video source={{ uri: `file://${RNFS.DocumentDirectoryPath}/3.mp4` }} style={styles.bac}
          fullscreenOrientation="all"
          onBuffer={this.onBuffer}   // Callback function
          onError={this.videoError}
          resizeMode={this.state.full == true ? 'contain' : 'stretch'}
          rate={1}
          muted={false}
          ignoreSilentSwitch={null}
          fullscreen={true} kyr
          repeat={false}
          controls={true}
          filterEnabled={true}
          progressUpdateInterval={10}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  bac: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (23 / 16),
    alignSelf: 'center'
  },
  button: {
    position: "absolute",
    top: '1%',
    right: 20,
    width: 30,
    height: 30,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    position: 'absolute',
    left: '40%',
    zIndex: 1000,
    top: '1%',
    width: 120,
    height: 35,
    backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalbutton: {
    width: 100,
    height: 50,
    backgroundColor: '#F573BC',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalbuttonText: {
    color: 'white'
  },
  confirm: {
    fontSize: 30
  }
});
