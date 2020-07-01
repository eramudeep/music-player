import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import { BASE_PATH } from '../../api/config';


export default class FavourMusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full: true,
    };
  }

  render() {
    return (
      <View style={styles.container} >
        <TouchableOpacity style={{ position: 'absolute', left: '10%', zIndex: 1000, top: '1%' }} onPress={() => this.props.navigation.goBack()}>
          <Icon name='left' size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.setState({ full: !this.state.full }) }} >
          <Icon name={this.state.full == true ? 'arrowsalt' : 'shrink'} size={30} color='gray' />
        </TouchableOpacity>
        <Image source={{ uri: BASE_PATH + '/' + this.props.navigation.getParam('clickedThumb') }} style={{
          ...styles.img, height: this.state.full != true ?
            Dimensions.get('window').width * (23 / 16) : Dimensions.get('window').width * (16 / 16)
        }} />
        <Video source={{ uri: BASE_PATH + '/' + this.props.navigation.getParam('clickedSource') }} style={styles.bac}
          fullscreenOrientation="all"
          onBuffer={this.onBuffer}   // Callback function
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
  }
});
