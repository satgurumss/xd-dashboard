(function() {
  'use strict';

  angular.module('app')
    .controller('CustomerDashCtrl', ['$scope', '$http', '$location', '$timeout', CustomerDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function CustomerDashCtrl($scope, $http, $location, $timeout) {

    $scope.barChartOptions = {
      colors: ["#B6A2DE"],

      chart: {
        type: "bar",
        height: 200,
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
        bar: {
          pointWidth: 15,
          pointPadding: 0,
          borderRadius: 4,
          dataLabels: {
            color: '#707073',
            verticalAlign: 'middle',
            formatter: function() {
              return "$ " + this.point.y + " M"
            },
            enabled: true
          }
        },
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
        enabled:false
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
      },

      xAxis: {
        categories: ['Cust. 1', 'Cust. 2', 'Cust. 3', 'Cust. 4', 'Cust. 5'],
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
            fontSize: "14px"
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
        data: [205, 190, 160, 140, 100]
      }]
    };

    $scope.options = {
      from: 3,
      to: 12,
      step: 3,
      dimension: " months",
      smooth: false,
      css: {
        background: {
          "background-color": "#666666"
        },
        default: {
          "background-color": "white"
        },
        after: {
          "background-color": "#7cb5ec"
        },
        pointer: {
          "background-color": "54627b"
        }
      },
      scale: [3, 6, 9, 12]
    };

    $scope.value = "3";
    
    // Prepare map data
    $scope.mapData = [{
      code: "SA",
      z: 28829
    }, {
      code: "BH",
      z: 1332
    }, {
      code: "TR",
      z: 74933
    }, {
      code: "OM",
      z: 3632
    }, {
      code: "IR",
      z: 77447
    }, {
      code: "YE",
      z: 24407
    }, {
      code: "KW",
      z: 3369
    }, {
      code: "EG",
      z: 82056
    }, {
      code: "IL",
      z: 8060
    }, {
      code: "JO",
      z: 6460
    }, {
      code: "IQ",
      z: 33417
    }, {
      code: "QA",
      z: 2169
    }, {
      code: "AE",
      z: 9346
    }, {
      code: "SY",
      z: 22846
    }, {
      code: "LB",
      z: 4467
    }, {
      code: "CY",
      z: 1141
    }, {
      code: "NC",
      z: 262
    }];
  }

})();