import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image, FlatList, AsyncStorage } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style';
import LinearGradient from 'react-native-linear-gradient';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/AntDesign';
import strings from '../../strings';
import Colors from '../../constants/colors'
import { withNavigation } from "react-navigation";
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';

const url = require('../../assets/images/favorite.png')


class Down extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backimage: '',
            clicked: '',
            clickedType: '',
            clickedSource: '',
            clickedThumb: '',
            playClicked: false,
            sourcedata: '',
            modalVisible: false,
            removeclicked: '',
            modalVisible1: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('data', (err, result) => {
            this.setState({ sourcedata: JSON.parse(result) })
        });
    }

    componentDidMount() {
        this.setState({
            backimage: url
        })
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            AsyncStorage.getItem('data', (err, result) => {
                this.setState({ sourcedata: JSON.parse(result) })
            });
        })

    }

    async handleRemove() {
    //    await AsyncStorage.getItem('data', (err, result) => {
    //         let temp = JSON.parse(result);
    //         console.log("temp",temp);
    //    }).catch(err=>console.log("async err",err)
    //    )
    //    return
        RNFS.unlink(`file://${RNFS.DocumentDirectoryPath}/${this.state.removeclicked['source']}`).then((r) => {

        }).catch(error => {
            alert(error)
            this.setState({ modalVisible: false })
        });
        RNFS.unlink(`file://${RNFS.DocumentDirectoryPath}/${this.state.removeclicked['thumb']}`).then((r) => {
            AsyncStorage.getItem('data', (err, result) => {
                let temp = JSON.parse(result);
                console.log("temp",temp);
                
                let index = '';
                for (var i = 0; i < temp.length; i++) {
                    if (this.state.removeclicked['title'] == temp[i]['title']) {
                        index = i;
                    }
                }

                temp.splice(index, 1)
                this.setState({ sourcedata: temp })
                AsyncStorage.setItem('data', JSON.stringify(temp));
                this.setState({ modalVisible: false })
                this.setState({
                    modalVisible1: true
                })
                setTimeout(() => { this.setState({ modalVisible1: false }) }, 1000)

            });
        }).catch(error => {
            alert(error)
            this.setState({ modalVisible: false })
        });
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
                            <Image source={require('../../assets/images/modal.png')} style={{ position: 'absolute', width: '120%', marginLeft: -30, top: -60 }} resizeMode={"contain"} />
                            <LinearGradient colors={['#000', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
                            <View style={{ height: 100 }}>
                                <Text style={styles.confirm}> {strings.removeconfirm} </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                                <TouchableOpacity style={styles.modalbutton} onPress={() => { this.handleRemove() }} >
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
                    <ImageBackground
                        source={this.state.backimage == url ? this.state.backimage : { uri: this.state.backimage }}
                        resizeMode={'stretch'}
                        style={{ height: '100%' }}
                    >
                        <LinearGradient colors={['rgba(0,0,0,0)', '#000F']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 100 }} />

                        <View style={styles.downMedium}>

                            <TouchableOpacity style={styles.largePlay}
                                disabled={
                                    this.state.playClicked == false ? true : false
                                }
                                onPress={() => {

                                    this.state.clickedType == 0 ? (
                                        this.props.navigation.navigate('DownVideoPlayer',
                                            {
                                                'clicked': this.state.clicked,
                                                'clickedSource': this.state.clickedSource,
                                            }
                                        )
                                    ) :
                                        this.props.navigation.navigate('DownMusicPlayer',
                                            {
                                                'clicked': this.state.clicked,
                                                'clickedSource': this.state.clickedSource,
                                                'clickedThumb': this.state.clickedThumb
                                            }
                                        )
                                }}
                            >
                                <Icon2 name="play" size={20} style={styles.menu} color="red" />
                            </TouchableOpacity>
                        </View>

                    </ImageBackground>
                </View>
                <View style={styles.bottomArea}>
                    <FlatList
                        style={{ width: '80%' }}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        initialNumToRender={0}
                        data={this.state.sourcedata}
                        renderItem={({ item }) => (
                            <TouchableOpacity

                            >
                                {console.log("-->>",item)
                                }
                                <TouchableOpacity
                                    onPress={async() => {
                                        // console.log((await AsyncStorage.getItem('data')).toString())
                                        this.setState({
                                            backimage: `file://${RNFS.DocumentDirectoryPath}/${item['thumb']}`,
                                            playClicked: true,
                                            clicked: item,
                                            clickedType: item['type'],
                                            clickedThumb: item['thumb'],
                                            clickedSource: item['source']
                                        })
                                    }}
                                >
                                    <Image style={{ ...styles.borderImage1, marginLeft: 30 }} source={{ uri: `file://${RNFS.DocumentDirectoryPath}/${item['thumb']}` }} />
                                    <Text style={{ ...styles.imgName, marginLeft: 30 }} >{item['title']}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.downremoveButton} onPress={() => {
                                    this.setState({ modalVisible: true, removeclicked: item })
                                }} >
                                    <Text style={styles.downremoveButtonText} >{strings.remove}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>

                        )}
                        keyExtractor={item => item.id}
                    />

                </View>
            </View>
        );
    }
}

export default withNavigation(Down);


