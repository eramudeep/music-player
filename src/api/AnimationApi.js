import config from './config'
import apiCall from './apiUtils/makeApiCall'

export default {
  getAllContents(callback, fail) {
    apiCall.makeGetRequest(config.api.getAllContents, callback, fail);
  },
  getContentsGenre(callback, fail, genre) {
    apiCall.makeGetRequest(config.api.getContentsGenre + '/' + genre.toString(), callback, fail)
  },
  getfavorcontent(callback, fail, userID) {
    apiCall.makeGetRequest(config.api.getfavorcontent + '/' + userID.toString(), callback, fail)
  }
}

