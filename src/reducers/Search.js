export default function (state = {}, action) {
    switch (action.type) {
        case "SONG_NAME":
            return {
                ...state,
                searchBySong: action.payload
            }
        case "ALBUM_NAME":
            return {
                ...state,
                searchByAlbum: action.payload
            }
        case "ARTIST_NAME":
            return {
                ...state,
                searchByArtist: action.payload
            }
    
        default:
            return state;
    }
}