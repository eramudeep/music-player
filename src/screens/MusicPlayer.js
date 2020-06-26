import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, AsyncStorage } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import strings from '../strings';
import Player from './Player'
import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import TrackPlayer from 'react-native-track-player';

// const playbackState = TrackPlayer.usePlaybackState();
// useEffect(() => {
//   TrackPlayer.setupPlayer();
//   TrackPlayer.updateOptions({
//     stopWithApp: false,
//     capabilities: [
//       TrackPlayer.CAPABILITY_PLAY,
//       TrackPlayer.CAPABILITY_PAUSE,
//       TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
//       TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
//       TrackPlayer.CAPABILITY_STOP
//     ],
//     compactCapabilities: [
//       TrackPlayer.CAPABILITY_PLAY,
//       TrackPlayer.CAPABILITY_PAUSE
//     ]
//   });
// }, []);

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full: true,
      clicked: '',
      modalVisible: false,
      successVisible: false,
      // playbackState: TrackPlayer.usePlaybackState()
    };
  }

  componentWillMount() {
    this.setState({
      clicked: this.props.navigation.getParam('clicked')
    })
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
  }


  async togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      // await TrackPlayer.add(playlistData);
      await TrackPlayer.add({
        id: "local-track",
        url: 'http://192.168.110.249:8000/' + this.props.navigation.getParam('clickedSource'),
        title: "Pure (Demo)",
        artist: "David Chavez",
        artwork: "https://picsum.photos/200"
      });
      await TrackPlayer.play();
    } else {
      const playbackState = await TrackPlayer.getState();
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  async addfavour() {
    const body = this.state.clicked;
    axios.post('http://192.168.110.249:8000/api/content/favorupload', body, {
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

  async skipToNext() {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) { }
  }

  async skipToPrevious() {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) { }
  }


  render() {
    return (
      <View style={styles.container} >
        <Modal
          width={0.9}
          visible={this.state.modalVisible}
          rounded
          actionsBordered
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <ModalContent
            style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }} >
            <Image source={require('../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
            <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
            <View style={{ height: 100, justifyContent: 'center', alignSelf: "center", marginTop: -20 }} >
              <Text style={styles.confirm} >{strings.favoriteconfirm}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
              <TouchableOpacity style={styles.modalbutton} onPress={() => { this.addfavour() }} >
                <Text style={styles.modalbuttonText} >{strings.yes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalbutton} onPress={() => { this.setState({ modalVisible: false }) }}>
                <Text style={styles.modalbuttonText} >{strings.cancel}</Text>
              </TouchableOpacity>
            </View>
          </ModalContent>
        </Modal>
        <Modal
          width={0.9}
          visible={this.state.successVisible}
          rounded
          actionsBordered
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onTouchOutside={() => {
            this.setState({ successVisible: false });
          }}
        >
          <ModalContent
            style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }} >
            <Image source={require('../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
            <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
            <View style={{ height: 100 }} >
              <Text style={styles.confirm} >{strings.success} </Text>
            </View>
            <TouchableOpacity style={styles.modalbutton} onPress={() => { this.setState({ successVisible: false }) }} >
              <Text style={styles.modalbuttonText} >  {strings.ok} </Text>
            </TouchableOpacity>

          </ModalContent>
        </Modal>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
          <Icon name='left' size={25} color="white" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => this.setState({ modalVisible: true })} >
          <Text style={{color: '#e207b0'}}>{strings.addtomylist}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={() => { this.setState({ full: !this.state.full }) }} >
          <Icon name={this.state.full == true ? 'arrowsalt' : 'shrink'} size={30} color='gray' />
        </TouchableOpacity>
        <Image source={{ uri: 'http://192.168.110.249:8000/' + this.props.navigation.getParam('clickedThumb') }} style={{
          ...styles.img, height: this.state.full != true ?
            Dimensions.get('window').width * (23 / 16) : Dimensions.get('window').width * (16 / 16)
        }} />
        {/* <Video source={{ uri: 'http://192.168.110.249:8000/' + this.props.navigation.getParam('clickedSource') }} style={styles.bac}
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
        /> */}
        <Player
          onNext={()=>this.skipToNext()}
          style={styles.player}
          onPrevious={()=>this.skipToPrevious()}
          onTogglePlayback={()=>this.togglePlayback()}
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
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#e207b0'
  },
  backButton: {
    position: 'absolute',
    left: '10%',
    zIndex: 1000,
    top: '1%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
  },
  modalbutton: {
    width: 100,
    height: 50,
    backgroundColor: '#e207b0',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalbuttonText: {
    color: 'white'
  },
  confirm: {
    fontSize: 30,
    color: 'white'
  },
  player: {
    marginTop: 40
  },
});
