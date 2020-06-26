import SearchApi from '../../api/SearchApi';
import { SONG_NAME, ALBUM_NAME, ARTIST_NAME } from './types'

export const FetchBySongFunc = (srhBySong) => ({
    type: SONG_NAME,
    payload: srhBySong
})

export const FetchByAlbumFunc = (srhByAlbum) => ({
    type: ALBUM_NAME,
    payload: srhByAlbum
})

export const FetchByArtistFunc = (srhByArtist) => ({
    type: ARTIST_NAME,
    payload: srhByArtist
})

// export const subAlbum = (subAlbum) => ({
//     type: SUB_ALBUM,
//     payload: subAlbum
// })

export const FetchBySong = (songName) => (
    (dispatch) => {
        console.log('******============================================', songName)
        SearchApi.getSearchBySong((response) => {
            console.log('getSearchBySong===============================', response)
            dispatch(FetchBySongFunc(response['data']['data']['content']))
        }, (err) => {
            console.log(err)
        }, songName)
    }
)

export const FetchByAlbum = (albumName) => (
    (dispatch) => {
        SearchApi.getSearchByAlbum((response) => {
            dispatch(FetchByAlbumFunc(response['data']['data']['content']))
        }, (err) => {
            console.log(err)
        }, albumName)
    }
)

export const FetchByArtist = (artistName) => (
    (dispatch) => {
        SearchApi.getSearchByArtist((response) => {
            dispatch(FetchByArtistFunc(response['data']['data']['content']))
        }, (err) => {
            console.log(err)
        }, artistName)
    }
)