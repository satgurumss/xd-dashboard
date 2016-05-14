(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', '$timeout', "$log", LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService, $timeout, $log) {
        var ctrl = this;

        $scope.signInError = false;
        $scope.hyprLoginClicked = false;
        $scope.loginData = {
            email: '',
            password:''
        };

        loggedInUser.isLoggedIn("/landing");

        var showError = function(){
            ctrl.signInError = true;
        }

        $scope.doADLogin = function() {
            $window.location.href = "/loginAd";
        }

        $scope.doLocalLogin = function() {
            $http.post("/local-login", $scope.loginData)
              .success(function(data, status, headers, config) {
                if(data){
                    $location.url("/landing");
                }
                else{
                    ctrl.signInError = true;
                }
              })
              .error(function(data, status, headers, config) {
                ctrl.signInError = true;
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
            $scope.signInError = false
            var email = angular.copy($scope.loginData.email),
                directory = "netorgft998123";

            if(typeof email != "undefined" && email != "" && email.indexOf(directory) > -1)
                $scope.doADLogin();
        }
    }

})();