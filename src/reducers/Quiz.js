import { GET_QUIZ_META_INFO, QUIZ_COMPLETE, GET_QUIZ_CATEGORIES, GET_QUIZ_BY_CATEGORY, CHALLENGE_USER_FOR_QUIZ } from "../actions/Quiz/types";


export default function (state = {}, action) {
  switch (action.type) {
    case GET_QUIZ_META_INFO:
      {
        return {
          ...state,
          metaInfo: {
            profileStatus: {
              experience: action.data.experience,
              level: action.data.level,
              points: action.data.points,
            },
            categories: action.data.quizTopicsResponses.map(category => (
              {
                id: category.id,
                displayName: category.topic,
                url: category.url
              }
            ))
          }
        }
      }
    case GET_QUIZ_CATEGORIES: {
      return {
        ...state,
        categories: action.data.map(category => (
          {
            id: category.id,
            displayName: category.topic,
            url: category.url
          }
        ))
      }
    }
    case QUIZ_COMPLETE: {
      return {
        ...state,
        result: {
          experience: action.data.experience,
          points: action.data.points,
          result: action.data.result,
          url: action.data.imageUrl,
          name: action.data.name, 
          level: action.data.level
        }
      }
    }
    case CHALLENGE_USER_FOR_QUIZ: {
      return {
        ...state,
        challengeUserQuizData: {
          success: action.data.success,
          message: action.data.message,
        }
      }
    }

    case GET_QUIZ_BY_CATEGORY: {
      return {
        ...state,
        quizData: {
          questions: action.data.displayQuestionResponses.map(question => ({
            id: question.id,
            type: question.questionType,
            score: question.score,
            text: question.text,
            url: question.mediaUrl,
            options: question.displayAnswerResponseList.map(option => ({
              id: option.id,
              text: option.text
            })),
            correctAnswerId: question.answer
          })),
          metaInfo: {
            id: action.data.id,
            displayName: action.data.name,
            experience: action.data.experience,
            points: action.data.points,
            friends: action.data.usersAttending.map(friend => ({
              id: friend.id,
              imageUrl: friend.imageUrl
            })),
            quizCategory: {
              id: action.data.quizTopic.id,
              category: action.data.quizTopic.topic,
              url: action.data.quizTopic.url,
            },
            challengedUserInfo: action.data.challengedUser,
            activeUserInfo: action.data.activeUser
          }
        }
      }
    }
    default:
      return state;
  }
}