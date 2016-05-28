(function() {
  'use strict';

  angular.module('app')
    .controller('OrganizationDashCtrl', ['$scope', '$http', '$location', "gaugesService", "CONST", "loggedInUser", 'utils', "XDENSITY", "$log", OrganizationDashCtrl])

  function OrganizationDashCtrl($scope, $http, $location, gaugesService, CONST, loggedInUser, utils, XDENSITY, $log) {

    $scope.gauges = {}
    $scope.trendChart = {
      colors: ["#28bdc6", "rgba(144,228,173, .3)", "rgba(204, 230, 121, .3)"],
      chart: {
        height: 225,
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
        text: null,
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
        tickInterval: '5',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          text: 'Millions ($)',
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
        name: 'Budget',
        data: [10.0, 14.5, 18.3],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }, {
        type: 'area',
        fillColor: "rgba(144,228,173, 0.3)",
        name: 'Spent',
        data: [15.0, 17.0, 19],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: 'rgba(144,228,173, .6)'
        }
      }]
    };

    $scope.organizationProgress = {
      percent: 47,
      barLabel: "Spent",
      barValue: "$ 20.45 M"
    }

    $scope.formatNumberFromString = function(value) {
      return utils.formatNumberFromString(value)
    }

    $scope.init = function() {
      utils.validateExcelData(function() {
        //XDENSITY.isLoaded = true;

        loggedInUser.fetchCurrentUser()
          .success(function(data, status, headers, config) {
            loggedInUser.isLoggedIn("/organization-dashboard");
            $scope.userRole = data.userRole;
            populateData($scope.userRole);
          })
          .error(function(data, status, headers, config) {
            $location.url("#/")
          });

        /* $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));*/
      });
    }

    var populateData = function(userRole) {

      $scope.gauges["organization"] = {};
      $scope.gauges["hr"] = {};
      $scope.gauges["broadcast"] = {};
      $scope.gauges["technical"] = {};
      $scope.gauges["finance"] = {};

      $scope.gauges.organization["colors"] = ['#DDD', '#5B9B08']
      $scope.gauges.hr["colors"] = ['#DDD', '#5B9B08']
      $scope.gauges.finance["colors"] = ['#DDD', '#5B9B08']
      $scope.gauges.technical["colors"] = ['#DDD', '#5B9B08']
      $scope.gauges.broadcast["colors"] = ['#DDD', '#5B9B08']

      $scope.gauges.organization["percent"] = utils.getGaugePercent("Organization");
      $scope.gauges.hr["percent"] = utils.getGaugePercent("HR");
      $scope.gauges.finance["percent"] = utils.getGaugePercent("Finance");
      $scope.gauges.technical["percent"] = utils.getGaugePercent("Tech");
      $scope.gauges.broadcast["percent"] = utils.getGaugePercent("Broadcast");

      $scope.organization = utils.getDeptData("Organization");

      var vendorPercent = utils.getVendorsAlignment("Organization");
      $scope.vendorsProgress = {
        percent: vendorPercent,
        barLabel: vendorPercent + "% Aligned (FY)",
        barValue: $scope.organization.fYAlignment
      }

      $scope.deptBudget = {
        hr: utils.getDeptData("HR").Budget,
        broadcast: utils.getDeptData("Broadcast").Budget,
        finance: utils.getDeptData("Finance").Budget,
        technical: utils.getDeptData("Tech").Budget,
      }

      var trendData = utils.getDeptTrendData("Organization");
      $scope.trendChart.series[0].data = [];
      $scope.trendChart.series[0].data = [trendData["2014"].budget, trendData["2015"].budget, trendData["2016"].budget];

      $scope.trendChart.series[1].data = [];
      $scope.trendChart.series[1].data = [trendData["2014"].spend, trendData["2015"].spend, trendData["2016"].spend];

      //$scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

    function formatDeptChartData() {
      var series = {
        budget: [],
        spent: [],
        overSpent: []
      };

      _.each(XDENSITY.sheets.departments.data, function(dept) {
        var budget = dept.Budget,
          spent = dept.Spend,
          diff = 0,
          budgetData = spentData = overSpentData = {
            low: 0,
            high: 0
          };

        budget = formatNumberToSD(parseInt(budget.replace(/,/g, "")), 2);
        spent = formatNumberToSD(parseInt(spent.replace(/,/g, "")), 2);
        diff = budget - spent;

        if (diff > 0) {
          budgetData.low = spent;
          budgetData.high = budget;

          spentData.high = spent;
        } else if (diff < 0) {
          budgetData.high = budget;

          overSpentData.low = budget;
          overSpentData.high = budget + -1(diff);
        }

        series.budget.push(budgetData);
        series.spent.push(spentData);
        series.overSpent.push(overSpentData);
      });

      $scope.deptBarChartOptions.series[0].data = series.budget
      $scope.deptBarChartOptions.series[1].data = series.spent
      $scope.deptBarChartOptions.series[2].data = series.overSpent
    }
  }

})();