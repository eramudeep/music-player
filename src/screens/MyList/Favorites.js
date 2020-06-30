import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image, FlatList, } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../strings';
import { connect } from 'react-redux';
import { FetchfavourContentsgenre } from '../../actions/Animated/Animatedaction';
import Icon from 'react-native-vector-icons/AntDesign';
import { BASE_PATH } from '../../../src/api/config'
import axios from 'axios'
import Modal, { ModalContent } from 'react-native-modals';
import AsyncStorage from '@react-native-community/async-storage';
const url = require('../../assets/images/favorite.png')

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // backimage: 'http://192.168.110.249:8000/thumbnails/login3.png',
            backimage: '',
            clickedType: '',
            clickedSource: '',
            clickedThumb: '',
            playClicked: false,
            contentIDState: '',
            sourcedata: [],
        }
        this.reRenderSomething = this.props.navigation.addListener(
            "willFocus",
            () => {
               this.getData();
            }
          );
    }



    componentDidMount = async () => {
       this.getData()
    }
    getData=async()=>{
        console.log("gett");
        
        AsyncStorage.getItem('userID').then((obj) => {
            this.props.FetchfavourContentsgenre(obj);
        })
        console.log("this.props.animations.favorcontent",this.props.animations.favorcontent);
        
        this.setState({
            backimage: url
        })
        this.setState({ sourcedata: this.props.animations.favorcontent })
    }
    handleRemove = async (user_id, id) => {
        let  token =await AsyncStorage.getItem("userToken")  
        await axios.get(BASE_PATH + '/api/favoriteRemove/' + user_id + '/' + id, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + token.replace(/['"]+/g, '')
            }
        })
            .then((response) => {
                console.log("response",response);
                
                console.log('success-----------', response['data']['message'])
                if (response['data']['message'] === 'deleted') {
                    console.log("has");
                    var filtered = this.state.sourcedata.filter(function(el) { return el.id != id }); 
                    this.setState({sourcedata:filtered})
                } 
                // this.props.FetchTopPlayed(genreID, user_id)
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
            this.setState({
                modalVisible: false,
            })
            setTimeout(() => {
                this.props.FetchfavourContentsgenre(user_id);
            }, 1000);
        
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    width={0.9}
                    visible={this.state.modalVisible}
                    rounded
                    actionsBordered
                    onTouchOutside={() => {
                        this.setState({ modalVisible: false });
                    }}
                >
                    <ModalContent
                        style={{ backgroundColor: '#aaf', alignItems: 'center', justifyContent: 'center' }} >
                        <Image source={require('../../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
                        <LinearGradient colors={['#000', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
                        <View style={{ height: 100 }}>
                            <Text style={styles.confirm}> {strings.removeconfirm} </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                            <TouchableOpacity style={styles.modalbutton}
                                onPress={async () => {
                                    let userID = await AsyncStorage.getItem('userID')
                                    this.handleRemove(userID, this.state.contentIDState)
                                }} >
                                <Text style={styles.modalbuttonText} >  {strings.yes} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalbutton} onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={styles.modalbuttonText} > {strings.cancel} </Text>
                            </TouchableOpacity>
                        </View>

                    </ModalContent>
                </Modal>
                <Modal
                    width={0.9}
                    visible={this.state.modalVisible1}
                    rounded
                    actionsBordered
                    onTouchOutside={() => {
                        this.setState({ modalVisible1: false });
                    }}
                    style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}
                >
                    <ModalContent
                        style={{ backgroundColor: '#aaf', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} >
                        <View style={{ height: 100 }}>
                            <Text style={{ ...styles.confirm, alignSelf: 'center' }}> {strings.success} </Text>
                        </View>
                    </ModalContent>
                </Modal>
                <View style={{ flex: 5 }}>
                    <ImageBackground
                        source={this.state.backimage == url ? this.state.backimage : { uri: this.state.backimage }}
                        resizeMode={'stretch'}
                        style={{ height: '100%' }}
                    >
                        <LinearGradient colors={['rgba(0,0,0,0)', '#000']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100 }} />

                        <View style={styles.downMedium}>
                            <TouchableOpacity style={{ ...styles.largePlay, marginTop: '-50%' }}
                                disabled={
                                    this.state.playClicked == false ? true : false
                                }
                                onPress={() => {

                                    this.state.clickedType == 0 ? (
                                        this.props.navigation.navigate('FavourVideoPlayer',
                                            {
                                                'clicked': this.state.clicked,
                                                'clickedSource': this.state.clickedSource,
                                            }
                                        )
                                    ) :
                                        this.props.navigation.navigate('FavourMusicPlayer',
                                            {
                                                'clicked': this.state.clicked,
                                                'clickedSource': this.state.clickedSource,
                                                'clickedThumb': this.state.clickedThumb
                                            }
                                        )
                                }}
                            >
                                <Icon2 name="play" size={20} style={{ ...styles.menu, marginBottom: '-95%' }} color="red" />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.bottomArea}>
                    {
                        this.props.animations.favorcontent != '' ?
                            <FlatList
                                style={{ width: '90%' }}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={5}
                                // data={this.props.animations ? this.props.animations.favorcontent : []}
                                data={this.state.sourcedata ? this.state.sourcedata : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            backimage: BASE_PATH + '/' + item['thumbnailURL'],
                                            clickedType: item['type'],
                                            clickedThumb: item['thumbnailURL'],
                                            clickedSource: item['contentURL'],
                                            playClicked: true
                                        })

                                    }} >
                                        <Image style={{ ...styles.borderImage1, marginLeft: 30 }} source={{ uri: BASE_PATH + '/' + item['thumbnailURL'] }} />
                                        <Text style={{ ...styles.imgName, marginLeft: 30 }} >{item['title']}</Text>
                                        {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: 150, height: 60, borderRadius: 15 }} /> */}
                                        <TouchableOpacity style={styles.downremoveButton} onPress={() => {
                                            this.setState({ modalVisible: true, contentIDState: item['id'] })
                                        }} >
                                            <Text style={styles.downremoveButtonText} >{strings.remove}</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                            />
                            :
                            <Text style={{ color: 'white', fontSize: 17 }}>There is no favorite music</Text>
                    }


                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        animations: state.animations
    }
}


export default connect(mapStateToProps, { FetchfavourContentsgenre })(Favorites);