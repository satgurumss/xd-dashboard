(function() {
  'use strict';

  angular.module('app')
    .controller('HeaderCtrl', ['$scope','$rootScope', '$http', '$location','loggedInUser', HeaderCtrl])

  function HeaderCtrl($scope, $rootScope, $http, $location, loggedInUser) {
    console.log("header ctrl")
    $scope.currentUser = {};
    var picURL = "http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/";
    
    $rootScope.$on("reloadHeader",function(){
    	$scope.init();
    })
    
    $scope.init = function(){
    	$scope.currentUser = loggedInUser.getCurrentUser();
    	
    	if( ! _.isEmpty( $scope.currentUser ) )
    		$scope.currentUser.picture_s = picURL + $scope.currentUser.picture_s; 
      else
        loggedInUser.logOutUser();
    }

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }

    $scope.logOut = function() {
    	loggedInUser.logOutUser();
    }
  }

})();
