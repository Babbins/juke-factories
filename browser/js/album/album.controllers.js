/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (res) { return res.data; })
  .then(function (albums) {
    return AlbumFactory.fetchById(albums[5].id);
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

  // // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // }

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; }
  //
  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing)
  //   // $rootScope.$broadcast('play', $scope.currentSong);
  // }
  // function next () { skip(1); }
  // function prev () { skip(-1); }

});
