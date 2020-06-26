export default function (state = {}, action) {
    switch (action.type) {
        case "TOPPLAYED":
            return {
                ...state,
                topPlayed: action.payload
            };
        case "TOTAL_TOP_PLAYED":
            return {
                ...state,
                totalTopPlayed: action.payload
            };
        case "IRAQI_TOTAL_TOP_PLAYED":
            return {
                ...state,
                iraqiTotalTopPlayed: action.payload
            };
        case "ARABIC_TOTAL_TOP_PLAYED":
            return {
                ...state,
                arabicTotalTopPlayed: action.payload
            };
        case "RANDOM_TOP":
            return {
                ...state,
                randomTop: action.payload
            };
        case "ARTIST":
            return {
                ...state,
                artist: action.payload
            };
        case "LATESTPLAYED":
            return {
                ...state,
                latestPlayed: action.payload
            };
        case "OTHERARTIST":
            return {
                ...state,
                otherArtist: action.payload
            };
        case "USER":
            return {
                ...state,
                user: action.payload
            };
        case "ARTIST_CONTENT":
            return {
                ...state,
                artistContent: action.payload
            };
        default:
            return state;
    }
}