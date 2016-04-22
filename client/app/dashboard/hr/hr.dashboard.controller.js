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
    //This is not a highcharts object. It just looks a little like one!
    $scope.chartConfig = {
      options: {
        chart: {
          type: 'solidgauge',
          height:220,
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
          plotBorderColor: '#606063',
        },

        tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
            fontSize: '16px'
          },
          pointFormat: '<span style="font-size:0.7em; word-break:break-all;">{series.name}</span><br><span style="text-align:center; font-size:1em; font-weight: bold">{point.y}%</span>',
          positioner: function(labelWidth, labelHeight) {
            return {
              x: 75 - labelWidth / 2,
              y: 70
            };
          }
        },

        plotOptions: {
          solidgauge: {
            borderWidth: '15px',
            dataLabels: {
              enabled: false
            },
            linecap: 'round',
            stickyTracking: true
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
          layout: 'vertical',
          align: "right",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#3e3e40',
          shadow: true
        },

        credits: {
          enabled: false
        },

        labels: {
          style: {
            color: '#707073'
          }
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
      },

      //The below properties are watched separately for changes.
      //Title configuration (optional)
      title: {
        text: null,
        style: {
          color: 'silver',
          textTransform: 'uppercase',
          fontSize: '24px'
        }
      },

      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },

      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
          outerRadius: '112%',
          innerRadius: '88%',
          backgroundColor: "rgba(144,228,173, 1)",
          borderWidth: 0
        }, { // Track for Exercise
          outerRadius: '87%',
          innerRadius: '63%',
          backgroundColor: "rgba(204, 230, 121, 1)",
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },

      series: [{
        name: 'Emp. Satisfaction',
        borderColor: "rgba(144,228,173, 1)",
        data: [{
          color: "rgba(144,228,173, 1)",
          radius: '92%',
          innerRadius: '92%',
          y: 80
        }]
      }, {
        name: 'Emp. Retention',
        borderColor: "rgba(204, 230, 121, 1)",
        data: [{
          color: "rgba(204, 230, 121, 1)",
          radius: '66%',
          innerRadius: '66%',
          y: 65
        }]
      }]
    }

  }

})();