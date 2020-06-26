import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style'
import strings from '../strings';
import { FetchBySong, FetchByAlbum, FetchByArtist } from '../actions/Search/Search';
import { FetchTotalTopPlayed } from '../actions/TopPlayed/TopPlayed'
import { connect } from 'react-redux'
import axios from 'axios'
import Colors from '../constants/colors'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

const { width, height } = Dimensions.get('window')

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeItem: 'SongName',
            search: '',
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
            loading: true,

            dataSource: '',
            dataSource2: '',
            dataSource3: '',
        }
    }

    componentDidMount = async () => {
        await this.props.FetchTotalTopPlayed();
        // //If data is too much
        // if (this.props.topPlayed) {
        //     this.setState({
        //         loading: false
        //     })
        // }
        setTimeout(() => {
            this.stopLoading()
        }, 1500);
    }

    stopLoading() {
        this.setState({
            loading: false
        })
    }

    SearchFilterFunctionBySongName = async (text) => {
        try {
            await this.props.FetchBySong(text);
        } catch (error) {
            console.log(error)
        }
        const newData = this.props.searchBy.searchBySong.filter(function (item) {
            const itemData = item ? item['title'].toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
        });
        console.log('newData============', newData)

    }

    SearchFilterFunctionByAlbumName = async (text) => {
        try {
            await this.props.FetchByAlbum(text);
        } catch (error) {
            console.log(error)
        }
        const newData2 = this.props.searchBy.searchByAlbum.filter(function (item) {
            const itemData = item.album_name ? item.album_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource2: newData2,
            search: text,
        });
    }

    SearchFilterFunctionByArtistName = async (text) => {
        try {
            await this.props.FetchByArtist(text);
        } catch (error) {
            console.log(error)
        }
        const newData3 = this.props.searchBy.searchByArtist.filter(function (item) {
            const itemData = item.artist_name ? item.artist_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource3: newData3,
            search: text,
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: Colors.bgGrey, }}>
                {
                    this.state.loading && (
                        <BarIndicator color='white' count={5} style={{ position: 'absolute', alignSelf: "center", marginTop: height * 0.5, zIndex: 1000, }} />
                    )
                }
                <View style={{ ...styles.searchArea1, width: '90%' }}>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 120 }}>
                        <View style={styles.srhInputArea1}>
                            <TextInput
                                style={styles.srhInput1}
                                placeholder="Search..."
                                placeholderTextColor={Colors.searchIcon}
                                onChangeText={
                                    async (text) => {
                                        await this.setState({ search: text })
                                        if (this.state.changeItem == 'SongName') {
                                            this.SearchFilterFunctionBySongName(text)
                                        } else if (this.state.changeItem == 'AlbumName') {
                                            this.SearchFilterFunctionByAlbumName(text)
                                        } else if (this.state.changeItem == 'ArtistName') {
                                            this.SearchFilterFunctionByArtistName(text)
                                        }
                                    }
                                }

                                onClear={
                                    (text) => {
                                        if (this.state.changeItem == 'SongName') {
                                            this.SearchFilterFunctionBySongName()
                                        } else if (this.state.changeItem == 'AlbumName') {
                                            this.SearchFilterFunctionByAlbumName()
                                        } else if (this.state.changeItem == 'ArtistName') {
                                            this.SearchFilterFunctionByArtistName()
                                        }
                                    }
                                }
                                value={this.state.search}
                            />
                            <Icon2 name="search" size={20} style={styles.menu} color="#999" />
                        </View>
                        <TouchableOpacity
                            style={{ justifyContent: "center" }}
                            // onPress={() => alert(this.state.changeItem)}
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Text style={{ fontSize: 20, color: '#e6e6e6' }}>{strings.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={{ marginTop: 10, color: 'white' }}>{strings.search}</Text>
                    </View>
                    <View style={styles.searchBtn}>
                        <TouchableOpacity style={this.state.changeItem == 'SongName' ? styles.searchBtnItem : styles.searchBtnItem1} onPress={() => { this.setState({ changeItem: 'SongName' }) }}>
                            <Text style={this.state.changeItem == 'SongName'? styles.activeTxt:styles.inactiveTxt}>{strings.songname}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.changeItem == 'AlbumName' ? styles.searchBtnItem : styles.searchBtnItem1} onPress={() => { this.setState({ changeItem: 'AlbumName' }) }}>
                            <Text style={this.state.changeItem == 'AlbumName'? styles.activeTxt:styles.inactiveTxt}>{strings.albumname}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.changeItem == 'ArtistName' ? styles.searchBtnItem : styles.searchBtnItem1} onPress={() => { this.setState({ changeItem: 'ArtistName' }) }}>
                            <Text style={this.state.changeItem == 'ArtistName'? styles.activeTxt:styles.inactiveTxt}>{strings.artistname}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchView}>


                    {
                        this.state.search == "" &&

                        // <FlatList
                        //     style={{ paddingBottom: 280, flexGrow: 0 }}
                        //     initialNumToRender={10}
                        //     data={this.props.topPlayed ? this.props.topPlayed : []}
                        //     numColumns={3}
                        //     renderItem={({ item }) => (
                        //         <TouchableOpacity onPress={() => {
                        //             // alert(JSON.stringify(item))
                        //             this.props.navigation.navigate('StageFour', {
                        //                 'genreID': item['genreID'],
                        //                 'thumbnailURL': item['thumbnailURL'],
                        //                 'title': item['title'],
                        //                 'type': item['type'],
                        //                 'contentURL': item['contentURL'],
                        //                 'artistID': item['artistID'],
                        //                 'totalItem': item,
                        //                 'desc_long': item['desc_long'],
                        //                 'albumID': item['albumID'],
                        //                 'contentID': item['id']
                        //             })
                        //         }} activeOpacity={0.6} style={{ marginBottom: 10, }} >
                        //             <View style={SearchStyles.borderImageGroup}>
                        //                 <TouchableOpacity style={SearchStyles.belowPlay} onPress={async () => {
                        //                     await this.setState({
                        //                         clickedSource: item['contentURL'],
                        //                         clicked: item,
                        //                         clickedThumb: item['thumbnailURL'],
                        //                         clickedType: item['type'],
                        //                     })
                        //                     this.state.clickedType == '0' ? (
                        //                         this.props.navigation.navigate('VideoPlayer',
                        //                             {
                        //                                 'clicked': this.state.clicked,
                        //                                 'clickedSource': this.state.clickedSource,
                        //                             }
                        //                         )
                        //                     ) :
                        //                         this.props.navigation.navigate('MusicPlayer',
                        //                             {
                        //                                 'clicked': this.state.clicked,
                        //                                 'clickedSource': this.state.clickedSource,
                        //                                 'clickedThumb': this.state.clickedThumb
                        //                             }
                        //                         )
                        //                 }}>
                        //                     <Icon name="play" size={25} color="#fff" />
                        //                 </TouchableOpacity>
                        //                 <Image style={SearchStyles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                        //                 <View style={{ position: 'absolute', bottom: 0, width: width * 0.25, height: 75, zIndex: 100 }}>
                        //                     <View style={SearchStyles.imgAlbumNameArea2}>
                        //                         <Text style={SearchStyles.imgAlbumName2} >{item['title']}</Text>
                        //                     </View>
                        //                     <Text style={SearchStyles.imgAlbumNameType} >{item['type'] == 1 ? 'audio' : 'video'}</Text>
                        //                 </View>
                        //                 <LinearGradient colors={['rgba(58,55,82,0.7)', 'rgba(140,140,177,0.3)', '#00000000', 'rgba(140,140,177,0.3)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', borderRadius: 15 }} />
                        //             </View>

                        //         </TouchableOpacity>
                        //     )}
                        //     keyExtractor={item => item.id}
                        // />
                        <View style={{justifyContent: 'center', alignItems: "center", height: height*0.5}}>
                            <Text style={{color: 'white'}}>Please type song name, album name, artist name </Text>
                            <Text style={{color: 'white'}}> you want to search</Text>
                        </View>
                    }
                    {
                        this.state.search != "" && this.state.changeItem == 'SongName' &&

                        <FlatList
                            style={{ paddingBottom: 280 }}
                            initialNumToRender={10}
                            data={this.state.dataSource ? this.state.dataSource : []}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={async () => {
                                    // alert(JSON.stringify(item['id']))
                                    this.props.navigation.navigate('StageFive', {
                                        'genreID': item['genreID'],
                                        'thumbnailURL': item['thumbnailURL'],
                                        'title': item['title'],
                                        'type': item['type'],
                                        'contentURL': item['contentURL'],
                                        'artistID': item['artistID'],
                                        'totalItem': item,
                                        'desc_long': item['desc_long'],
                                        'albumID': item['albumID'],
                                        'contentID': item['id']
                                    })
                                }} activeOpacity={0.6} style={{ marginBottom: 10 }} >
                                    <View style={SearchStyles.borderImageGroup}>
                                        <TouchableOpacity style={SearchStyles.belowPlay} onPress={async () => {
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
                                        <Image style={SearchStyles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: width * 0.25, height: 75, zIndex: 100 }}>
                                            <View style={SearchStyles.imgAlbumNameArea2}>
                                                <Text style={SearchStyles.imgAlbumName2} >{item['title']}</Text>
                                            </View>
                                            <Text style={SearchStyles.imgAlbumNameType} >{item['type']}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(58,55,82,0.7)', 'rgba(140,140,177,0.3)', '#00000000', 'rgba(140,140,177,0.3)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    }
                    {
                        this.state.search != "" && this.state.changeItem == 'AlbumName' &&

                        <FlatList
                            style={{ paddingBottom: 280 }}
                            initialNumToRender={10}
                            // data={this.props.searchBy ? this.props.searchBy.searchByAlbum : []}
                            data={this.state.dataSource2 ? this.state.dataSource2 : []}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    // alert(JSON.stringify(item))
                                    this.props.navigation.navigate('StageFive', {
                                        'genreID': item['genreID'],
                                        'thumbnailURL': item['thumbnailURL'],
                                        'title': item['title'],
                                        'type': item['type'],
                                        'contentURL': item['contentURL'],
                                        'artistID': item['artistID'],
                                        'totalItem': item,
                                        'desc_long': item['desc_long'],
                                        'albumID': item['albumID'],
                                        'contentID': item['id']
                                    })
                                }} activeOpacity={0.6} style={{ marginBottom: 10 }} >
                                    <View style={SearchStyles.borderImageGroup}>
                                        <TouchableOpacity style={SearchStyles.belowPlay} onPress={async () => {
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
                                        <Image style={SearchStyles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: width * 0.25, height: 75, zIndex: 100 }}>
                                            <View style={SearchStyles.imgAlbumNameArea2}>
                                                <Text style={SearchStyles.imgAlbumName2} >{item['title']}</Text>
                                            </View>
                                            <Text style={SearchStyles.imgAlbumNameType} >{item['type']}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(58,55,82,0.7)', 'rgba(140,140,177,0.3)', '#00000000', 'rgba(140,140,177,0.3)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    }
                    {
                        this.state.search != "" && this.state.changeItem == 'ArtistName' &&

                        <FlatList
                            style={{ paddingBottom: 280 }}
                            initialNumToRender={10}
                            data={this.state.dataSource3 ? this.state.dataSource3 : []}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    // alert(JSON.stringify(item))
                                    this.props.navigation.navigate('StageThree', {
                                        'genreID': item['genreID'],
                                        'thumbnailURL': item['thumbnailURL'],
                                        'title': item['title'],
                                        'type': item['type'],
                                        'contentURL': item['contentURL'],
                                        'artist_id': item['artistID'],
                                        'totalItem': item,
                                        'desc_long': item['desc_long'],
                                        'albumID': item['albumID'],
                                        'artist_thumbnailURL': item['artist_thumbnailURL'],
                                        'artist_name': item['artist_name'],
                                        'contentID': item['id']
                                    })
                                }} activeOpacity={0.6} style={{ marginBottom: 10 }} >
                                    <View style={SearchStyles.borderImageGroup}>
                                        <TouchableOpacity style={SearchStyles.belowPlay} onPress={async () => {
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
                                        <Image style={SearchStyles.borderImage} source={{ uri: "http://192.168.110.249:8000/" + item['thumbnailURL'] }} />
                                        <View style={{ position: 'absolute', bottom: 0, width: width * 0.25, height: 75, zIndex: 100 }}>
                                            <View style={SearchStyles.imgAlbumNameArea2}>
                                                <Text style={SearchStyles.imgAlbumName2} >{item['title']}</Text>
                                            </View>
                                            <Text style={SearchStyles.imgAlbumNameType} >{item['type']}</Text>
                                        </View>
                                        <LinearGradient colors={['rgba(58,55,82,0.7)', 'rgba(140,140,177,0.3)', '#00000000', 'rgba(140,140,177,0.3)', 'rgba(89,85,125,0.9)', 'rgb(58,55,82)']} style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', borderRadius: 15 }} />
                                    </View>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    }




                </View>
            </View>
        );
    }
}


const SearchStyles = StyleSheet.create({

    borderImageGroup: {
        borderRadius: 15,
        width: width * 0.28,
        height: width * 0.35,
        margin: 5,
        elevation: 5,
    },
    belowPlay: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 1000
    },
    borderImage: {
        borderRadius: 15,
        width: width * 0.28,
        height: width * 0.35,
        resizeMode: 'cover',
    },
    imgAlbumName2: {
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 15,
        zIndex: 1000,
        textShadowColor: 'red',
        textShadowRadius: 5,
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
})


const mapStateToProps = (state) => {
    return {
        album: state.album,
        topPlayed: state.topPlayed.totalTopPlayed,
        searchBy: state.searchBy
    }
}

export default connect(mapStateToProps, { FetchBySong, FetchByAlbum, FetchByArtist, FetchTotalTopPlayed })(Search)