(function() {
  'use strict';

  angular.module('app')
    .controller('LandingCtrl',
      ['$scope', '$http', '$location', LandingCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function LandingCtrl($scope, $http, $timeout) {
    $scope.init = function(){
    }

  }

})();