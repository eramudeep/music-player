import { LOGIN, GET_AUTHED_USER } from "../actions/Auth/types";


export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      {
        return {
          ...state,
          authedUser: action.authedUser
        }
      }
    case GET_AUTHED_USER:
      {
        return state.authedUser ? state.authedUser : false
      }
    default:
      return state;
  }
}