/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.isPlaying = PlayerFactory.isPlaying;
  $scope.next = PlayerFactory.next;
  $scope.previous = PlayerFactory.previous;
  $scope.getProgress = PlayerFactory.getProgress;
  $scope.toggle = function (song) {
    if ($scope.isPlaying()) PlayerFactory.pause();
    else{
      PlayerFactory.resume();
    }

  };

});
