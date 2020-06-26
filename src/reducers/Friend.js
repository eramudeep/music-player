import { GET_ALL_FRIENDS } from "../actions/Friends/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_FRIENDS:
            {
                return {
                    ...state,
                    friend: action.data.map(value => (
                        {
                            id: value.id,
                            imageUrl: value.imageUrl,
                            name: value.username
                        }
                    ))
                }
            }
        default:
            return state;
    }
}

