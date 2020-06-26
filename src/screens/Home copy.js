import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView,AsyncStorage } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from 'react-native-searchbar';
import styles from '../style'
import { drawer } from "../navigators/AppNavigation";
import NavigationService from '../navigators/NavigationService';



export default class MyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Home',
            songsClicked: false,
            category: [
                { id: 0, name: 'Classic' },
                { id: 1, name: 'Iraql' },
                { id: 2, name: 'Arabic' },
                { id: 3, name: 'Kurdish' },
            ],
            btnClicked: 0,
            imgCategory: [
                [
                    { id: 0, name: 'Classic' },
                    { id: 1, name: 'Iraql' },
                    { id: 2, name: 'Arabic' }
                ],
                [
                    { id: 3, name: '33' },
                    { id: 4, name: '44' },
                    { id: 5, name: '55' }
                ],
                [
                    { id: 6, name: '66' },
                    { id: 7, name: '77' },
                    { id: 8, name: '88' }
                ],
                [
                    { id: 9, name: '99' },
                    { id: 10, name: '00' },
                    { id: 11, name: '1111' }
                ],

            ]
        };
    }

  
    async UNSAFE_componentWillMount() {
        await  AsyncStorage.setItem('userToken',this.props.navigation.getParam("Token"));
        if((await AsyncStorage.getItem("languageCode")).toString()=='ar'){
            strings.setLanguage('ar')
            
           
            }
       else{
            strings.setLanguage('en')
          
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ ...styles.searchArea, width: '90%' }}>
                    <TouchableOpacity onPress={() => drawer.current.open()}>
                        <Icon2 name="bars" size={20} style={styles.menu} color="black" />
                    </TouchableOpacity>
                    <View style={styles.srhInputArea}>
                        <TextInput style={styles.srhInput} placeholder="Search..." />
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search')}}>
                            <Icon2 name="search" size={20} style={styles.menu} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <TouchableOpacity style={!this.state.songsClicked ? { flex: 1 } : { flex: 0.5 }} onPress={() => { this.setState({ songsClicked: !this.state.songsClicked }) }}>
                        <Image source={require('../assets/images/back2.jpg')} resizeMode={"cover"} style={styles.songImage} />
                    </TouchableOpacity>
                    {
                        this.state.songsClicked == false ?
                            <View style={{ flex: 2 }}>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <TouchableOpacity style={styles.sideImage} onPress={() => {this.props.navigation.navigate('Animated')}}>
                                        <Image source={require('../assets/images/pop.jpg')} resizeMode={"stretch"} style={styles.songImage} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.sideImage} onPress={() => {this.props.navigation.navigate('Horror')}}>
                                        <Image source={require('../assets/images/islamic.png')} resizeMode={"stretch"} style={styles.songImage} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <TouchableOpacity style={styles.sideImage} onPress={() => {this.props.navigation.navigate('Comedy')}}>
                                        <Image source={require('../assets/images/rock.jpg')} resizeMode={"stretch"} style={styles.songImage} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.sideImage} onPress={() => {this.props.navigation.navigate('Pop')}}>
                                        <Image source={require('../assets/images/rap.jpg')} resizeMode={"stretch"} style={styles.songImage} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={{ width: '100%', flex: 2.5 }}>
                                <View style={styles.categoryGroup}>
                                    {
                                        this.state.category.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={this.state.btnClicked == index ? styles.clickedBtn : styles.NormalBtn}
                                                onPress={() => {
                                                    this.setState({
                                                        btnClicked: item.id,
                                                    })
                                                }}>
                                                <Text style={this.state.btnClicked == index ? { color: 'white' } : { color: '#888' }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }

                                </View>
                                <ScrollView style={{ width: '90%', marginLeft: '5%' }} >
                                    {
                                        this.state.imgCategory.map((item, index) => (
                                            <View key={index} style={{ flexDirection: "row" }}>
                                                <View style={styles.borderImageGroup}>
                                                    <Image style={styles.borderImage} source={require('../assets/images/' + 0 + '.jpg')} />
                                                    <Text style={styles.imgName} onPress={() => { alert(index.toString()) }}>{item[0].name}</Text>
                                                </View>
                                                <View style={styles.borderImageGroup}>
                                                    <Image style={styles.borderImage} source={require('../assets/images/' + 1 + '.jpg')} />
                                                    <Text style={styles.imgName} onPress={() => { alert(index) }}>{item[1].name}</Text>
                                                </View>
                                                <View style={styles.borderImageGroup}>
                                                    <Image style={styles.borderImage} source={require('../assets/images/' + 2 + '.jpg')} />
                                                    <Text style={styles.imgName} onPress={() => { alert(index) }}>{item[2].name}</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </View>
                    }
                </View>
            </View>
        );
    }
}
