(function() {
    'use strict';

    angular.module('app')
        .controller('SearchCtrl', ['$scope', '$http', 'backendApi', '$location', SearchCtrl])

    function SearchCtrl($scope, $http, backendApi, $location) {
        var searchData = {
                "workflow": "abraajSearch",
                "query": "",
                "username": "Administrator",
                "realm": "Anonymous",
                "queryLanguage": "simple"
            },
            advFilters = [];

        $scope.searchbarWidth = "col-xs-8"
        $scope.blankslateMsg = "Please enter search keywords above to begin";
        $scope.numPerPageOpt = [3, 5, 10];
        $scope.numPerPage = $scope.numPerPageOpt[1];
        $scope.currentPage = 1;
        $scope.currentPageItems = [];
        $scope.filteredItems = [];

        $scope.sortOptions = [
            {
                "name": "Relevance",
                "value": "relevance"
            }, {
                "name": "Date",
                "value": "date"
            }, {
                "name": "Value",
                "value": "value"
            }
        ];

        $scope.init = function() {
            if (typeof $location.search().queryText != "undefined" && $location.search().queryText != null) {
                $scope.queryText = $location.search().queryText;
                $scope.search($scope.queryText);
            }
        }

        $scope.select = function(page) {
            var end, start;

            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            $scope.currentPageItems = $scope.filteredItems.slice(start, end);

            return $scope.currentPageItems;
        };

        $scope.updateCtrlModel = function(queryText){
            $scope.queryText = queryText;
        }

        $scope.search = function() {
            if ( $scope.queryText != "" ) {
                searchData.query = $scope.queryText;
                
                if( advFilters.length > 0 )
                    searchData.filters = advFilters

                backendApi.search(searchData).then(function(res) {
                    console.log(res);
                    if (typeof res.data.documents != "undefined" && res.data.documents.length > 0) {
                        $scope.searchResults = res;

                        $scope.filteredItems = angular.copy($scope.searchResults.data.documents);
                        $scope.currentPageItems = angular.copy($scope.searchResults.data.documents);
                        $scope.select(1);
                    } else {
                        $scope.blankslateMsg = "No result found. Please try again.";
                        $scope.currentPageItems = [];
                        $scope.filteredItems = [];
                    }
                });
            }
        };

        $scope.setFilter = function(filter) {
            searchData.workflow = filter;
            console.log(searchData);
        };

        $scope.setAdvFilter = function(event, filter) {
            console.log("setting filter" + filter)
            if( event.target.checked )
                advFilters.push(filter)
            else
                advFilters.splice(advFilters.indexOf(filter),1)
        };

        $scope.advSearch = function() {
            searchData['restParams'] ={}
            searchData.restParams['facet.filter'] = advFilters;
            $scope.search($scope.queryText);
        };
    }

})();