import { RCV_TRENDING_PUBS, RCV_NEWS, RCV_EVENTS, GET_EVENTS, RCV_EVENT_DETAILS, CLEAR_EVENT_DETAILS} from "../actions/Discover/types";
// const BASE_PATH = 'https://gothic-victor-254816.appspot.com'
const BASE_PATH = '3.13.248.12:8080/solstreet'
export default function (state = {}, action) {
  switch (action.type) {
    case RCV_TRENDING_PUBS:
      return {
        ...state,
        pubs: action.pubs.map(pub => ({
          id: pub.id + '',
          imgUrl: pub.image_url,
        }))
      };
    case RCV_NEWS:
      return {
        ...state,
        news: action.news.map(news => ({
          id: news.newsId + '',
          imgUrl: news.newsImageUrl,
          name: news.newsTitle,
          description: news.newsBody
        }))
      };
    case RCV_EVENTS: {
      return {
        ...state,
        events: action.events.map(event => ({
          id: event.id + '',
          imgUrl: event.imgUrl,
          name: event.name,
          date: event.date,
          description: event.venue
        }))
      };
    }
    case RCV_EVENT_DETAILS: {
      return {
        ...state,
        event: {
          id: action.event.id,
          name: action.event.eventName,
          description: action.event.eventDescription,
          venue: action.event.eventVenue,
          city: action.event.eventCity,
          url: action.event.imageUrl,
          date: action.event.eventDate,
          time: action.event.eventTime,
          userList: action.event.userList,
          comments: action.event.commentsList.map((comment) => ({
            commentId: comment.commentId,
            commentText: comment.commentText,
            username: comment.username,
            userImageUrl: comment.userImageUrl,
            postedAgo: comment.postedAgo,
            replies: comment.replies.map((reply) => ({
              commentId: reply.commentId,
              commentText: reply.commentText,
              username: reply.username,
              userImageUrl: reply.userImageUrl,
              postedAgo: reply.postedAgo,
            }))
          }))
        }
      };
    }
    case CLEAR_EVENT_DETAILS: {
      return {
        ...state,
        event: {}
      }
    }
    default:
      return state;
  }
}