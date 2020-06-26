import NotificationApi from '../../api/NotificationApi'
import { CHECK_NOTIFICATION, GET_ALL_NOTIFICATION, MARK_NOTIFICATION_READ} from './types'

export const checkNotificationCreater = (unreadNotificationCount) => {
  return {
    type: CHECK_NOTIFICATION,
    unreadNotificationCount
  }
}
export const getAllNotificationCreater = (notifications) => {
  console.log(notifications, 'notification from action')
  return {
    type: GET_ALL_NOTIFICATION,
    notifications
  }
}
export const markNotificationReadCreater = (id, flag) => {
  return {
    type: MARK_NOTIFICATION_READ,
    id,
    flag
  }
}
export const checkNotification = (successCallback, failureCallback) => {
  return (dispatch) => {
    NotificationApi.checkNotification((response) => {
      dispatch(checkNotificationCreater(response.data.counter))
    }, (err) => {
      console.log(err, ' error')
    })
  }
}
export const getAllNotification = () => {
  return (dispatch) => {
    NotificationApi.getAllNotification((response) => {
      dispatch(getAllNotificationCreater(response.data))
    }, (err) => {
      console.log(err, ' error')
    })
  }
}
export const notificationReadAction = (params) => {
  return (dispatch) => {
    NotificationApi.notificationReadAction((response) => {
      console.log('success')
    }, (err) => {
      console.log(err, ' error')
    }, params)
  }
}
