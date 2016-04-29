(function() {
  'use strict';

  angular.module('app')
    .controller('HeaderCtrl', ['$scope','$rootScope', '$http', '$location','loggedInUser', HeaderCtrl])

  function HeaderCtrl($scope, $rootScope, $http, $location, loggedInUser) {

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
    
    $scope.navigateTo = function(route){
      if($location.url() != route)
        $location.url(route);
    }

    $scope.logOut = function() {
    	loggedInUser.logOutUser();
    }
  }

})();
