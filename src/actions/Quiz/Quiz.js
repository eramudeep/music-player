import { GET_QUIZ_META_INFO, QUIZ_COMPLETE, GET_QUIZ_CATEGORIES, ADD_TOPIC_TO_USER, GET_QUIZ_BY_CATEGORY, CHALLENGE_USER_FOR_QUIZ } from './types.js'
import { firstLoginActionCreater } from '../Common/Common'
import QuizApi from '../../api/Quiz'

export const getQuizMetaInfoCreater = (data) => ({
  type: GET_QUIZ_META_INFO,
  data
})
export const getQuizCategoriesCreater = (data) => ({
  type: GET_QUIZ_CATEGORIES,
  data
})

export const getQuizByCategoryCreater = (data) => ({
  type: GET_QUIZ_BY_CATEGORY,
  data
})
export const quizCompleteCreater = (data) => ({
  type: QUIZ_COMPLETE,
  data
})
export const challengeUserForQuizCreater = (data) => ({
  type: CHALLENGE_USER_FOR_QUIZ,
  data
})
export const getQuizMetaInfo = () => {
  return (dispatch) => {
    QuizApi.getQuizMetaInfo((response) => {
      console.log(response.data, 'meta info')
      dispatch(firstLoginActionCreater(!response.data.quizTopicsResponses.length > 0))
      dispatch(getQuizMetaInfoCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    })
  }
}
export const getQuizCategories = () => {
  return (dispatch) => {
    QuizApi.getQuizCategories((response) => {
      dispatch(getQuizCategoriesCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    })
  }
}
export const addTopicToUser = (payload) => {
  return (dispatch) => {
    QuizApi.addTopicToUser((response) => {
      console.log(response.data, "post category data")
      dispatch(getQuizMetaInfoCreater(response.data))
      dispatch(firstLoginActionCreater(!response.data.quizTopicsResponses.length > 0))
    }, (err) => {
      console.log(err, ' error')
    }, payload)
  }
}
export const getQuizByCategory = (params) => {
  // alert(JSON.stringify(params))
  return (dispatch) => {
    QuizApi.getQuizByCategory((response) => {
      console.log(response.data, "fuck")
      console.log(response.data, "quiz by category data")
      dispatch(getQuizByCategoryCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    }, params)
  }
}
export const getQuizById = (callback, quizId, friendId) => {
  return (dispatch) => {
    QuizApi.getQuizById((response) => {
      dispatch(getQuizByCategoryCreater(response.data))
      callback()
    }, (err) => {
      console.log(err, ' error')
    }, quizId, friendId)
  }
}
export const quizComplete = (params, payload) => {
  return (dispatch) => {
    QuizApi.quizComplete((response) => {
      console.log('----------quiz completed------------', JSON.stringify(response,null,2));
      dispatch(quizCompleteCreater(response.data))
    }, (err) => {
      console.log("Err", err.message)
    }, params, payload)
  }
}

export const challengeUserForQuiz = (params, payload) => {
  return (dispatch, resolve) => {
    QuizApi.challengeUserForQuiz((response) => {
      console.log('----------Challenge completed------------', JSON.stringify(response, null, 2));
      dispatch(challengeUserForQuizCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    }, params, payload)
  }
}
