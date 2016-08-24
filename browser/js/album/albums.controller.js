/* global juke */
'use strict';

juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory) {
  $scope.albumsPressed = false;
  $rootScope.$on('viewSwap', function(event, args){
    if(args.type == 'Albums'){
      $scope.albumsPressed = true
    }
    else{
      $scope.albumsPressed = false;
    }

  });
  $scope.viewAlbum = function(albumId){
    $rootScope.$broadcast('viewSwap', { type: 'Album', id: albumId });
  }
  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (res) { return res.data; })
  .then(function (albums) {
    return albums.map(function(album){
      return AlbumFactory.fetchById(album.id);
    })
  })
  .then(function (albumPromises) {
    Promise.all(albumPromises)
    .then(function(albumArr){
      $scope.albums = albumArr.map(function(album){
        return album.data;
      });

      $scope.albums.forEach(function(album){
        album.imageUrl = '/api/albums/' + album.id + '/image';
      });
    })
   })
  .catch($log.error)
});
