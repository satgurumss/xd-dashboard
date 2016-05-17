(function() {
  'use strict';

  angular.module('app')
    .controller('HeaderCtrl', ['$scope', '$rootScope', '$http', '$location', 'loggedInUser', HeaderCtrl])

  function HeaderCtrl($scope, $rootScope, $http, $location, loggedInUser) {
    $scope.userRole = "";

    $scope.$on('userLoggedIn', function(event, args) {
      $scope.userRole = args.userRole;
    });

/*    $scope.init = function() {
      loggedInUser.fetchCurrentUser()
        .success(function(data, status, headers, config) {
          $scope.userRole = data.userRole;
        })
        .error(function(data, status, headers, config) {
          $location.url("#/")
        })
    }*/

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }

    $scope.navigateTo = function(route) {
      if ($location.url() != route)
        $location.url(route);
    }

    $scope.logOut = function() {
      loggedInUser.logOutUser();
    }
  }

})();