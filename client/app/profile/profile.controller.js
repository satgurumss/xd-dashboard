(function() {
    'use strict';

    angular.module('app')
        .controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'backendApi', '$location','loggedInUser', ProfileCtrl])

    function ProfileCtrl($scope, $rootScope, $http, backendApi, $location, loggedInUser) {
    		$scope.currentUser = {};

        $scope.init = function() {
        	console.log("profile init")
		      //use this to get current user
		      $scope.currentUser = loggedInUser.getCurrentUser();
		      if (!_.isEmpty($scope.currentUser)) {

		        $scope.currentUser.account_s[0];
		      } else
		        loggedInUser.logOutUser();
		    }
    }

})();