import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image, FlatList, AsyncStorage } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from '../style';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../strings';
import { connect } from 'react-redux';
import { FetchContentsgenre } from '../actions/Animated/Animatedaction';
import Icon from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';
import { BASE_PATH } from '../api/config';

class Comedy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backimage: BASE_PATH + '/thumbnails/login3.png',
            clicked: '',
            clickedType: '',
            clickedSource: '',
            clickedThumb: '',
            downClicked: false,
            playClicked: false,
            modalVisible: false,
            modalVisible1: false
        };
        this.onDownloadPress = this.onDownloadPress.bind(this);
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
                    alert(error)
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


    }




    componentDidMount() {
        this.props.FetchContentsgenre(4);
    }



    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 5 }}>
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
                            <Image source={require('../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
                            <LinearGradient colors={['#e207b0', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
                            <View style={{ height: 100 }}>
                                <Text style={styles.confirm}>{strings.confirm}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                                <TouchableOpacity style={styles.modalbutton} onPress={() => { this.onDownloadPress() }} >
                                    <Text style={styles.modalbuttonText} >{strings.yes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalbutton} onPress={() => this.setState({ modalVisible: false })}>
                                    <Text style={styles.modalbuttonText} >{strings.cancel}</Text>
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
                    <ImageBackground
                        source={{ uri: this.state.backimage }}
                        resizeMode={'stretch'}
                        style={{ height: '100%' }}
                    >
                        <LinearGradient colors={['rgba(0,0,0,0)', '#e207b0']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100 }} />
                        <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: '5%' }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} style={{ ...styles.largePlay, top: 15 }}>
                                <Icon name="left" size={45} style={styles.menu} color="black" />
                            </TouchableOpacity>
                            <View style={styles.headerView}>
                                <Text style={styles.headerTxt1}>{strings.yourcredit}</Text>
                            </View>
                        </View>
                        <View style={styles.downMedium}>
                            <View>
                                <Text style={{ fontSize: 40, color: '#fff' }}>Hatem</Text>
                                <Text style={{ fontSize: 14, color: '#fff', marginTop: -10 }}>{strings.aboutthesong}</Text>
                                <Text style={styles.IqdTxt}>500 IQD</Text>
                            </View>
                            <TouchableOpacity style={styles.largePlay} disabled={
                                this.state.playClicked == false ? true : false
                            } onPress={() => {

                                this.state.clickedType == 0 ? (
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
                            }} >
                                <Icon2 name="play" size={20} style={styles.menu} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.giftBtn1} disabled={
                            this.state.downClicked == false ? true : false
                        } onPress={() => {
                            this.setState({ modalVisible: true })
                        }} >
                            <Text style={{ fontSize: 20, color: '#f00', letterSpacing: 3 }} >{strings.download}</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.bottomArea}>
                    <FlatList
                        style={{ width: '80%' }}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        initialNumToRender={0}
                        data={this.props.animations ? this.props.animations.contentsgenre : []}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    downClicked: true,
                                    playClicked: true,
                                    backimage: BASE_PATH + "/" + item['thumbnailURL'],
                                    clicked: item,
                                    clickedType: item['Type'],
                                    clickedThumb: item['thumbnailURL'],
                                    clickedSource: item['contentURL']
                                })
                            }} >
                                <Image style={{ ...styles.borderImage1, marginLeft: 30 }} source={{ uri: BASE_PATH + "/" + item['thumbnailURL'] }} />
                                <Text style={{ ...styles.imgName, marginLeft: 30 }} >{item['title']}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />

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


export default connect(mapStateToProps, { FetchContentsgenre })(Comedy);