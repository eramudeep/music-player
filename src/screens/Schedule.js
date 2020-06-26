import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,AsyncStorage,} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  fetchProfile =  () => {
    g[p]
   
      const resetAction =  StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
         
         
        ]
      })
      this.props.navigation.dispatch(resetAction)
    
  }


  render() {
    
    return (
      <View>
        <TouchableOpacity  style={{width:50,height:50,backgroundColor:'green'}}  onPress={this.fetchProfile} >
          <Text>fwffew</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
