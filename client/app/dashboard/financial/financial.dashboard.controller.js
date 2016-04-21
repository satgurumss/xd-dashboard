(function() {
  'use strict';

  angular.module('app')
    .controller('FinancialDashCtrl',
      ['$scope', '$http', '$location', 'backendApi', 'loggedInUser', '$timeout', FinancialDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function FinancialDashCtrl($scope, $http, $location, backendApi, loggedInUser, $timeout) {
    
    //This is not a highcharts object. It just looks a little like one!
    $scope.chartConfig = {
      options: {
        colors: ["#28bdc6", "rgba(144,228,173, .3)", "rgba(204, 230, 121, .3)"],
        chart: {
          height: 260,
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
          align:"center",
          borderWidth: 0,
          symbolHeight: 10,
          symbolWidth: 10,
          symbolRadius: 6
        },

        credits: {
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
      },

      //The below properties are watched separately for changes.
      //Title configuration (optional)
      title: {
        text: '',
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        },
        useHTML:true
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
        categories : ['MAR','JUN','SEP','DEC'],
        tickWidth: 0,
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
        tickInterval:1,
        tickmarkPlacement: "on",
        min: 0.5,
        max: categories.length-1.5,
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        align: "left" 
      },

      series: [{
            type: 'area',
            fillColor: "rgba(40, 189, 198, 0.3)",
            name: 'Revenue',
            data: [5.0, 14.5, 18.2, 15.2],
            marker: {symbol: 'circle', fillColor: '#303031', lineWidth:1, lineColor: '#28bdc6'}
        }, {
            type: 'area',
            fillColor: "rgba(144,228,173, 0.3)",
            name: 'Target',
            data: [1.2, 17.0, 19, 8.1],
            marker: {symbol: 'circle', fillColor: '#303031', lineWidth:1, lineColor: 'rgba(144,228,173, .6)'}
        }, {
            type: 'area',
            fillColor: "rgba(204, 230, 121, 0.3)",
            name: 'Last Year',
            data: [3.2, 13.5, 14.3, 12.2],
            marker: {symbol: 'circle', fillColor: '#303031', lineWidth:1, lineColor: 'rgba(204, 230, 121, .6)'}
        }]
    };

  }

})();