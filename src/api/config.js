export const BASE_PATH ='http://192.168.225.190:8000' //'http://192.168.110.249:8000'"https://metrend.net:8000" // 
export default {
  auth: {
    login: BASE_PATH + '/api/users/login'
  },
  api: {
     getAllContents: BASE_PATH + '/api/getAllContent',
     getContentsGenre: BASE_PATH + '/api/content/genre',
     getfavorcontent: BASE_PATH + '/api/getfavoriteContent',
     getAllAlbums: BASE_PATH + '/api/content/artist',
     getMostDown: BASE_PATH + '/api/content/mostDown',
     getRandomMostDown: BASE_PATH + '/api/content/randomMostDown',
     getLatest: BASE_PATH + '/api/content/latest',
     getSubcategory: BASE_PATH + '/api/content/subcategory',
     getSelectedAlbumContent: BASE_PATH + '/api/content/selectedAlbumContent',
     getAllTopPlayed: BASE_PATH + '/api/content/topPlayed',
     getTotalTopPlayed: BASE_PATH + '/api/getTotalTopPlayed',//
     getIraqiTotalTopPlayed: BASE_PATH + '/api/getIraqiTotalTopPlayed',//
     getArabicTotalTopPlayed: BASE_PATH + '/api/getArabicTotalTopPlayed',//
     getArtist: BASE_PATH + '/api/getArtist',//
     getArtistContent: BASE_PATH + '/api/getArtistContent',//
     getOtherArtist: BASE_PATH + '/api/getOtherArtist',//
     getLatestPlayed: BASE_PATH + '/api/getLatestPlayed',//
     getRandomTop: BASE_PATH + '/api/content/getRandomTop',//
     getSearchBySong: BASE_PATH + '/api/getSearchBySong',//
     getSearchByAlbum: BASE_PATH + '/api/getSearchByAlbum',//
     getSearchByArtist: BASE_PATH + '/api/getSearchByArtist',//
     getArtistCount: BASE_PATH + '/api/getArtistCount',//
     getAlbumByArtist: BASE_PATH + '/api/getAlbumByArtist',//
     getContentsOfOneAlbum: BASE_PATH + '/api/getContentsOfOneAlbum',//
     getHeartOrNot: BASE_PATH + '/api/getHeartOrNot',//
     getUserName: BASE_PATH + '/api/getUserName',//
  }
}
