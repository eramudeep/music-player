import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  getAllFriends(callback, fail) {
    apiCall.makeGetRequest(config.api.getAllFriends, callback, fail)
  }
}