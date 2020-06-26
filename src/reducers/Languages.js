export default function (state = {}, action) {
  switch (action.type) {
    case "language":
      {
        return {
          ...state,
          stringtype:action.payload
         }
      }
  
    default:
      return state;
  }
}