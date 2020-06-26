import apiCall from './apiUtils/makeApiCall'
import config from './config'

export default {
  getQuizMetaInfo(callback, fail) {
    console.log('calling get quiz meta info api')
    apiCall.makeGetRequest(config.api.getQuizMetaInfo, callback, fail)
  },
  getQuizCategories(callback, fail) {
    console.log('calling api get quiz categories')
    apiCall.makeGetRequest(config.api.getQuizCategories, callback, fail)
  },
  addTopicToUser(callback, fail, payload) {
    console.log('calling api post quiz categories')
    apiCall.makePostRequest(config.api.addTopicToUser, callback, fail, payload)
  },
  getQuizByCategory(callback, fail, params) {
    console.log('cgetting quiz', config.api.getQuizByCategory.replace('{topic}', params))
    apiCall.makeGetRequest(config.api.getQuizByCategory.replace('{topic}', params), callback, fail)
  },
  getQuizById(callback, fail, quizId, friendId) {
    console.log('MSD', config.api.getQuizById.replace('{QUIZ_ID}', quizId).replace('{FRIEND_ID}', friendId))
    apiCall.makeGetRequest(config.api.getQuizById.replace('{QUIZ_ID}', quizId).replace('{FRIEND_ID}', friendId), callback, fail)
  },
  quizComplete(callback, fail, params, payload) {
    apiCall.makePostRequest(config.api.quizComplete.replace('{QUIZ_ID}', params), callback, fail, payload, null)
  },
  challengeUserForQuiz(callback, fail, quizId, friendId) {
    console.log('MSD', config.api.getQuizById.replace('{QUIZ_ID}', quizId).replace('{FRIEND_ID}', friendId))
    apiCall.makeGetRequest(config.api.challengeUserForQuiz.replace('{QUIZ_ID}', quizId).replace('{FRIEND_ID}', friendId), callback, fail)
  },
}