import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  login(callback, fail, payload) {
    console.log('calling login api')
    apiCall.makePostRequest(config.auth.login, callback, fail, payload)
  },
}
