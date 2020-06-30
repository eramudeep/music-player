import React, { Component, createRef, useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ScalingDrawer from 'react-native-scaling-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import NavigationService from './NavigationService';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/Feather'
import strings from '../strings';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Login from '../screens/Login'
// import Login2 from '../screens/Login2'
import Signup from '../screens/Signup'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import Forgot from '../screens/Forgot'
import Subscribe from '../screens/Subscribe'
import LeftMenu from './LeftMenu';
import Home from '../screens/Home';
// import HomeStack from '../screens/HomeStack';
import Profile from '../screens/Profile';
import Down from '../screens/Downlists/Down';
import DownVideoPlayer from '../screens/Downlists/DownVideoPlayer';
import DownMusicPlayer from '../screens/Downlists/DownMusicPlayer';
import MyList from '../screens/MyList';
import Search from '../screens/Search';
import LanguageSwitcher from '../screens/LanguageSwitcher';
import VideoPlayer from "../screens/VideoPlayer";
import MusicPlayer from "../screens/MusicPlayer";
import StageTwo from '../screens/StageTwo';
import StageThree from '../screens/StageThree';
import StageFour from '../screens/StageFour';
import StageFive from '../screens/StageFive';
import AsyncStorage from '@react-native-community/async-storage';
const string = AsyncStorage.getItem("languageCode").then((value) => {
    if (value == 'en') {
        strings.setLanguage('en');
        return strings;
    }
    else {
        strings.setLanguage('ar');
        return strings;
    }
});
export const home = string.home;
export const profile = string.profile;
export const mylist = string.mylist;
export const schedule = string.schedule;
export const languages = string.languages;
export const offline = string.offline;

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            headerShown: false
        }
    },
    Forgot: {
        screen: Forgot,
        navigationOptions: {
            headerShown: false
        }
    },
})

// const TopStack = createStackNavigator({
//     LanguageSwitcher: {screen: LanguageSwitcher},
//     Subscribe: { screen: Subscribe },
// })

const HomeStack = createStackNavigator(
    {
        Home: { screen: Home },
        StageThree: { screen: StageThree },
        StageFive: { screen: StageFive },
        VideoPlayer: { screen: VideoPlayer },
        MusicPlayer: { screen: MusicPlayer },
        MyList: { screen: MyList },
        LanguageSwitcher: { screen: LanguageSwitcher },
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
)

const SearchStack = createStackNavigator(
    {
        Search: { screen: Search },
        StageFive: { screen: StageFive },
        VideoPlayer: { screen: VideoPlayer },
        MusicPlayer: { screen: MusicPlayer },
        LanguageSwitcher: { screen: LanguageSwitcher },
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
)

const OfflineStack = createStackNavigator(
    {
        Offline: { screen: Down },
        DownVideoPlayer: { screen: DownVideoPlayer },
        DownMusicPlayer: { screen: DownMusicPlayer },
        LanguageSwitcher: { screen: LanguageSwitcher },
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
)

const ProfileStack = createStackNavigator(
    {
        Profile: { screen: Profile },
        StageFive: { screen: StageFive },
        Subscribe: { screen: Subscribe },
        VideoPlayer: { screen: VideoPlayer },
        MusicPlayer: { screen: MusicPlayer },
        LanguageSwitcher: { screen: LanguageSwitcher },
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
)

const BottomTabStack = createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Search: { screen: SearchStack },
        Offline: { screen: OfflineStack },
        Profile: { screen: ProfileStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Home') {
                    return (
                        <Icon name='ios-home' style={{ color: tintColor }} size={25} />
                    );
                } else if (routeName === 'Search') {
                    return (
                        <Icon name={'ios-search'} style={{ color: tintColor }} size={25} />
                    );
                } else if (routeName === 'Offline') {
                    return (
                        <Icon name={'md-download'} style={{ color: tintColor }} size={25} />
                    );
                } else if (routeName === 'Profile') {
                    return (
                        <Icon2 name={'account-circle'} style={{ color: tintColor }} size={25} />
                    );
                }
            },
            headerShown: false,
        }),
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#727272',
            tabStyle: { backgroundColor: '#000'},
        },
    }
)

const Container = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        Main: {
            screen: BottomTabStack,
            navigationOptions: {
                headerShown: false
            }
        },
    },
    {
        initialRouteName: 'AuthLoading',
    }
)

const AppContainer = createAppContainer(Container);

export const drawer = createRef();


export default class AppNavigation extends Component {

    constructor() {
        super()
        this.state = {
            category:
            {
                scalingFactor: 0.8,
                swipeOffset: 20,
                minimizeFactor: 0.7
            },
            lan: 'ar',
            count: 1,
        };
    }

    async componentWillMount() {
        if ((await AsyncStorage.getItem("languageCode")).toString() == 'en') {
            strings.setLanguage('ar')
        }
        else {
            strings.setLanguage('ar')
        }
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: 0 });
        });
    }

    render() {
        return (
            <ScalingDrawer
                ref={drawer}
                content={<LeftMenu drawer={drawer} />}
                {...this.state.category}
                onClose={() => console.log('close')}
                onOpen={() => console.log('open')}
            >
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </ScalingDrawer>
        );
    }
}
