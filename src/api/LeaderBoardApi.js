import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  getLeaderBoardData(callback, fail, params) {
    console.log('calling getLeaderboardData api')
    apiCall.makeGetRequest(config.api.getLeaderBoardData.replace('{filter}', params), callback, fail)
  },
}
