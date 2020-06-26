//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import styles from '../style';
import NavigationService from '../navigators/NavigationService';
import strings from '../strings';




export default class MusicApp extends Component {

    constructor() {
        super()
        this.state = {
            subscribe: true,
            expand: false,
            currentLang: 'en'
        }
    }

    componentDidMount = async () => {
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

    render() {
        return (
            <ImageBackground
                source={require('../assets/images/login3.png')}
                resizeMode={'stretch'}
                style={{ height: '100%', flex: 1 }}>
                <LinearGradient colors={['rgba(0,0,0,0)', '#000']} style={{ position: 'absolute', bottom: 0, width: '100%', height: 200 }} />
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} style={{ ...styles.touchMenu, position: 'absolute', paddingHorizontal: 10, paddingVertical: 18, borderRadius: 40, marginLeft: 20, backgroundColor: '#ffffff7f' }}>
                    <Icon name={this.state.currentLang == 'ar' ? "arrow-right" : "arrow-left"} size={20} style={styles.menu} color="white" />
                </TouchableOpacity>
                <View style={styles.contain}>
                    <View style={styles.weekGroup}>
                        <View style={styles.creditBox}>
                        </View>
                        <Text style={styles.yourCredit}>{strings.yourcredit}</Text>
                        <View style={styles.weekBox}>
                        </View>
                        <View style={styles.weekboxContent}>
                            <View style={styles.weeklybox}>
                                <TouchableOpacity style={styles.Biweekly} activeOpacity={0.6}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>{strings.biweekly}</Text>
                                    <Text style={{ color: 'white' }}>(600IQD)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.weekly} >
                                    <Text style={{ color: 'white', fontSize: 20 }}>{strings.weekly}</Text>
                                    <Text style={{ color: 'white' }}>(300IQD)</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnGroup}>
                                <TouchableOpacity style={styles.Btn}>
                                    <Text style={{ color: 'white' }}>{strings.subscribe}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { NavigationService.navigate('Main') }} style={{ ...styles.Btn, backgroundColor: 'rgb(25,22,54)' }}>
                                    <Text style={{ color: 'white' }}>{strings.gotohomepage}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}