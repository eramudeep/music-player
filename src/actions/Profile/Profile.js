import ProfileApi from '../../api/ProfileApi'
import { GET_USER_PROFILE, UPDATE_PROFILE_IMAGE } from './types'

export const getUserProfileCreater = (profile) => {
  return {
    type: GET_USER_PROFILE,
    profile
  }
}
export const updateUserProfileImageCreater = (url) => {
  return {
    type: UPDATE_PROFILE_IMAGE,
    url
  }
}

export const fetchUserProfile = (successCallback, failureCallback) => {
  return (dispatch) => {
    ProfileApi.getUserProfile((response) => {
      dispatch(getUserProfileCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    })
  }
}
export const editUserProfile = (payload) => {
  return (dispatch) => {
    ProfileApi.editUserProfile((response) => {
      dispatch(getUserProfileCreater(response.data))
    }, err => console.log(err), payload)
  }
}

export const uploadProfileImage = (payload) => {
  return (dispatch) => {
    ProfileApi.uploadProfileImage((response) => {
      dispatch(updateUserProfileImageCreater(response.data.imageUrl))
    }, err => console.log(err, "error in image upload"), payload)
  }
}
