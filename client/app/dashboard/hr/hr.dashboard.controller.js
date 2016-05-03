(function() {
  'use strict';

  angular.module('app')
    .controller('HRDashCtrl', ['$scope', '$http', '$location', 'gaugesService','CONST', HRDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function HRDashCtrl($scope, $http, $location,gaugesService, CONST) {
    var gaugeDefaultOptions = {
      chart: {
        type: 'solidgauge',
        height: 300,
        spacingBottom: 20,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0
      },

      title: {
        text: null,
        style: {
          fontSize: '15px'
        }
      },

      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: '12px'
        },
        pointFormat: '<span class="display-inline-block" style="text-align:center;font-size:1.2em;">{series.name}</span><br><span class="display-inline-block" style="font-size:2.5em; color: {point.color}; font-weight: bold margin-left:10px">{point.y}%</span>',
        positioner: function(labelWidth, labelHeight) {
          return {
            x: 165 - labelWidth / 2,
            y: 120
          };
        }
      },

      legend: {
        labelFormatter: function() {
          return '<span style="text-weight:bold;color:' + this.data[0].color + '">' + this.name + '</span>';
        },
        symbolWidth: 0
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Performance
          outerRadius: '112%',
          innerRadius: '92%',
          backgroundColor: "rgba(40, 189, 198, 0.3)",
          borderWidth: 0
        }, { // Track for Satisfaction
          outerRadius: '91%',
          innerRadius: '71%',
          backgroundColor: "rgba(144,228,173, 0.3)",
          borderWidth: 0
        }, { // Track for Retention
          outerRadius: '70%',
          innerRadius: '50%',
          backgroundColor: "rgba(204, 230, 121, 0.3)",
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      plotOptions: {
        solidgauge: {
          borderWidth: '10px',
          dataLabels: {
            enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          showInLegend: false
        }
      },

      series: [{
        name: 'Performance',
        borderColor: "rgba(40, 189, 198, 1)",
        data: [{
          color: "rgba(40, 189, 198, 1)",
          radius: '107%',
          innerRadius: '97%',
          y: 90
        }]
      }, {
        name: 'Satisfaction',
        borderColor: "rgba(144,228,173, 1)",
        data: [{
          color: "rgba(144,228,173, 1)",
          radius: '86%',
          innerRadius: '76.5%',
          y: 75
        }]
      }, {
        name: 'Retention',
        borderColor: "rgba(204, 230, 121, 1)",
        data: [{
          color: "rgba(204, 230, 121, 1)",
          radius: '65.5%',
          innerRadius: '55.5%',
          y: 60
        }]
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

    var hrCtrl = this;
    hrCtrl.monthsToDisplay = "3";

    $scope.satisfactionChart = {
      chart: {
        height: 300,
        width: 300,
        spacingLeft: 0,
        spacingRight: 5
      },

      title: {
        text: null,
      },

      subtitle: {
        text: null
      },

      credits: {
        enabled: false
      },

      yAxis: {
        title: {
          text: null,
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent'
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent',
        categories: ['FEB', 'MAR', 'APR']
      },
      tooltip: {
        formatter: function() {
          return '<span class="display-inline-block" style="text-align:center;font-size:1.2em;">' + this.series.name + '</span><br><span class="display-inline-block" style="font-size:1.5em; font-weight: bold; margin-left:10px">' + this.y + '%</span>'
        }
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        borderWidth: 0
      },

      series: [{
        name: 'Management',
        data: [72.5, 80.9, 78.6],
        color: "rgba(40, 189, 198, 1)",
        marker: {
          symbol: 'circle',
          fillColor: 'rgba(40, 189, 198, 1)',
          lineWidth: 1,
          lineColor: 'rgba(40, 189, 198, 1)'
        }
      }, {
        name: 'Sales',
        data: [80.0, 76.9, 81.0],
        color: "rgba(204, 230, 121, 1)",
        marker: {
          symbol: 'circle',
          fillColor: 'rgba(204, 230, 121, 1)',
          lineWidth: 1,
          lineColor: 'rgba(204, 230, 121, 1)'
        }
      }, {
        name: 'Operations',
        data: [84.1, 88.6, 85.5],
        color: "rgba(144,228,173, 1)",
        marker: {
          symbol: 'circle',
          fillColor: 'rgba(144,228,173, 1)',
          lineWidth: 1,
          lineColor: 'rgba(144,228,173, 1)'
        }
      }]
    };

    $scope.gauges = {
      satisfaction:{
        percent: 10,
        className: "circle-blue",
        colors: CONST.gaugeBlue 
      },
      retention:{
        percent: 30,
        className: "circle-green",
        colors: CONST.gaugeGreen 
      },
      hiring:{
        percent: 60,
        className: "circle-yellow",
        colors: CONST.gaugeYellow
      }
    }

    $scope.init = function() {
      $scope.gauges = angular.copy( gaugesService.updateGaugeState($scope.gauges) )
    }

    $scope.updateChart = function() {
      var categories = [],
        generateRandomSeries = function(max) {
          var rnd = []
          for (var i = 0; i < max; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
          }
          return rnd;
        }

      switch (hrCtrl.monthsToDisplay) {
        case "3":
          categories = ['FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [72.5, 80.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [84.1, 88.6, 85.5];


          break
        case "6":
          categories = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [90.2, 80.5, 70.3, 72.5, 80.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [88.6, 87.0, 84.3, 80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [75.8, 74.1, 76.1, 84.1, 88.6, 85.5];


          break;
        case "9":
          categories = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [85.5, 85.2, 85.5, 90.2, 80.5, 70.3, 72.5, 80.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [80.4, 83.5, 87.0, 88.6, 87.0, 84.3, 80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [81.3, 77.0, 72.0, 75.8, 74.1, 76.1, 84.1, 88.6, 85.5];

          break;
        case "12":
          categories = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [70.2, 70.6, 73.5, 85.5, 85.2, 85.5, 90.2, 80.5, 70.3, 72.5, 80.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [60.9, 70.6, 73.5, 80.4, 83.5, 87.0, 88.6, 87.0, 84.3, 80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [70.2, 70.8, 75.7, 81.3, 77.0, 72.0, 75.8, 74.1, 76.1, 84.1, 88.6, 85.5];



          break;
      }
    }
  }

})();