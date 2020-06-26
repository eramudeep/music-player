import {FIRST_LOGIN} from "../actions/Common/types";


export default function (state = {}, action) {
  switch (action.type) {
    case FIRST_LOGIN:
      {
        return {
          ...state,
          firstLogin: action.flag
        }
      }
    default:
      return state;
  }
}