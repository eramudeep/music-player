import { GET_LEADERBOARD_DATA } from './types.js'
import LeaderBoardApi from '../../api/LeaderBoardApi.js'
export const getLeaderBoardDataCreater = (data) => ({
  type: GET_LEADERBOARD_DATA,
  data
})

export const getLeaderBoardData = (params) => {
  return (dispatch) => {
    LeaderBoardApi.getLeaderBoardData((response) => {
      console.log(response, 'awesome')
      dispatch(getLeaderBoardDataCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    }, params)
  }
}