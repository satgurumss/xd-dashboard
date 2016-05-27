(function() {
  'use strict';

  angular.module('app')
    .controller('SearchCtrl', ['$scope', '$http', '$location', 'loggedInUser', '$log', "XDENSITY", "utils", SearchCtrl])

  function SearchCtrl($scope, $http, $location, loggedInUser, $log, XDENSITY, utils) {

    $scope.blankslateMsg = "Please enter search keywords above to begin";
    $scope.numPerPageOpt = [3, 5, 10];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.numberToFetch = [0];
    $scope.currentPage = 1;
    $scope.currentPageItems = [];
    $scope.filteredItems = [];
    $scope.sortOrder = ".score";
    $scope.firstSearch = true;
    $scope.vendorsList = ["Microsoft", "Cisco", "Fujitsu", "HP", "IBM", "XDensity", "Oreedo", "Woodworks", "Netapp", "Broadtech", "Fintech", "SAP"];

    $scope.resultsList = [{
      vendor: {
        id: 1,
        title: "American Express"
      },
      contract: {
        title: "Account Management",
        type: "Finance",
        dept: "Finance",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "American Express"
      },
      contract: {
        title: "Account Management",
        type: "Finance",
        dept: "Finance",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "American Express"
      },
      contract: {
        title: "Account Management",
        type: "Finance",
        dept: "Finance",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "American Express"
      },
      contract: {
        title: "Account Management",
        type: "Finance",
        dept: "Finance",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "American Express"
      },
      contract: {
        title: "Account Management",
        type: "Finance",
        dept: "Finance",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "Microsoft"
      },
      contract: {
        title: "Hardware Maintenance",
        type: "Technology",
        dept: "HR",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "Microsoft"
      },
      contract: {
        title: "Hardware Maintenance",
        type: "Technology",
        dept: "Technical",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [80, 46, 75]
      }
    }, {
      vendor: {
        id: 1,
        title: "Microsoft"
      },
      contract: {
        title: "Hardware Maintenance",
        type: "Technology",
        dept: "Finance",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [30, 75, 90]
      }
    }, {
      vendor: {
        id: 1,
        title: "Microsoft"
      },
      contract: {
        title: "Hardware Maintenance",
        type: "Technology",
        dept: "Broadcast",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 50, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "Microsoft"
      },
      contract: {
        title: "Hardware Maintenance",
        type: "Technology",
        dept: "HR",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [75, 60, 80]
      }
    }, {
      vendor: {
        id: 1,
        title: "Microsoft"
      },
      contract: {
        title: "Hardware Maintenance",
        type: "Technology",
        dept: "HR",
        startDate: "01 Sep 2015",
        endDate: "31 Aug 2016",
        daysToRenewal: 60,
        fiscalYear: "Jun 2016",
        value: 8500000,
        valueTrend: [46, 75, 80]
      }
    }];

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
      $scope.currentPageItems = [];
      $scope.currentPageItems = angular.copy(_.filter($scope.resultsList, function(item) {
        return item.vendor.title === $scope.queryText
      }));

      /*$scope.currentPageItems = utils.searchVendors($scope.queryText);

      $log.info("Search Results")
      $log.info($scope.currentPageItems);*/
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

    $scope.openDetails = function(result) {
      result.isFirstOpen = true;

      $scope.resultTrendInfo.series[0].data = [];
      $scope.resultTrendInfo.series[0].data = angular.copy(result.contract.valueTrend);
    }

    $scope.closeDetails = function(result) {
      result.isFirstOpen = false;
    }
  }
})();