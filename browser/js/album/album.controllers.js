/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {
  $scope.showAlbum = false;
  var albumIdSelected;
  $rootScope.$on('viewSwap', function(event, args){
    if(args.type === 'Album'){
      loadAlbum(args.id);
      $scope.showAlbum = true;
    }
    else { $scope.showAlbum = false; }
  })
  // load our initial data
  var loadAlbum = function(albumId){
    AlbumFactory.fetchAll()
    .then(function (res) { return res.data; })
    .then(function (albums) {
      return AlbumFactory.fetchById(albumId);
    })
    .then(function (res) { return res.data; })
    .then(function (album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndex = i;
      });
      $scope.album = album;
      StatsFactory.totalTime(album)
      .then(function(totalTime){
        var minutes = "" + Math.floor(totalTime/60);
        var seconds = "" + Math.floor(totalTime % 60);
        if (seconds <= 9){
          seconds = "0" + seconds;
        }
        $scope.album.minutes = minutes;
        $scope.album.seconds = seconds;
      })
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound
  }


  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      // $rootScope.$broadcast('pause');
      PlayerFactory.pause();
    } else {
      if(PlayerFactory.currentSong===song){
        PlayerFactory.resume();
      } else {
        console.log($scope.album.songs);
        PlayerFactory.start(song, $scope.album.songs); }

      // $rootScope.$broadcast('play', song);
    }
  };

  $scope.isPlaying = PlayerFactory.isPlaying;
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;

});
