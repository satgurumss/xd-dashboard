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
       // $scope.isWebViewOpened = false;

        console.log("in signup controller");
        console.log($window.WebViewBridge);
        // if($window.WebViewBridge) {
        //     $scope.isWebViewOpened = true;
        // }

        $scope.doLogin = function() {
           //$location.url("/financial-dashboard");
           $location.url("/landing");
        }

        $scope.signupClicked = function() {
            $location.url("/signup");
        }

        $scope.listenMessage = function(message) {
            var index = message.indexOf("already registered");
            if(index > 0) {
                alert("Registeration failed: User is already registered.");
                return;
            }
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