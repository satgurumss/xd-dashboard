(function() {
  'use strict';

  angular.module('app')
    .controller('CustomerDashCtrl', ['$scope', '$http', '$location', '$timeout', CustomerDashCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function CustomerDashCtrl($scope, $http, $location, $timeout) {
    //This is not a highcharts object. It just looks a little like one!
    $scope.chartConfig = {
      options: {
        colors : ["#B6A2DE"],
        chart: {
          type: "bar",
          height: 200,
          style: {
            fontFamily: "sans-serif"
          },
          plotBorderColor: '#606063',
          events: {
            load: function(chart) {
              $timeout(function() {
                chart.target.reflow();
              });
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
            pointWidth: 15,
            pointPadding: 0,
            borderRadius:4,  
            dataLabels: {
              color: '#707073',
              verticalAlign: 'middle',
              formatter: function() {
                return "$ " + this.point.y + " M"
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
        categories: ['Cust. 1', 'Cust. 2', 'Cust. 3', 'Cust. 4', 'Cust. 5'],
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
            fontSize: "14px"
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
        data: [205, 190, 160, 140, 100]
      }]
    };
    $scope.options = {}

    $scope.init = function() {
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

      $scope.value = "3";
      // Prepare demo data
      /*      var data1 = [{
        "hc-key": "sa",
        "value": 10
      }, {
        "hc-key": "bh",
        "z": 5
      }, {
        "hc-key": "tr",
        "z": 12
      }, {
        "hc-key": "om",
        "z": 23
      }, {
        "hc-key": "ir",
        "z": 4
      }, {
        "hc-key": "ye",
        "z": 17
      }, {
        "hc-key": "kw",
        "z": 20
      }, {
        "hc-key": "eg",
        "z": 11
      }, {
        "hc-key": "il",
        "z": 8
      }, {
        "hc-key": "jo",
        "z": 9
      }, {
        "hc-key": "iq",
        "z": 10
      }, {
        "hc-key": "qa",
        "z": 11
      }, {
        "hc-key": "ae",
        "z": 12
      }, {
        "hc-key": "sy",
        "z": 13
      }, {
        "hc-key": "lb",
        "z": 14
      }, {
        "hc-key": "cy",
        "z": 15
      }, {
        "hc-key": "nc",
        "z": 16
      }];*/

      var data = [{
        code: "AF",
        z: 30552
      }, {
        code: "AL",
        z: 2897
      }, {
        code: "DZ",
        z: 39208
      }, {
        code: "AS",
        z: 55
      }, {
        code: "ADO",
        z: 79
      }, {
        code: "AO",
        z: 21472
      }, {
        code: "AG",
        z: 90
      }, {
        code: "AR",
        z: 41446
      }, {
        code: "AM",
        z: 2977
      }, {
        code: "AW",
        z: 103
      }, {
        code: "AU",
        z: 23129
      }, {
        code: "AT",
        z: 8480
      }, {
        code: "AZ",
        z: 9417
      }, {
        code: "BS",
        z: 377
      }, {
        code: "BH",
        z: 1332
      }, {
        code: "BD",
        z: 156595
      }, {
        code: "BB",
        z: 285
      }, {
        code: "BY",
        z: 9466
      }, {
        code: "BE",
        z: 11183
      }, {
        code: "BZ",
        z: 332
      }, {
        code: "BJ",
        z: 10323
      }, {
        code: "BM",
        z: 65
      }, {
        code: "BT",
        z: 754
      }, {
        code: "BO",
        z: 10671
      }, {
        code: "BA",
        z: 3829
      }, {
        code: "BW",
        z: 2021
      }, {
        code: "BR",
        z: 200362
      }, {
        code: "BN",
        z: 418
      }, {
        code: "BG",
        z: 7265
      }, {
        code: "BF",
        z: 16935
      }, {
        code: "BI",
        z: 10163
      }, {
        code: "CV",
        z: 499
      }, {
        code: "KH",
        z: 15135
      }, {
        code: "CM",
        z: 22254
      }, {
        code: "CA",
        z: 35154
      }, {
        code: "KY",
        z: 58
      }, {
        code: "CF",
        z: 4616
      }, {
        code: "TD",
        z: 12825
      }, {
        code: "CHI",
        z: 162
      }, {
        code: "CL",
        z: 17620
      }, {
        code: "CN",
        z: 1357380
      }, {
        code: "CO",
        z: 48321
      }, {
        code: "KM",
        z: 735
      }, {
        code: "ZAR",
        z: 67514
      }, {
        code: "CG",
        z: 4448
      }, {
        code: "CR",
        z: 4872
      }, {
        code: "CI",
        z: 20316
      }, {
        code: "HR",
        z: 4256
      }, {
        code: "CU",
        z: 11266
      }, {
        code: "CW",
        z: 154
      }, {
        code: "CY",
        z: 1141
      }, {
        code: "CZ",
        z: 10514
      }, {
        code: "DK",
        z: 5615
      }, {
        code: "DJ",
        z: 873
      }, {
        code: "DM",
        z: 72
      }, {
        code: "DO",
        z: 10404
      }, {
        code: "EC",
        z: 15738
      }, {
        code: "EG",
        z: 82056
      }, {
        code: "SV",
        z: 6340
      }, {
        code: "GQ",
        z: 757
      }, {
        code: "ER",
        z: 6333
      }, {
        code: "EE",
        z: 1318
      }, {
        code: "ET",
        z: 94101
      }, {
        code: "FO",
        z: 49
      }, {
        code: "FJ",
        z: 881
      }, {
        code: "FI",
        z: 5439
      }, {
        code: "FR",
        z: 65940
      }, {
        code: "PF",
        z: 277
      }, {
        code: "GA",
        z: 1672
      }, {
        code: "GM",
        z: 1849
      }, {
        code: "GE",
        z: 4487
      }, {
        code: "DE",
        z: 80652
      }, {
        code: "GH",
        z: 25905
      }, {
        code: "GR",
        z: 11028
      }, {
        code: "GL",
        z: 56
      }, {
        code: "GD",
        z: 106
      }, {
        code: "GU",
        z: 165
      }, {
        code: "GT",
        z: 15468
      }, {
        code: "GN",
        z: 11745
      }, {
        code: "GW",
        z: 1704
      }, {
        code: "GY",
        z: 800
      }, {
        code: "HT",
        z: 10317
      }, {
        code: "HN",
        z: 8098
      }, {
        code: "HK",
        z: 7188
      }, {
        code: "HU",
        z: 9894
      }, {
        code: "IS",
        z: 324
      }, {
        code: "IN",
        z: 1252140
      }, {
        code: "ID",
        z: 249866
      }, {
        code: "IR",
        z: 77447
      }, {
        code: "IQ",
        z: 33417
      }, {
        code: "IE",
        z: 4598
      }, {
        code: "IMY",
        z: 86
      }, {
        code: "IL",
        z: 8060
      }, {
        code: "IT",
        z: 60234
      }, {
        code: "JM",
        z: 2715
      }, {
        code: "JP",
        z: 127339
      }, {
        code: "JO",
        z: 6460
      }, {
        code: "KZ",
        z: 17035
      }, {
        code: "KE",
        z: 44354
      }, {
        code: "KI",
        z: 102
      }, {
        code: "KP",
        z: 24895
      }, {
        code: "KR",
        z: 50220
      }, {
        code: "KSV",
        z: 1824
      }, {
        code: "KW",
        z: 3369
      }, {
        code: "KG",
        z: 5720
      }, {
        code: "LA",
        z: 6770
      }, {
        code: "LV",
        z: 2013
      }, {
        code: "LB",
        z: 4467
      }, {
        code: "LS",
        z: 2074
      }, {
        code: "LR",
        z: 4294
      }, {
        code: "LY",
        z: 6202
      }, {
        code: "LI",
        z: 37
      }, {
        code: "LT",
        z: 2958
      }, {
        code: "LU",
        z: 543
      }, {
        code: "MO",
        z: 566
      }, {
        code: "MK",
        z: 2107
      }, {
        code: "MG",
        z: 22925
      }, {
        code: "MW",
        z: 16363
      }, {
        code: "MY",
        z: 29717
      }, {
        code: "MV",
        z: 345
      }, {
        code: "ML",
        z: 15302
      }, {
        code: "MT",
        z: 423
      }, {
        code: "MH",
        z: 53
      }, {
        code: "MR",
        z: 3890
      }, {
        code: "MU",
        z: 1259
      }, {
        code: "MX",
        z: 122332
      }, {
        code: "FM",
        z: 104
      }, {
        code: "MD",
        z: 3559
      }, {
        code: "MC",
        z: 38
      }, {
        code: "MN",
        z: 2839
      }, {
        code: "ME",
        z: 621
      }, {
        code: "MA",
        z: 33008
      }, {
        code: "MZ",
        z: 25834
      }, {
        code: "MM",
        z: 53259
      }, {
        code: "NA",
        z: 2303
      }, {
        code: "NP",
        z: 27797
      }, {
        code: "NL",
        z: 16804
      }, {
        code: "NC",
        z: 262
      }, {
        code: "NZ",
        z: 4442
      }, {
        code: "NI",
        z: 6080
      }, {
        code: "NE",
        z: 17831
      }, {
        code: "NG",
        z: 173615
      }, {
        code: "MP",
        z: 54
      }, {
        code: "NO",
        z: 5080
      }, {
        code: "OM",
        z: 3632
      }, {
        code: "PK",
        z: 182143
      }, {
        code: "PW",
        z: 21
      }, {
        code: "PA",
        z: 3864
      }, {
        code: "PG",
        z: 7321
      }, {
        code: "PY",
        z: 6802
      }, {
        code: "PE",
        z: 30376
      }, {
        code: "PH",
        z: 98394
      }, {
        code: "PL",
        z: 38514
      }, {
        code: "PT",
        z: 10457
      }, {
        code: "PR",
        z: 3615
      }, {
        code: "QA",
        z: 2169
      }, {
        code: "ROM",
        z: 19981
      }, {
        code: "RU",
        z: 143500
      }, {
        code: "RW",
        z: 11777
      }, {
        code: "WS",
        z: 190
      }, {
        code: "SM",
        z: 31
      }, {
        code: "ST",
        z: 193
      }, {
        code: "SA",
        z: 28829
      }, {
        code: "SN",
        z: 14133
      }, {
        code: "RS",
        z: 7164
      }, {
        code: "SC",
        z: 89
      }, {
        code: "SL",
        z: 6092
      }, {
        code: "SG",
        z: 5399
      }, {
        code: "SX",
        z: 40
      }, {
        code: "SK",
        z: 5413
      }, {
        code: "SI",
        z: 2060
      }, {
        code: "SB",
        z: 561
      }, {
        code: "SO",
        z: 10496
      }, {
        code: "ZA",
        z: 53157
      }, {
        code: "SS",
        z: 11296
      }, {
        code: "ES",
        z: 46618
      }, {
        code: "LK",
        z: 20483
      }, {
        code: "KN",
        z: 54
      }, {
        code: "LC",
        z: 182
      }, {
        code: "MF",
        z: 31
      }, {
        code: "VC",
        z: 109
      }, {
        code: "SD",
        z: 37964
      }, {
        code: "SR",
        z: 539
      }, {
        code: "SZ",
        z: 1250
      }, {
        code: "SE",
        z: 9600
      }, {
        code: "CH",
        z: 8088
      }, {
        code: "SY",
        z: 22846
      }, {
        code: "TJ",
        z: 8208
      }, {
        code: "TZ",
        z: 49253
      }, {
        code: "TH",
        z: 67011
      }, {
        code: "TMP",
        z: 1180
      }, {
        code: "TG",
        z: 6817
      }, {
        code: "TO",
        z: 105
      }, {
        code: "TT",
        z: 1341
      }, {
        code: "TN",
        z: 10887
      }, {
        code: "TR",
        z: 74933
      }, {
        code: "TM",
        z: 5240
      }, {
        code: "TC",
        z: 33
      }, {
        code: "TV",
        z: 10
      }, {
        code: "UG",
        z: 37579
      }, {
        code: "UA",
        z: 45490
      }, {
        code: "AE",
        z: 9346
      }, {
        code: "GB",
        z: 64107
      }, {
        code: "US",
        z: 316129
      }, {
        code: "UY",
        z: 3407
      }, {
        code: "UZ",
        z: 30243
      }, {
        code: "VU",
        z: 253
      }, {
        code: "VE",
        z: 30405
      }, {
        code: "VN",
        z: 89709
      }, {
        code: "VI",
        z: 105
      }, {
        code: "WBG",
        z: 4170
      }, {
        code: "YE",
        z: 24407
      }, {
        code: "ZM",
        z: 14539
      }, {
        code: "ZW",
        z: 14150
      }];

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

        // Apply the theme
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
        var options = {
          chart: {
            borderWidth: 1,
            height:245
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
            data: data,
            minSize: 10,
            maxSize: '80%',
            tooltip: {
              pointFormat: '{point.name} - {point.z}'
            }
          }]
        };
        /*map bubble*/
        $('#worldMap').highcharts('Map', Highcharts.merge(options, theme));
      });
    }
  }

})();