import { LOGIN, GET_AUTHED_USER } from './types.js'
import AuthApi from '../../api/AuthApi'
import {  AsyncStorage } from 'react-native';


export const loginCreater = (flag) => ({
  type: LOGIN,
  authedUser: flag,
   
})
export const getAuthedUserCreater = () => {
  return {
    type: GET_AUTHED_USER
  }
}
export const logins = (payload) => {
 
  return (dispatch) => {
    AuthApi.login( (response) => {
      //alert(response['data']['accessToken']);
    dispatch( AsyncStorage.setItem('userToken', response['data']['accessToken']));
   
  
    }, (err) => {
      // console.log(err, ' error')
    }, payload)
  }
}


