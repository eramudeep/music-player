import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text, Dimensions, ScrollView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { drawer } from "../navigators/AppNavigation";
import strings from '../strings';
import { connect } from 'react-redux';
import { FetchAlbums, FetchContentsOfOneAlbum, FetchHeartOrNot } from '../actions/Album/Album'
import { FetchTopPlayed } from '../actions/TopPlayed/TopPlayed'
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import RNFS from 'react-native-fs';
import repeatedStyles from '../style';
import Colors from '../constants/colors'
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';
import { BASE_PATH } from '../api/config';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');

class StageFive extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bottomAlbum: [
                { id: 0, name: 'tomato' },
                { id: 1, name: 'lemon' },
                { id: 2, name: 'apple' },
                { id: 3, name: 'pear' },
                { id: 4, name: 'banana' },
                { id: 5, name: 'berry' },
            ],
            clicked: '',
            clickedType: '',
            clickedSource: '',
            clickedThumb: '',
            clickedAlbumID: '',
            sourcedata: '',
            clickedTitle: '',
            downClicked: false,
            playClicked: false,
            modalVisible: false,
            modalVisible1: false,
            addedToFavor: false,
            toggleClick: false,
            testState: false,
            artist_name: '',
            album_name: '',
            userIDState: '',
            currentLang: 'en',
            contentIDState: '',
            toggleHeart: '',
            lang: ''
        }
        this.onDownloadPress = this.onDownloadPress.bind(this);
    }

    async componentWillMount() {

        // await AsyncStorage.setItem('userToken', this.props.navigation.getParam("Token"));
        AsyncStorage.getItem('data', (err, result) => {
            this.setState({ sourcedata: JSON.parse(result) })
        });
    }

    componentDidMount = async () => {

        let thumbnailURL = this.props.navigation.getParam('thumbnailURL')
        let genreID = this.props.navigation.getParam('genreID')
        let title = this.props.navigation.getParam('title')
        let ar_title = this.props.navigation.getParam('ar_title')
        let type = this.props.navigation.getParam('type')
        let contentURL = this.props.navigation.getParam('contentURL')
        let artistID = this.props.navigation.getParam('artist_id')
        let totalItem = this.props.navigation.getParam('totalItem')
        let desc_long = this.props.navigation.getParam('desc_long')
        let contentID = this.props.navigation.getParam('contentID')
        let artist_name = this.props.navigation.getParam('artist_name')
        let album_name = this.props.navigation.getParam('album_name')
        let previousScreen = this.props.navigation.getParam('previousScreen')
        // alert(contentID)
        // this.props.FetchAlbums(genreID, artistID)
        let userID = await AsyncStorage.getItem('userID')

        await this.props.FetchContentsOfOneAlbum(contentID)
        await this.props.FetchHeartOrNot(userID,contentID)
        await AsyncStorage.getItem('languageCode').then((obj) => { this.setState({ lang: obj }) })

        await this.setState({
            contentIDState: contentID,
            clickedTitle: this.state.lang == 'en' ? title : ar_title,
            clickedType: type,
            clickedSource: contentURL
        })
        console.log('===this.props.album.getContentsOfOneAlbum= ', this.props.album.getContentsOfOneAlbum[0]['album_name'])
        this.setState({
            album_name: this.props.album.getContentsOfOneAlbum[0]['album_name'],
            artist_name: this.props.album.getContentsOfOneAlbum[0]['artist_name']
        })
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'en') {
            this.setState({
                currentLang: 'en'
            })
        } else {
            this.setState({
                currentLang: 'ar'
            })
        }
    }

    openDrawer = () => {
        drawer.current.open()
        console.log('==============source data **************', this.state.sourcedata);
    }

    FetchAlbumSong(genType, albumID) {
        this.props.FetchAlbumSong(genType, albumID)
    }

    onDownloadPress() {
        AsyncStorage.getItem('data', (err, result) => {
            if (JSON.parse(result) == null) {
                RNFS.downloadFile({
                    fromUrl: BASE_PATH + '/' + this.state.clickedSource,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedSource[this.state.clickedSource.length - 3]}${this.state.clickedSource[this.state.clickedSource.length - 2]}${this.state.clickedSource[this.state.clickedSource.length - 1]}`,
                }).promise.then((r) => {
                });
                RNFS.downloadFile({
                    fromUrl: BASE_PATH + '/' + this.state.clickedThumb,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedThumb[this.state.clickedThumb.length - 3]}${this.state.clickedThumb[this.state.clickedThumb.length - 2]}${this.state.clickedThumb[this.state.clickedThumb.length - 1]}`,
                }).promise.then((r) => {
                    AsyncStorage.setItem('data', JSON.stringify([{
                        id: 1, title: this.state.clicked['title'], thumb: this.state.clicked['title'] + '.' + this.state.clickedThumb[this.state.clickedThumb.length - 3] + this.state.clickedThumb[this.state.clickedThumb.length - 2] + this.state.clickedThumb[this.state.clickedThumb.length - 1],
                        source: this.state.clicked['title'] + '.' + this.state.clickedSource[this.state.clickedSource.length - 3] + this.state.clickedSource[this.state.clickedSource.length - 2] + this.state.clickedSource[this.state.clickedSource.length - 1],
                        type: this.state.clickedType
                    }]));
                    this.setState({ modalVisible: false })
                    this.setState({
                        modalVisible1: true
                    })
                    setTimeout(() => { this.setState({ modalVisible1: false }) }, 1000)
                }).catch(error => {
                    console.log('==========Error: =======', error)
                    this.setState({ modalVisible: false })
                });
            }
            else {
                RNFS.downloadFile({
                    fromUrl: BASE_PATH + '/' + this.state.clickedSource,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedSource[this.state.clickedSource.length - 3]}${this.state.clickedSource[this.state.clickedSource.length - 2]}${this.state.clickedSource[this.state.clickedSource.length - 1]}`,
                }).promise.then((r) => {
                });
                RNFS.downloadFile({
                    fromUrl: BASE_PATH + '/' + this.state.clickedThumb,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedThumb[this.state.clickedThumb.length - 3]}${this.state.clickedThumb[this.state.clickedThumb.length - 2]}${this.state.clickedThumb[this.state.clickedThumb.length - 1]}`,
                }).promise.then((r) => {
                    let temp = JSON.parse(result);
                    temp.push({
                        id: 1, title: this.state.clicked['title'], thumb: this.state.clicked['title'] + '.' + this.state.clickedThumb[this.state.clickedThumb.length - 3] + this.state.clickedThumb[this.state.clickedThumb.length - 2] + this.state.clickedThumb[this.state.clickedThumb.length - 1],
                        source: this.state.clicked['title'] + '.' + this.state.clickedSource[this.state.clickedSource.length - 3] + this.state.clickedSource[this.state.clickedSource.length - 2] + this.state.clickedSource[this.state.clickedSource.length - 1],
                        type: this.state.clickedType
                    });
                    AsyncStorage.setItem('data', JSON.stringify(temp));

                    this.setState({ modalVisible: false })
                    this.setState({
                        modalVisible1: true
                    })
                    setTimeout(() => { this.setState({ modalVisible1: false }) }, 1000)
                }).catch(error => {
                    alert(error)
                    this.setState({ modalVisible: false })
                });
            }
        });
        this.updateDownCount(this.state.contentIDState)
    }

    updateRegCount = async (userID, contentID) => {
        let  token =await AsyncStorage.getItem("userToken") 
        axios.get( BASE_PATH +'/api/updateRegCount/' + userID + '/' + contentID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + token.replace(/['"]+/g, '')
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }

    updateDownCount = async (contentID) => {
        let  token =await AsyncStorage.getItem("userToken") 
        axios.get( BASE_PATH + '/api/updateDownCount/' + contentID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + token.replace(/['"]+/g, '')
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }

    markHeart = async (user_id, id) => {
        let  token =await AsyncStorage.getItem("userToken") 
        axios.get( BASE_PATH + '/api/markHeart/' + user_id + '/' + id + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + token.replace(/['"]+/g, '')
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
                if (response['data']['message'] == 'added') {
                    this.setState({ toggleHeart: true })
                } else {
                    this.setState({ toggleHeart: false })
                }
                // this.props.FetchTopPlayed(genreID, user_id)
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }


    render() {
        let thumbnailURL = this.props.navigation.getParam('thumbnailURL')
        let title = this.props.navigation.getParam('title')
        let type = this.props.navigation.getParam('type')
        let contentURL = this.props.navigation.getParam('contentURL')
        let artistID = this.props.navigation.getParam('artist_id')
        let totalItem = this.props.navigation.getParam('totalItem')
        let desc_long = this.props.navigation.getParam('desc_long')
        let contentID = this.props.navigation.getParam('contentID')
        let artist_name = this.props.navigation.getParam('artist_name')
        let album_name = this.props.navigation.getParam('album_name')
        let ar_album_name = this.props.navigation.getParam('ar_album_name')
        let previousScreen = this.props.navigation.getParam('previousScreen')
        return (
            <View style={styles.box}>
                {/* Don't copy this modal: it uses repeatedStyles from '../styles'
                    In Modal, repeatedStyles must be used.
                */}

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
                        <LinearGradient colors={['#000', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
                        <View style={{ height: 100 }}>
                            <Text style={repeatedStyles.confirm}>{strings.confirm}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                            <TouchableOpacity style={repeatedStyles.modalbutton} onPress={() => { this.onDownloadPress() }} >
                                <Text style={repeatedStyles.modalbuttonText} >{strings.yes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={repeatedStyles.modalbutton} onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={repeatedStyles.modalbuttonText} >{strings.cancel}</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>

                <Modal
                    width={0.9}
                    visible={this.state.modalVisible1}
                    rounded
                    actionsBordered
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ modalVisible1: false });
                    }}
                    style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}
                >
                    <ModalContent
                        style={{ backgroundColor: '#aaf', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} >
                        <View style={{ height: 100 }}>
                            <Text style={{ ...repeatedStyles.confirm, alignSelf: 'center' }}> {strings.success} </Text>
                        </View>
                    </ModalContent>
                </Modal>

                <View style={styles.container}>
                    <View style={styles.searchArea}>
                        <TouchableOpacity onPress={
                            // previousScreen == 'Home'
                            //     ?
                            //     this.props.navigation.navigate('Home')
                            //     :
                            //     this.props.navigation.navigate('StageThree')

                            this.openDrawer
                        }>
                            <Icon name="bars" size={20} style={styles.menu} color={Colors.heading} />
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Search') }} style={{ width: '100%' }}>
                            <View style={styles.srhInputArea}>
                                <Text style={{ color: '#999' }}>{strings.search}...</Text>
                                <Icon name="search" size={20} style={styles.menu} color={Colors.heading} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.top}>{this.state.lang == 'en' ? album_name : ar_album_name}</Text>
                    <View style={styles.albumArea}>

                        <TouchableOpacity style={styles.albumImageGroup} onPress={async () => {
                            let userID = await AsyncStorage.getItem('userID')
                            type == '0' ? (
                                this.props.navigation.navigate('VideoPlayer',
                                    {
                                        'clicked': totalItem,
                                        'clickedSource': this.state.clickedSource,
                                    }
                                )
                            ) :
                                this.props.navigation.navigate('MusicPlayer',
                                    {
                                        'clicked': totalItem,
                                        'clickedSource': this.state.clickedSource,
                                        'clickedThumb': thumbnailURL
                                    }
                                )
                            this.updateRegCount(userID, contentID)
                        }}>
                            <View style={{ position: 'absolute', flexDirection: 'row', top: 10, right: 10, zIndex: 1000 }}>
                                <TouchableOpacity onPress={async () => {
                                    try {
                                        let userID = await AsyncStorage.getItem('userID')
                                        this.setState({
                                            userIDState: userID
                                        })
                                        await this.markHeart(userID, this.state.contentIDState)
                                        await this.props.FetchHeartOrNot(userID,this.state.contentIDState)
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }} style={styles.heart} >
                                    <Icon name="heart" size={25} color={ this.props.album.getHeartOrNot != '' ? "rgb(250, 185, 75)" : "white" } />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ position: 'absolute', flexDirection: 'row', top: 10, right: 10, zIndex: 1000, justifyContent: 'space-around' }}>

                            </View> */}
                            <Image style={styles.albumImage} source={{ uri: BASE_PATH + '/' + (contentID == this.state.contentIDState ? thumbnailURL : this.state.clickedThumb) }} />
                            {/* <Image style={styles.albumImage} source={{ uri: BASE_PATH + "/" + this.state.clickedThumb }} /> */}
                            {/* <Image style={styles.albumImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} /> */}
                            <View style={{ position: 'absolute', bottom: 30, width: width * 0.6, height: width * 0.35, zIndex: 90 }}>
                                <View style={styles.imgAlbumNameArea}>
                                    <Text style={styles.imgAlbumName} >{this.state.clickedTitle}</Text>
                                </View>
                                <Text style={styles.imgAlbumNameType} >{this.state.clickedType == 0 ? strings.video : strings.audio}</Text>
                                {/* <Text style={styles.price}>500IQD</Text> */}
                            </View>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity
                                    style={{ ...styles.DownBtn, backgroundColor: Colors.inactiveGrey, }}
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: true,
                                        })
                                    }} >
                                    <Text style={{ color: Colors.heading }}>{strings.download}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.play} onPress={async () => {
                                let userID = await AsyncStorage.getItem('userID')
                                type == '0' ? (
                                    this.props.navigation.navigate('VideoPlayer',
                                        {
                                            'clicked': totalItem,
                                            'clickedSource': this.state.clickedSource,
                                        }
                                    )
                                ) :
                                    this.props.navigation.navigate('MusicPlayer',
                                        {
                                            'clicked': totalItem,
                                            'clickedSource': this.state.clickedSource,
                                            'clickedThumb': thumbnailURL
                                        }
                                    )
                                this.updateRegCount(userID, contentID)
                            }}>
                                <Icon name="play" size={25} color="white" />
                            </TouchableOpacity>
                            <LinearGradient colors={['#0000', '#000c']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 150, borderRadius: 15 }} />

                        </TouchableOpacity>

                    </View>
                    {/* <Text style={styles.most}>{this.state.artist_name}</Text> */}
                    {/* //////////////////////    Must be enter later   ////////////////////////// */}
                    <View style={styles.bottomArea}>

                        <FlatList
                            style={{ width: '100%', paddingVertical: 10, marginBottom: 10 }}
                            showsHorizontalScrollIndicator={true}
                            initialNumToRender={10}
                            horizontal
                            data={this.props.album ? this.props.album.getContentsOfOneAlbum : []}

                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={async () => {
                                    let userID = await AsyncStorage.getItem('userID')
                                    this.setState({
                                        contentIDState: item['id'],
                                        clickedThumb: item['thumbnailURL'],
                                        clickedTitle: this.state.lang == 'en' ? item['title'] : item['ar_title'],
                                        clickedType: item['type'],
                                        clickedSource: item['contentURL'],
                                        clicked: item
                                    })
                                    await this.props.FetchHeartOrNot(userID,item['id'])
                                }} activeOpacity={0.6} >
                                    <View style={styles.borderImageGroup}>
                                        <Image style={styles.borderImage} source={{ uri: BASE_PATH + '/' + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                            <View style={styles.imgAlbumNameArea2}>
                                                <Text style={styles.imgAlbumName2} >{this.state.lang == 'en' ? item['title'] : item['ar_title']}</Text>
                                            </View>
                                            <Text style={styles.imgAlbumNameType} >{item['type'] == 1 ? strings.audio : strings.video}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        album: state.album,
        topPlayed: state.topPlayed
    }
}

export default connect(mapStateToProps, { FetchAlbums, FetchContentsOfOneAlbum, FetchHeartOrNot })(StageFive);

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: Colors.bgGrey
    },
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: Colors.bgGrey
    },
    searchArea: {
        height: 80,
        flexDirection: 'row',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    srhInputArea: {
        borderWidth: 1,
        borderColor: '#bbb',
        width: '90%',
        marginHorizontal: 10,
        height: 36,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20
    },
    srhInput: {
        width: '80%',
        marginLeft: 18,
        paddingBottom: 8
    },
    menu: {
        marginHorizontal: 10
    },
    heart: {
        marginHorizontal: 5,
    },
    play: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 70,
        right: 10,
        zIndex: 100
    },
    belowPlay: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 1000
    },
    top: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -15,
        backgroundColor: Colors.bgGrey,
        paddingHorizontal: 10,
        color: Colors.heading
    },
    most: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -12,
        backgroundColor: Colors.bgGrey,
        paddingHorizontal: 10,
        color: Colors.heading
    },
    albumArea: {
        height: height * 0.5,
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 3,
    },
    albumImage: {
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.45,
        resizeMode: 'cover',
    },
    albumImageGroup: {
        marginLeft: width * 0.07,
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.45,
        elevation: 8,
        backgroundColor: '#000',
        margin: 8
    },

    bottomArea: {
        height: width * 0.6,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    borderImage: {
        borderRadius: 15,
        width: width * 0.33,
        height: width * 0.4,
        resizeMode: 'cover',
    },
    borderImageGroup: {
        borderRadius: 15,
        width: width * 0.33,
        height: width * 0.4,
        margin: 5,
        elevation: 5,
    },
    imgName: {
        fontSize: 12,
        width: 70,
        paddingVertical: 2,
        color: 'white',
        backgroundColor: '#0aa',
        marginTop: -30,
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 15
    },
    imgAlbumName: {
        fontSize: 40,
        color: 'white',
        paddingHorizontal: 15,
        zIndex: 1000
    },
    imgAlbumName2: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 15,
        zIndex: 1000
    },
    imgAlbumNameArea: {
        height: width * 0.2,
        justifyContent: 'flex-end',
    },
    imgAlbumNameArea2: {
        height: 45,
        justifyContent: 'flex-end',
    },
    imgAlbumNameType: {
        paddingHorizontal: 20,
        fontSize: 13,
        color: 'white',
    },
    price: {
        backgroundColor: '#0aa',
        width: 90,
        paddingHorizontal: 20,
        marginLeft: 15,
        paddingVertical: 3,
        borderRadius: 15,
        color: 'white'
    },
    buttonGroup: {
        width: width * 0.75,
        justifyContent: 'space-around',
        paddingVertical: 10,
        flexDirection: 'row',
        zIndex: 1000,
        position: 'absolute',
        bottom: 10
    },
    DownBtn: {
        width: width * 0.3,
        alignItems: "center",
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 0.7,
        elevation: 5
    }
});
