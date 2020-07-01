import config from './config';
import apiCall from './apiUtils/makeApiCall'

export default {
    getAllAlbums(callback, fail, genreID, artistID, albumID) {
        apiCall.makeGetRequest(config.api.getAllAlbums + '/' + genreID.toString() + '/' + artistID.toString() + '/' + albumID.toString(), callback, fail);
    },

    getMostDown(callback, fail, genreID) {
        apiCall.makeGetRequest(config.api.getMostDown + '/' + genreID.toString(), callback, fail);
    },

    getRandomMostDown(callback, fail, genreID) {
        apiCall.makeGetRequest(config.api.getRandomMostDown + '/' + genreID.toString(), callback, fail);
    },

    getLatest(callback, fail, genreID) {
        apiCall.makeGetRequest(config.api.getLatest + '/' + genreID.toString(), callback, fail);
    },

    getSubcategory(callback, fail, genreID) {
        apiCall.makeGetRequest(config.api.getSubcategory + '/' + genreID.toString(), callback, fail);
    },

    getSelectedAlbumContent(callback, fail, albumID) {
        apiCall.makeGetRequest(config.api.getSelectedAlbumContent + '/' + albumID.toString(), callback, fail);
    },

    getAllTopPlayed(callback, fail, genre, userID) {
        apiCall.makeGetRequest(config.api.getAllTopPlayed + '/' + genre.toString() + '/' + userID.toString(), callback, fail);
    },

    getRandomTop(callback, fail, genre) {
        apiCall.makeGetRequest(config.api.getRandomTop + '/' + genre.toString(), callback, fail);
    },

    getTotalTopPlayed(callback, fail) {
        apiCall.makeGetRequest(config.api.getTotalTopPlayed, callback, fail);
    },

    getIraqiTotalTopPlayed(callback, fail) {
        apiCall.makeGetRequest(config.api.getIraqiTotalTopPlayed, callback, fail);
    },

    getArabicTotalTopPlayed(callback, fail) {
        apiCall.makeGetRequest(config.api.getArabicTotalTopPlayed, callback, fail);
    },

    getArtist(callback, fail, genreID) {
        apiCall.makeGetRequest(config.api.getArtist + '/' + genreID.toString(), callback, fail);
    },

    getLatestPlayed(callback, fail, userID) {
        apiCall.makeGetRequest(config.api.getLatestPlayed + '/' + userID.toString(), callback, fail);
    },

    getOtherArtist(callback, fail, genreID) {
        apiCall.makeGetRequest(config.api.getOtherArtist + '/' + genreID.toString(), callback, fail);
    },

    getAlbumByArtist(callback, fail, genreID, artistID) {
        apiCall.makeGetRequest(config.api.getAlbumByArtist + '/' + genreID.toString() + '/' + artistID.toString(), callback, fail);
    },

    getContentsOfOneAlbum(callback, fail, contentID) {
        apiCall.makeGetRequest(config.api.getContentsOfOneAlbum + '/' + contentID.toString(), callback, fail);
    },

    getHeartOrNot(callback, fail, userID, contentID) {
        apiCall.makeGetRequest(config.api.getHeartOrNot + '/' + userID.toString() + '/' + contentID.toString(), callback, fail);
    },

    getUserName(callback, fail, userID) {
        apiCall.makeGetRequest(config.api.getUserName + '/' + userID.toString(), callback, fail);
    },

    getArtistContent(callback, fail, artistID) {
        apiCall.makeGetRequest(config.api.getArtistContent + '/' + artistID.toString(), callback, fail);
    },


}
