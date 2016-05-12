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

        $scope.hyprRegister = function() {
          // $scope.hyprLoginClicked = true;
          if($scope.hyprname)  {
              WebViewService.hyprRegister($scope.hyprname);
          } else {
            alert("Please enter username");
          }
        }
    }

})();