(function() {
  'use strict';

  angular.module('app')
    .controller('SearchCtrl', ['$scope', '$http', 'backendApi', '$location', 'loggedInUser', SearchCtrl])

  function SearchCtrl($scope, $http, backendApi, $location, loggedInUser) {

    $scope.queryText = "";
    $scope.moreLikeThis = "";
    $scope.searchbarWidth = "col-xs-12"
    $scope.searchTypeWidth = "col-xs-6"
    $scope.blankslateMsg = "Please enter search keywords above to begin";
    $scope.numPerPageOpt = [3, 5, 10];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.numberToFetch = [0];
    $scope.currentPage = 1;
    $scope.currentPageItems = [];
    $scope.filteredItems = [];
    $scope.sortOrder = ".score";
    $scope.firstSearch = true;
    $scope.autoCompeleteData = [];

    $scope.sortOptions = [{
      "name": "Relevance",
      "value": ".score"
    }, {
      "name": "Date",
      "value": "date"
    }];

    var currentUser = {},
      searchData = {
        "workflow": "abraajSearch",
        "query": "",
        "username": "Administrator",
        "realm": "Anonymous",
        "queryLanguage": "simple",
        "sort": [".score"],
        "restParams": {
          "offset": $scope.numberToFetch
        },
        "fields": ["*", "SCOPETEASER(text, fragmentSize=100, fragment=true, numFragments=1, fragmentScope=sentence, scopeMode=HTML) as teaser"]
      },
      advFilters = [],
      selectedAdvFilters = [];

    $scope.init = function() {
      //use this to get current user
      currentUser = loggedInUser.getCurrentUser();
      if (!_.isEmpty(currentUser)) {
        var qboost = loggedInUser.getQBoost(currentUser.account_s[0]);
        searchData.username = currentUser.account_s[0];
        searchData.restParams["q.boost"] = qboost;

        if (typeof $location.search().queryText != "undefined" && $location.search().queryText != null) {
          $scope.queryText = $location.search().queryText;
          $scope.search();
        }
      } else
        loggedInUser.logOutUser();
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
      if ($scope.queryText != "" || $scope.moreLikeThis != "") {
        if ($scope.moreLikeThis != "")
          searchData.query = $scope.moreLikeThis;
        else
          searchData.query = $scope.queryText;

        if (advFilters.length > 0) {
          searchData.restParams['q.filter'] = advFilters;
          searchData.restParams['q.filter.type'] = ['advanced'];
        } else {
          delete searchData.restParams['q.filter'];
          delete searchData.restParams['q.filter.type'];
        }

        backendApi.search(searchData).then(function(res) {
          $scope.firstSearch = false;
          $scope.moreLikeThis = "";
          if (typeof res.data.documents != "undefined" && res.data.documents.length > 0) {
            $scope.searchResults = res;
            $scope.promotions = $scope.searchResults.data.placements;
            console.log("$scope.searchResults ", $scope.searchResults);

            //$scope.filteredItems = angular.copy($scope.searchResults.data.documents);
            $scope.currentPageItems = angular.copy($scope.searchResults.data.documents);
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
      searchData.restParams['q.filter'] = advFilters;
      searchData.restParams['q.filter.type'] = ['advanced'];
      $scope.search();
    };

    $scope.resetAdvSearch = function() {
      advFilters = [];
      selectedAdvFilters = [];
      $scope.currentPage = 1;
      $scope.search();
    }

    $scope.onSelect = function($item, $model, $label) {
      $scope.queryText = $model;
      $scope.currentPage = 1;
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

    $scope.formatFilterLabel = function(label) {
      label = label.replace(/_/g, " ");

      if (label.lastIndexOf(" ") != -1)
        label = label.substring(0, label.lastIndexOf(" "));

      return label;
    }

    $scope.formatFilterCheckboxLabels = function(label) {
      var newLabel = "";

      switch (label) {
        case "gics":
          newLabel = "GICS";
          break;
        case "investment":
          newLabel = "Investment";
          break;
        case "news":
          newLabel = "News";
          break;
        case "hr":
          newLabel = "Human Resources";
          break;
        case "deal":
          newLabel = "Deals";
          break;
        case "region":
          newLabel = "Region";
          break;
        case "km":
          newLabel = "Knowledge Management";
          break;
        case "profile":
          newLabel = "Profiles";
          break;
        default:
          newLabel = label;
          break;
      }

      return newLabel;
    }


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

    $scope.fetchMoreLikeThis = function(moreLikeThisQuery) {
      console.log(moreLikeThisQuery);
      if (!_.isUndefined(moreLikeThisQuery) && !_.isEmpty(moreLikeThisQuery)) {

        moreLikeThisQuery = moreLikeThisQuery.substring(moreLikeThisQuery.indexOf("(") + 1, moreLikeThisQuery.indexOf(")"));

        moreLikeThisQuery = moreLikeThisQuery.split(",");
        var queryString = "";

        moreLikeThisQuery.forEach(function(str, index, array) {
          queryString += index < array.length - 2 ? str + " OR " : " " + str;
        })

        $scope.moreLikeThis = queryString.replace(/"/g, "");
        //$scope.moreLikeThis = queryString;

        $scope.currentPage = 1;
        $scope.search();
      }
    }
  }
})();