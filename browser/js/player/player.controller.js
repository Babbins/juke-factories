/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');


  // state
  // $scope.currentSong;
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.isPlaying = PlayerFactory.isPlaying;
  $scope.next = PlayerFactory.next;
  $scope.previous = PlayerFactory.previous;
  $scope.getProgress = PlayerFactory.getProgress;
  // $scope.playing = false;

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.isPlaying()) PlayerFactory.pause();
    else{
      PlayerFactory.resume();
    }
    // else {
    //   AlbumFactory.fetchById(song.albumId)
    //   .then( (res) => { return res.data })
    //   .then( (album) => {
    //     console.log(album.songs);
    //     PlayerFactory.start(song, album.songs);
    //   })
    //};
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

  // function seek (decimal) {
  //   audio.currentTime = audio.duration * decimal;
  // }
  //
  // $scope.handleProgressClick = function (evt) {
  //   seek(evt.offsetX / evt.currentTarget.scrollWidth);
  // };

});
