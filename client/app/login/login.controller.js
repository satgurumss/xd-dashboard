(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', '$timeout', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService, $timeout) {
        $scope.errorAlert = false;
        $scope.hyprLoginClicked = false;
        $scope.loginData = {
            userName: '',
            password:''
        }

        $scope.errorAlert = false;

        loggedInUser.isLoggedIn("/landing");

        $scope.doLogin = function() {
            $window.location.href = "/loginAd";
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
    }

})();