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
        height: 250,
        width: 160,
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
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
        pointFormat: '<div style="text-align:center;">{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold margin-left:10px">{point.y}%</span></div>',
        positioner: function(labelWidth, labelHeight) {
          return {
            x: 77 - labelWidth / 2,
            y: 110
          };
        }
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Satisfaction
          outerRadius: '110%',
          innerRadius: '86%',
          backgroundColor: "rgba(144,228,173, 0.3)",
          borderWidth: 0
        }, { // Track for Retention
          outerRadius: '85%',
          innerRadius: '60%',
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
          stickyTracking: false
        }
      },

      series: [{
        name: 'Satisfaction',
        borderColor: "rgba(144,228,173, 1)",
        data: [{
          color: "rgba(144,228,173, 1)",
          radius: '102%',
          innerRadius: '94%',
          y: 80
        }]
      }, {
        name: 'Retention',
        borderColor: "rgba(204, 230, 121, 1)",
        data: [{
          color:"rgba(204, 230, 121, 1)",
          radius: '77%',
          innerRadius: '69%',
          y: 60
        }]
      }]
    };

    $scope.init = function(){

      $scope.overallGauge = angular.copy(gaugeDefaultOptions);
      $scope.overallGauge.title.text = "Overall";
    }
  }

})();