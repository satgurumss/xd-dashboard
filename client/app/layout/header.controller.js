(function() {
  'use strict';

  angular.module('app')
    .controller('HeaderCtrl', ['$scope', '$http', '$location', HeaderCtrl])

  function HeaderCtrl($scope, $http, $location) {
    console.log("header ctrl")

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
  }

})();
