(function() {
    'use strict';

    angular.module('app')
        .controller('SignupCtrl', ['$scope', '$rootScope', '$window', '$http', '$location','loggedInUser', 'WebViewService', SignupCtrl])

    function SignupCtrl($scope, $rootScope, $window, $http, $location, loggedInUser, WebViewService) {
        $scope.userName = "";
        $scope.password = "";
        $scope.errorAlert = false;
        $scope.hyprname = null;
        $scope.hyprLoginClicked = false;
        $scope.isWebViewOpened = false;

        console.log("in signup controller");
        console.log($window.WebViewBridge);
        if($window.WebViewBridge) {
            alert("webview");
            $scope.isWebViewOpened = true;
            // $window.WebViewBridge.onMessage = function (message) {
            //     alert("webview response");
            //     alert(message);
            //     WebViewService.responseHandler(message);
            // };
        }

        $scope.doLogin = function() {
           //$location.url("/financial-dashboard");
           $location.url("/landing");
        }

        $scope.signupClicked = function() {
            $location.url("/signup");
        }

        $scope.listenMessage = function(message) {
            WebViewService.responseHandler(message);
        }

        $scope.hyprRegister = function(hyprUsername) {
          // $scope.hyprLoginClicked = true;
          if(hyprUsername)  {
              WebViewService.hyprRegister(hyprUsername);
          } else {
            alert("Please enter username");
          }
        }
    }

})();