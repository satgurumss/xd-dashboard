(function() {
  'use strict';

  angular.module('app')
    .controller('SearchCtrl', ['$scope', '$http', '$location', 'loggedInUser', '$log', "XDENSITY", "utils", "$filter", SearchCtrl])
    .filter("filterResults", ['$log', filterResults]);

  function SearchCtrl($scope, $http, $location, loggedInUser, $log, XDENSITY, utils, $filter) {

    $scope.searchFilters = [];

    $scope.blankslateMsg = "Please enter search keywords above to begin";
    $scope.numPerPageOpt = [3, 5, 10];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.numberToFetch = [0];
    $scope.currentPage = 1;
    $scope.resultsList = [];
    $scope.currentPageItems = [];

    $scope.firstSearch = true;
    $scope.vendorsList = ["Microsoft", "Cisco", "Fujitsu", "HP", "IBM", "XDensity", "Oreedo", "Woodworks", "Netapp", "Broadtech", "Fintech", "SAP"];

    $scope.resultTrendInfo = {
      colors: ["#28bdc6", "rgba(144,228,173, .3)", "rgba(204, 230, 121, .3)"],
      chart: {
        width: 290,
        height: 290,
        spacingRight: 20,
        spacingTop: 20,
        backgroundColor: {
          linearGradient: {
            x1: 1,
            y1: 1,
            x2: 1,
            y2: 1
          },
          stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
          ]
        },
        style: {
          fontFamily: "sans-serif"
        },
        plotBorderColor: '#606063'
      },

      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        style: {
          color: '#F0F0F0'
        },
        valueSuffix: 'M'
      },

      plotOptions: {
        series: {
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          }
        },
        boxplot: {
          fillColor: '#505053'
        },
        candlestick: {
          lineColor: 'white'
        },
        errorbar: {
          color: 'white'
        },
        area: {
          events: {
            legendItemClick: function() {
              return false;
            }
          }
        }
      },

      legend: {
        itemStyle: {
          color: '#E0E0E3',
          fontSize: '10px'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#606063'
        },
        layout: 'horizontal',
        align: "center",
        borderWidth: 0,
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 6
      },

      credits: {
        enabled: false
      },

      labels: {
        style: {
          color: '#707073'
        }
      },

      title: {
        text: "3 Year Contract Value",
        style: {
          color: '#E0E0E3',
          fontSize: '16px',
        },
        verticalAlign: 'bottom',
        align: 'center',
        useHTML: true
      },

      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },

      yAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          text: 'Million ($)',
          style: {
            color: '#A0A0A3'
          }
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },

      xAxis: {
        categories: ['2014', '2015', '2016'],
        title: {
          style: {
            color: '#A0A0A3'
          }
        },
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickInterval: 1,
        tickmarkPlacement: "on",
        min: 0,
        max: 2,
        startOnTick: true,
        endOnTick: true,
        minPadding: 0,
        maxPadding: 0,
        align: "left"
      },

      series: [{
        type: 'area',
        fillColor: "rgba(40, 189, 198, 0.3)",
        name: 'Spent',
        data: [35, 50, 45],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }]
    };

    $scope.init = function() {
      utils.validateExcelData(function() {
        loggedInUser.isLoggedIn("/search");

        loggedInUser.fetchCurrentUser()
          .success(function(data, status, headers, config) {
            $scope.userRole = data.userRole;
          })
          .error(function(data, status, headers, config) {
            $location.url("#/")
          })
      });
    }

    $scope.searchBar = function() {
      $scope.currentPage = 1;
      $scope.search();
    }

    $scope.search = function() {
      //$scope.numberToFetch[0] = ($scope.currentPage - 1) * $scope.numPerPage;
      $scope.searchedVendor = angular.copy($scope.queryText);
      $scope.firstSearch = false;
      $scope.totalResults = [];
      /*$scope.currentPageItems = angular.copy(_.filter($scope.resultsList, function(item) {
        return item.vendor.title === $scope.queryText
      }));*/

      $scope.totalResults = angular.copy(utils.searchVendors($scope.queryText));

      _.each($scope.totalResults, function(result) {
        result.valueTrend = [];

        result.valueTrend = getTrendData(result);
      });

      $log.info("Search Results")
      $log.info($scope.totalResults);

      $scope.currentPageItems = angular.copy($scope.totalResults);
    };

    $scope.onAutoCompleteSelect = function($item, $model, $label) {
      $scope.queryText = $model;
      $scope.currentPage = 1;
      //alert($scope.queryText)
      $scope.search();
    }

    $scope.updateCtrlModel = function(queryText) {
      $scope.queryText = queryText;
    }

    $scope.fetchAutoComplete = function(queryText) {
      var autcompleteData = utils.getAutoCompleteData(queryText);

      return autcompleteData;
    }

    $scope.abbreviateNumber = function(num, digits) {
      var si = [{
          value: 1E18,
          symbol: "E"
        }, {
          value: 1E15,
          symbol: "P"
        }, {
          value: 1E12,
          symbol: "T"
        }, {
          value: 1E9,
          symbol: "B"
        }, {
          value: 1E6,
          symbol: "M"
        }, {
          value: 1E3,
          symbol: "K"
        }],
        i;


      num = typeof num !== "undefined" || num != '-' ? parseInt(num.replace(/,/g, "")) : "";
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

    $scope.openDetails = function(result) {
      result.isFirstOpen = true;

      $scope.resultTrendInfo.series[0].data = [];
      $scope.resultTrendInfo.series[0].data = angular.copy(result.contract.valueTrend);
    }

    $scope.closeDetails = function(result) {
      result.isFirstOpen = false;
    }

    $scope.calculateDaysToRenewal = function(result) {
      var startDate = new Date(),
        endDate = new Date(result.endDate),

        timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

      result.renewalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return result.renewalDays;
    }

    $scope.applyFilters = function($event) {
      $log.info("applyingFilters")
      var option = $event.target.value,
        optionIsSelected = $event.target.checked;
      $log.info(option)
      $log.info(option)

      if (optionIsSelected) {
        $scope.searchFilters.push(option);
      } else {
        $scope.searchFilters.splice($scope.searchFilters.indexOf(option),1);
      }

      $log.info($scope.searchFilters)

      $scope.currentPageItems = angular.copy($filter("filterResults")($scope.totalResults, $scope.searchFilters));
    }

    var formatString = function(string) {
      var day = parseInt(string.substring(0, 2));
      var month = parseInt(string.substring(3, 5));
      var year = parseInt(string.substring(6, 10));
      var date = new Date(year, month - 1, day);
      return date;
    };

    var getTrendData = function(result) {

      var contractValue2014 = utils.formatNumberToSD(parseInt(result.contractValue2014.replace(/,/g, "")));
      var contractValue2015 = utils.formatNumberToSD(parseInt(result.contractValue2015.replace(/,/g, "")));
      var contractValue2016 = utils.formatNumberToSD(parseInt(result.contractValue2016.replace(/,/g, "")));

      var trendData = [contractValue2014, contractValue2015, contractValue2016]

      return trendData;
    }
  }

  function filterResults($log) {
    return function(totalResults, searchFilters) {
      $log.info("filterResults")
      var deptFilters = [],
        renewalDayFilter = "",
        filteredResults = angular.copy(totalResults);
        
        deptFilters = angular.copy( _.filter(searchFilters, function(filter){return filter != "renewalDays"}) );

        renewalDayFilter = angular.copy( _.filter(searchFilters, function(filter){return filter === "renewalDays"}) );

      $log.info(deptFilters)
      if (renewalDayFilter != "") {
        filteredResults = _.filter(totalResults, function(result) {
          return result.renewalDays <= 90;
        })
      }

      if (! _.isEmpty(deptFilters) ){
        filteredResults = _.filter(totalResults, function(result) {
          return _.contains(deptFilters, result.businessVertical);
        })
      }

      return filteredResults;
    }
  }
})();