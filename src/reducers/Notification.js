import { CHECK_NOTIFICATION, GET_ALL_NOTIFICATION,MARK_NOTIFICATION_READ } from "../actions/Notification/types";

export default function (state = {}, action) {
  switch (action.type) {
    case CHECK_NOTIFICATION:
      {
        return {
          ...state,
          unreadNotificationCounter: action.unreadNotificationCount
        }
      }
      case MARK_NOTIFICATION_READ:
      {
        let notification  = state.notifications.filter(notification => notification.id === action.id)[0]
        notification.action = action.flag
        return {
          ...state,
          notifications: [...state.notifications]
        }
      }
    case GET_ALL_NOTIFICATION:
      {
        console.log(action.notifications, "reducers")
        return {
          ...state,
          notifications: action.notifications.map((notification) => ({
            id: notification.id,
            text: notification.notificationText,
            avatarUrl: notification.imageUrl,
            time: notification.postedAgo,
            type: notification.notificationType,
            eventId: notification.eventId,
            quizId: notification.quizId,
            challengedUserId: notification.challengedUserId,
            action: notification.action
          }))
        }
      }
    default:
      return state;
  }
}