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
        width: 200,
        style: {
          fontFamily: "sans-serif"
        },
        plotBorderColor: '#606063',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 10
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
          stacking: "normal"
        }
      },

      credits: {
        enabled: false
      },

      labels: {
        style: {
          color: '#707073'
        }
      },

      legend: {
        enabled: false,
        lineHeight: 10,
        margin: 5,
        itemStyle: {
          fontSize: '9px'
        }
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
        min:0,
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
            color: '#707073',
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
        }],
        marker: {
          symbol: 'circle'
        }
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
        marker: {
          symbol: 'circle'
        }
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
        }],
        marker: {
          symbol: 'circle'
        }
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

      $scope.gauges["organization"] = {};
      $scope.gauges["vendors"] = {};

      $scope.gauges.organization["percent"] = utils.getGaugePercent("Organization");
      $scope.gauges.vendors["percent"] = utils.getVendorsAlignment("Organization");

      $scope.organization = utils.getDeptData("Organization");

      formatDeptChartData();

      $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

    function formatDeptChartData() {
      var series = {
        budget: [],
        spent: [],
        overSpent: []
      };

      var departments = _.filter(XDENSITY.sheets.departments.data, function(dept, key) {
        return key !== "Organization"
      });
      _.each(departments, function(dept) {
        if (dept.department != "Organization") {
          $log.info("Current department")
          $log.info(dept)

          var budget = dept.Budget,
            spent = dept.Spend,
            diff = 0,
            budgetData = {
              low: 0,
              high: 0
            },
            spentData = {
              low: 0,
              high: 0
            },
            overSpentData = {
              low: 0,
              high: 0
            };

          budget = parseInt(budget.replace(/,/g, "")) / 1000000;
          spent = parseInt(spent.replace(/,/g, "")) / 1000000;

          budget = parseFloat(budget.toFixed(2));
          spent = parseFloat(spent.toFixed(2));
          diff = budget - spent;

          if (diff > 0) {
            budgetData.low = spent;
            budgetData.high = budget;

            spentData.high = spent;
          } else if (diff < 0) {
            budgetData.high = budget;

            overSpentData.low = budget;
            overSpentData.high = budget + -1 * (diff);
          }

          series.budget.push(budgetData);
          series.spent.push(spentData);
          series.overSpent.push(overSpentData);
        }
      });

      $scope.deptBarChartOptions.series[0].data = series.budget
      $scope.deptBarChartOptions.series[1].data = series.spent
      $scope.deptBarChartOptions.series[2].data = series.overSpent
    }
  }
})();