import React, { Component } from 'react';
import {
    View, StyleSheet, ScrollView, SafeAreaView, FlatList, Text, TouchableOpacity,
    TouchableWithoutFeedback, Image, StatusBar, Dimensions, Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from 'react-native-searchbar';
import styles from '../style'
import { drawer } from "../navigators/AppNavigation";
import NavigationService from '../navigators/NavigationService';
import strings from '../strings';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/colors'
import { connect } from 'react-redux';
import { FetchIraqiTotalTopPlayed, FetchArabicTotalTopPlayed, FetchOtherArtist, FetchArtist } from '../actions/TopPlayed/TopPlayed'
import config, { BASE_PATH } from '../api/config'
import { colorsArray } from '../constants/randomColor'
import HeaderHome from '../components/HeaderHome';
import AsyncStorage from '@react-native-community/async-storage';
//done pasting ok
const { width, height } = Dimensions.get('window')
const topImage = require('../assets/images/topImage.jpg')
const logoImage = require('../assets/images/logo.jpg')

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iraqiData: '',
            englishData: '',
            turkeyData: '',
            kurdishData: '',
            showHeader: true,
            genreData: [],
            receiveData: [],
            lang: ''
        };
        this.offset = 0;
        this.onScroll = this.onScroll.bind(this);
        this.springValue = new Animated.Value(0.5)
    }

    onScroll(event) {
        const { showHeader } = this.state;
        let show = showHeader;
        const currentOffset = event.nativeEvent.contentOffset.y;
        show = currentOffset < this.offset;
        if (show !== showHeader || this.offset <= 0) {
            if (this.offset <= 0) show = true;
            this.setState({
                showHeader: show
            });
        }
        this.offset = currentOffset;
    }

    UNSAFE_componentWillMount = () => {
        this.springValue.setValue(0.3);
    }

    componentDidMount = async () => {
        this.springValue.setValue(0.3);
        Animated.spring(
            this.springValue,
            {
                toValue: 0.9,
                friction: 0.6
            }
        ).start();
        await AsyncStorage.getItem('languageCode').then((obj) => { this.setState({ lang: obj }) })

        // await AsyncStorage.setItem('userToken', this.props.navigation.getParam("Token"));
        this.props.FetchIraqiTotalTopPlayed();
        this.props.FetchArabicTotalTopPlayed();
        // this.props.FetchArtist()

        // await fetch(BASE_PATH + '/api/getGenre', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
        //     },
        // }).then((res) => res.json())
        //     .then(async (responseJSON) => {
        //         let genreLegth = responseJSON['data']['content']
        //         for (let i = 1; i <= genreLegth.length; i++) {
        //             console.log(i)
            console.log("start api");
            let  token =await AsyncStorage.getItem("userToken")            
        await fetch(BASE_PATH+'/api/getArtist', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token.replace(/['"]+/g, '')}`
            },
        })
            .then((res) => res.json())
            .then((responseJSON) => {
                console.log('9999999999999999999999', responseJSON)
                this.setState({ receiveData: responseJSON.data })
            }).catch(err=>console.log("err",err)
            )
            console.log("end api");
            // console.log(this.state.receiveData)
        // console.log('eeeeeeeeeerewrewrew')
        // console.log( MyResponse )
        // console.log('eeeeeeeeee')

        // this.setState({
        //     iraqiData: response[1]['data']['content'],
        //     // arabicData: response[2]['data']['content'],
        //     englishData: response[3]['data']['content'],
        //     turkeyData: response[4]['data']['content'],
        //     kurdishData: response[5]['data']['content'],
        //     othersData: response[6]['data']['content']
        // })

        // await this.props.FetchArtist(i)
        // console.log('ssssssssssss', this.state.genreData[i - 1])
        // console.log('aaaaaaaaaaaaaa', this.props.topPlayed.artist)

        // this.setState({
        //     genreData: JSON.stringify(responseJSON['data']['content'][0]['id'])
        // });

        // })
        // .catch((err) => {
        //     console.log('getGenre Error===', err)
        // })

        // let response = await fetch(BASE_PATH + '/api/getOtherArtist/2', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
        //     },
        // });
        // let iraqiResult = await response.json();

        // let engResponse = await fetch(BASE_PATH + '/api/getOtherArtist/3', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
        //     },
        // });
        // let englishResult = await engResponse.json();

        // let turResponse = await fetch(BASE_PATH + '/api/getOtherArtist/4', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
        //     },
        // });
        // let turkeyResult = await turResponse.json();

        // let kurResponse = await fetch(BASE_PATH + '/api/getOtherArtist/5', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
        //     },
        // });
        // let kurdishResult = await kurResponse.json();

        // let othResponse = await fetch(BASE_PATH + '/api/getOtherArtist/6', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'bearer ' + (await AsyncStorage.getItem('userToken')).toString()
        //     },
        // });
        // let othersResult = await othResponse.json();

        // this.setState({
        //     iraqiData: iraqiResult['data']['content'],
        //     englishData: englishResult['data']['content'],
        //     turkeyData: turkeyResult['data']['content'],
        //     kurdishData: kurdishResult['data']['content'],
        //     othersData: othersResult['data']['content']
        // })

        // try {
        //     const userID = await AsyncStorage.getItem('userID')
        //     console.log('value------------------', userID)
        // } catch (e) {
        //     // read error
        // }
        // console.log('================= START ===================');
        // await AsyncStorage.getItem("languageCode").then((obj) => (
        //     console.log('obj====================', obj)
        // ))
        // console.log('================= END   ===================');
    }

    getRandomColor = () => colorsArray[Math.floor(Math.random() * colorsArray.length)]

    openDrawer = () => {
        drawer.current.open()
    }

    render() {
        const { showHeader, receiveData } = this.state;
        return (

            <View style={Hstyles.container}>
                <HeaderHome show={showHeader} onClick={this.openDrawer} />
                <ScrollView
                    bounces
                    onScroll={this.onScroll}
                    scrollEventThrottle={32}
                    style={{ flex: 1, width: '94%', marginLeft: '3%' }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ borderWidth: 1 }}>
                            <Image source={topImage} style={{ width: '100%', height: height * 0.65 }} />
                            <Image
                                source={logoImage}
                                style={{ position: 'absolute', width: '50%', top: 0, alignSelf: "center", resizeMode: 'contain' }}
                            />
                            {/* <Animated.Image
                                source={logoImage}
                                style={{ transform: [{ scale: this.springValue }], position: 'absolute', width: '50%', top: 0, alignSelf: "center", resizeMode: 'contain' }}
                            /> */}
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ width: 100, marginTop: -70, alignItems: "center", zIndex: 1000 }} onPress={() => this.props.navigation.navigate('MyList')}>
                                {/*<FontAwesome name="heart" size={25} color="white" style={{ marginTop: 0 }} />*/}
                                <Animatable.Text
                                    animation="pulse"
                                    easing="ease-out"
                                    iterationCount="infinite"
                                    style={{ textAlign: 'center', fontSize: 25 }}>
                                    ❤️
                                </Animatable.Text>
                                <Text style={{ color: 'white' }}>{strings.mylist}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Offline')} style={{ width: 100, marginTop: -70, alignItems: "center", zIndex: 1000 }}>
                                <Ionicons name="md-download" size={30} color="white" style={{ marginTop: 0 }} />
                                <Text style={{ color: 'white' }}>{strings.download}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.iraqimosttrending}</Text>
                            <FlatList
                                style={{ width: '100%' }}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                data={this.props.topPlayed.iraqiTotalTopPlayed ? this.props.topPlayed.iraqiTotalTopPlayed : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('StageFive', {
                                            'contentID': item['id'],
                                            'thumbnailURL': item['thumbnailURL'],
                                            'artist_name': item['artist_name'],
                                            'artist_id': item['artistID'],
                                            'genreID': item['genreID'],
                                            'title': item['title'],
                                            'ar_title': item['ar_title'],
                                            'album_name': item['album_name'],
                                            'ar_album_name': item['ar_album_name'],
                                            'type': item['type'],
                                            'contentURL': item['contentURL'],
                                            'totalItem': item
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={{ marginHorizontal: 5, marginBottom: 30 }}>
                                            <Image style={{ width: 90, height: 90, borderRadius: 45, borderColor: this.getRandomColor(), borderWidth: 2 }} source={{ uri: BASE_PATH + '/' + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{this.state.lang == 'en' ? item['title'] : item['ar_title']}</Text>
                                                </View>
                                                <Text style={Hstyles.imgAlbumNameType} >{item['type'] == 1 ? strings.audio : strings.video}</Text>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 90, borderRadius: 45 }} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                            />

                        </View>

                        <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.arabicmosttrending}</Text>
                            <FlatList
                                style={{ width: '100%' }}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                data={this.props.topPlayed.arabicTotalTopPlayed ? this.props.topPlayed.arabicTotalTopPlayed : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('StageFive', {
                                            'contentID': item['id'],
                                            'thumbnailURL': item['thumbnailURL'],
                                            'artist_name': item['artist_name'],
                                            'artist_id': item['artistID'],
                                            'genreID': item['genreID'],
                                            'title': item['title'],
                                            'album_name': item['album_name'],
                                            'type': item['type'],
                                            'contentURL': item['contentURL'],
                                            'totalItem': item
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={{ marginHorizontal: 5, marginBottom: 30 }}>
                                            <Image style={{ width: 90, height: 90, borderRadius: 45, borderColor: this.getRandomColor(), borderWidth: 2 }} source={{ uri: BASE_PATH + '/' + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{this.state.lang == 'en' ? item['title'] : item['ar_title']}</Text>
                                                </View>
                                                <Text style={Hstyles.imgAlbumNameType} >{item['type'] == 1 ? strings.audio : strings.video}</Text>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 90, borderRadius: 45 }} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id}
                            />

                        </View>

                        {/* <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.iraqi}</Text>
                            <FlatList
                                style={{ width: '100%', paddingBottom: 20, marginBottom: 10 }}
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                horizontal
                                // data={this.props.topPlayed.otherArtist ? this.props.topPlayed.otherArtist : []}
                                data={this.state.iraqiData ? this.state.iraqiData : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        // alert(JSON.stringify( item))
                                        this.props.navigation.navigate('StageThree', {
                                            'artist_thumbnailURL': item['artist_photo'],
                                            'artist_name': item['name'],
                                            'artist_id': item['id'],
                                            'genreID': item['genre_id'],
                                            'previousScreen': 'Home'
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={Hstyles.borderImageGroup}>
                                            <Image style={Hstyles.borderImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{item['name']}</Text>
                                                </View>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} />
                                        </View>

                                    </TouchableOpacity>
                                )}
                                key={this.state.numColumns}
                            />
                        </View> */}

                        {receiveData &&
                            receiveData.map((data,key)=>{
                                console.log("data",data);
                                return(
                                    <View style={Hstyles.mostTrending}>
                                    {/* <Text style={Hstyles.subTitle}>{strings.arabic}</Text> */}
                                    <FlatList
                                        data={data ? data : []}
                                        renderItem={({ item }) => (
                                            <View style={{ paddingBottom: 5 }}>
                                                <Text style={{ color: 'white' }}>{this.state.lang == 'en' ? item['name'] : item['ar_name']}</Text>

                                                <FlatList
                                                    style={{ width: '100%', paddingBottom: 10, marginBottom: 10 }}
                                                    horizontal
                                                    showsHorizontalScrollIndicator={true}
                                                    initialNumToRender={10}
                                                    data={item["data"] ? item["data"] : []}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity onPress={() => {
                                                            console.log('ITEM  ================asdasda==', item)
                                                            this.props.navigation.navigate('StageThree', {
                                                                'artist_thumbnailURL': item['artist_photo'],
                                                                'artist_name': item['artist_name'],
                                                                'artist_id': item['artistID'],
                                                                'genreID': item['genreID'],
                                                                'previousScreen': 'Home',
                                                            })
                                                        }} activeOpacity={0.6} >
                                                            <View style={Hstyles.borderImageGroup}>
                                                                <Image style={Hstyles.borderImage} source={{ uri: BASE_PATH + "/" + item['artist_thumbnailURL'] }} />
                                                                <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                                    <View style={Hstyles.imgAlbumNameArea2}>
                                                                        <Text style={Hstyles.imgAlbumName2} >{this.state.lang == 'en' ? item['title'] : item['ar_title']}</Text>
                                                                    </View>
                                                                    <Text style={Hstyles.imgAlbumNameType} >{item['type'] == 1 ? strings.audio : strings.video}</Text>
                                                                </View>
                                                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} />
                                                            </View>

                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                />
                                            </View>
                                        )}
                                    />
                                </View>
                                )
                                
                            })
                        }
                        

                        {/* 
                        <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.english}</Text>
                            <FlatList
                                style={{ width: '100%', paddingBottom: 20, marginBottom: 10 }}
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                horizontal
                                data={this.state.englishData ? this.state.englishData : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('StageThree', {
                                            'artist_thumbnailURL': item['artist_photo'],
                                            'artist_name': item['name'],
                                            'artist_id': item['id'],
                                            'genreID': item['genre_id'],
                                            'previousScreen': 'Home'
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={Hstyles.borderImageGroup}>
                                            <Image style={Hstyles.borderImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{item['name']}</Text>
                                                </View>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} />
                                        </View>

                                    </TouchableOpacity>
                                )}
                                key={this.state.numColumns}
                            />
                        </View>
                        <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.turkey}</Text>
                            <FlatList
                                style={{ width: '100%', paddingBottom: 20, marginBottom: 10 }}
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                horizontal
                                data={this.state.turkeyData ? this.state.turkeyData : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('StageThree', {
                                            'artist_thumbnailURL': item['artist_photo'],
                                            'artist_name': item['name'],
                                            'artist_id': item['id'],
                                            'genreID': item['genre_id'],
                                            'previousScreen': 'Home'
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={Hstyles.borderImageGroup}>
                                            <Image style={Hstyles.borderImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{item['name']}</Text>
                                                </View>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                key={this.state.numColumns}
                            />
                        </View>
                        <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.kurdish}</Text>
                            <FlatList
                                style={{ width: '100%', paddingBottom: 20, marginBottom: 10 }}
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                horizontal
                                data={this.state.kurdishData ? this.state.kurdishData : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        // alert(JSON.stringify( item))
                                        this.props.navigation.navigate('StageThree', {
                                            'artist_thumbnailURL': item['artist_photo'],
                                            'artist_name': item['name'],
                                            'artist_id': item['id'],
                                            'genreID': item['genre_id'],
                                            'previousScreen': 'Home'
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={Hstyles.borderImageGroup}>
                                            <Image style={Hstyles.borderImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{item['name']}</Text>
                                                </View>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} />
                                        </View>

                                    </TouchableOpacity>
                                )}
                                key={this.state.numColumns}
                            />
                        </View>
                        <View style={Hstyles.mostTrending}>
                            <Text style={Hstyles.subTitle}>{strings.others}</Text>
                            <FlatList
                                style={{ width: '100%', paddingBottom: 20, marginBottom: 10 }}
                                showsHorizontalScrollIndicator={true}
                                initialNumToRender={10}
                                horizontal
                                data={this.state.othersData ? this.state.othersData : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        // alert(JSON.stringify( item))
                                        this.props.navigation.navigate('StageThree', {
                                            'artist_thumbnailURL': item['artist_photo'],
                                            'artist_name': item['name'],
                                            'artist_id': item['id'],
                                            'genreID': item['genre_id'],
                                            'previousScreen': 'Home'
                                        })
                                    }} activeOpacity={0.6} >
                                        <View style={Hstyles.borderImageGroup}>
                                            <Image style={Hstyles.borderImage} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                            <View style={{ position: 'absolute', bottom: 0, width: 100, height: 85, zIndex: 100 }}>
                                                <View style={Hstyles.imgAlbumNameArea2}>
                                                    <Text style={Hstyles.imgAlbumName2} >{item['name']}</Text>
                                                </View>
                                            </View>
                                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(78,75,102,0.4)', 'rgb(78,75,102)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                key={this.state.numColumns}
                            />
                        </View>
                     */}
                    </SafeAreaView>
                </ScrollView>
            </View>

        );
    }
}

const Hstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBack,
    },
    mostTrending: {
        paddingTop: 15,
        width: '100%',
        alignSelf: "center",
        borderBottomColor: 'grey',
        borderBottomWidth: 0.8
    },
    subTitle: {
        color: Colors.subTitle,
        fontSize: 25,
        fontWeight: '400',
        marginBottom: 7
    },
    iconStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: 'center',
    },
    imgAlbumName2: {
        fontSize: 17,
        color: 'white',
        zIndex: 1000,
        textShadowColor: 'red',
        textShadowRadius: 5,
        alignSelf: "center",
    },
    imgAlbumNameArea2: {
        height: 90,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    imgAlbumNameType: {
        paddingHorizontal: 20,
        fontSize: 13,
        color: 'white',
    },
    borderImageGroup: {
        width: width * 0.25,
        height: width * 0.3,
        margin: 5,
        backgroundColor: 'white'
    },
    borderImage: {
        width: width * 0.25,
        height: width * 0.3,
        resizeMode: 'cover',
    },
})

const mapStateToProps = (state) => {
    return {
        topPlayed: state.topPlayed,
    }
}

export default connect(mapStateToProps, { FetchIraqiTotalTopPlayed, FetchArabicTotalTopPlayed, FetchOtherArtist, FetchArtist })(Home);
