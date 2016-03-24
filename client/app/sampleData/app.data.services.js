(function () {
    'use strict';

    angular.module('app.data.services')
        .factory('dealsFactory', dealData)

    function dealData($scope,$http) {
     return {
            get: function () {
                console.log("inside function");
                return $http.get('/app/sampleData/deal.json');
            }
        };
    }


})(); 