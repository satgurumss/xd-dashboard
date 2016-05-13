(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', '$timeout', "$log", LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService, $timeout, $log) {
        $scope.errorAlert = false;
        $scope.hyprLoginClicked = false;
        $scope.loginData = {
            email: '',
            password:''
        }

        $scope.errorAlert = false;

        loggedInUser.isLoggedIn("/landing");

        $scope.doADLogin = function() {
            $window.location.href = "/loginAd";
        }

        $scope.doLocalLogin = function() {
            $http.post("/local-login", $scope.loginData)
              .success(function(data, status, headers, config) {
                if(data)
                    $location.url("/landing");
                else{
                    $scope.errorAlert = true;
                }
              })
              .error(function(data, status, headers, config) {
                $scope.errorAlert = true;
              })
        }

        $scope.signupClicked = function() {
            $location.url("/signup");
        }

        $scope.hyprLogin = function() {
            var hyprUsername = "aaaa";
            if(hyprUsername)  {
              WebViewService.hyprLogin(hyprUsername);
              } else {
                alert("Please enter username");
              }
        }

        $scope.isActiveDirectory = function() {
            var email = angular.copy($scope.loginData.email),
                directory = "netorgft998123";

            if(typeof email != "undefined" && email != "" && email.indexOf(directory) > -1)
                $scope.doADLogin();
        }
    }

})();