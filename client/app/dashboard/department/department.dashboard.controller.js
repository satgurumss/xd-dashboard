(function() {
  'use strict';

  angular.module('app')
    .controller('DepartmentDashCtrl', ['$scope', '$http', '$location', 'gaugesService', "CONST", "loggedInUser", "utils", "$log", DepartmentDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function DepartmentDashCtrl($scope, $http, $location, gaugesService, CONST, loggedInUser, utils, $log) {

    $scope.deptTrendChart = {
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
        data: [10, 10, 10],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }, {
        type: 'area',
        fillColor: "rgba(40, 189, 198, 0.3)",
        name: 'Spent',
        data: [10, 10, 10],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }]
    };

    $scope.topVendorsChart = {
      colors: ["#72B6D7"],

      chart: {
        type: "bar",
        height: 120,
        width: 250,
        style: {
          fontFamily: "sans-serif"
        },
        backgroundColor: "#EDEDED",
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
        enabled: false
      },

      plotOptions: {
        bar: {
          pointWidth: 15,
          pointPadding: 0,
          borderRadius: 4,
          dataLabels: {
            color: '#000',
            verticalAlign: 'middle',
            align: "right",
            formatter: function() {
              return "$ " + this.point.y + " M"
                //return this.point.category
            },
            enabled: true,
          }
        },
      },
      credits: {
        enabled: false
      },

      legend: {
        enabled: false
      },

      title: {
        text: null,
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        },
        useHTML: true
      },

      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
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
        gridLineColor: 'transparent',
        tickInterval: 25
      },

      xAxis: {
        categories: ['1', '2', '3', '4', '5'],
        tickWidth: 0,
        tickPixelInterval: 20,
        title: {
          text: null,
          style: {
            color: '#A0A0A3'
          }
        },
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#707073',
            fontSize: "14px",
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

      series: [{data:[]}]
    };

    $scope.init = function(argument) {
      utils.validateExcelData(function() {
        loggedInUser.isLoggedIn("/department-dashboard");
        loggedInUser.fetchCurrentUser()
          .success(function(data, status, headers, config) {
            $scope.userRole = data.userRole;
            $scope.setActiveTab("HR");
          })
          .error(function(data, status, headers, config) {
            $location.url("#/")
          })
        //$scope.alignmentGauges = angular.copy(gaugesService.updateGaugeState($scope.alignmentGauges));
      });
    }

    $scope.setActiveTab = function(activeTab) {
      var trendData = utils.getDeptTrendData(activeTab),
        vendorsTrend = [];

      $scope.topVendors = utils.getTopVendors(activeTab);

      $scope.tab = angular.copy(utils.getDeptData(activeTab));

      var vendorPercent = utils.getVendorsAlignment(activeTab);
      $scope.vendorsProgress = {
        percent: vendorPercent,
        barLabel: vendorPercent + "% Aligned (FY)",
        barValue: $scope.tab.fYAlignment
      }

      $scope.deptTrendChart.series[0].data = [];
      $scope.deptTrendChart.series[0].data = [trendData["2014"].budget, trendData["2015"].budget, trendData["2016"].budget];

      $scope.deptTrendChart.series[1].data = [];
      $scope.deptTrendChart.series[1].data = [trendData["2014"].spend, trendData["2015"].spend, trendData["2016"].spend];

      $scope.topVendorsChart.series[0].data = [];
      _.each($scope.topVendors, function(vendor) {
        vendorsTrend.push(vendor.contractValue);
      });
      $scope.topVendorsChart.series[0].data = vendorsTrend;

      $scope.deptAlignment = {
        percent: utils.getGaugePercent(activeTab),
        colors: ['#BCBCBC', '#4792C1']
      };
    }

    $scope.formatNumberFromString = function(value) {
      return utils.formatNumberFromString(value)
    }
  }

})();