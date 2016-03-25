(function () {
  'use strict';

  angular.module('app')
    .factory('backendApi', requests)

  function requests($http) {
    console.log("services.js")
    var url = "http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/searchApi/search";
    return {
      search: function ( data ) {

        console.log("inside function");
        return $http.post( url, JSON.stringify( data ) );
      }
    };
  }


})();
