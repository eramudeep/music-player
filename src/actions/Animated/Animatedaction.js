import AnimatedApi from '../../api/AnimationApi'
import { RCV_TRENDING_PUBS, RCV_NEWS, RCV_EVENTS, CLEAR_EVENT_DETAILS, GET_EVENTS, RCV_EVENT_DETAILS } from './types'

export const animations = (animations) => ({
  type: "animations",
  payload:animations
})

export const contentsgenre = (contentsgenre) => ({
  type: "contentsgenre",
  payload:contentsgenre
})

export const favorcontent = (favorcontent) => ({
  type: "favorcontent",
  payload:favorcontent
})

export const FetchContents = () => (
  (dispatch) => {
   AnimatedApi.getAllContents((response) => {
     dispatch(animations(response['data']['data']['content']))
     
    }, (err) => {
      //console.log(err,alert(err, ' error'))
    })
  }
)

export const FetchfavourContentsgenre = (userID) => (
  (dispatch) => {
   AnimatedApi.getfavorcontent((response) => {
     dispatch(favorcontent(response['data']['data']['content']))
     
    }, (err) => {
      //console.log(err,alert(err, ' error'))
    }, userID)
  }
)

export const FetchContentsgenre = (genre) => (
  (dispatch) => {
   AnimatedApi.getContentsGenre((response) => {
     dispatch(contentsgenre(response['data']['data']['content']))
     
    }, (err) => {
      //console.log(err,alert(err, ' error'))
    },genre)
  }
)

