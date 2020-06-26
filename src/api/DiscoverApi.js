import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  getAllEvents(callback, fail) {
    console.log('calling getAllEvents api')
    apiCall.makeGetRequest(config.api.getAllEvents, callback, (error) => { fail(error) })
  },
  getAllPubs(callback, fail) {
    console.log('calling getAllPubs api')
    apiCall.makeGetRequest(config.api.getAllTrendingPubs, callback, (error) => { fail(error) })
  },
  getAllNews(callback, fail) {
    console.log('calling getAllNews api')
    apiCall.makeGetRequest(config.api.getAllNews, callback, (error) => { fail(error) })
  },
  fetchEventDetails(callback, fail, params) {
    console.log('calling fetchEventDetails api')
    apiCall.makeGetRequest(`${config.api.fetchEventDetails}/${params}`, callback, (error) => { fail(error) }, params)
  },
  postComment(callback, fail, payload, params) {
    console.log('calling postComment api')
    apiCall.makePostRequest(config.api.postComment.replace('{event_id}', params), callback, (error) => { fail(error) }, payload)
  },
  isInterestedForEvent(callback, fail, id) {
    console.log('calling interested api', config.api.isInterestedForEvent.replace('{event_id}', id))
    apiCall.makeGetRequest(config.api.isInterestedForEvent.replace('{event_id}', id), callback, (error) => { fail(error) })
  }
}
