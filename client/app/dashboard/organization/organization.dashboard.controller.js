(function() {
  'use strict';

  angular.module('app')
    .controller('OrganizationDashCtrl', ['$scope', '$http', '$location', "gaugesService", "CONST", "loggedInUser", OrganizationDashCtrl])

  function OrganizationDashCtrl($scope, $http, $location, gaugesService, CONST, loggedInUser) {

    $scope.gauges = {
      hr: {
        percent: 10
      },
      broadcast: {
        percent: 30
      },
      finance: {
        percent: 60
      },
      technical: {
        percent: 40
      }
    };

    $scope.chartConfig = {
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
        text: "3 Year Trend Budget vs Spent",
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

    $scope.financeProgress = {
      percent: 47,
      barLabel: "Spent",
      barValue: "$ 20.45 M"
    }

    $scope.vendorsProgress = {
      percent: 50,
      barLabel: "Vendors Aligned",
      barValue: "5"
    }

    $scope.dashboardTitle = "";

    $scope.init = function() {
      loggedInUser.fetchCurrentUser()
        .success(function(data, status, headers, config) {
          loggedInUser.isLoggedIn("/organization-dashboard");
          $scope.userRole = data.userRole
          $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
          
          populatePageLabels($scope.userRole);
        })
        .error(function(data, status, headers, config) {
          $location.url("#/")
        })

    }

    var populatePageLabels = function(userRole) {

      switch (userRole) {
        case "CEO":
          $scope.dashboardTitle = "ORGANIZATION";
          break

        case "SLMGR":
        case "FLDSL":
          $scope.dashboardTitle = "MY SALES";
          break
      }
    }


  }

})();