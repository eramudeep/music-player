import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Text, Dimensions, ScrollView, Image, AsyncStorage, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { drawer } from "../navigators/AppNavigation";
import strings from '../strings';
import { connect } from 'react-redux';
import { FetchAlbums, FetchMostDown, FetchRandomMostDown, FetchLatest, FetchSubcategory } from '../actions/Album/Album'
import { FetchTopPlayed, FetchRandomTop, FetchArtist, FetchOtherArtist } from '../actions/TopPlayed/TopPlayed'
import LinearGradient from 'react-native-linear-gradient';
import { BarIndicator } from 'react-native-indicators';
import axios from 'axios'
import RNFS from 'react-native-fs';
import repeatedStyles from '../style';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';


const { width, height } = Dimensions.get('window');


class StageTwo extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
            more: '',
            countryIDArray: '',
            subcategoryDisplayState: false,
            loading: true,
            userIDState: '',
            numColumns: 2,
            clickedID: ''
        }
        this.onDownloadPress = this.onDownloadPress.bind(this);
    }

    async componentWillMount() {
        await AsyncStorage.setItem('userToken', this.props.navigation.getParam("Token"));
        AsyncStorage.getItem('data', (err, result) => {
            this.setState({ sourcedata: JSON.parse(result) })
        });
    }

    componentDidMount = async () => {
        // this.props.FetchArtistCount()
        // alert(JSON.stringify(user))
        StatusBar.setHidden(true)
        let userID = await AsyncStorage.getItem('userID')
        let genType = this.props.navigation.getParam('genreType')
        if (genType == 1) {
            this.setState({
                subcategoryDisplayState: true
            })
        } else {
            this.setState({
                subcategoryDisplayState: false
            })
        }

        let response = await fetch('http://192.168.110.249:8000/api/getArtistCount ', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            },
        });
        let result = await response.json();
        console.log('********count(id)^^^^^^^^^^^^^^^^^^^^', result['data']['content'][0]['COUNT(id)'])

        this.props.FetchTopPlayed(genType, userID)
        this.props.FetchRandomTop(genType)
        this.props.FetchMostDown(genType)
        this.props.FetchRandomMostDown(genType)

        this.props.FetchArtist()
        this.props.FetchOtherArtist(genType)
        this.props.FetchLatest(genType)
        this.props.FetchSubcategory(genType)

        let resCountry = await fetch('http://192.168.110.249:8000/api/getArtist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            },
        });
        let resResult = await resCountry.json();
        if (resCountry) {
            this.setState({
                loading: false
            })
        }
        // let tmpArray = [];
        // for (let i = 0; i < resResult['data']['content'].length; i++) {
        //     tmpArray.push(resResult['data']['content'][i])
        // }
        // this.setState({
        //     countryIDArray: tmpArray,
        //     loading: false
        // })


        console.log('countryIDArray ================', this.state.countryIDArray)

        // get the number of the artists from artist table
        if (result['data']['content'][0]['COUNT(id)'] > 20) {
            this.setState({ more: true })
        } else {
            this.setState({ more: false })
        }

    }

    openDrawer() {
        // alert(JSON.stringify(this.props.album))
        drawer.current.open()
        // setTimeout(function(){this.changeState()}.bind(this), 1000)
    }

    async addFavour() {
        const body = this.state.clicked;
        console.log('body====================', body)
        axios.post('http://192.168.110.249:8000/api/content/favorupload', body, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                // this.setState({ addedToFavor: true })
                console.log('============== upload success', response)
            }, (err) => {
                console.log('============== upload failed ===', err)
            });
    }

    removeFavor() {

    }

    addOrRemove(toggle) {
        if (toggle) {
            this.addFavour()
        } else {
            this.removeFavor()
        }
    }

    // FetchMostDown(genType) {
    //     this.props.FetchMostDown(genType)
    // }

    onDownloadPress() {

        AsyncStorage.getItem('data', (err, result) => {

            if (JSON.parse(result) == null) {

                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedSource,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedSource[this.state.clickedSource.length - 3]}${this.state.clickedSource[this.state.clickedSource.length - 2]}${this.state.clickedSource[this.state.clickedSource.length - 1]}`,
                }).promise.then((r) => {

                });
                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedThumb,
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
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedSource,
                    toFile: `${RNFS.DocumentDirectoryPath}/${this.state.clicked['title']}.${this.state.clickedSource[this.state.clickedSource.length - 3]}${this.state.clickedSource[this.state.clickedSource.length - 2]}${this.state.clickedSource[this.state.clickedSource.length - 1]}`,
                }).promise.then((r) => {
                });
                RNFS.downloadFile({
                    fromUrl: 'http://192.168.110.249:8000/' + this.state.clickedThumb,
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
        this.updateDownCount(this.state.clickedID)

    }

    markHeart = async (user_id, id) => {
        let genType = this.props.navigation.getParam('genreType')
        axios.get('http://192.168.110.249:8000/api/markHeart/' + user_id + '/' + id + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
                if (response['data']['message'] == 'added') {
                    this.setState({ toggleHeart: true })
                } else {
                    this.setState({ toggleHeart: false })
                }
                this.props.FetchTopPlayed(genType, user_id)
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }

    updateRegCount = async (userID, contentID) => {
        axios.get('http://192.168.110.249:8000/api/updateRegCount/' + userID + '/' + contentID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }

    updateDownCount = async (contentID) => {
        axios.get('http://192.168.110.249:8000/api/updateDownCount/' + contentID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                console.log('success-----------', response['data']['message'])
            }, (err) => {
                console.log('============== fetch failed ===', err)
            });
    }



    render() {
        // let userID = this.props.navigation.getParam('userID')
        return (
            <View style={styles.box}>
                {
                    this.state.loading && (
                        <BarIndicator color='#fcf' count={5} style={{ position: 'absolute', alignSelf: "center", marginTop: height * 0.5, zIndex: 1000 }} />
                    )
                }
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
                        <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
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
                        <TouchableOpacity onPress={() => this.openDrawer()}>
                            <Icon name="bars" size={20} style={styles.menu} color="black" />
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Search')}} style={{width: '100%'}}>
                            <View style={styles.srhInputArea}>
                                <Text style={{color: '#999'}}>{strings.search}...</Text>
                                <Icon name="search" size={20} style={styles.menu} color="black" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={styles.bottomArea}>
                        <Text style={{ ...styles.top, zIndex: 1000 }}>{strings.top20tones}</Text>
                        <View style={styles.albumArea}>
                            {/* <ScrollView horizontal={true} >
                            {
                                this.state.bottomAlbum.map((item, index) => (
                                    <View key={index} style={styles.albumImageGroup}>
                                        <Image style={styles.albumImage} source={require('../assets/images/login' + 1 + '.png')} />
                                        <Text style={styles.imgAlbumName} onPress={() => { alert(index) }}>{item.name}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView> */}

                            <FlatList
                                style={{ width: '100%' }}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                data={this.props.topPlayed ? this.props.topPlayed.topPlayed : []}
                                // data={this.props.topPlayed ? this.state.more ? this.props.topPlayed.topPlayed : this.props.topPlayed.randomTop : []}
                                renderItem={({ item }) => (
























                                    <TouchableOpacity onPress={() => {
                                        let genType = this.props.navigation.getParam('genreType')
                                        // this.FetchMostDown(genType, item['albumID'])
                                        console.log('============item****************', item)
                                        this.props.navigation.navigate('StageFour', {
                                            'thumbnailURL': item['thumbnailURL'],
                                            'title': item['title'],
                                            'type': item['type'],
                                            'contentURL': item['contentURL'],
                                            'artistID': item['artistID'],
                                            'totalItem': item,
                                            'desc_long': item['desc_long'],
                                            'genreID': genType,
                                            'albumID': item['albumID'],
                                            'contentID': item['id']
                                        })
                                        // alert(item['artistID'])
                                    }} style={styles.albumImageGroup} activeOpacity={0.6}>

                                        <View style={{ position: 'absolute', flexDirection: 'row', top: 10, right: 10, zIndex: 1000, justifyContent: 'space-around' }}>

                                            <TouchableOpacity onPress={async () => {
                                                try {
                                                    let userID = await AsyncStorage.getItem('userID')
                                                    this.setState({
                                                        userIDState: userID
                                                    })
                                                    console.log('==========***** userID *****=============', userID)
                                                    this.markHeart(userID, item['id'])
                                                } catch (error) {
                                                    console.log(error)
                                                    console.log(error)
                                                }
                                                console.log('==========***** item["id"] *****=========', item['id'])

                                            }} style={styles.heart} >
                                                <Icon name="heart" size={25} color={item['userID'] ? "rgb(250, 185, 75)" : "white"} />
                                            </TouchableOpacity>
                                        </View>
                                        <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                        {/* <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + (item['albumID'] == this.state.clickedAlbumID ? this.state.clickedThumb : item['thumbnailURL']) }} /> */}
                                        {/* <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + this.state.clickedThumb }} /> */}
                                        <View style={{ position: 'absolute', bottom: 30, width: width * 0.4, height: width * 0.35, zIndex: 90 }}>
                                            <View style={styles.imgAlbumNameArea}>
                                                <Text style={styles.imgAlbumName} >{item['title']}</Text>
                                                {/* <Text style={styles.imgAlbumName} >{item['albumID'] == this.state.clickedAlbumID ? this.state.clickedTitle: item['title']}</Text> */}
                                            </View>
                                            <Text style={styles.imgAlbumNameType} >{item['type'] == 1 ? 'audio' : 'video'}</Text>
                                            {/* <Text style={styles.imgAlbumNameType} >{item['albumID'] == this.state.clickedAlbumID ? this.state.clickedType : item['type']}</Text> */}
                                            {/* <Text style={styles.price}>500IQD</Text> */}
                                        </View>
                                        <View style={styles.buttonGroup}>
                                            <TouchableOpacity
                                                style={{ ...styles.DownBtn, backgroundColor: 'rgb(25,22,54)', }}
                                                activeOpacity={0.6}
                                                onPress={async () => {
                                                    await this.setState({
                                                        modalVisible: true,
                                                        clickedSource: item['contentURL'],
                                                        clicked: item,
                                                        clickedThumb: item['thumbnailURL'],
                                                        clickedType: item['type'],
                                                        clickedID: item['id']
                                                    })
                                                }} >
                                                <Text style={{ color: '#e207b0' }}>{strings.download}</Text>
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity style={{ ...styles.DownBtn, backgroundColor: '#fff', }} activeOpacity={0.6} >
                                            <Text style={{ color: '#e207b0' }}>{strings.gift}</Text>
                                        </TouchableOpacity> */}

                                        </View>
                                        <TouchableOpacity style={styles.play} onPress={async () => {
                                            let userID = await AsyncStorage.getItem('userID')
                                            await this.setState({
                                                clickedSource: item['contentURL'],
                                                clicked: item,
                                                clickedThumb: item['thumbnailURL'],
                                                clickedType: item['type'],
                                            })
                                            this.state.clickedType == '0' ? (
                                                this.props.navigation.navigate('VideoPlayer',
                                                    {
                                                        'clicked': this.state.clicked,
                                                        'clickedSource': this.state.clickedSource,
                                                    }
                                                )
                                            ) :
                                                this.props.navigation.navigate('MusicPlayer',
                                                    {
                                                        'clicked': this.state.clicked,
                                                        'clickedSource': this.state.clickedSource,
                                                        'clickedThumb': this.state.clickedThumb
                                                    }
                                                )
                                            this.updateRegCount(userID, item['id'])
                                        }}>
                                            <Icon name="play" size={25} color="white" />
                                        </TouchableOpacity>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(215,100,190,0.4)', 'rgba(213,52,178,0.8)', '#e207b0']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 150, borderRadius: 15 }} />

                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                            />

                        </View>

                        <Text style={{ ...styles.most, marginBottom: -10, marginTop: 1 }}>{strings.mostdown}</Text>
















                        <FlatList
                            style={{ width: '100%', paddingVertical: 10, marginBottom: 10, borderBottomColor: '#ddd', borderBottomWidth: 3, borderTopColor: '#ddd', borderTopWidth: 3 }}
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            initialNumToRender={10}
                            data={this.props.album ? this.state.more ? this.props.album.mostDown : this.props.album.randomMostDown : []}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    let genType = this.props.navigation.getParam('genreType')
                                    this.props.navigation.navigate('StageFour', {
                                        'thumbnailURL': item['thumbnailURL'],
                                        'title': item['title'],
                                        'type': item['type'],
                                        'contentURL': item['contentURL'],
                                        'artistID': item['artistID'],
                                        'totalItem': item,
                                        'desc_long': item['desc_long'],
                                        'genreID': genType,
                                        'albumID': item['albumID'],
                                        'contentID': item['id']
                                    })
                                    console.log('===================state clicked ===============', this.state.clickedAlbumID)
                                }} activeOpacity={0.6} >
                                    <View style={styles.borderImageGroup}>
                                        <Image style={styles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                            <View style={styles.imgAlbumNameArea2}>
                                                <Text style={styles.imgAlbumName2} >{item['title']}</Text>
                                            </View>
                                            <Text style={styles.imgAlbumNameType} >{item['type'] == 1 ? 'audio' : 'video'}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />

                        <Text style={{ ...styles.most, marginTop: -20 }}>{strings.latestalbum}</Text>
                        <FlatList
                            style={{ width: '100%', paddingBottom: 20, marginBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 3 }}
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            initialNumToRender={10}
                            data={this.props.album ? this.props.album.latest : []}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    let genType = this.props.navigation.getParam('genreType')
                                    this.props.navigation.navigate('StageFour', {
                                        'thumbnailURL': item['thumbnailURL'],
                                        'title': item['title'],
                                        'type': item['type'],
                                        'contentURL': item['contentURL'],
                                        'artistID': item['artistID'],
                                        'totalItem': item,
                                        'desc_long': item['desc_long'],
                                        'genreID': genType,
                                        'albumID': item['albumID'],
                                        'contentID': item['id']
                                    })
                                    console.log('===================state clicked ===============', this.state.clickedAlbumID)
                                }} activeOpacity={0.6} >
                                    <View style={styles.borderImageGroup}>
                                        <Image style={styles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                            <View style={styles.imgAlbumNameArea2}>
                                                <Text style={styles.imgAlbumName2} >{item['title']}</Text>
                                            </View>
                                            <Text style={styles.imgAlbumNameType} >{item['type'] == 1 ? 'audio' : 'video'}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />

                        {
                            this.state.subcategoryDisplayState == true ?
                                <View>
                                    <Text style={{ ...styles.most, marginTop: -20 }}>{strings.artists}</Text>
                                    <FlatList
                                        data={this.props.topPlayed ? this.props.topPlayed.artist : []}
                                        // data={this.state.countryIDArray ? this.state.countryIDArray : []}
                                        renderItem={({ item }) => (
                                            <View style={{ paddingBottom: 5 }}>
                                                <Text>{item['name']}</Text>

                                                <FlatList
                                                    style={{ width: '100%', paddingBottom: 10, marginBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 3 }}
                                                    horizontal
                                                    showsHorizontalScrollIndicator={true}
                                                    initialNumToRender={10}
                                                    // data={this.state.countryIDArray ? this.state.countryIDArray : []}
                                                    data={item["data"] ? item["data"] : []}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity onPress={() => {
                                                            console.log('ITEM  ================asdasda==', item)
                                                            this.props.navigation.navigate('StageThree', {
                                                                'artist_thumbnailURL': item['artist_thumbnailURL'],
                                                                'artist_name': item['artist_name'],
                                                                'artist_id': item['artistID'],
                                                                'genreID': item['genreID']
                                                            })
                                                        }} activeOpacity={0.6} >
                                                            <View style={styles.borderImageGroup}>
                                                                <Image style={styles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['artist_thumbnailURL'] }} />
                                                                <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                                    <View style={styles.imgAlbumNameArea2}>
                                                                        <Text style={styles.imgAlbumName2} >{item['title']}</Text>
                                                                    </View>
                                                                    <Text style={styles.imgAlbumNameType} >{item['type'] == 1 ? 'audio' : 'video'}</Text>
                                                                </View>
                                                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, borderRadius: 15 }} />
                                                            </View>

                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                />


                                            </View>
                                        )}
                                    />
                                </View>

                                :

                                <View>
                                    <Text style={{ ...styles.most, marginTop: -20 }}>{strings.artists}</Text>
                                    <FlatList
                                        style={{ width: '100%', paddingBottom: 20, marginBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 3 }}
                                        showsHorizontalScrollIndicator={true}
                                        initialNumToRender={10}
                                        numColumns={this.state.numColumns}
                                        data={this.props.topPlayed ? this.props.topPlayed.otherArtist : []}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => {
                                                // alert(JSON.stringify( item))
                                                this.props.navigation.navigate('StageThree', {
                                                    'artist_thumbnailURL': item['thumbnailURL'],
                                                    'artist_name': item['name'],
                                                    'artist_id': item['id'],
                                                    'genreID': item['genre_id']
                                                })
                                            }} activeOpacity={0.6} >
                                                <View style={styles.borderImageGroup}>
                                                    <Image style={styles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                                    <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                        <View style={styles.imgAlbumNameArea2}>
                                                            <Text style={styles.imgAlbumName2} >{item['name']}</Text>
                                                        </View>
                                                    </View>
                                                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.5)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, borderRadius: 15 }} />
                                                </View>

                                            </TouchableOpacity>
                                        )}
                                        key={this.state.numColumns}
                                    />
                                </View>
                        }
























                    </ScrollView>
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

export default connect(mapStateToProps, { FetchMostDown, FetchRandomMostDown, FetchTopPlayed, FetchRandomTop, FetchArtist, FetchOtherArtist, FetchLatest, FetchSubcategory })(StageTwo);

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'white',
        borderTopColor: '#ddd',
        borderTopWidth: 3
    },
    searchArea: {
        height: 80,
        flexDirection: 'row',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#ddd',
        borderBottomWidth: 3,
    },
    srhInputArea: {
        borderWidth: 1,
        borderColor: '#999',
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
        marginHorizontal: 10,
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
    top: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: 0,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    most: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -12,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        zIndex: 100,
    },
    albumArea: {
        height: height * 0.5,
        paddingVertical: 10,
    },
    albumImage: {
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.45,
        resizeMode: 'cover',
    },
    albumImageGroup: {
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.45,
        elevation: 8,
        backgroundColor: '#000',
        margin: 8
    },

    bottomArea: {
        height: width * 0.6,
        paddingVertical: 1,
    },
    borderImage: {
        borderRadius: 15,
        width: width * 0.38,
        height: width * 0.45,
        resizeMode: 'cover',
    },
    borderImageGroup: {
        borderRadius: 15,
        width: width * 0.38,
        height: width * 0.45,
        margin: 5,
        elevation: 5,
        backgroundColor: 'white'
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
    }
});

