(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', '$timeout', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService, $timeout) {
        $scope.showPage = false;
        $timeout(function() {
            $scope.showPage = true;
            if($window.WebViewBridge) {
                $rootScope.isWebViewOpened = true;
            }
        }, 1000);
        $scope.errorAlert = false;
        $scope.hyprLoginClicked = false;
        $rootScope.isWebViewOpened = false;
        $scope.loginData = {
            userName: '',
            password:''
        }
        $rootScope.isTouchIdSupported = false;
        $scope.errorAlert = false;

        loggedInUser.isLoggedIn("/landing");
        if($window.WebViewBridge) {
            $rootScope.isWebViewOpened = true;
        }

        $scope.doLogin = function() {
            $window.location.href = "/loginAd";
        }

        $scope.signupClicked = function() {
            $location.url("/signup");
        }

        $scope.listenMessage = function(message) {
            if(message === "touch_supported") {
                $rootScope.isTouchIdSupported = true;
                return;
            } else if(message === "touch_not_supported") {
                $rootScope.isTouchIdSupported = false;
                return;
            }
            WebViewService.responseHandler(message);
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