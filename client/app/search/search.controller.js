(function() {
  'use strict';

  angular.module('app')
    .controller('SearchCtrl', ['$scope', '$http', 'backendApi', '$location', 'loggedInUser', SearchCtrl])

  function SearchCtrl($scope, $http, backendApi, $location, loggedInUser) {
    var currentUser = {},
      searchData = {
        "workflow": "abraajSearch",
        "query": "",
        "username": "Administrator",
        "realm": "Anonymous",
        "queryLanguage": "simple"
      },
      advFilters = [],
      selectedAdvFilters = [];
    //"sort":['date']

    $scope.queryText = "";
    $scope.searchbarWidth = "col-xs-12"
    $scope.searchTypeWidth = "col-xs-6"
    $scope.blankslateMsg = "Please enter search keywords above to begin";
    $scope.numPerPageOpt = [3, 5, 10];
    $scope.numPerPage = $scope.numPerPageOpt[1];
    $scope.currentPage = 1;
    $scope.currentPageItems = [];
    $scope.filteredItems = [];
    $scope.sortOrder = ".score";
    $scope.autoCompeleteData = [];

    $scope.sortOptions = [{
      "name": "Relevance",
      "value": ".score"
    }, {
      "name": "Date",
      "value": "date"
    }];

    $scope.init = function() {
      //use this to get current user
      currentUser = loggedInUser.getCurrentUser();
      if (!_.isEmpty(currentUser)) {

        searchData.username = currentUser.account_s[0];

        if (typeof $location.search().queryText != "undefined" && $location.search().queryText != null) {
          $scope.queryText = $location.search().queryText;
          $scope.search();
        }
      } else
        loggedInUser.logOutUser();
    }

    $scope.select = function(page) {
      var end, start;

      start = (page - 1) * $scope.numPerPage;
      end = start + $scope.numPerPage;
      $scope.currentPageItems = $scope.filteredItems.slice(start, end);

      return $scope.currentPageItems;
    };

    $scope.search = function() {
      if ($scope.queryText != "") {
        searchData.query = $scope.queryText;

        if (advFilters.length > 0) {
          searchData['restParams'] = {}
          searchData.restParams['facet.filter'] = advFilters;
        } else {
          delete searchData['restParams'];
        }

        backendApi.search(searchData).then(function(res) {
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

    $scope.sortResults = function() {
      searchData.sort = [];
      searchData.sort.push($scope.sortOrder);
      $scope.search();
    }

    $scope.setFilter = function(filter) {
      searchData.workflow = filter;
    };

    $scope.setAdvFilter = function(event, filter) {
      if (event.target.checked) {
        advFilters.push(filter)
        selectedAdvFilters.push(filter)
      } else {
        advFilters.splice(advFilters.indexOf(filter), 1)
        selectedAdvFilters.splice(selectedAdvFilters.indexOf(filter), 1)
      }

      $scope.advSearch();
    };

    $scope.isChecked = function(filter) {
      var filter = _.find(selectedAdvFilters, filter);

      return typeof filter != "undefined" ? true : false;
    }

    $scope.advSearch = function() {
      searchData['restParams'] = {}
      searchData.restParams['facet.filter'] = advFilters;
      $scope.search();
    };

    $scope.resetAdvSearch = function() {
      advFilters = [];
      selectedAdvFilters = [];

      $scope.search();
    }

    $scope.onSelect = function($item, $model, $label) {
      $scope.queryText = $model;
      $scope.search();
    }

    $scope.updateCtrlModel = function(queryText) {
      $scope.queryText = queryText;
    }

    $scope.fetchAutoComplete = function(queryText) {
      return backendApi.getAutocompleteData(queryText).then(function(res) {
        return res.data;
      });
    }
  }
})();