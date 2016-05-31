(function() {
  'use strict';

  angular.module('app')
    .controller('LandingCtrl', ['$scope', '$http', '$location', "gaugesService", "loggedInUser", "utils", "XDENSITY", "$log", "spreadSheetService", LandingCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function LandingCtrl($scope, $http, $location, gaugesService, loggedInUser, utils, XDENSITY, $log, spreadSheetService) {

    $scope.userRole = "";
    $scope.gauges = {};
    $scope.organization = {};

    $scope.deptBarChartOptions = {
      colors: ["#C9C9C9", "#5494AB", "#C82E12"],

      chart: {
        type: "columnrange",
        inverted: true,
        height: 90,
        style: {
          fontFamily: "sans-serif"
        },
        plotBorderColor: '#606063',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        marginRight: 65
      },

      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        },
        valueSuffix: 'M',
        enabled: true
      },

      plotOptions: {
        bar: {
          pointWidth: 5,
          pointPadding: 0,
          dataLabels: {
            color: '#707073',
            verticalAlign: 'middle',
            align: "right",
            formatter: function() {
              return "$ " + this.point.y + " M"
                //return this.point.category
            },
            enabled: false
          }
        },
        series: {
          groupPadding: 0,
          stacking: "normal",
          marker: {
            enabled: true
          }
        }
      },

      credits: {
        enabled: false
      },

      labels: {
        style: {
          color: '#000'
        }
      },

      legend: {
        enabled: true,
        floating: true,
        width: 100,
        x: 95,
        y: 0,
        lineHeight: 12,
        margin: 5,
        itemStyle: {
          fontSize: '10px'
        },
        symbolHeight: 8,
        symbolWidth: 8,
        symbolRadius: 6
      },

      title: {
        text: null
      },

      subtitle: {
        text: null
      },

      yAxis: {
        title: null,
        labels: {
          enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        min: 0,
        gridLineColor: 'transparent',
      },

      xAxis: {
        categories: ['Broadcast', 'Financial', 'HR', 'Technical'],
        min: 0,
        max: 3,
        title: {
          text: null
        },
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#000',
            fontSize: "12px",
            enabled: false
          }
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent'
      },

      series: [{
        groupPadding: 0,
        name: "Budget",
        data: [{
          low: 10,
          high: 15
        }, {
          low: 0,
          high: 10
        }, {
          low: 8,
          high: 10
        }, {
          low: 3,
          high: 5
        }]
      }, {
        groupPadding: 0,
        name: "Spent",
        data: [{
          low: 0,
          high: 10
        }, {
          low: 0,
          high: 0
        }, {
          low: 0,
          high: 8
        }, {
          low: 0,
          high: 3
        }],
      }, {
        groupPadding: 0,
        name: "Over Spent",
        data: [{
          low: 0,
          high: 0
        }, {
          low: 10,
          high: 15
        }, {
          low: 0,
          high: 0
        }, {
          low: 0,
          high: 0
        }]
      }]
    };

    $scope.navigateTo = function(route) {
      if ($location.url() != route)
        $location.url(route);
    }

    $scope.init = function() {
      utils.validateExcelData(function() {
        //XDENSITY.isLoaded = true;
        loggedInUser.isLoggedIn("/landing");

        loggedInUser.fetchCurrentUser()
          .success(function(data, status, headers, config) {
            $scope.userRole = data.userRole;
            populateData();
          })
          .error(function(data, status, headers, config) {
            $location.url("#/")
          })
      });
    };

    $scope.formatNumberFromString = function(value) {
      return utils.formatNumberFromString(value)
    }

    var populateData = function(userRole) {
      var series = utils.formatDeptChartData();
      $scope.gauges["organization"] = {};
      $scope.gauges["vendors"] = {};

      $scope.gauges.organization["percent"] = utils.getGaugePercent("Organization");
      $scope.gauges.vendors["percent"] = utils.getVendorsAlignment("Organization");

      $scope.organization = utils.getDeptData("Organization");

      $scope.deptBarChartOptions.series[0].data = series.budget;
      $scope.deptBarChartOptions.series[1].data = series.spent;
      $scope.deptBarChartOptions.series[2].data = series.overSpent;

      $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }   
  }
})();