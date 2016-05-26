(function() {
  'use strict';

  angular.module('app')
    .controller('VendorsDashCtrl', ['$scope', '$http', '$location', 'gaugesService', 'CONST', '$uibModal', "loggedInUser", VendorsDashCtrl])
    .controller('addEventModalCtrl', ['$scope', '$uibModalInstance', 'startDate', addEventModalCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function VendorsDashCtrl($scope, $http, $location, gaugesService, CONST, $uibModal, loggedInUser) {

    $scope.currentSelectedDate = new Date();

    $scope.gauges = {
      hr: {
        percent: 20,
        colors: ['#BCBCBC', '#347BA1']
      }
    };

    /*    $scope.events = [{
      title: 'Corporate Event', // The title of the event
      type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
      startsAt: new Date(), // A javascript date object for when the event starts
      endsAt: new Date(), // Optional - a javascript date object for when the event ends
      editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: true, // If
    }, {
      title: 'Management Training', // The title of the event
      type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
      startsAt: new Date(), // A javascript date object for when the event starts
      endsAt: new Date(), // Optional - a javascript date object for when the event ends
      editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: true, // If
    }, {
      title: 'Management Training 2', // The title of the event
      type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
      startsAt: "Thu May 15 2016 19:22:13 GMT+0500 (Pakistan Standard Time)", // A javascript date object for when the event starts
      endsAt: "Thu May 19 2016 19:22:13 GMT+0500 (Pakistan Standard Time)", // Optional - a javascript date object for when the event ends
      editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: true, // If
    }];

    $scope.calendarOptions = {
      view: "month",
      viewDate: new Date(),
      viewTitle: "Training & Events",
      eventHtmlEdit: "<i class=\'glyphicon glyphicon-pencil\'></i>",
      deleteEventHtml: "<i class=\'glyphicon glyphicon-remove\'></i>",
      cellIsOpen: true,
      enableViewChange: false
    }*/

    /*    $scope.onTimespanClick = function(calendarDate, calendarCell) {
      $scope.currentSelectedDate = new Date(calendarDate);
    }

    $scope.addEvent = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'addEventModalCtrl',
        size: "lg",
        resolve: {
          startDate: function() {
            return $scope.currentSelectedDate
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        console.log(selectedItem);
        $scope.events.push({
          title: selectedItem.title,
          type: 'info',
          startsAt: new Date(selectedItem.startDate),
          endsAt: new Date(selectedItem.endDate),
          draggable: true,
          resizable: true,
          editable: false,
        });
      });

    }

    $scope.onEventDelete = function(calendarEvent) {
      $scope.events.splice($scope.events.indexOf(calendarEvent), 1);
    }*/

    $scope.vendorStats = {
      renewals: {
        percent: 10,
        text: "10",
        value: "10 M"
      },
      alignment: {
        percent: 30,
        value: "20"
      }
    };

    $scope.chartConfig = {
      colors: ["#28bdc6", "rgba(144,228,173, .3)", "rgba(204, 230, 121, .3)"],
      chart: {
        height: 225,
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        style: {
          color: '#F0F0F0'
        },
        valueSuffix: '%'
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
        },
        area: {
          events: {
            legendItemClick: function() {
              return false;
            }
          }
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
        text: "3 Year Trend Alignment",
        style: {
          color: '#E0E0E3',
          fontSize: '16px',
        },
        verticalAlign: 'bottom',
        align: 'center',
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
        min: 0,
        max: 100,
        tickInterval: 25,
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          text: '% Alignment',
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
        categories: ['2014', '2015', '2016'],
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
        name: 'Alignment',
        data: [50, 65, 80],
        marker: {
          symbol: 'circle',
          fillColor: '#303031',
          lineWidth: 1,
          lineColor: '#28bdc6'
        }
      }]
    };

    $scope.vendorsChartOptions = {
      colors: ["#72B6D7"],

      chart: {
        type: "bar",
        height: 100,
        width: 200,
        style: {
          fontFamily: "sans-serif"
        },
        plotBorderColor: '#606063',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 10
      },

      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        },
        valueSuffix: 'M',
        enabled: false
      },

      plotOptions: {
        bar: {
          pointWidth: 15,
          pointPadding: 0,
          borderRadius: 4,
          dataLabels: {
            color: '#707073',
            verticalAlign: 'middle',
            align: "right",
            formatter: function() {
              return "$ " + this.point.y + " M"
                //return this.point.category
            },
            enabled: true,
          }
        },
      },
      credits: {
        enabled: false
      },

      labels: {
        style: {
          color: '#707073'
        }
      },

      legend: {
        enabled: false
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
        categories: ['1', '2', '3', '4', '5'],
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
            fontSize: "14px",
            enabled: false
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
        groupPadding: 0,
        data: [22, 20, 15, 12, 10]
      }]
    };

    $scope.init = function() {
      loggedInUser.isLoggedIn("/vendors-dashboard");
      $scope.vendorStats = angular.copy(gaugesService.updateGaugeState($scope.vendorStats));
    }

    $scope.updateChart = function() {
      var categories = [],
        generateRandomSeries = function(max) {
          var rnd = []
          for (var i = 0; i < max; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
          }
          return rnd;
        }

      switch (hrCtrl.monthsToDisplay) {
        case "3":
          categories = ['FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [60.5, 65.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [84.1, 80.6, 85.5];


          break
        case "6":
          categories = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [90.2, 80.5, 75.3, 60.5, 65.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [88.6, 87.0, 84.3, 80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [68.8, 80.1, 70.1, 84.1, 80.6, 85.5];


          break;
        case "9":
          categories = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [65.5, 80, 85.5, 90.2, 80.5, 75.3, 60.5, 65.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [80.4, 83.5, 87.0, 88.6, 87.0, 84.3, 80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [81.3, 70.0, 76.0, 68.8, 80.1, 70.1, 84.1, 80.6, 85.5];

          break;
        case "12":
          categories = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [50.2, 60, 73.5, 65.5, 80, 85.5, 90.2, 80.5, 75.3, 60.5, 65.9, 78.6];

          $scope.satisfactionChart.series[1].data = [];
          $scope.satisfactionChart.series[1].data = [60.9, 70.6, 73.5, 80.4, 83.5, 87.0, 88.6, 87.0, 84.3, 80.0, 76.9, 81.0];

          $scope.satisfactionChart.series[2].data = [];
          $scope.satisfactionChart.series[2].data = [55.2, 65.8, 75.7, 81.3, 70.0, 76.0, 68.8, 80.1, 70.1, 84.1, 80.6, 85.5];

          break;
      }
    }

    $scope.goToSearchVendors = function() {
      $location.url('/search');
    }
  }

  function addEventModalCtrl($scope, $modalInstance, startDate) {
    $scope.newEvent = {};
    $scope.newEvent.startDate = startDate;
    $scope.newEvent.endDate = startDate;

    $scope.ok = function() {
      if ($scope.newEvent.title)
        $modalInstance.close($scope.newEvent);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }

})();