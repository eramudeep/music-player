//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StatusBar, AsyncStorage, BackHandler, Image, Dimensions, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import styles from '../style';
import NavigationService from '../navigators/NavigationService';
import { languageSwitcher } from '../helpers/Language';
import { BarIndicator } from 'react-native-indicators';
import strings from '../strings';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { BASE_PATH } from '../api/config'

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
            password: '',
            changestate: false,
            phoneplaceholder: 'Enter phone',
            emailplaceholder: 'Enter email',
            passwordplaceholder: 'Enter password',
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

    onBackPress = () => {
        this.setState({
            modalVisible: true,
            exitState: true
        })
        // Alert.alert(
        //     strings.exittitle,
        //     strings.exitconfirm,
        //     [
        //         { text: strings.cancel, style: 'cancel' },
        //         {
        //             text: strings.ok, onPress: () => {
        //                 BackHandler.exitApp()
        //             }
        //         }
        //     ]
        // );
        return true;
    }

    componentDidMount = async () => {
        StatusBar.setHidden(true);
        console.disableYellowBox = "true"
        // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        // this.setState({ exitState: false })

        GoogleSignin.configure();
    };

    async UNSAFE_componentWillMount() {
        // let langCode = await AsyncStorage.getItem('languageCode')
        // await languageSwitcher.switchTo(langCode);
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'en') {
            strings.setLanguage('en')
            this.setState({
                phoneplaceholder: strings.phone + ':',
                emailplaceholder: strings.email + ':',
                passwordplaceholder: strings.password + ':',
            })
        }
        else {
            strings.setLanguage('ar')
            this.setState({
                phoneplaceholder: strings.phone + ':',
                emailplaceholder: strings.email + ':',
                passwordplaceholder: strings.password + ':',
            })
        }
    }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    // }

    Warning() {
        this.setState({ modalVisible: true })
    }
    // for test
    // async aaa() {
    //     try {
    //         const value = await AsyncStorage.getItem('userID')
    //       console.log('value------------------', value)
    //     } catch(e) {
    //         // read error
    //       }
    // }

    handleLogin = async () => {
        Keyboard.dismiss()
        const user = {
            email: this.state.email,
            password: this.state.password,
            is_mobile: true
        };

        if (this.state.email == "") {
            this.Warning()
        } else if (this.state.password == "") {
            this.Warning()
        } else if (reg.test(this.state.email) === false) {
            this.Warning()
            return false;
        } else {
            var myTimer = setTimeout(function () { this.NetworkSensor() }.bind(this), 8000)
            this.setState({
                loading: true
            })

            let response = await fetch(BASE_PATH + '/api/auth/validateUser', { //some URL was modified to 249, but others no.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            });
            let result = await response.json();
            // alert(JSON.stringify(result))

            console.log('user=============',result)
            if (result.status_code == 200) {


                const resUser = result.user;
                axios.post(BASE_PATH + '/api/auth/login', user)
                    .then(async (response) => {
                        try {
                            await AsyncStorage.setItem('userID', JSON.stringify(response['data']['data']['user']['id']))
                            await AsyncStorage.setItem('userToken', JSON.stringify(response['data']['data']['token']['value']))
                            console.log("User login ",response);
                            
                            console.log('id============',(await AsyncStorage.getItem('userID')).toString())
                            console.log('tok============',(await AsyncStorage.getItem('userToken')).toString())
                        } catch (error) {
                            console.log('catch error', error)
                        }

                        // setTimeout(() => {
                        //     this.aaa()
                        // }, 1000);
                        this.setState({
                            loading: false,
                        })
                        // GuserID = this.state.userIDState
                        clearTimeout(myTimer);

                        this.props.navigation.navigate('Home', {
                            'Token': response['data']['data']['token']['value'],
                            'userID': response['data']['data']['user']['id']
                        });
                    }).catch((err) => {
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
            } else {
                await this.setState({
                    Error: 'Request failed with status code 401',
                    loading: false,
                    timeFlag: false
                })
                clearTimeout(myTimer);
                this.Warning()
            }
        }

        // NavigationService.navigate('Home');

    }

    NetworkSensor = async () => {
        await this.setState({
            timeFlag: true,
            Error: "Network Error",
            loading: false
        })
        this.Warning()
    }

    getFbEmail = (token) => {
        console.log('------', token)
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: token.accessToken,
                parameters: {
                    fields: {
                        string: 'id, name, email, first_name, last_name, gender'
                    }
                },
            },
            this.socialLogin,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    };

    socialLogin = (error, result) => {
        var myTimer = setTimeout(function () { this.NetworkSensor() }.bind(this), 8000)
        this.setState({
            loading: true
        })

        if (error) {
            console.log('Error fetching data: ' + error.toString());
        } else {
            console.log('Success fetching data: ' + JSON.stringify(result));
            result.social = 1;
            axios.post(BASE_PATH + '/api/auth/socialLogin', result)
                .then(async (response) => {
                    try {
                        await AsyncStorage.setItem('userID', JSON.stringify(response['data']['data']['user']['id']))
                        await AsyncStorage.setItem('userToken', JSON.stringify(response['data']['data']['token']['value']))
                        console.log('id============',(await AsyncStorage.getItem('userID')).toString())
                        console.log('tok============',(await AsyncStorage.getItem('userToken')).toString())
                    } catch (error) {
                        console.log('catch error', error)
                    }
                    this.setState({
                        loading: false,
                    })
                    clearTimeout(myTimer);

                    this.props.navigation.navigate('Home', {
                        'Token': response['data']['data']['token']['value'],
                        'userID': response['data']['data']['user']['id']
                    });

                    // LoginManager.logOut();
                }).catch((err) => {
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

    googleSignIn = async () => {
        try {
            let myTimer = setTimeout(function () { this.NetworkSensor() }.bind(this), 8000)
            this.setState({
                loading: true
            })

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            let googleInfo = userInfo.user;
            let user = {
                first_name: googleInfo.givenName,
                last_name: googleInfo.familyName,
                email: googleInfo.email,
                social: 2
            };
            axios.post(BASE_PATH + '/api/auth/socialLogin', user)
                .then(async (response) => {
                    try {
                        await AsyncStorage.setItem('userID', JSON.stringify(response['data']['data']['user']['id']))
                        await AsyncStorage.setItem('userToken', JSON.stringify(response['data']['data']['token']['value']))
                        console.log('id============',(await AsyncStorage.getItem('userID')).toString())
                        console.log('tok============',(await AsyncStorage.getItem('userToken')).toString())
                    } catch (error) {
                        console.log('catch error', error)
                    }
                    this.setState({
                        loading: false,
                    })
                    clearTimeout(myTimer);

                    this.props.navigation.navigate('Home', {
                        'Token': response['data']['data']['token']['value'],
                        'userID': response['data']['data']['user']['id']
                    });

                    GoogleSignin.signOut();
                }).catch((err) => {
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
        } catch (error) {
            console.log('----google error----', error);
        }
    };

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

                <LinearGradient colors={['rgba(0,0,0,0)', '#000']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 200 }} />
                <View style={styles.txtGroup}>
                    {/* <View style={styles.txtBox}>
                        <Text style={styles.txt}>
                            {strings.youarealready}
                            {'\n'}{strings.pleaseenteryourmobile}
                        </Text>
                    </View> */}
                    <View style={{ flex: 1.5 }}></View>

                    <View style={styles.formGroup}>
                        {/* <View style={{ flexDirection: 'row', marginBottom: 10 }} >

                            <View style={styles.phoneInput}>
                                <TextInput keyboardType='email' style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandle(text) }}
                                    value={this.state.phone}
                                    placeholder={this.state.phoneplaceholder}
                                />
                            </View>
                        </View> */}
                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                            <View style={styles.phoneInput}>
                                <TextInput keyboardType='email' style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandleEmail(text) }}
                                    value={this.state.email}
                                    placeholder={strings.enteremail}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                            <View style={styles.phoneInput}>
                                <TextInput keyboardType='password' style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandlePassword(text) }}
                                    value={this.state.password}
                                    placeholder={strings.enterpassword}
                                    secureTextEntry={this.state.password == '' ? false : true}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={async () => {
                            this.handleLogin()
                        }} style={styles.Btn} activeOpacity={0.7} disabled={this.state.loading ? true : false} >
                            {
                                this.state.loading
                                    ?
                                    <BarIndicator color='white' count={5} size={17} style={{ alignSelf: "center", zIndex: 2000 }} />
                                    :
                                    <Text style={{ color: 'white', fontSize: 16 }}>{strings.gotohomepage}</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // AsyncStorage.getItem('languageCode').then((obj)=> {console.log(obj)})
                            this.props.navigation.navigate('Signup')
                        }} style={styles.Btn} activeOpacity={0.7} disabled={this.state.loading ? true : false} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{strings.signup}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Forgot')
                        }} style={styles.BtnOuter} activeOpacity={0.7} disabled={this.state.loading ? true : false} >
                            <Text style={{ color: 'white', fontSize: 16 }}>{strings.forgotpwd}</Text>
                        </TouchableOpacity>

                        {/*facebook login*/}
                        <View style={{ marginTop: 10, marginLeft: 5 }}>
                            <LoginButton
                                permissions={['email']}
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            console.log("login has error: " + result.error);
                                        } else if (result.isCancelled) {
                                            console.log("login is cancelled.");
                                        } else {
                                            AccessToken.getCurrentAccessToken().then(
                                                (data) => {
                                                    this.getFbEmail(data);
                                                }
                                            )
                                        }
                                    }
                                }
                                onLogoutFinished={() => console.log("logout.")}/>
                        </View>

                        {/*google login*/}
                        <View style={{marginTop: 10}}>
                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this.googleSignIn}
                                disabled={this.state.isSigninInProgress} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}