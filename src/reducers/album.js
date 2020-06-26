export default function (state = {}, action) {
    switch (action.type) {
        case "ALBUM":
            return {
                ...state,
                albums: action.payload
            };
        case "MOST_DOWN":
            return {
                ...state,
                mostDown: action.payload
            };
        case "RANDOM_MOST_DOWN":
            return {
                ...state,
                randomMostDown: action.payload
            };
        case "TOTAL_TOP_PLAYED":
            return {
                ...state,
                totalTopPlayed: action.payload
            };
        case "LATEST":
            return {
                ...state,
                latest: action.payload
            };
        case "SUBCATEGORY":
            return {
                ...state,
                subcategory: action.payload
            };
        case "SELECTED_ALBUM_CONTENT":
            return {
                ...state,
                selectedAlbumContent: action.payload
            };
        case "GET_ALBUM_BY_ARTIST":
            return {
                ...state,
                getAlbumByArtist: action.payload
            };
        case "GET_CONTENTS_OF_ONE_ALBUM":
            return {
                ...state,
                getContentsOfOneAlbum: action.payload
            };
        case "GET_HEART_OR_NOT":
            return {
                ...state,
                getHeartOrNot: action.payload
            };
        default:
            return state;
    }
}