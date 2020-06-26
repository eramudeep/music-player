import { GET_ALL_FRIENDS } from './types.js'
import { firstLoginActionCreater } from '../Common/Common'
import FrienApi from '../../api/Friend'

export const getAllFriendsCreater = (data) => ({
  type: GET_ALL_FRIENDS,
  data
})

export const getAllFriends = () => {
  return (dispatch) => {
    FrienApi.getAllFriends((response) => {
      dispatch(getAllFriendsCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    })
  }
}
