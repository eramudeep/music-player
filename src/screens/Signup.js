//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StatusBar, AsyncStorage, Image, Dimensions, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import styles from '../style';
import NavigationService from '../navigators/NavigationService';
import strings from '../strings';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { BarIndicator } from 'react-native-indicators';
import { languageSwitcher } from '../helpers/Language';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';
import { BASE_PATH } from '../api/config';

const { width, height } = Dimensions.get('window')


let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class Signup extends Component {

    constructor() {
        super()
        this.state = {
            subscribe: true,
            expand: false,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            firstplaceholder: 'First name',
            lastplaceholder: 'Last name',
            emailplaceholer: 'Email',
            passwordplaceholder: 'Password',
            modalVisible: false,
            Error: '',
            timeFlag: false,
            loading: false,
        }

    }

    onChangeHandleFirstname = (text) => {
        this.setState({
            firstname: text
        })
    }

    onChangeHandleLastname = (text) => {
        this.setState({
            lastname: text
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

    componentWillMount() {
        AsyncStorage.removeItem();
    }

    componentDidMount = async () => {
        console.disableYellowBox = "true"
    }

    async UNSAFE_componentWillMount() {
        let langCode = await AsyncStorage.getItem('languageCode')
        await languageSwitcher.switchTo(langCode);
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {   //
            strings.setLanguage('ar')   //
            this.setState({   //
                emailplaceholer: strings.email + ':',   //
                passwordplaceholder: strings.password + ':',   //
                firstplaceholder: strings.enterfirstname + ':',   //
                lastplaceholder: strings.enterlastname + ':',   //
                phoneplaceholder: strings.phone + ':'
            })   //
        }   //
        else {   //
            strings.setLanguage('en')   //
            this.setState({   //
                emailplaceholer: strings.email + ':',   //
                passwordplaceholder: strings.password + ':',   //
                firstplaceholder: strings.enterfirstname + ':',   //
                lastplaceholder: strings.enterlastname + ':',   //
                phoneplaceholder: strings.phone + ':'
            })   //
        }   //
    }

    Warning() {
        this.setState({ modalVisible: true })
    }

    handleSignUp = () => {
        Keyboard.dismiss()
        this.setState({ Error: '' })
        if (this.state.firstname == "") {
            this.Warning()
        } else if (this.state.lastname == "") {
            this.Warning()
        } else if (this.state.email == "") {
            this.Warning()
        } else if (this.state.password == "") {
            this.Warning()
        } else if (this.state.password.length < 5) {
            this.Warning()
        } else if (reg.test(this.state.email) === false) {
            this.Warning()
            return false;
        } else {
            console.log('BASE_PATH========================', BASE_PATH)
            const body = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            };
            var myTimer = setTimeout(function () { this.NetworkSensor() }.bind(this), 8000)
            this.setState({
                loading: true
            })

            // axios.post(BASE_PATH + '/api/auth/register', body)
            axios.post(BASE_PATH + '/api/auth/register', body)
                .then((response) => {
                    this.setState({ loading: false })
                    console.log(response)
                    console.log(JSON.stringify(response))
                    this.Warning()
                    clearTimeout(myTimer);

                }, (err) => {
                    if (!this.state.timeFlag) {
                        if (err.message == "Request failed with status code 500") {
                            this.setState({
                                loading: false,
                                Error: err.message
                            })
                            this.Warning()
                        } else if (err.message == "Network Error") {
                            this.setState({
                                loading: false,
                                Error: err.message
                            })
                            this.Warning()
                        }
                        clearTimeout(myTimer);
                        console.log('*******error *******:', JSON.stringify(err))
                    } else {
                        this.setState({ timeFlag: false })
                    }
                });
        }
    }

    NetworkSensor = async () => {
        await this.setState({
            timeFlag: true,
            Error: "Network Error",
            loading: false
        })
        this.Warning()
    }

    goToLogin() {
        if (this.state.firstname != '' &&
            this.state.lastname != '' &&
            this.state.email != '' &&
            this.state.password != '' &&
            this.state.password.length >= 5 &&
            reg.test(this.state.email) === true &&
            this.state.Error != "Request failed with status code 500" &&
            this.state.Error != "Network Error"
        ) {
            this.props.navigation.navigate('Login')
        }
    }



    render() {
        return (
            <ImageBackground
                source={require('../assets/images/login3.png')}
                resizeMode={'stretch'}
                style={{ height: '100%', flex: 1 }}>
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
                                {this.state.firstname == "" ? strings.enterfirstname :
                                    this.state.lastname == "" ? strings.enterlastname :
                                        this.state.email == "" ? strings.enteremail :
                                            this.state.password == "" ? strings.enterpassword :
                                                this.state.password.length < 5 ? strings.passwordlength :
                                                    reg.test(this.state.email) === false ? strings.emailsyntaxerror :
                                                        this.state.Error == "Request failed with status code 500" ? strings.existemail :
                                                            this.state.Error == "Network Error" ? strings.networkerror : strings.registersuccess}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', width: '100%' }} >
                            <TouchableOpacity style={{ ...styles.modalbutton, marginTop: 15 }}
                                onPress={async () => {
                                    await this.setState({ modalVisible: false });
                                    this.goToLogin()
                                }}>
                                <Text style={styles.modalbuttonText} >{strings.ok}</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>

                <TouchableOpacity style={{ position: 'absolute', left: '10%', zIndex: 1000, top: '5%', width: 50, height: 50, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 50, justifyContent: 'center', alignItems: "center" }} onPress={() => this.props.navigation.goBack()}>
                    <Icon1 name='left' size={30} color="rgba(0,0,0,0.6)" />
                </TouchableOpacity>
                <LinearGradient colors={['rgba(0,0,0,0)', '#000']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 200 }} />
                <View style={{ ...styles.txtGroup, marginTop: 200 }}>
                    <View style={styles.formGroup}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >

                            <View style={styles.phoneInput}>
                                {/* <Text style={{ color: 'black', paddingBottom: 10, alignSelf: 'center', paddingTop: 7 }}>{strings.enterfirstname}:</Text> */}
                                <TextInput style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandleFirstname(text) }}
                                    value={this.state.firstname}
                                    placeholder={this.state.firstplaceholder}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                            <View style={styles.phoneInput}>
                                {/* <Text style={{ color: 'black', paddingBottom: 10, alignSelf: 'center', paddingTop: 7 }}>{strings.enterlastname}:</Text> */}
                                <TextInput style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandleLastname(text) }}
                                    value={this.state.lastname}
                                    placeholder={this.state.lastplaceholder}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                            <View style={styles.phoneInput}>
                                {/* <Text style={{ color: 'black', paddingBottom: 10, alignSelf: 'center', paddingTop: 7 }}>{strings.enteremail}:</Text> */}
                                <TextInput keyboardType='email' style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandleEmail(text) }}
                                    value={this.state.email}
                                    placeholder={this.state.emailplaceholer}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                            <View style={styles.phoneInput}>
                                {/* <Text style={{ color: 'black', paddingBottom: 10, alignSelf: 'center', paddingTop: 7 }}>{strings.enterpassword}:</Text> */}
                                <TextInput style={styles.phone}
                                    onChangeText={(text) => { this.onChangeHandlePassword(text) }}
                                    value={this.state.password}
                                    placeholder={this.state.passwordplaceholder}
                                    secureTextEntry={this.state.password == '' ? false : true}
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.handleSignUp();
                        }} style={styles.Btn} activeOpacity={0.7} disabled={this.state.loading ? true : false} >
                            {
                                this.state.loading
                                    ?
                                    <BarIndicator color='white' count={5} size={17} style={{ alignSelf: "center", zIndex: 2000 }} />
                                    :
                                    <Text style={{ color: 'white' }}>{strings.signup}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}