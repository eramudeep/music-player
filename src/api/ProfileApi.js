import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  getUserProfile(callback, fail) {
    console.log('calling getUserProfile api')
    apiCall.makeGetRequest(config.api.getUserProfile, callback, fail)
  },
  editUserProfile(callback, fail, payload) {
    console.log('calling editUserProfile api')
    apiCall.makePutRequest(config.api.editUserProfile, callback, fail, payload)
  },
  uploadProfileImage(callback, fail, payload) {
    console.log('calling uploadProfileImage api')
    apiCall.uploadFile(config.api.uploadProfileImage, callback, fail, payload)
  }
}
