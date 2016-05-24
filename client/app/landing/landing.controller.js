(function() {
  'use strict';

  angular.module('app')
    .controller('LandingCtrl', ['$scope', '$http', '$location', "gaugesService", "loggedInUser", LandingCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function LandingCtrl($scope, $http, $location, gaugesService, loggedInUser) {
    $scope.userRole = "";
    $scope.gauges = {};

    $scope.navigateTo = function(route) {
      if ($location.url() != route)
        $location.url(route);
    }

    $scope.init = function() {
      loggedInUser.isLoggedIn("/landing");

      loggedInUser.fetchCurrentUser()
      .success(function(data, status, headers, config) {
        $scope.userRole = data.userRole
        populateGaugeData($scope.userRole);
      })
      .error(function(data, status, headers, config) {
        $location.url("#/")
      })
    }

    var populateGaugeData = function(userRole){

      switch (userRole){
        case "CEO":
          $scope.gauges = {
            organization: {
              percent: 25,
              text: 30
            },
            hr_dept: {
              percent: 50
            },
            fin_dept: {
              percent: 80
            },
            brd_dept: {
              percent: 25
            },
            tech_dept: {
              percent: 70
            },
            vendors: {
              percent: 50
            }
          };
        break

        case "SLMGR":
        case "FLDSL":
          $scope.gauges = {
            finance: {
              percent: 50
            },
            customers: {
              percent: 75
            },
            people: {
              percent: 80,
              text: "15d"
            },
            projects: {
              percent: 50
            }
          };
        break
      }
      $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

  }

})();