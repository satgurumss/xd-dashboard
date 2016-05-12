(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService) {
        $scope.errorAlert = false;
        $scope.hyprLoginClicked = false;
        $scope.isWebViewOpened = false;
        $scope.loginData = {
            userName: '',
            password:''
        }
        $scope.errorAlert = false;

        loggedInUser.isLoggedIn("/landing");
        console.log("in signin controller");
        console.log($window.WebViewBridge);
        if($window.WebViewBridge) {
            $scope.isWebViewOpened = true;
        }

        $scope.doLogin = function() {
            //$location.url("/landing");
            $window.location.href = "/loginAd";

            /*$http.post("/login", $scope.loginData)
                .success(function(data, status, headers, config) {
                    $location.url("/landing");
                })
                .error(function(data, status, headers, config) {
                    alert("error");
                })*/
        }

        $scope.signupClicked = function() {
            $location.url("/signup");
        }

        $scope.listenMessage = function(message) {
            alert('got a message from Native: ' + message);
            $window.WebViewBridge.send("message from webview response");
        }

        $scope.hyprLogin = function() {
          $scope.hyprLoginClicked = true;
          WebViewService.hyprLogin();
        }
    }

})();