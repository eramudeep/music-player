import AlbumApi from '../../api/AlbumApi';
import { MOST_DOWN, ALBUM, RANDOM_MOST_DOWN, LATEST, SUBCATEGORY, SELECTED_ALBUM_CONTENT, GET_ALBUM_BY_ARTIST, GET_CONTENTS_OF_ONE_ALBUM, GET_HEART_OR_NOT } from './types'

export const albums = (albums) => ({
    type: ALBUM,
    payload: albums
})

export const mostDownFunc = (mostDown) => ({
    type: MOST_DOWN,
    payload: mostDown
})

export const RandomMostDownFunc = (RandomMostDown) => ({
    type: RANDOM_MOST_DOWN,
    payload: RandomMostDown
})

export const latestFunc = (latest) => ({
    type: LATEST,
    payload: latest
})

export const SubcategoryFunc = (subcategory) => ({
    type: SUBCATEGORY,
    payload: subcategory
})

export const selectedAlbumContentFunc = (selectedAlbumContent) => ({
    type: SELECTED_ALBUM_CONTENT,
    payload: selectedAlbumContent
})

export const getAlbumByArtistFunc = (getAlbumByArtist) => ({
    type: GET_ALBUM_BY_ARTIST,
    payload: getAlbumByArtist
})

export const getContentsOfOneAlbumFunc = (getContentsOfOneAlbum) => ({
    type: GET_CONTENTS_OF_ONE_ALBUM,
    payload: getContentsOfOneAlbum
})

export const getHeartOrNotFunc = (getHeartOrNot) => ({
    type: GET_HEART_OR_NOT,
    payload: getHeartOrNot
})


export const FetchAlbums = (genreID, artistID, albumID) => (
    (dispatch) => {
        AlbumApi.getAllAlbums((response) => {
            dispatch(albums(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert(err, 'albumError'))
        }, genreID, artistID, albumID)
    }
)

export const FetchMostDown = (genreID) => (
    (dispatch) => {
        AlbumApi.getMostDown((response) => {
            //console.log('action Album.js===============================', response)
            dispatch(mostDownFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('mostDownError'))
        }, genreID)
    }
)

export const FetchRandomMostDown = (genreID) => (
    (dispatch) => {
        AlbumApi.getRandomMostDown((response) => {
            //console.log('action Album.js===============================', response)
            dispatch(RandomMostDownFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('mostDownError'))
        }, genreID)
    }
)

export const FetchLatest = (genreID) => (
    (dispatch) => {
        AlbumApi.getLatest((response) => {
            dispatch(latestFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('latestError'))
        }, genreID)
    }
)

export const FetchSubcategory = (genreID) => (
    (dispatch) => {
        AlbumApi.getSubcategory((response) => {
            dispatch(SubcategoryFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('subcategory Error'))
        }, genreID)
    }
)

export const FetchSelectedAlbumContent = (albumID) => (
    (dispatch) => {
        AlbumApi.getSelectedAlbumContent((response) => {
            console.log('response====start==========================')
            console.log(response['data']['data']['content'])
            console.log('response=====end=========================')
            dispatch(selectedAlbumContentFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('selectedAlbumContent Error'))
        }, albumID)
    }
)

export const FetchAlbumByArtist = (genreID, artistID) => (
    (dispatch) => {
        AlbumApi.getAlbumByArtist((response) => {
            dispatch(getAlbumByArtistFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('selectedAlbumContent Error'))
        }, genreID, artistID)
    }
)

export const FetchContentsOfOneAlbum = (contentID) => (
    (dispatch) => {
        AlbumApi.getContentsOfOneAlbum((response) => {
            dispatch(getContentsOfOneAlbumFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('selectedAlbumContent Error'))
        }, contentID)
    }
)

export const FetchHeartOrNot = (userID, contentID) => (
    (dispatch) => {
        AlbumApi.getHeartOrNot((response) => {
            console.log('===== Heart =====', response['data']['data']['content']);
            dispatch(getHeartOrNotFunc(response['data']['data']['content']))
        }, (err) => {
            //console.log(err, alert('selectedAlbumContent Error'))
        }, userID, contentID)
    }
)
