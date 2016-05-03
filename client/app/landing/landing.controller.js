(function() {
  'use strict';

  angular.module('app')
    .controller('LandingCtrl',
      ['$scope', '$http', '$location', "gaugesService", LandingCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function LandingCtrl($scope, $http, $location, gaugesService) {
    $scope.gauges = {
      finance:{
        percent: 25
      },
      customers:{
        percent: 75
      },
      people:{
        percent: 50
      },
      projects:{
        percent: 50
      }
    };

    $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));

    $scope.navigateTo = function(route){
      if($location.url() != route)
        $location.url(route);
    }

  }

})();