var clickEvent;
(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', 
      ['$scope', '$http', '$location', 'backendApi', 'loggedInUser', '$timeout', DashboardCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function DashboardCtrl($scope, $http, $location, backendApi, loggedInUser, $timeout) {
    
    /*$scope.lineOptions = {
      options:{chart: {
        type: 'spline'
      }},
      title: {
        text: 'Snow depth at Vikjafjellet, Norway'
      },
      subtitle: {
        text: 'Irregular time data in Highcharts JS'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Snow depth (m)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: [{
        name: 'Winter 2012-2013',
        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        data: [
          [Date.UTC(1970, 9, 21), 0],
          [Date.UTC(1970, 10, 4), 0.28],
          [Date.UTC(1970, 10, 9), 0.25],
          [Date.UTC(1970, 10, 27), 0.2],
          [Date.UTC(1970, 11, 2), 0.28],
          [Date.UTC(1970, 11, 26), 0.28],
          [Date.UTC(1970, 11, 29), 0.47],
          [Date.UTC(1971, 0, 11), 0.79],
          [Date.UTC(1971, 0, 26), 0.72],
          [Date.UTC(1971, 1, 3), 1.02],
          [Date.UTC(1971, 1, 11), 1.12],
          [Date.UTC(1971, 1, 25), 1.2],
          [Date.UTC(1971, 2, 11), 1.18],
          [Date.UTC(1971, 3, 11), 1.19],
          [Date.UTC(1971, 4, 1), 1.85],
          [Date.UTC(1971, 4, 5), 2.22],
          [Date.UTC(1971, 4, 19), 1.15],
          [Date.UTC(1971, 5, 3), 0]
        ]
      }, {
        name: 'Winter 2013-2014',
        data: [
          [Date.UTC(1970, 9, 29), 0],
          [Date.UTC(1970, 10, 9), 0.4],
          [Date.UTC(1970, 11, 1), 0.25],
          [Date.UTC(1971, 0, 1), 1.66],
          [Date.UTC(1971, 0, 10), 1.8],
          [Date.UTC(1971, 1, 19), 1.76],
          [Date.UTC(1971, 2, 25), 2.62],
          [Date.UTC(1971, 3, 19), 2.41],
          [Date.UTC(1971, 3, 30), 2.05],
          [Date.UTC(1971, 4, 14), 1.7],
          [Date.UTC(1971, 4, 24), 1.1],
          [Date.UTC(1971, 5, 10), 0]
        ]
      }, {
        name: 'Winter 2014-2015',
        data: [
          [Date.UTC(1970, 10, 25), 0],
          [Date.UTC(1970, 11, 6), 0.25],
          [Date.UTC(1970, 11, 20), 1.41],
          [Date.UTC(1970, 11, 25), 1.64],
          [Date.UTC(1971, 0, 4), 1.6],
          [Date.UTC(1971, 0, 17), 2.55],
          [Date.UTC(1971, 0, 24), 2.62],
          [Date.UTC(1971, 1, 4), 2.5],
          [Date.UTC(1971, 1, 14), 2.42],
          [Date.UTC(1971, 2, 6), 2.74],
          [Date.UTC(1971, 2, 14), 2.62],
          [Date.UTC(1971, 2, 24), 2.6],
          [Date.UTC(1971, 3, 2), 2.81],
          [Date.UTC(1971, 3, 12), 2.63],
          [Date.UTC(1971, 3, 28), 2.77],
          [Date.UTC(1971, 4, 5), 2.68],
          [Date.UTC(1971, 4, 10), 2.56],
          [Date.UTC(1971, 4, 15), 2.39],
          [Date.UTC(1971, 4, 20), 2.3],
          [Date.UTC(1971, 5, 5), 2],
          [Date.UTC(1971, 5, 10), 1.85],
          [Date.UTC(1971, 5, 15), 1.49],
          [Date.UTC(1971, 5, 23), 1.08]
        ]
      }]
    };*/

    //This is not a highcharts object. It just looks a little like one!
    $scope.chartConfig = {
      options: {
        colors: ["#28bdc6", "#90e4ad", "#cce679", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
        ],
        chart: {
          type: 'spline',
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
            fontFamily: "sans-serif"
          },
          plotBorderColor: '#606063'
        },

        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          },
          valueSuffix: '°C'
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
          },
          layout: 'horizontal',
          align: 'left',
          verticalAlign: 'top',
          padding: 50,
          floating: true,
          borderWidth: 0
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
        text: 'Revenue, Target & Net Revenue',
        align: 'left',
        x: 30,
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        }
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
        minorGridLineColor: '#505053',
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
        categories: ['', '', 'Mar 15', '', '', 'Jun 15', '', '', 'Sep 15', '', '', 'Dec 15'],
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
        tickColor: '#707073'
      },

      series: [{
        name: 'Revenue',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }, {
        name: 'Target',
        data: [2.2, 4.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#90e4ad'
        }
      }, {
        name: 'Last Year',
        data: [3.9, 3.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#cce679'
        }
      }]
    };

    $scope.init = function() {
      console.log("init")
    }

  }

})();

angular.module('app')
  .animation('.slide', [

    function() {
      var support;
      support = jQuery.keyframe.isSupported();
      jQuery.keyframe.debug = true;
      return {
        leave: function(element, doneFn) {
          var elemHeight, elemScaledHeight, elemScaledWidth, elemWidth, firstFrame, scaledLeftOffset, scaledTopOffset, secondFrame, widgetControlWidth;

          elemHeight = parseInt(element.css('height'));
          elemWidth = parseInt(element.css('width'));
          elemScaledHeight = elemHeight * 0.08;
          elemScaledWidth = elemWidth * 0.08;
          elemX = parseInt(typeof clickEvent != "undefined" ? clickEvent.pageX : 0);
          elemY = parseInt(typeof clickEvent != "undefined" ? clickEvent.pageY : 0);

          typeAheadWidthPx = angular.element('.search-field-wrapper').outerWidth(true);
          searchTypeWidthPx = angular.element('.search-type').outerWidth(true);
          searchPanelHeightPx = angular.element('.search-panel').outerHeight(true);
          widgetControlWidth = angular.element('.widget-control').width();

          buttonOffset = typeAheadWidthPx + searchTypeWidthPx;
          //12 has been added because of container's extreme left padding
          wigdetButtonOffset = (elemX - ((elemWidth - elemScaledWidth) / 2) - (widgetControlWidth + 120));

          scaledTopOffset = ((elemHeight - elemScaledHeight) / 2) + elemY - searchPanelHeightPx;
          scaledLeftOffset = buttonOffset - wigdetButtonOffset;

          secondFrame = {
            'opacity': '0.1',
            // 'z-index': '5',
            'top': '-' + scaledTopOffset + 'px',
            'left': scaledLeftOffset + 'px',
            '-webkit-transform': 'scale3d(.08,.08,.08)',
            '-moz-transform': 'scale3d(.08,.08,.08)',
            '-o-transform': 'scale3d(.08,.08,.08)',
            'transform': 'scale3d(.08,.08,.08)'
          };

          firstFrame = {
            'opacity': '1',
            '-webkit-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            '-moz-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            '-o-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            'transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)'
          };

          jQuery.keyframe.define([{
            name: 'onMove',
            '30%': firstFrame,
            '100%': secondFrame
          }]);
          element.resetKeyframe(function() {
            return element.playKeyframe({
              name: 'onMove',
              duration: '3s',
              delay: '0s',
              timingFunction: 'linear',
              complete: doneFn
            });
          });
        }
      };
    }
  ]);