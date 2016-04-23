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
    /*$scope.chartConfig = {
      options: {
        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
        ],
        chart: {
          type: 'solidgauge',
          height: 220,
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
          style: {
            fontFamily: "'Unica One', sans-serif"
          }
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
              y: 100
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
          },
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
        text: "Employee Status",
        style: {
          color: 'silver',
          textTransform: 'uppercase',
          fontSize: '14px'
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
          backgroundColor: "rgba(144,228,173, 0.3)",
          borderWidth: 0
        }, { // Track for Exercise
          outerRadius: '87%',
          innerRadius: '63%',
          backgroundColor: "rgba(204, 230, 121, 0.3)",
          borderWidth: 0
        }]
      },

      xAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
          style: {
            color: '#A0A0A3'

          }
        }
      },

      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3'
          }
        }
      },

      series: [{
        name: 'Satisfaction',
        borderColor: "rgba(144,228,173, 1)",
        data: [{
          color: "rgba(144,228,173, 1)",
          radius: '92%',
          innerRadius: '92%',
          y: 80
        }]
      }, {
        name: 'Retention',
        borderColor: "rgba(204, 230, 121, 1)",
        data: [{
          color: "rgba(204, 230, 121, 1)",
          radius: '66%',
          innerRadius: '66%',
          y: 65
        }]
      }]
    }*/

    $scope.init = function() {

      /**
       * Dark theme for Highcharts JS
       * @author Torstein Honsi
       */

      // Load the fonts
      Highcharts.createElement('link', {
        href: 'https://fonts.googleapis.com/css?family=Unica+One',
        rel: 'stylesheet',
        type: 'text/css'
      }, null, document.getElementsByTagName('head')[0]);

      var theme = {
        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
        ],
        chart: {
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 1
            },
            stops: [
              [0, '#2a2a2b'],
              [1, '#3e3e40']
            ]
          },
          style: {
            fontFamily: "'Unica One', sans-serif"
          },
          plotBorderColor: '#606063'
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '15px'
          }
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        xAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
              color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
            style: {
              color: '#A0A0A3'

            }
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
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            style: {
              color: '#A0A0A3'
            }
          }
        },
        tooltip: {
          backgroundColor: 'none',
          style: {
            color: '#F0F0F0'
          }
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
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        credits: {
          enabled: false,
          style: {
            color: '#666'
          }
        },
        labels: {
          style: {
            color: '#707073'
          }
        },

        drilldown: {
          activeAxisLabelStyle: {
            color: '#F0F0F3'
          },
          activeDataLabelStyle: {
            color: '#F0F0F3'
          }
        },

        navigation: {
          buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
              fill: '#505053'
            }
          }
        },

        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
              color: '#CCC'
            },
            states: {
              hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                  color: 'white'
                }
              }
            }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
          },
          labelStyle: {
            color: 'silver'
          }
        },

        navigator: {
          handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
          },
          xAxis: {
            gridLineColor: '#505053'
          }
        },

        scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
      };

      // Apply the theme
      // Highcharts.setOptions(Highcharts.theme);
      var empGauge = {

        chart: {
          type: 'solidgauge',
          height: 250,
          width: 150,
          marginTop: -10
        },

        title: {
          text: 'Employee Stats',
          style: {
            fontSize: '15px'
          }
        },

        tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
            fontSize: '14px'
          },
          pointFormat: '<div style="text-align:center;">{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold margin-left:10px">{point.y}%</span></div>',
          positioner: function(labelWidth, labelHeight) {
            return {
              x: 77 - labelWidth / 2,
              y: 84
            };
          }
        },

        pane: {
          startAngle: 0,
          endAngle: 360,
          background: [{ // Track for Satisfaction
            outerRadius: '110%',
            innerRadius: '95%',
            backgroundColor: "rgba(144,228,173, 0.3)",
            borderWidth: 0
          }, { // Track for Retention
            outerRadius: '94%',
            innerRadius: '75%',
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
            radius: '103%',
            innerRadius: '103%',
            y: 80
          }]
        }, {
          name: 'Retention',
          borderColor: "rgba(204, 230, 121, 1)",
          data: [{
            color: "rgba(204, 230, 121, 1)",
            radius: '83%',
            innerRadius: '83%',
            y: 60
          }]
        }]
      };

      $('#employee-gauge1').highcharts(Highcharts.merge(empGauge, theme));
      $('#employee-gauge2').highcharts(Highcharts.merge(empGauge, theme));
    }
  }

})();