import React, { Component, createRef, useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import ScalingDrawer from 'react-native-scaling-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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
import HomeStack from '../screens/HomeStack';
import Profile from '../screens/Profile';
import Offline from '../screens/Offline';
import MyList from '../screens/MyList';
import Search from '../screens/Search';
import LanguageSwitcher from '../screens/LanguageSwitcher';
import VideoPlayer from "../screens/VideoPlayer";
import MusicPlayer from "../screens/MusicPlayer";
import StageTwo from '../screens/StageTwo';
import StageThree from '../screens/StageThree';
import StageFour from '../screens/StageFour';
import StageFive from '../screens/StageFive';

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

const GeneralStack = createStackNavigator(
  {

    // StageTwo: {
    //   screen: StageTwo,
    //   navigationOptions: {
    //     headerShown: false
    //   }
    // },
    // Home: {
    //   screen: Home,
    //   navigationOptions: {
    //     headerShown: false
    //   }
    // },
    StageThree: {
      screen: StageThree,
      navigationOptions: {
        header: null
      }
    },
    StageFive: {
      screen: StageFive,
      navigationOptions: {
        header: null
      }
    },
    

    // StageFour: {
    //   screen: StageFour,
    //   navigationOptions: {
    //     headerShown: false
    //   }
    // },

    VideoPlayer: {
      screen: VideoPlayer,
      navigationOptions: {
        headerShown: false,
      }
    },
    MusicPlayer: {
      screen: MusicPlayer,
      navigationOptions: {
        headerShown: false
      }
    },
    Subscribe: {
      screen: Subscribe,
      navigationOptions: {
        headerShown: false
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        headerShown: false
      }
    },
    LanguageSwitcher: {
      // screen: () => <LanguageSwitcher/>,
      screen: LanguageSwitcher,
      navigationOptions: {
        headerShown: false
      }
    },
  },{
    initialRouteName: 'StageFive'
  });

const BottomTabStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: string.home,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name='ios-home' style={{ color: tintColor }} size={25} />
          </View>
        )
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: mylist,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon name={'ios-search'} style={{ color: tintColor }} size={25} />
          </View>
        ),
        initialRouteName: 'Home',
        activeColor: '#fff',
        inactiveColor: '#727272',
        barStyle: { backgroundColor: '#000', }
      }
    },
    Offline: {
      screen: Offline,
      navigationOptions: {
        tabBarLabel: offline,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon1 name={'download'} style={{ color: tintColor }} size={25} />
          </View>
        ),
        initialRouteName: 'Home',
        activeColor: '#fff',
        inactiveColor: '#727272',
        barStyle: { backgroundColor: '#000', }
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: profile,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon2 name={'account-circle'} style={{ color: tintColor }} size={25} />
          </View>
        ),
        activeColor: '#fff',
        inactiveColor: '#727272',
        barStyle: { backgroundColor: '#000', }
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#fff',
    inactiveColor: '#727272',
    barStyle: { backgroundColor: '#000', }
  }
)

const NavigatorsContainer = createStackNavigator({
  App: {
    screen: BottomTabStack,
    navigationOptions: {
      // headerShown: false
      header: null
    }
  },
  General: {
    screen: GeneralStack,
    navigationOptions: {
      // headerShown: false,
      header: null,
    }
  }
})

const Container = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: {
      screen: NavigatorsContainer,
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
      lan: '',
      count: 1,
    };
  }

  async componentWillMount() {
    if ((await AsyncStorage.getItem("languageCode")).toString() == 'ar') {
      strings.setLanguage('ar')
    }
    else {
      strings.setLanguage('en')
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
