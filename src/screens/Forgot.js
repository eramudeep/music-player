//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StatusBar,Linking, AsyncStorage, BackHandler, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import styles from '../style';
import NavigationService from '../navigators/NavigationService';
import { languageSwitcher } from '../helpers/Language';
import { BarIndicator } from 'react-native-indicators';
import Icon1 from 'react-native-vector-icons/AntDesign';
import strings from '../strings';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';
import { BASE_PATH } from '../api/config';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const { width, height } = Dimensions.get('window')


export default class MusicApp extends Component {

    constructor() {
        super()
        this.state = {
            subscribe: true,
            expand: false,
            phone: '',
            email: '',
            changestate: false,
            emailplaceholder: 'Enter email',
            lan: '',
            modalVisible: false,
            Error: '',
            timeFlag: false,
            loading: false,
            exitState: false,
            userIDState: ''
        }
        global.GuserID = ''
    }

    onChangeHandle = (text) => {
        this.setState({
            phone: text
        })
    }

    onChangeHandleEmail = (text) => {
        this.setState({
            email: text
        })
    }

    onChangeHandlePassword = (text) => {
        this.setState({
            password: text
        })
    }

    componentDidMount = async () => {
        console.disableYellowBox = "true"
    }

    async UNSAFE_componentWillMount() {
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
            strings.setLanguage('ar')
            this.setState({
                emailplaceholder: strings.email + ':',
            })
        }
        else {
            strings.setLanguage('en')
            this.setState({
                emailplaceholder: strings.email + ':',
            })
        }
    }

    Warning() {
        this.setState({ modalVisible: true })
    }
    

    NetworkSensor = async () => {
        await this.setState({
            timeFlag: true,
            Error: "Network Error",
            loading: false
        })
        this.Warning()
    }

    sendEmail(Em) {
        let user = {
            email: Em
        }
        if (Em == "") {
            this.Warning()
        } else if (reg.test(Em) === false) {
            this.Warning()
            return false;
        } else {
            this.setState({
                loading: true
            })
            // Linking.openURL('mailto: ' + user['email'])  // after upload server, delete this line
            axios.post(BASE_PATH + '/api/auth/forgotPassword', user)
                .then(async (response) => {
                    console.log(response);
                    this.setState({
                        loading: false,
                        // userIDState: response['data']['data']['user']['id']
                    })
                    Linking.openURL('mailto: ' + user['email'])
                }).catch((err) => {
                    Linking.openURL('mailto: ' + user['email'])  // delete after that.
                    console.log(JSON.stringify(err));
                    if (!this.state.timeFlag) {
                        if (err.message == "Request failed with status code 401") {
                            this.setState({
                                loading: false,
                                Error: err.message
                            })
                            this.Warning()
                        }
                        clearTimeout(myTimer);
                    } else {
                        this.setState({ timeFlag: false })
                    }

                })
        }
    }


    render() {
        return (
            <ImageBackground
                source={require('../assets/images/login3.png')}
                resizeMode={'stretch'}
                style={{ height: '100%', flex: 1 }}>

                {/* {
                    this.state.loading && (
                        <BarIndicator color='white' count={5} style={{ position: 'absolute', alignSelf: "center", marginTop: height * 0.5, zIndex: 2000 }} />
                    )
                } */}
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
                        <LinearGradient colors={['#000', 'rgba(0,0,0,0)']} style={{ position: 'absolute', bottom: 0, width: '120%', height: '100%', marginLeft: -40, zIndex: -100 }} />
                        <View style={{ height: 100, justifyContent: 'center', alignSelf: "center", marginTop: -20 }} >
                            <Text style={styles.confirm} >
                                {this.state.exitState == true ? strings.exitconfirm :
                                    this.state.email == "" ? strings.enteremail :
                                        this.state.password == "" ? strings.enterpassword :
                                            reg.test(this.state.email) === false ? strings.emailsyntaxerror :
                                                this.state.Error == "Request failed with status code 401" ? strings.userinfoincorrect :
                                                    this.state.Error == "Network Error" ? strings.networkerror : []}

                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                            <TouchableOpacity
                                style={{ ...styles.modalbutton, marginTop: 15 }}
                                onPress={() => {
                                    this.state.exitState
                                        ?
                                        BackHandler.exitApp()
                                        :
                                        this.setState({ modalVisible: false })

                                }}>
                                <Text style={styles.modalbuttonText} >{strings.ok}</Text>
                            </TouchableOpacity>
                            {
                                this.state.exitState &&
                                <TouchableOpacity style={{ ...styles.modalbutton, marginTop: 15 }} onPress={() => { this.setState({ modalVisible: false, exitState: false }) }}>
                                    <Text style={styles.modalbuttonText} >{strings.cancel}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </ModalContent>
                </Modal>
                <TouchableOpacity style={{ position: 'absolute', left: '10%', zIndex: 1000, top: '5%', width: 50, height: 50, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 50, justifyContent: 'center', alignItems: "center" }} onPress={() => this.props.navigation.goBack()}>
                    <Icon1 name='left' size={30} color="rgba(0,0,0,0.6)" />
                </TouchableOpacity>
                <LinearGradient colors={['rgba(0,0,0,0)', '#000']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 200 }} />
                <View style={styles.txtGroup}>
                    <View style={{ flex: 1.5 }}></View>
                    <View style={styles.formGroup}>

                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                            <View style={styles.phoneInput}>
                                <TextInput keyboardType='email' style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandleEmail(text) }}
                                    value={this.state.email}
                                    placeholder={this.state.emailplaceholder}
                                />
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => {
                            this.sendEmail(this.state.email)
                        }} style={styles.BtnOuter} activeOpacity={0.7} >
                            <Text style={{ color: 'white' }}>{strings.send}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}