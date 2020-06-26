import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text, Dimensions, ScrollView, Image, AsyncStorage, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { drawer } from "../navigators/AppNavigation";
import strings from '../strings';
import { connect } from 'react-redux';
import { FetchAlbums, FetchMostDown, FetchRandomMostDown, FetchLatest, FetchSubcategory, FetchAlbumByArtist } from '../actions/Album/Album'
import { FetchTopPlayed, FetchRandomTop, FetchArtist, FetchOtherArtist, FetchArtistContent } from '../actions/TopPlayed/TopPlayed'
import LinearGradient from 'react-native-linear-gradient';
import { BarIndicator } from 'react-native-indicators';
import Colors from '../constants/colors'
import config, { BASE_PATH } from '../api/config'
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


class StageThree extends Component {

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
            more: '',
            countryIDArray: '',
            loading: true,
            userIDState: '',
            numColumns: 2,
            currentLang: 'en'
        }
    }

    async componentWillMount() {
        // alert((await AsyncStorage.getItem('userToken')).toString()) // working well.
        AsyncStorage.getItem('data', (err, result) => {
            this.setState({ sourcedata: JSON.parse(result) })
        });
    }

    componentDidMount = async () => {
        let genreID = this.props.navigation.getParam('genreID')
        let artistID = this.props.navigation.getParam('artist_id')

        console.log('artistContent=======================', this.props.topPlayed)
        await this.props.FetchAlbumByArtist(genreID, artistID)
        await this.props.FetchArtistContent(artistID)

        this.setState({
            loading: false
        })
        // alert(JSON.stringify(this.props.album.getAlbumByArtist))
        // get the current Language Code
        this.props.FetchSelectedAlbumContent(this.state.albumIDState)
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

    openDrawer() {
        drawer.current.open()
        // setTimeout(function(){this.changeState()}.bind(this), 1000)
    }



    render() {
        let artist_name = this.props.navigation.getParam('artist_name')
        let artist_thumbnailURL = this.props.navigation.getParam('artist_thumbnailURL')
        return (
            <View style={styles.box}>
                {
                    this.state.loading && (
                        <BarIndicator color='#bbb' count={5} style={{ position: 'absolute', alignSelf: "center", marginTop: height * 0.5, zIndex: 1000 }} />
                    )
                }

                <View style={styles.container}>
                    <View style={styles.searchArea}>
                        <TouchableOpacity onPress={() => this.openDrawer()}>
                            <Icon name={'bars'} size={20} style={styles.menu} color={Colors.heading} />
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Search') }} style={{ width: '100%' }}>
                            <View style={styles.srhInputArea}>
                                <Text style={{ color: '#999' }}>{strings.search}...</Text>
                                <Icon name="search" size={20} style={styles.menu} color={Colors.heading} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={styles.bottomArea}>
                        <Text style={{ ...styles.top, zIndex: 1000 }}>{artist_name}</Text>
                        <View style={styles.albumArea}>

                            <View style={styles.albumImageGroup}>

                                <Image style={styles.albumImage} source={{ uri: "http://192.168.110.249:8000/" + artist_thumbnailURL }} />
                                <View style={{ position: 'absolute', bottom: -30, width: width * 0.6, height: width * 0.35, zIndex: 90 }}>
                                    <View style={styles.imgAlbumNameArea}>
                                        <Text style={styles.imgAlbumName} >{artist_name}</Text>
                                    </View>
                                </View>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', '#000']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 150, borderRadius: 15 }} />

                            </View>

                        </View>

                        <Text style={{ ...styles.most, marginBottom: 10, marginTop: 1 }}>{artist_name}'s {strings.albums}</Text>

                        {/* <FlatList
                            style={{ width: '100%', paddingVertical: 10, marginBottom: 10, borderBottomColor: '#ddd', borderBottomWidth: 3, borderTopColor: '#ddd', borderTopWidth: 3 }}
                            showsHorizontalScrollIndicator={true}
                            initialNumToRender={10}
                            horizontal
                            data={this.props.album ? this.props.album.getAlbumByArtist : []}

                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('StageFour', {
                                        'thumbnailURL': item['thumbnailURL'],
                                        'title': item['title'],
                                        'type': item['type'],
                                        'contentURL': item['contentURL'],
                                        'artistID': item['artistID'],
                                        'totalItem': item,
                                        'desc_long': item['desc_long'],
                                        'genreID': item['genreID'],
                                        'albumID': item['albumID'],
                                        'contentID': item['id']
                                    })
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
                        /> */}





                        <FlatList
                            data={this.props.topPlayed ? this.props.topPlayed.artistContent : []}
                            // data={this.state.countryIDArray ? this.state.countryIDArray : []}
                            renderItem={({ item }) => (
                                <View style={{ paddingBottom: 5 }}>
                                    <Text style={{ color: 'white' }}>{item['name']}</Text>

                                    <FlatList
                                        style={{ width: '100%', paddingBottom: 10, marginBottom: 10 }}
                                        horizontal
                                        showsHorizontalScrollIndicator={true}
                                        initialNumToRender={10}
                                        // data={this.state.countryIDArray ? this.state.countryIDArray : []}
                                        data={item["data"] ? item["data"] : []}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => {
                                                console.log('ITEM  ================asdasda==', item)
                                                this.props.navigation.navigate('StageFive', {
                                                    'artist_thumbnailURL': item['artist_thumbnailURL'],
                                                    'artist_name': item['artist_name'],
                                                    'artist_id': item['artistID'],
                                                    'genreID': item['genreID'],
                                                    'thumbnailURL': item['thumbnailURL'],
                                                    'contentID': item['id'],
                                                    'contentURL': item['contentURL'],
                                                    'title': item['title'],
                                                    'type': item['type']
                                                })
                                            }} activeOpacity={0.6} >
                                                <View style={styles.borderImageGroup}>
                                                    <Image style={styles.borderImage} source={{ uri: BASE_PATH + '/' + item['thumbnailURL'] }} />
                                                    <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                        <View style={styles.imgAlbumNameArea2}>
                                                            <Text style={styles.imgAlbumName2} >{item['title']}</Text>
                                                        </View>
                                                        <Text style={styles.imgAlbumNameType} >{item['type'] == 1 ? 'audio' : 'video'}</Text>
                                                    </View>
                                                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60, borderRadius: 15 }} />
                                                </View>

                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            )}
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

export default connect(mapStateToProps, { FetchMostDown, FetchRandomMostDown, FetchTopPlayed, FetchRandomTop, FetchArtist, FetchOtherArtist, FetchArtistContent, FetchLatest, FetchSubcategory, FetchAlbumByArtist })(StageThree);

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: Colors.bgGrey
    },
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        backgroundColor: Colors.bgGrey,
    },
    searchArea: {
        height: 80,
        flexDirection: 'row',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.8,
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
        paddingHorizontal: 10,
        color: Colors.heading,
        textDecorationLine: 'underline'
    },
    most: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: -12,
        paddingHorizontal: 10,
        zIndex: 100,
        color: Colors.heading,
        backgroundColor: Colors.bgGrey
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
        fontSize: 18,
        color: 'white',
        paddingHorizontal: 15,
        zIndex: 1000,
        textShadowColor: 'red',
        textShadowRadius: 5,
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

