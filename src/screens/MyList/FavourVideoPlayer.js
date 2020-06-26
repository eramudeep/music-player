import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Video from 'react-native-video';
import ProgressBar from "react-native-progress/Bar";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { BASE_PATH } from '../../api/config'

const { width, height } = Dimensions.get('window')

function secondsToTime(time) {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}

export default class FavourVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full: false,
      flip: false,
      clicked: '',
      modalVisible: false,
      successVisible: false,
      currentLang: 'en',
      paused: false,
      progress: 0,
      duration: 0
    };
  }

  async componentDidMount() {
    if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
      this.setState({
        currentLang: 'ar'
      })
      StatusBar.setHidden(true)
    } else {
      this.setState({
        currentLang: 'en'
      })
    }
  }

  
  handleMainButtonTouch = () => {
    if (this.state.progress >= 0.99) {
      this.VideoPlayer.seek(0);
    }

    this.setState(state => {
      return {
        paused: !state.paused,
      };
    });
  };

  handleProgressPress = e => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    const isPlaying = !this.state.paused;

    this.VideoPlayer.seek(progress);
  };

  handleProgress = progress => {
    this.setState({
      progress: progress.currentTime / this.state.duration,
    });
  };

  handleEnd = () => {
    this.setState({ paused: true });
  };

  handleLoad = meta => {
    this.setState({
      duration: meta.duration,
    });
  };


  render() {
    return (
      <View style={styles.container} >
        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon2 style={{ paddingLeft: 20 }} name={this.state.currentLang == 'ar' ? "arrow-right" : "arrow-left"} size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { this.setState({ full: !this.state.full }) }} >
            <Icon name={this.state.full == true ? 'shrink' : 'arrowsalt'} size={20} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => { this.setState({ flip: this.state.full ? !this.state.flip : false }) }} >
            <Icon name={this.state.flip == true ? 'swapleft' : 'swapright'} size={20} color='white' />
          </TouchableOpacity>
        </View>
        <View>
          <Video
            paused={this.state.paused}
            source={{ uri: BASE_PATH + '/' + this.props.navigation.getParam('clickedSource') }}
            // style={this.state.full ? { width, height: height - 130 } : { width, height: normalHeight }}
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            playInBackground={true}
            resizeMode={'contain'}
            ref={ref => this.VideoPlayer = ref}
            style={{
              aspectRatio: width / (height - 100),
              width: width,
              height: height - 130,
              transform: [{ rotate: this.state.full ? this.state.flip ? '270deg' : '90deg' : '0deg' }, { scale: this.state.full ? (height - 100) / width : 1 }]
            }}
          />
          <View style={styles.controls}>
            <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
              <FontAwesomeIcon name={!this.state.paused ? "pause" : "play"} size={15} color="#FFF" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.handleProgressPress}>
              <View>
                <ProgressBar
                  progress={this.state.progress}
                  color="#FFF"
                  unfilledColor="rgba(255,255,255,.5)"
                  borderColor="#FFF"
                  width={250}
                  height={10}
                />
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.duration}>
              {secondsToTime(Math.floor(this.state.progress * this.state.duration))}
            </Text>
          </View>
        </View>
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
    height: 50,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button2: {
    position: "absolute",
    top: '1%',
    right: 60,
    width: 30,
    height: 50,
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
    backgroundColor: '#e207b0',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#e207b0'
  },
  modalbuttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  confirm: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    alignSelf: "center"
  },
  controls: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 48,
    left: 0,
    bottom: 0,
    right: 0,
    // position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  mainButton: {
    marginRight: 15,
  },
  duration: {
    color: "#FFF",
    marginLeft: 15,
  },
});
