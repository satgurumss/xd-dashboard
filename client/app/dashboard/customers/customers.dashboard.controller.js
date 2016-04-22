(function() {
  'use strict';

  angular.module('app')
    .controller('CustomerDashCtrl', ['$scope', '$http', '$location', 'backendApi', 'loggedInUser', '$timeout', CustomerDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function CustomerDashCtrl($scope, $http, $location, backendApi, loggedInUser, $timeout) {

    //This is not a highcharts object. It just looks a little like one!
    $scope.data = [{
      "hc-key": "sa",
      "value": 0
    }, {
      "hc-key": "bh",
      "value": 1
    }, {
      "hc-key": "tr",
      "value": 2
    }, {
      "hc-key": "om",
      "value": 3
    }, {
      "hc-key": "ir",
      "value": 4
    }, {
      "hc-key": "ye",
      "value": 5
    }, {
      "hc-key": "kw",
      "value": 6
    }, {
      "hc-key": "eg",
      "value": 7
    }, {
      "hc-key": "il",
      "value": 8
    }, {
      "hc-key": "jo",
      "value": 9
    }, {
      "hc-key": "iq",
      "value": 10
    }, {
      "hc-key": "qa",
      "value": 11
    }, {
      "hc-key": "ae",
      "value": 12
    }, {
      "hc-key": "sy",
      "value": 13
    }, {
      "hc-key": "lb",
      "value": 14
    }, {
      "hc-key": "cy",
      "value": 15
    }, {
      "hc-key": "nc",
      "value": 16
    }];

    $scope.chartConfig = {
      options: {
        chart: {
          type: "bar",
          height: 260,
          style: {
            fontFamily: "sans-serif"
          },
          plotBorderColor: '#606063',
          events: {
            load: function() {
              var chart = this;
              setTimeout(function() {
                chart.reflow();
              }, 0);
            }
          }
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
            pointWidth: 12,
            pointPadding: 0,
            dataLabels: {
              color: '#707073',
              verticalAlign: 'middle',
              formatter: function() {
                return "$" + this.point.y + "M"
              },
              enabled: true
            }
          },
          series: {
            groupPadding: 0
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
          backgroundColor: '#FFFFFF',
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
        categories: ['Customer 1', 'Customer 2', 'Customer 3', 'Customer 4', 'Customer 5'],
        tickWidth: 0,
        title: {
          text: null,
          style: {
            color: '#A0A0A3'
          }
        },
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#707073'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073'
      },

      series: [{
        data: [335, 203, 107, 31, 20]
      }]
    };

    $scope.init = function() {
      $http.get("app/sampleData/middle-east.json").success(function(mapData) {
        debugger
        console.log(mapData);

         $scope.mapConfig = {
          options: {
            chart: {
              style: {
                fontFamily: "sans-serif"
              },
              plotBorderColor: '#606063'
            },

            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              style: {
                color: '#F0F0F0'
              }
            },

            labels: {
              style: {
                color: '#707073'
              }
            },

            plotOptions:{
              map:{
                mapData : mapData,
                joinBy : "hc-key"
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
          colorAxis: {
              min: 0
          },
          //The below properties are watched separately for changes.
          //Title configuration (optional)
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

          series: [{
            data: $scope.data,
            states: {
              hover: {
                color: '#BADA55'
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }]
        };
       
      });

      /*$http({
        method: "JSONP",
        url : "https://www.highcharts.com/samples/data/jsonp.php?filename=world-population.json&callback=JSON_CALLBACK"
      }).success(function(data, status){
        debugger
        var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
      });*/
    }


  }

})();