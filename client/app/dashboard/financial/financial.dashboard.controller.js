(function() {
  'use strict';

  angular.module('app')
    .controller('FinancialDashCtrl', ['$scope', '$http', '$location', "gaugesService", "CONST", FinancialDashCtrl])

  function FinancialDashCtrl($scope, $http, $location, gaugesService, CONST) {

    $scope.gaugesWithMonths = [{
      energy:{
        percent: 20
      },
      transport:{
        percent: 50
      },
      devices:{
        percent: 80
      }
    }, {
      energy:{
        percent: 90
      },
      transport:{
        percent: 15
      },
      devices:{
        percent: 75
      }
    }, {
      energy:{
        percent: 44
      },
      transport:{
        percent: 18
      },
      devices:{
        percent: 35
      }
    }, {
      energy:{
        percent: 10
      },
      transport:{
        percent: 30
      },
      devices:{
        percent: 60
      }
    }];


    $scope.gauges = $scope.gaugesWithMonths[0];

    // slider options
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

    $scope.monthsToDisplay = "3";

    $scope.chartConfig = {
      colors: ["#28bdc6", "rgba(144,228,173, .3)", "rgba(204, 230, 121, .3)"],
      chart: {
        height: 200,
        marginRight: 25,
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
        categories: ['FEB', 'MAR', 'APR'],
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
        name: 'Revenue',
        data: [5.0, 14.5, 18.2],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }, {
        type: 'area',
        fillColor: "rgba(144,228,173, 0.3)",
        name: 'Forecast',
        data: [1.2, 17.0, 19],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: 'rgba(144,228,173, .6)'
        }
      }, {
        type: 'area',
        fillColor: "rgba(204, 230, 121, 0.3)",
        name: 'Last Year',
        data: [3.2, 13.5, 14.3],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: 'rgba(204, 230, 121, .6)'
        }
      }]
    };

    $scope.barChartOptions = {
      colors: ["#B6A2DE"],

      chart: {
        type: "bar",
        height: 100,
        width:200,
        style: {
          fontFamily: "sans-serif"
        },
        plotBorderColor: '#606063',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0
      },

      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        },
        valueSuffix: 'M',
        enabled:false
      },

      plotOptions: {
        bar: {
          pointWidth: 15,
          pointPadding: 0,
          borderRadius: 4,
          dataLabels: {
            color: '#707073',
            verticalAlign: 'middle',
            align:"right",
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

      labels: {
        style: {
          color: '#707073'
        }
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
      },

      xAxis: {
        categories: ['Customer A Consulting', 'Customer B Consulting', 'Customer C Consulting', 'Customer D Consulting', 'Customer E Consulting'],
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
            fontSize: "0px",
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
        data: [205, 190, 160, 140, 100]
      }]
    };

    $scope.updateChart = function() {
      var categories = [],
        generateRandomSeries = function(max) {
          var rnd = []
          for (var i = 0; i < max; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
          }
          return rnd;
        }

      switch ($scope.monthsToDisplay) {
        case "3":
          categories = ['FEB', 'MAR', 'APR']
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = 2;
          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [5.0, 14.5, 18.2];

          $scope.chartConfig.series[1].data = [];
          $scope.chartConfig.series[1].data = [1.2, 17.0, 19];

          $scope.chartConfig.series[2].data = [];
          $scope.chartConfig.series[2].data = [3.2, 13.5, 14.3];

          $scope.gauges = $scope.gaugesWithMonths[0];


          break
        case "6":
          categories = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = 4.5;

          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [6.0, 7.8, 16.0, 6.0, 14.5, 18.2];

          $scope.chartConfig.series[1].data = [];
          $scope.chartConfig.series[1].data = [5.0, 10, 14.3, 5.2, 17.0, 19];

          $scope.chartConfig.series[2].data = [];
          $scope.chartConfig.series[2].data = [8.0, 5.5, 10.7, 7.2, 13.5, 14.3];

          $scope.gauges = $scope.gaugesWithMonths[1];


          break;
        case "9":
          categories = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = 7.5;

          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [10.8, 9.5, 11, 6.0, 7.8, 16.0, 5.0, 14.5, 18.2];

          $scope.chartConfig.series[1].data = [];
          $scope.chartConfig.series[1].data = [11, 7.4, 9, 5.0, 10, 14.3, 1.2, 17.0, 19];

          $scope.chartConfig.series[2].data = [];
          $scope.chartConfig.series[2].data = [12, 10, 15, 8.0, 5.5, 10.7, 3.2, 13.5, 14.3];

          $scope.gauges = $scope.gaugesWithMonths[2];

          break;
        case "12":
          categories = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = null;

          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [15, 5.0, 14.5, 10.8, 9.5, 11, 6.0, 7.8, 16.0, 5.0, 14.5, 18.2];

          $scope.chartConfig.series[1].data = [];
          $scope.chartConfig.series[1].data = [10, 6.5, 12, 11, 7.4, 9, 5.0, 10, 14.3, 1.2, 17.0, 19];

          $scope.chartConfig.series[2].data = [];
          $scope.chartConfig.series[2].data = [12, 7, 11.7, 12, 10, 15, 8.0, 5.5, 10.7, 3.2, 13.5, 14.3];

          $scope.gauges = $scope.gaugesWithMonths[3];



          break;
      }

      $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

    $scope.init = function(){
      $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

  }

})();