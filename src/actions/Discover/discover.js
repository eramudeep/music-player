import DiscoverApi from '../../api/DiscoverApi'
import { RCV_TRENDING_PUBS, RCV_NEWS, RCV_EVENTS, CLEAR_EVENT_DETAILS, GET_EVENTS, RCV_EVENT_DETAILS } from './types'
export const rcvEventsCreater = (events) => {
  return {
    type: RCV_EVENTS,
    events
  }
}
export const rcvNewsCreater = (news) => ({
  type: RCV_NEWS,
  news
})

export const clearEventDetailCreater = () => ({
  type: CLEAR_EVENT_DETAILS
})

export const rcvTrendingPubsCreater = (pubs) => ({
  type: RCV_TRENDING_PUBS,
  pubs
})
export const rcvEventDetailCreater = (event) => ({
  type: RCV_EVENT_DETAILS,
  event
})

export const FetchEvents = (successCallback, failureCallback) => (
  (dispatch) => {
    DiscoverApi.getAllEvents((response) => {
      dispatch(rcvEventsCreater(response.data))
    }, (err) => {
    })
  }
)
export const FetchPubs = () => (
  (dispatch) => {
    DiscoverApi.getAllPubs((response) => {
      dispatch(rcvTrendingPubsCreater(response.data))
    }, (err) => {
      console.log(err, "error")
    })
  }
)
export const FetchNews = () => (
  (dispatch) => {
    DiscoverApi.getAllNews((response) => {
      dispatch(rcvNewsCreater(response.data))
    }, (err) => {
      console.log(err, "error")
    })
  }
)
export const fetchEventDetails = (id) => {
  return (dispatch) => {
    DiscoverApi.fetchEventDetails((response) => {
      dispatch(rcvEventDetailCreater(response.data))
    }, (err) => {
      console.log(err, "error")
    }, id)
  }
}
export const postComment = (successCallback, payload, params) => {
  return (dispatch) => {
    DiscoverApi.postComment((response) => {
      successCallback()
    }, (err) => {
      console.log(err, "error")
    }, payload, params)
  }
}
export const isInterestedForEvent = (id) => {
  return (dispatch) => {
    DiscoverApi.isInterestedForEvent((response) => {
    }, (err) => {
      console.log(err, "error")
    }, id)
  }
}