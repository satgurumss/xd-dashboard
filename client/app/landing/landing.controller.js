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

  function LandingCtrl($scope, $http, $location) {
    $scope.colors = ['transparent', '#FFF'];

    $scope.navigateTo = function(route){
      if($location.url() != route)
        $location.url(route);
    }

  }

})();