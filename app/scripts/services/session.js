'use strict';

angular.module('castfmApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
