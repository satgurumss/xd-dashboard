(function() {
  'use strict';

  angular.module('app')
    .controller('SearchCtrl', ['$scope', '$http', '$location', 'loggedInUser', SearchCtrl])

  function SearchCtrl($scope, $http, $location, loggedInUser) {

    $scope.blankslateMsg = "Please enter search keywords above to begin";
    $scope.numPerPageOpt = [3, 5, 10];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.numberToFetch = [0];
    $scope.currentPage = 1;
    $scope.currentPageItems = [];
    $scope.filteredItems = [];
    $scope.sortOrder = ".score";
    $scope.firstSearch = true;
    $scope.vendorsList = ["Mirosoft", "Cisco", "Fujitsu", "HP", "IBM", "XDensity", "Oreedo", "Woodworks", "Netapp", "Broadtech", "Fintech", "SAP"];

    $scope.init = function() {
      loggedInUser.isLoggedIn("/search");
    }

    $scope.searchBar = function() {
      $scope.currentPage = 1;
      $scope.search();
    }

    $scope.search = function() {
      $scope.numberToFetch[0] = ($scope.currentPage - 1) * $scope.numPerPage;
      $scope.sendSearchRequest();
    };

    $scope.sendSearchRequest = function() {
    };

    $scope.sortResults = function() {
      $scope.currentPage = 1;
      $scope.search();
    }

    $scope.setFilter = function(filter) {
      searchData.workflow = filter;
    };

    $scope.setAdvFilter = function(event, filter) {
      if (event.target.checked) {
        advFilters.push(filter);
        selectedAdvFilters.push(filter);
      } else {
        advFilters.splice(advFilters.indexOf(filter), 1);
        selectedAdvFilters.splice(selectedAdvFilters.indexOf(filter), 1);
      }

      $scope.advSearch();
    };

    $scope.isChecked = function(filter) {
      var foundFilter = false;

      selectedAdvFilters.forEach(function(setFilter, index, array) {
        if (filter === setFilter) {
          foundFilter = true;
        }
      });

      return foundFilter;
    }

    $scope.advSearch = function() {
      $scope.currentPage = 1;
      $scope.search();
    };

    $scope.resetAdvSearch = function() {
      advFilters = [];
      selectedAdvFilters = [];
      $scope.currentPage = 1;
      $scope.search();
    }

    $scope.onAutoCompleteSelect = function($item, $model, $label) {
      $scope.queryText = $model;
      $scope.currentPage = 1;
      //alert($scope.queryText)
      $scope.search();
    }

    $scope.updateCtrlModel = function(queryText) {
      $scope.queryText = queryText;
    }

   /* $scope.fetchAutoComplete = function(queryText) {
      return backendApi.getAutocompleteData(queryText).then(function(res) {
        return res.data;
      });
    }*/

    $scope.abbreviateNumber = function(num, digits, type) {
      var si = [{
          value: 1E18,
          symbol: type === 'money' ? "E" : "EB"
        }, {
          value: 1E15,
          symbol: type === 'money' ? "P" : "PB"
        }, {
          value: 1E12,
          symbol: type === 'money' ? "T" : "TB"
        }, {
          value: 1E9,
          symbol: type === 'money' ? "B" : "GB"
        }, {
          value: 1E6,
          symbol: type === 'money' ? "M" : "MB"
        }, {
          value: 1E3,
          symbol: type === 'money' ? "K" : "KB"
        }],
        i;

      num = typeof num !== "undefined" ? parseInt(num) : "";
      if (num > 0 && num != "") {

        for (i = 0; i < si.length; i++) {
          if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol;
          }
        }
        return num.toString();
      } else {
        return num;
      }
    }
  }
})();