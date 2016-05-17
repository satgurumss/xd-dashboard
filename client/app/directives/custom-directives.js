(function() {
  'use strict';

  angular.module('app')
    .directive('myEnterPress', enterDirective)
    .directive('hcMap', ['$http', '$window', hcMap])
    .directive('hcChart', ['$window', hcChart])
    .directive('hcChartDark', ['$window', hcChartDark])
    .directive("progressBar", progressBar)
    .directive("trainingList", trainingList);

  function enterDirective() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.myEnterPress);
          });

          event.preventDefault();
        }
      });
    };
  }

  function hcMap($http, $window) {
    return {
      restrict: "E",
      template: '<div></div>',
      replace: true,
      scope: {
        data: '='
      },
      link: function(scope, element) {
        $http.get("app/sampleData/middle-east.json").success(function(mapData) {
          // Load the fonts
          Highcharts.createElement('link', {
            href: 'https://fonts.googleapis.com/css?family=Unica+One',
            rel: 'stylesheet',
            type: 'text/css'
          }, null, document.getElementsByTagName('head')[0]);

          var theme = {
            colors: ["#7cb5ec", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
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
              plotBorderColor: "none",
              borderWidth: 0
            },
            title: {
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
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
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

          var renderChart = function() {
            var options = {
                chart: {
                  borderWidth: 1,
                  height: 200,
                  spacingTop: 0,
                  spacingBottom: 0,
                  spacingLeft: 0,
                  spacingRight: 0
                },

                title: {
                  text: 'Customer Distribution'
                },

                credits: {
                  enabled: false
                },

                legend: {
                  enabled: false
                },

                mapNavigation: {
                  enabled: false,
                  buttonOptions: {
                    verticalAlign: 'bottom'
                  }
                },
                yAxis: {
                  enabled: false
                },

                series: [{
                  name: 'Countries',
                  mapData: mapData,
                  color: '#E0E0E0',
                  enableMouseTracking: false
                }, {
                  type: 'mapbubble',
                  mapData: mapData,
                  name: '# of Customers',
                  joinBy: ['iso-a2', 'code'],
                  data: scope.data,
                  minSize: 10,
                  maxSize: '25%',
                  tooltip: {
                    pointFormat: '{point.name} - {point.z}'
                  }
                }]
              },
              tempScrollTop = $($window).scrollTop();

            $(element[0]).highcharts('Map', Highcharts.merge(options, theme));
            $($window).scrollTop(tempScrollTop);
          };

          renderChart();

          scope.$watch("data", function(loading) {
            renderChart();
          });
          /*map bubble*/

          // Apply the theme to all High Charts
          //Highcharts.setOptions(Highcharts.theme);

          // Initiate the chart
          /* $('#worldMap').highcharts('Map', {
                    title: {
                      text: 'Customer Distribution'
                    },
                    credits:{
                      enabled:false
                    },
                    subtitle: {
                      text: null
                    },

                    mapNavigation: {
                      enabled: false,
                      buttonOptions: {
                        verticalAlign: 'bottom'
                      }
                    },

                    colorAxis: {
                      min: 0
                    },

                    series: [{
                      data: data,
                      mapData: mapData,
                      joinBy: 'hc-key',
                      name: '# of Customers',
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
                  });*/

          /*map2*/
          /*$scope.mapConfig = {
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
                  };*/
        });
      }
    };
  }

  function hcChart($window) {
    return {
      restrict: 'E',
      template: '<div></div>',
      replace: true,
      scope: {
        options: '='
      },
      link: function(scope, element) {
        var renderChart = function() {
          var tempScrollTop = $($window).scrollTop();
          Highcharts.chart(element[0], scope.options);
          $($window).scrollTop(tempScrollTop);
        };

        renderChart();

        scope.$watch("options.series[0].data", function(loading) {
          renderChart();
        });
      }
    };
  }

  function hcChartDark($window) {
    return {
      restrict: 'E',
      template: '<div></div>',
      replace: true,
      scope: {
        options: '='
      },
      link: function(scope, element) {
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
              fontFamily: "'Unica One', sans-serif"
            },
            plotBorderColor: '#606063'
          },
          title: {
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
        var renderChart = function() {
          var tempScrollTop = $($window).scrollTop();
          $(element[0]).highcharts(Highcharts.merge(scope.options, theme));
          $($window).scrollTop(tempScrollTop);
        };

        renderChart();

        scope.$watch("options.series[0].data", function(loading) {
          renderChart();
        });
      }
    };
  }

  function progressBar(){
    return {
      restrict: 'E',
      templateUrl: '/app/directives/progress-bar.html',
      replace: true,
      scope: {
        options: '=',
        applyThreshold: '='
      },
      link: function(scope, element) {
        var applyThresholdToProgressBar = function() {
          var progressBar = $(element[0]).find("div.gradient-bar");

          if (scope.options.percent <= 30) {
            progressBar.addClass("prog-bar-red");
          } else if (30 < scope.options.percent && scope.options.percent <= 50) {
            progressBar.addClass("prog-bar-yellow");
          } else if (50 < scope.options.percent && scope.options.percent <= 100) {
            progressBar.addClass("prog-bar-green");
          }
        };

        if (scope.applyThreshold) {
          applyThresholdToProgressBar();
        }
      }
    };
  }

  function trainingList(){
    return {
      restrict: 'E',
      template: '<ng-include src="getTemplateUrl()"/>',
      replace: true,
      scope: {
        list: '=',
        type: "="
      },
      controller: function($scope){
        $scope.getTemplateUrl = function(){
          if($scope.type === "avaiable"){
            return '/app/training/available-training-list.html'
          } else if ($scope.type === "completed") {
            return '/app/training/completed-training-list.html'
          }
        }
      }
    };
  }

})();