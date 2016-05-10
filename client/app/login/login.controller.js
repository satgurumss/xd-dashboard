(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', 'loggedInUser', "$window", LoginCtrl])

    function LoginCtrl($scope, $rootScope, $http, $location, loggedInUser, $window) {
        $scope.loginData = {
            userName: '',
            password:''           
        }
        $scope.errorAlert = false;

        $scope.doLogin = function() {
            //$location.url("/landing");
            $window.location.href = "/login";

            /*$http.post("/login", $scope.loginData)
                .success(function(data, status, headers, config) {
                    $location.url("/landing");
                })
                .error(function(data, status, headers, config) {
                    alert("error");
                })*/
        }
    }

})();