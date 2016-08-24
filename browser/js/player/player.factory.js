'use strict';

juke.factory('PlayerFactory', function($http, $rootScope){

  var currentSong = null
  var audio = document.createElement('audio');
  var _songList;

  audio.addEventListener('ended', function () {
    PlayerFactory.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  }),
  audio.addEventListener('timeupdate', function () {
    $rootScope.progress = 100 * PlayerFactory.getProgress();
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });

  $rootScope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }


  var PlayerFactory = {
    isPlaying: function(){ return !audio.paused; },


    getCurrentSong: function(){ return currentSong },



    start: function (song, songList){

      if(songList) _songList = songList;
      console.log(_songList);
      // stop existing audio (e.g. other song) in any case
      PlayerFactory.pause();
      // resume current song
      if (song === currentSong) return audio.play();
      // enable loading new song
      currentSong = song;
      audio.src = song.audioUrl;
      audio.load();
      audio.play();
    },

    pause: function() {
        audio.pause();
    },

    resume: function(){
      audio.play();
    },

    next: function(){
      var indexOfCurrSong = _songList.indexOf(currentSong);
      if(indexOfCurrSong === _songList.length - 1) PlayerFactory.start(_songList[0], _songList);
      else{
        PlayerFactory.start(_songList[++indexOfCurrSong], _songList);
      }
    },
    previous: function(){
      var indexOfCurrSong = _songList.indexOf(currentSong);
      if(indexOfCurrSong === 0) PlayerFactory.start(_songList[_songList.length - 1], _songList);
      else{
        PlayerFactory.start(_songList[--indexOfCurrSong], _songList);
      }
    },
    getProgress: function(){
      if(!currentSong){
        return 0;
      }
      return audio.currentTime/audio.duration
    }
  }
  return PlayerFactory
});
