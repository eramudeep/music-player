import { GET_LEADERBOARD_DATA } from "../actions/LeaderBoard/types";


export default function (state = {}, action) {
  console.log(action.data, 'data')
  switch (action.type) {
    case GET_LEADERBOARD_DATA:
      {
        return {
          ...state,
          leaderBoardData: {
            userData: {
              name: action.data.userName,
              url: action.data.imageUrl,
              points: action.data.points,
              level: action.data.levels,
              experience: action.data.experience
            },
            userList: action.data.topUsersList.map(item => (
              {
                id: item.id,
                name: item.userName,
                rank: item.rank,
                city: item.city,
                url: item.imageUrl,
                points: item.points
              }
            ))
          }
        }
      }
    default:
      return state;
  }
}