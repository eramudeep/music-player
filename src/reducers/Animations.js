export default function (state = {}, action) {
    switch (action.type) {
        case "animations":
            return {
                ...state,
                contents: action.payload
            };
        case "contentsgenre":
            return {
                ...state,
                contentsgenre: action.payload
            };
        case "favorcontent":
            return {
                ...state,
                favorcontent: action.payload
            };
        default:
            return state;
    }
}