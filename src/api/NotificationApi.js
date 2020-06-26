import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  checkNotification(callback, fail) {
    console.log('calling checkNotification api')
    apiCall.makeGetRequest(config.api.checkNotification, callback, fail)
  },
  getAllNotification(callback, fail) {
    console.log('calling getAllNotification api')
    apiCall.makeGetRequest(config.api.getAllNotification, callback, fail)
  },
  notificationReadAction(callback, fail, params) {
    console.log('calling getAllNotification api')
    apiCall.makeGetRequest(config.api.notificationReadAction, callback, fail, params)
  }
}
