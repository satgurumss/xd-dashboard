(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileCtrl', ['$scope', '$rootScope', '$http', '$location','CONST', 'gaugesService', "loggedInUser", ProfileCtrl])

  function ProfileCtrl($scope, $rootScope, $http, $location, CONST, gaugesService, loggedInUser) {
  	loggedInUser.isLoggedIn("/my-profile")

    $scope.vacationsChart = {
  		percent: 100-25,
  		text: "15d"
  	};
    $scope.userInfo = {}

  	$scope.reason = "";

  	$scope.options = {
      from: 3,
      to: 12,
      step: 3,
      dimension: " years",
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

    $scope.monthsToDisplay = "3";

    $scope.chartConfig = {
      colors: ["#28bdc6", "rgba(144,228,173, .3)", "rgba(204, 230, 121, .3)"],
      chart: {
        height: 200,
        marginRight: 25,
        backgroundColor: {
          linearGradient: {
            x1: 1,
            y1: 1,
            x2: 1,
            y2: 1
          },
          stops: [
            [0, '#3E3E40'],
            [1, '#3E3E40']
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
      	enabled:false,
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
        align: "center",
        borderWidth: 0,
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 6
      },

      credits: {
        enabled: false
      },

      labels: {
        style: {
          color: '#707073'
        }
      },

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
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        tickInterval: 1,
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          text: 'Performance Index',
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
        categories: ["'14", "'15", "'16"],
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
        tickInterval: 1,
        tickmarkPlacement: "on",
        min: 0,
        max: 2,
        startOnTick: true,
        endOnTick: true,
        minPadding: 0,
        maxPadding: 0,
        align: "left"
      },

      series: [{
        type: 'area',
        fillColor: "rgba(40, 189, 198, 0.3)",
        name: 'Performance',
        data: [5.0, 4.0, 5.0],
        marker: {
          symbol: 'circle',
          fillColor: 'rgba(40, 189, 198, 1)',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }]
    };

    $scope.updateChart = function() {
      var categories = [];

      switch ($scope.monthsToDisplay) {
        case "3":
          categories = ["'14", "'15", "'16"]
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = 2;
          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [5.0, 4.5, 5.0];
          break

        case "6":
          categories = ["'11","'12","'13","'14", "'15", "'16"]
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = 4.5;

          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [4.5, 4.0, 4.0, 5.0, 4.5, 5.0];
          break;

        case "9":
          categories = [,"'09","'10","'11","'12","'13","'14", "'15", "'16"]
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = 7.5;

          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [3.5, 3, 4, 4.5, 4.0, 4.0, 5.0, 4.5, 5.0];
          break;

        case "12":
          categories = ["'05","'06","'07","'08","'09","'10","'11","'12","'13","'14", "'15", "'16"]
          $scope.chartConfig.xAxis.categories = categories;
          $scope.chartConfig.xAxis.max = null;

          $scope.chartConfig.series[0].data = [];
          $scope.chartConfig.series[0].data = [3.5, 3, 3, 3.5, 3, 4, 4.5, 4.0, 4.0, 5.0, 4.5, 5.0];
          break;
      }
    }

    $scope.navigateTo = function(route){
      if($location.url() != route)
        $location.url(route);
    }

    $scope.init = function(){
      if($scope.vacationsChart.percent <= 30){
        $scope.vacationsChart.colors = CONST.gaugeDanger      }
      else if(30 < $scope.vacationsChart.percent && $scope.vacationsChart.percent <= 50){
        $scope.vacationsChart.colors = CONST.gaugeWarning      }
      else if(50 < $scope.vacationsChart.percent && $scope.vacationsChart.percent <= 100){
        $scope.vacationsChart.colors = CONST.gaugeSuccess      }
    }

    $scope.showInfo = function(info, index){
      var values= ["$20 K", "$5 K", "$10 K"],
          percents=["50%", "25%", "25%"];
      
      $scope.userInfo = {
        title: info,
        value: values[index],
        percent: percents[index]
      };
    }
  }


})();