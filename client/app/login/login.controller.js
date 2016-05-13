(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', '$timeout', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService, $timeout) {
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
                    alert($scope.errorAlert)
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

        $scope.isActiveDirectory = function(emailModel) {
            console.log("isActiveDirectory")
            var email = angular.copy($scope.loginData.email),
                directory = "netorgft998123";
            if(email != "" && email.substring(directory) > -1)
                $scope.doADLogin()
        }
    }

})();