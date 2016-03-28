(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$http', 'backendApi', '$location','loggedInUser', LoginCtrl])

    function LoginCtrl($scope, $rootScope, $http, backendApi, $location, loggedInUser) {
        $scope.userName = "";
        $scope.errorAlert = false;

        $scope.doLogin = function() {
            backendApi.doLogin()
                .then(
                    function(res) {
                        console.log(res);
                        var userData = res.data.documents,
                            user = _.find(userData, function(user){
                                            return user.fields.account_s[0] === $scope.userName;
                                        });
                        console.log(user);
                        if (typeof user != 'undefined') {
                            loggedInUser.setCurrentUser(user);
                            $rootScope.$emit("reloadHeader",{});
                            $location.url("/dashboard");
                        } else {
                            $scope.errorAlert = true;
                        }
                    }
                )
        }
    }

})();