(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService) {
        $scope.userName = "";
        $scope.password = "";
        $scope.errorAlert = false;
        $scope.hyprLoginClicked = false;
        $scope.isWebViewOpened = false;

        console.log("in signin controller");
        console.log($window.WebViewBridge);
        if($window.WebViewBridge) {
            $scope.isWebViewOpened = true;
        }

        $scope.doLogin = function() {
           //$location.url("/financial-dashboard");
           $location.url("/landing");
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