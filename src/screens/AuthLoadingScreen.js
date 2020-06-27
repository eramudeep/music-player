import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
      console.disableYellowBox=true
    StatusBar.setHidden(true)
    // AsyncStorage.clear()
    this._bootstrapAsync();
  }
 
  _bootstrapAsync = async () => {
    try {
      let  value =await AsyncStorage.getItem("userToken")
      console.log("vvvv",value);  
      this.props.navigation.navigate(value ? 'Main' : 'Auth');
  } catch (error) {
    console.log("async",error);
    
      // Error retrieving data
  }
    // const userToken =await AsyncStorage.getItem('userToken').toString()// await AsyncStorage.getItem('userToken');
    // console.log("userToken", userToken);
    
    // this.props.navigation.navigate(false ? 'Main' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
}