(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location','loggedInUser', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $http, $location, loggedInUser) {
        $scope.userName = "";
        $scope.password = "";
        $scope.errorAlert = false;

        $scope.doLogin = function() {
           //$location.url("/financial-dashboard");
           $location.url("/landing");
        }
    }

})();