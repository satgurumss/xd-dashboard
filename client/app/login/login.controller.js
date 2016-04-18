(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$http', 'backendApi', '$location','loggedInUser', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $http, backendApi, $location, loggedInUser) {
        $scope.userName = "";
        $scope.password = "";
        $scope.errorAlert = false;

        $scope.doLogin = function() {
           $location.url("/dashboard");
        }
    }

})();