import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, AsyncStorage } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';

export default class DownMusicPlayer extends Component {
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

  render() {
    return (
      <View style={styles.container} >
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
          <Icon name='left' size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.setState({ full: !this.state.full }) }} >
          <Icon name={this.state.full == true ? 'arrowsalt' : 'shrink'} size={30} color='gray' />
        </TouchableOpacity>
        <Image source={{ uri: `file://${RNFS.DocumentDirectoryPath}/${this.state.clicked['thumb']}` }} style={{
          ...styles.img, height: this.state.full != true ?
            Dimensions.get('window').width * (23 / 16) : Dimensions.get('window').width * (16 / 16)
        }} />
        <Video source={{ uri: `file://${RNFS.DocumentDirectoryPath}/${this.state.clicked['source']}` }} style={styles.bac}
          fullscreenOrientation="all"
          onBuffer={this.onBuffer}
          onError={this.videoError}
          resizeMode={this.state.full == true ? 'contain' : 'stretch'}
          rate={1}
          muted={false}
          ignoreSilentSwitch={null}
          fullscreen={true}
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
    height: 100,
    alignSelf: 'center',
    zIndex: 1000
  },
  img: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
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
  backButton: {
    position: 'absolute',
    left: '10%',
    zIndex: 1000,
    top: '1%'
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
