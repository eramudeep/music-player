import AlbumApi from '../../api/AlbumApi';
import { TOPPLAYED, TOTAL_TOP_PLAYED, RANDOM_TOP, ARTIST, LATESTPLAYED, OTHERARTIST, USER, ARTIST_CONTENT, IRAQI_TOTAL_TOP_PLAYED, ARABIC_TOTAL_TOP_PLAYED } from './types'

export const topPlayedFunc = (topPlayed) => ({
    type: TOPPLAYED,
    payload: topPlayed
})

export const totalTopPlayedFunc = (totalTopPlayed) => ({
    type: TOTAL_TOP_PLAYED,
    payload: totalTopPlayed
})

export const iraqiTotalTopPlayedFunc = (iraqiTotalTopPlayed) => ({
    type: IRAQI_TOTAL_TOP_PLAYED,
    payload: iraqiTotalTopPlayed
})

export const arabicTotalTopPlayedFunc = (arabicTotalTopPlayed) => ({
    type: ARABIC_TOTAL_TOP_PLAYED,
    payload: arabicTotalTopPlayed
})

export const randomTopFunc = (randomTop) => ({
    type: RANDOM_TOP,
    payload: randomTop
})

export const artistFunc = (artist) => ({
    type: ARTIST,
    payload: artist
})

export const LatestPlayedFunc = (latestPlayed) => ({
    type: LATESTPLAYED,
    payload: latestPlayed
})

export const otherArtistFunc = (otherArtist) => ({
    type: OTHERARTIST,
    payload: otherArtist
})

export const userFunc = (user) => ({
    type: USER,
    payload: user
})

export const artistContentFunc = (artistContent) => ({
    type: ARTIST_CONTENT,
    payload: artistContent
})



export const FetchTopPlayed = (genre, userID) => (
    (dispatch) => {
        console.log('=========userID===================',userID)
        AlbumApi.getAllTopPlayed((response) => {
            console.log('999999999999999999999999', response['data']['data']['content'])
            console.log('999999999999999999999999')
            dispatch(topPlayedFunc(response['data']['data']['content']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, genre, userID)
    }
)

export const FetchTotalTopPlayed = () => (
    (dispatch) => {
        AlbumApi.getTotalTopPlayed((response) => {
            console.log('totalTopPlayedFunc===============================', response['data']['data']['content'])
            dispatch(totalTopPlayedFunc(response['data']['data']['content']))
        }, (err) => {
            console.log(err)
        })
    }
)

export const FetchIraqiTotalTopPlayed = () => (
    (dispatch) => {
        AlbumApi.getIraqiTotalTopPlayed((response) => {
            console.log('totalTopPlayedFunc===============================', response['data']['data']['content'])
            dispatch(iraqiTotalTopPlayedFunc(response['data']['data']['content']))
        }, (err) => {
            console.log(err)
        })
    }
)

export const FetchArabicTotalTopPlayed = () => (
    (dispatch) => {
        AlbumApi.getArabicTotalTopPlayed((response) => {
            console.log('totalTopPlayedFunc===============================', response['data']['data']['content'])
            dispatch(arabicTotalTopPlayedFunc(response['data']['data']['content']))
        }, (err) => {
            console.log(err)
        })
    }
)

export const FetchRandomTop = (randomTop) => (
    (dispatch) => {
        AlbumApi.getRandomTop((response) => {
            console.log('Artist_Count*************************************************', response)
            dispatch(randomTopFunc(response['data']['data']['content']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, randomTop)
    }
)

export const FetchArtist = () => (
    (dispatch) => {
        AlbumApi.getArtist((response) => {
            // console.log('******************----++++', response)
            dispatch(artistFunc(response['data']['data']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, )
    }
)

export const FetchLatestContents = (userID) => (
    (dispatch) => {
        AlbumApi.getLatestPlayed((response) => {
            dispatch(LatestPlayedFunc(response['data']['data']['content']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, userID)
    }
)

export const FetchOtherArtist = (genreID) => (
    (dispatch) => {
        AlbumApi.getOtherArtist((response) => {
            dispatch(otherArtistFunc(response['data']['data']['content']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, genreID)
    }
)

export const FetchUserName = (userID) => (
    (dispatch) => {
        AlbumApi.getUserName((response) => {
            dispatch(userFunc(response['data']['data']['content']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, userID)
    }
)

export const FetchArtistContent = (artistID) => (
    (dispatch) => {
        AlbumApi.getArtistContent((response) => {
            console.log("response['data']['data']==============", response['data']['data'])
            dispatch(artistContentFunc(response['data']['data']))
        }, (err) => {
            // console.log(err, alert(err, 'albumError'))
            console.log(err)
        }, artistID)
    }
)