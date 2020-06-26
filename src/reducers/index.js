import { combineReducers } from "redux";
import DiscoverReducer from './Discover'
import ProfileReducer from './Profile'
import Notification from './Notification'
import LeaderBoard from './LeaderBoard'
import Quiz from './Quiz'
import Auth from './Auth'
import Common from './common'
import Friend from './Friend'
import Animations from './Animations'
import Languages from './Languages'
import Album from './album'
import TopPlayed from './TopPlayed'
import SearchBy from "./Search";

export default combineReducers({
  discover: DiscoverReducer,
  profile: ProfileReducer,
  notification: Notification,
  leaderboard: LeaderBoard,
  auth: Auth,
  quiz: Quiz,
  common: Common,
  Friend: Friend,
  animations:Animations,
  Languages:Languages,
  album:Album,
  topPlayed: TopPlayed,
  searchBy: SearchBy,
});