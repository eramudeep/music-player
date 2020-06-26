import config from './config';
import apiCall from './apiUtils/makeApiCall'

export default {

    
    getSearchBySong(callback, fail, songName) {
        apiCall.makeGetRequest(config.api.getSearchBySong + '/' + songName.toString(), callback, fail);
    },
    
    getSearchByAlbum(callback, fail, albumName) {
        apiCall.makeGetRequest(config.api.getSearchByAlbum + '/' + albumName.toString(), callback, fail);
    },
    
    getSearchByArtist(callback, fail, artistName) {
        apiCall.makeGetRequest(config.api.getSearchByArtist + '/' + artistName.toString(), callback, fail);
    },


}