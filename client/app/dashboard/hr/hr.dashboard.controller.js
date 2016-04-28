(function() {
  'use strict';

  angular.module('app')
    .controller('HRDashCtrl', ['$scope', '$http', '$location', '$timeout', HRDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function HRDashCtrl($scope, $http, $location, $timeout) {
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

    $scope.init = function() {

      $scope.overallGauge = angular.copy(gaugeDefaultOptions);
      $scope.overallGauge.title.text = "Overall";
    }
  }

})();