(function () {
    'use strict';

    angular.module('app')
        .controller('SearchCtrl', ['$scope','$http','backendApi', '$location', SearchCtrl])

    function SearchCtrl($scope,$http, backendApi, $location) {
        $scope.blankslateMsg = "Please enter search keywords above to begin"
        $scope.numPerPageOpt = [3, 5, 10]
        $scope.numPerPage = $scope.numPerPageOpt[1]
        $scope.currentPage = 1
        $scope.currentPageItems = []
        $scope.filteredItems = []

        $scope.sortOptions=[
                {"name":"Relevance","value":"relevance"},
                {"name":"Date","value":"date"},
                {"name":"Value","value":"value"}
            ]

        $scope.locations=[
                {
                    "loc_id":"0",
                    "loc_name":"All"
                },
                {
                    "loc_id":"1",
                    "loc_name":"UAE"
                },
                {
                    "loc_id":"2",
                    "loc_name":"USA"
                },
                {
                    "loc_id":"3",
                    "loc_name":"europe"
                },
                {
                    "loc_id":"4",
                    "loc_name":"africa"
                }
            ]
        $scope.filterYears = [2016,2015,2014,2013,2012,2010,2009,2008]
        $scope.doctypes = ["All","PDF", "Presentation"]
        
        $scope.init = function(){
            if(typeof $location.search().queryText != "undefined" && $location.search().queryText != null) {
                $scope.queryText = $location.search().queryText;
                $scope.search($scope.queryText)
            }   
        }

        $scope.select = function(page) {
          var end, start;

          start = (page - 1) * $scope.numPerPage;
          end = start + $scope.numPerPage;
          $scope.currentPageItems = $scope.filteredItems.slice(start, end);

          return $scope.currentPageItems;
        };

        $scope.search = function(queryText){
            var data = {
                "workflow": "abraajSearch",
                "query": queryText,
                "username": "Administrator",
                "realm": "Anonymous",
                "queryLanguage": "simple"
            };

            if ( queryText != "" ) {
                backendApi.search( data ).then(function(res){
                    console.log(res);
                    if( typeof res.data.documents != "undefined" && res.data.documents.length > 0 ) {
                        $scope.searchResults = res.data.documents;

                        $scope.filteredItems = angular.copy($scope.searchResults)
                        $scope.currentPageItems = angular.copy($scope.searchResults)
                        $scope.select(1);
                    }
                    else {
                        $scope.blankslateMsg = "No result found. Please try again."
                        $scope.currentPageItems = []
                        $scope.filteredItems = []
                    }
                });
            }
        };
    }

})();
