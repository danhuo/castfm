'use strict';

angular.module('castfmApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/channels').success(function(channels) {
      $scope.channels = channels;
    });
  });
