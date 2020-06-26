import axios from 'axios';
import { AsyncStorage } from 'react-native';


export default {
    
    async makeGetRequest(path, callback, fail) {
    axios.get(path, {  headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization':'bearer '+  (await AsyncStorage.getItem('userToken')).toString()   
       }}) 
      .then(callback)
      .catch(fail)
  },
    async makePostRequest(path, callback, fail, payload, params) {
    if (params != null) {
      path += serializeQueryParams(params)
    }
    

    axios.post(path, payload)
      .then(callback)
      .catch(fail)

  },
  async makeDeleteRequest(path, callback, fail) {
    axios.delete(path, { withCredentials: true, headers: {
      Authorization:'Bearer '+ (await AsyncStorage.getItem('userToken')).toString()  
    }}) 
      .then(callback)
      .catch(fail)
  },
  async makePutRequest(path, callback, fail, payload, params) {
    path += serializeQueryParams(params)
    axios.put(path, payload, { withCredentials: true, headers: {
      Authorization:'Bearer '+ (await AsyncStorage.getItem('userToken')).toString()  
    }}) 
      .then(callback)
      .catch(fail)
  },
  getImageFromBlob(path, callback, fail, params) {
    let headers = { ...apiHeaders }
    headers.Accept = 'application/json'
    headers['Content-Type'] = 'application/json;charset=UTF-8'
    path += serializeQueryParams(params)
    axios.get(path, { responseType: 'arraybuffer', withCredentials: true, headers }).then(callback).catch(fail)
  },
  uploadFile(path, callback, fail, payload, params) {
    path += serializeQueryParams(params)
    axios.post(path, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        ...apiHeaders
      },
      withCredentials: true
    }).then(callback)
      .catch(fail)
  }
}
