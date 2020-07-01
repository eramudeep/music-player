import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text, Dimensions, ScrollView, Image, AsyncStorage, FlatList, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { drawer } from "../navigators/AppNavigation";
import strings from '../strings';
import { connect } from 'react-redux';
import { FetchAlbums, FetchSelectedAlbumContent } from '../actions/Album/Album'
import { FetchTopPlayed, FetchRandomTop, FetchCountry } from '../actions/TopPlayed/TopPlayed'
import LinearGradient from 'react-native-linear-gradient';
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
import { BASE_PATH } from '../api/config';


const { width, height } = Dimensions.get('window');

class StageFour extends Component {

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
            artist_name: '',
            album_name: '',
            albumIDState: '',
            contentIDState: '',
            userIDState: '',
            currentLang: 'en',
            clickedID: '',
            slideData: '',
            rowIndex: 0
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
        StatusBar.setHidden(true)
        let genreID = this.props.navigation.getParam('genreID')
        let artistID = this.props.navigation.getParam('artistID')
        let albumID = this.props.navigation.getParam('albumID')
        let contentID = this.props.navigation.getParam('contentID')
        console.log('====================================');
        console.log(genreID);
        console.log(artistID);
        console.log(albumID);
        console.log('====================================');
        await this.setState({
            albumIDState: albumID,
            contentIDState: contentID
        })
        this.props.FetchAlbums(genreID, artistID, this.state.albumIDState)
        // this.props.FetchTopPlayed(genreID, userID)
        // artist_name catch
        axios.get(BASE_PATH + '/api/content/album/' + genreID + '/' + artistID + '/' + albumID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                // this.setState({ addedToFavor: true })
                console.log('artistName============', response)
                let artist_name = JSON.stringify(response['data']['data']['content'][0]['artist_name'])
                this.setState({
                    artist_name: artist_name,
                })
            }, (err) => {
                console.log('get artist name======', err)
            });
        // alert(this.state.albumIDState)

        // album_name catch
        this.albumNameCatch(genreID, artistID, albumID)

        // this.props.FetchAlbumSong(genType, 1)
        // this.props.FetchSelectedAlbumContent(this.state.albumIDState)
        // alert(JSON.stringify(this.props.album.selectedAlbumContent))
        console.log('--------------------------------state---start----',this.state.rowIndex)
        await this.axiosFunc(this.state.albumIDState, this.state.contentIDState)
        console.log('--------------------------------state---start222----',this.state.rowIndex)
        try {
            console.log('==============  asdasd  ============',this.state.rowIndex)
            setTimeout(() => this.ref.scrollToIndex({ animated: true, index: -2  }), 1500);
        } catch (error) {
            console.log(error)            
        }
        // setTimeout(() => this.ref.scrollToEnd({ animated: true }), 500);

        if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
            this.setState({
                currentLang: 'ar'
            })
        } else {
            this.setState({
                currentLang: 'en'
            })
        }
        
    }

    albumNameCatch = async (genreID, artistID, albumID) => {
        axios.get(BASE_PATH + '/api/content/album/' + genreID + '/' + artistID + '/' + albumID + '', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                // this.setState({ addedToFavor: true })
                // alert(JSON.stringify(response['data']['data']['content'][0]['album_name']))
                let album_name = JSON.stringify(response['data']['data']['content'][0]['album_name'])
                this.setState({
                    album_name: album_name,
                })
            }, (err) => {
                console.log('get artist name ======', err)
            });
    }

    axiosFunc = async (albumIDState, contentIDState) => {
        console.log('-------albumIDState--------------',albumIDState)
        console.log('-------contentIDState--------------',contentIDState)
        // rowIndex catch
        axios.get(BASE_PATH + '/api/content/selectedAlbumContent/' + albumIDState + '/' + contentIDState, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then(async (response) => {
                // let rowIndex = JSON.stringify(response['data']['data']['content'][0]['rowIndex'])
                
                let slideData = response['data']['data']['content']
                let rowIndex = slideData[0]['selectedRowIndex']
                await this.setState({
                    slideData: slideData,
                    rowIndex: rowIndex
                })
                // alert(this.state.rowIndex)
                console.log('=======START=============================');
                console.log(this.state.rowIndex);
                console.log('======= END =============================');
            }, (err) => {
                console.log('Fetch rowIndex Error ======', err)
            });
    }

    axiosFunc2 = async (albumIDState) => {
        console.log('*******************',albumIDState);
        
        // rowIndex catch
        axios.get(BASE_PATH + '/api/content/selectedAlbumContent/' + albumIDState, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
            }
        })
            .then((response) => {
                // let rowIndex = JSON.stringify(response['data']['data']['content'][0]['rowIndex'])
                
                let slideData = response['data']['data']['content']
                // let rowIndex = slideData[0]['selectedRowIndex']
                let rowIndex = 0
                this.setState({
                    slideData: slideData,
                    rowIndex: rowIndex
                })
                // alert(JSON.stringify(slideData))
                console.log('=======START=============================');
                console.log(this.state.rowIndex);
                console.log('======= END =============================');
            }, (err) => {
                console.log('Fetch rowIndex Error ======', err)
            });
    }

    openDrawer() {
        // alert(JSON.stringify(this.props.album))
        drawer.current.open()
        // setTimeout(function(){this.changeState()}.bind(this), 1000)
        console.log('==============source data **************', this.state.sourcedata);
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
        this.updateDownCount(this.state.clickedID)

    }

    updateRegCount = async (userID, contentID) => {
        axios.get(BASE_PATH + '/api/updateRegCount/' + userID + '/' + contentID + '', {
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
        axios.get(BASE_PATH + '/api/updateDownCount/' + contentID + '', {
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
        let thumbnailURL = this.props.navigation.getParam('thumbnailURL')
        let title = this.props.navigation.getParam('title')
        let type = this.props.navigation.getParam('type')
        let contentURL = this.props.navigation.getParam('contentURL')
        let artistID = this.props.navigation.getParam('artistID')
        let albumID = this.props.navigation.getParam('albumID')
        let totalItem = this.props.navigation.getParam('totalItem')
        let desc_long = this.props.navigation.getParam('desc_long')
        let genreID = this.props.navigation.getParam('genreID')
        let contentID = this.props.navigation.getParam('contentID')


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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name={this.state.currentLang == 'ar' ? "arrow-right" : "arrow-left"} size={20} style={styles.menu} color="black" />
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Search')}} style={{width: '100%'}}>
                            <View style={styles.srhInputArea}>
                                <Text style={{color: '#999'}}>{strings.search}...</Text>
                                <Icon name="search" size={20} style={styles.menu} color="black" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView>
                        <Text style={{ ...styles.top, marginTop: 10 }}>{this.state.album_name}</Text>
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
                                ref={r => this.ref = r}
                                style={{ width: '100%' }}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={0}
                                // data={this.state.clickedAlbumID == albumID ? (this.props.album ? this.props.album.selectedAlbumContent : []) : (this.props.album ? this.props.belowSelectedAlbumContent : []) }
                                // data={this.props.album ? this.props.album.selectedAlbumContent : []}
                                data={this.state.slideData ? this.state.slideData : []}
                                getItemLayout={(data, index) => (
                                    { length: width, offset: this.state.currentLang == 'en' ? width * this.state.rowIndex*0.75 : -width * this.state.rowIndex*0.75, index }
                                )}
                                onScrollToIndexFailed={info => {
                                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                                    wait.then(() => {
                                      flatList.current?.scrollToIndex({ index: info.index, animated: true });
                                    });
                                  }}
                                // initialScrollIndex={this.state.rowIndex}
                                renderItem={({ item }) => (

                                    <TouchableOpacity style={styles.albumImageGroup}
                                        onPress={() => {
                                            // alert(item)
                                            this.props.navigation.navigate('StageFive', {
                                                'thumbnailURL': item['thumbnailURL'],
                                                'title': item['title'],
                                                'type': item['type'],
                                                'contentURL': item['contentURL'],
                                                'artistID': item['artistID'],
                                                'totalItem': totalItem,
                                                'desc_long': item['desc_long'],
                                                'genreID': genreID,
                                                'contentID': item['id'],
                                                'artist_name': this.state.artist_name,
                                                'album_name': this.state.album_name,
                                                'previousScreen': 'StageFour'
                                            })
                                        }}
                                    >

                                        <View style={{ position: 'absolute', flexDirection: 'row', top: 10, right: 10, zIndex: 1000, justifyContent: 'space-around' }}>
                                            {/* This will be next step -  heart function */}
                                            {/* <TouchableOpacity onPress={async () => {
                                                try {
                                                    let userID = await AsyncStorage.getItem('userID')
                                                    this.setState({
                                                        userIDState: userID
                                                    })
                                                    console.log('==========***** userID *****=============', userID)
                                                    this.markHeart(userID, item['albumID'])
                                                } catch (error) {
                                                    console.log(error)
                                                    console.log(error)
                                                }
                                                console.log('==========***** item["id"] *****=========', item['id'])

                                            }} style={styles.heart} >
                                                <Icon name="heart" size={25} color={item['userID'] ? item['userID'] == this.state.userIDState ? "white" : "rgb(250, 185, 75)" : "white"} />
                                            </TouchableOpacity> */}
                                            {/* This will be next step -  heart function */}


                                        </View>
                                        <Image style={styles.albumImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                        {/* <Image style={styles.albumImage} source={{ uri: BASE_PATH + "/" + this.state.clickedThumb }} /> */}
                                        {/* <Image style={styles.albumImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} /> */}
                                        <View style={{ position: 'absolute', bottom: 30, width: width * 0.4, height: width * 0.35, zIndex: 90 }}>
                                            <View style={styles.imgAlbumNameArea}>
                                                <Text style={styles.imgAlbumName} >{item['title']}</Text>
                                            </View>
                                            <Text style={styles.imgAlbumNameType} >{item['type'] == 0 ? 'Video' : 'Audio'}</Text>
                                            {/* <Text style={styles.price}>500IQD</Text> */}
                                        </View>
                                        <View style={styles.buttonGroup}>
                                            <TouchableOpacity
                                                style={{ ...styles.DownBtn, backgroundColor: 'rgb(25,22,54)', }}
                                                activeOpacity={0.6}
                                                onPress={() => {
                                                    this.setState({
                                                        modalVisible: true,
                                                        clickedSource: contentURL,
                                                        clicked: totalItem,
                                                        clickedThumb: thumbnailURL,
                                                        clickedType: type,
                                                        clickedID: contentID
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
                                            type == '0' ? (
                                                this.props.navigation.navigate('VideoPlayer',
                                                    {
                                                        'clicked': totalItem,
                                                        'clickedSource': contentURL,
                                                    }
                                                )
                                            ) :
                                                this.props.navigation.navigate('MusicPlayer',
                                                    {
                                                        'clicked': totalItem,
                                                        'clickedSource': contentURL,
                                                        'clickedThumb': thumbnailURL
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
                        <Text style={styles.most}>{this.state.artist_name}</Text>
                        {/* <View style={styles.bottomArea}> */}























                        <FlatList
                            style={{ width: '100%' }}
                            showsHorizontalScrollIndicator={true}
                            initialNumToRender={10}
                            data={this.props.album ? this.props.album.albums : []}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={async () => {
                                    await this.setState({
                                        albumIDState: item['albumID'],
                                        rowIndex: 0
                                    })
                                    this.ref.scrollToIndex({ animated: true, index: this.state.rowIndex })
                                    // this.props.FetchSelectedAlbumContent(this.state.albumIDState)
                                    this.axiosFunc2(this.state.albumIDState)
                                    this.props.FetchAlbums(genreID, artistID, this.state.albumIDState)
                                    this.albumNameCatch(item['genreID'], item['artistID'], this.state.albumIDState)
                                    // console.log(this.state.albumIDState)
                                    // this.props.navigation.navigate('StageThree', {
                                    //     'thumbnailURL': item['thumbnailURL'],
                                    //     'title': item['title'],
                                    //     'type': item['type'],
                                    //     'contentURL': item['contentURL'],
                                    //     'artistID': item['artistID'],
                                    //     'totalItem': item['totalItem'],
                                    //     'desc_long': item['desc_long']
                                    // })
                                }} activeOpacity={0.6} style={{ marginBottom: 10, width: '50%' }} >
                                    <View style={styles.borderImageGroup}>
                                        <TouchableOpacity style={styles.belowPlay} onPress={async () => {
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
                                        }}>
                                            <Icon name="play" size={25} color="#fff" />
                                        </TouchableOpacity>
                                        <Image style={styles.borderImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: 200, height: 75, zIndex: 100 }}>
                                            <View style={styles.imgAlbumNameArea2}>
                                                <Text style={styles.imgAlbumName2} >{item['title']}</Text>
                                            </View>
                                            <Text style={styles.imgAlbumNameType} >{item['type'] == 0 ? 'Video' : 'Audio'}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(140,140,177,0.3)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 70, borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
















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

export default connect(mapStateToProps, { FetchAlbums, FetchSelectedAlbumContent, FetchTopPlayed })(StageFour);

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'white'
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
        right: 10,
        zIndex: 1000
    },
    top: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -15,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    most: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -12,
        backgroundColor: 'white',
        paddingHorizontal: 10
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
        flexDirection: 'row'
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
