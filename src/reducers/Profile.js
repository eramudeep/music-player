import { GET_USER_PROFILE, UPDATE_PROFILE_IMAGE } from "../actions/Profile/types";

const BASE_PATH = 'https://gothic-victor-254816.appspot.com'
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      {
        return {
          ...state,
          userProfile: {
            userData: {
              name: action.profile.userName,
              url: action.profile.imageUrl,
              gender: action.profile.gender,
              email: action.profile.email,
              phone: action.profile.phoneNumber,
              dateOfBirth: action.profile.dateOfBirth,
              profileId: action.profile.profileId
            },
            profileState: {
              level: action.profile.userLevel,
              points: action.profile.userPoints,
              experience: action.profile.userExperience
            },
            achievements: [],
            pushNotification: action.profile.pushNotification ? action.profile.pushNotification : false
          }

        }
      }
    case UPDATE_PROFILE_IMAGE: {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          userData: {
            ...state.userProfile.userData,
            url: action.url
          }
        }
      }
    }
    default:
      return state;
  }
}