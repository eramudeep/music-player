import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from '../style';
import NavigationService from '../navigators/NavigationService';
import { drawer } from "../navigators/AppNavigation";
import strings from '../strings';
import { connect } from 'react-redux'
import { FetchLatestContents, FetchUserName } from '../actions/TopPlayed/TopPlayed'
import axios from 'axios'
import { BASE_PATH } from '../api/config';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userID: ''
    }
  }

  componentDidMount = async () => {
    // alert(JSON.stringify(this.props.user[0]['firstname']))
    await AsyncStorage.getItem('userID').then((response) => {
      this.setState({
        userID: response
      })
    })
    setTimeout(() => {
      console.log('===', this.props.user)
      this.props.FetchLatestContents(this.state.userID)
      this.props.FetchUserName(this.state.userID)
    }, 500);
  }

  removeLatest = async (userID,id) => {
    let token =await AsyncStorage.getItem('userToken')
    console.log(userID)
    console.log(id)
    axios.get(BASE_PATH + '/api/content/removeLatest/' + userID + '/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token.replace(/['"]+/g, '')
        // 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdWlkIjoiamlueW91Y2hlbmcxMjE3QGdtYWlsLmNvbSIsImlkIjoxMDEsImlhdCI6MTU5MzU5OTUwMn0.Lef1tMp1ahGP5Ca7cxqduYJRCXTCXfqJXCYCEoQ7YGc'
      }
    })
      .then((response) => {
        console.log('=======START=============================');
        console.log(response);
        console.log('======= END =============================');
      }, (err) => {
        console.log('Fetch rowIndex Error ======', err)
      });
      setTimeout(() => {
        this.props.FetchLatestContents(this.state.userID)
      }, 500);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/login3.png')}
          resizeMode={'stretch'}
          style={{ height: '110%', flex: 1 }}>
          <View style={styles.txtGroup1}>
            <TouchableOpacity onPress={() => { drawer.current.open() }} style={styles.touchMenu}>
              <Icon2 name="bars" size={20} style={styles.menu} color="white" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTxt}>{this.props.user? this.props.user[0]['firstname']:[]} {this.props.user ? this.props.user[0]['lastname'] : []}</Text>
              {/* <Image source={require('../assets/images/song.png')} resizeMode={"stretch"} style={{ width: '100%', flex: 1 }} /> */}
            </View>
            <View style={styles.txtBox1}>
              <Text style={styles.txt}>
                Type: {strings.weekly}
                {'\n'}Renewal: 20042019
                {'\n'}None of tone: 2
                {'\n'}Playing Mode
              </Text>
              <TouchableOpacity onPress={() => {
                NavigationService.navigate('Subscribe');
                // this.props.FetchRandomContents()
                // this.props.drawer.current.close();
              }} style={{ ...styles.Btn, width: '50%', height: 30, marginLeft: 130 }}>
                <Text style={{ color: 'white' }}>{strings.subscription}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={{ color: 'white', paddingBottom: 10, fontSize: 20, marginTop: -10 }}>{strings.contents}</Text>
              <View style={{ height: 270 }}>
                <ScrollView>

                  <FlatList
                    style={{ width: '100%' }}
                    showsHorizontalScrollIndicator={true}
                    initialNumToRender={10}
                    // data={this.state.clickedAlbumID == albumID ? (this.props.album ? this.props.album.selectedAlbumContent : []) : (this.props.album ? this.props.belowSelectedAlbumContent : []) }
                    data={this.props.latestPlayed ? this.props.latestPlayed : []}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('StageFive', {
                          'thumbnailURL': item['thumbnailURL'],
                          'title': item['title'],
                          'type': item['type'],
                          'contentURL': item['contentURL'],
                          'artist_id': item['artistID'],
                          'totalItem': item,
                          'desc_long': item['desc_long'],
                          'genreID': item['genreID'],
                          'albumID': item['albumID'],
                          'contentID': item['id'],
                          'previousScreen': 'Profile'
                        })
                      }} activeOpacity={0.6}>
                        <ImageBackground
                          source={require('../assets/images/opacityBack.png')}
                          resizeMode={'stretch'} style={styles.songItem}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} resizeMode={"stretch"} style={{ width: 52, height: 52, marginLeft: 15, borderRadius: 50 }} />
                            <Text style={styles.songTxt}>{item['title']}{'\n'}{item['desc_short']}</Text>
                          </View>
                          <View></View>
                          <TouchableOpacity onPress={() => { this.removeLatest(this.state.userID, item['id']) }}>
                            <Icon name="close" size={20} style={styles.menuClose} color="white" />
                            {/* <Image source={require('../assets/images/close.png')} resizeMode={"stretch"} style={{ width: 25, height: 25, marginLeft: 70 }} /> */}
                          </TouchableOpacity>
                        </ImageBackground>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                  />

                </ScrollView>
              </View>
            </View>

          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latestPlayed: state.topPlayed.latestPlayed,
    user: state.topPlayed.user
  }
}

export default connect(mapStateToProps, { FetchLatestContents, FetchUserName })(Profile);
