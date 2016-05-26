(function() {
  'use strict';

  angular.module('app')
    .controller('LandingCtrl', ['$scope', '$http', '$location', "gaugesService", "loggedInUser", LandingCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function LandingCtrl($scope, $http, $location, gaugesService, loggedInUser) {
    $scope.userRole = "";
    $scope.gauges = {};

    $scope.deptBarChartOptions = {
      colors: ["#C9C9C9", "#5494AB", "#C82E12"],

      chart: {
        type: "columnrange",
        inverted: true,
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
        enabled: true
      },

      plotOptions: {
        bar: {
          pointWidth: 10,
          pointPadding: 0,
          dataLabels: {
            color: '#707073',
            verticalAlign: 'middle',
            align: "right",
            formatter: function() {
              return "$ " + this.point.y + " M"
                //return this.point.category
            },
            enabled: false
          }
        },
        series: {
          groupPadding: 0,
          stacking: "normal"
        }
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
        enabled: false,
        lineHeight: 10,
        margin: 5,
        itemStyle: {
          fontSize: '9px'
        }
      },

      title: {
        text: null
      },

      subtitle: {
        text: null
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
        categories: ['HR', 'Broadcast', 'Financial', 'Technical'],
        min: 0,
        max: 3,
        title: {
          text: null
        },
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#707073',
            fontSize: "12px",
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
        name: "Budget",
        data: [{
          low: 10,
          high: 15
        }, {
          low: 0,
          high: 10
        }, {
          low: 8,
          high: 10
        }, {
          low: 3,
          high: 5
        }],
        marker: {
          symbol: 'circle'
        }
      }, {
        groupPadding: 0,
        name: "Spent",
        data: [{
          low: 0,
          high: 10
        }, {
          low: 0,
          high: 0
        }, {
          low: 0,
          high: 8
        }, {
          low: 0,
          high: 3
        }],
        marker: {
          symbol: 'circle'
        }
      }, {
        groupPadding: 0,
        name: "Over Spent",
        data: [{
          low: 0,
          high: 0
        }, {
          low: 10,
          high: 15
        }, {
          low: 0,
          high: 0
        }, {
          low: 0,
          high: 0
        }],
        marker: {
          symbol: 'circle'
        }
      }]
    };

    $scope.navigateTo = function(route) {
      if ($location.url() != route)
        $location.url(route);
    }

    $scope.init = function() {
      loggedInUser.isLoggedIn("/landing");

      loggedInUser.fetchCurrentUser()
        .success(function(data, status, headers, config) {
          $scope.userRole = data.userRole
          populateGaugeData($scope.userRole);
        })
        .error(function(data, status, headers, config) {
          $location.url("#/")
        })
    }

    var populateGaugeData = function(userRole) {

      switch (userRole) {
        case "CEO":
          $scope.gauges = {
            organization: {
              percent: 25,
              text: 30
            },
            hr_dept: {
              percent: 50
            },
            fin_dept: {
              percent: 80
            },
            brd_dept: {
              percent: 25
            },
            tech_dept: {
              percent: 70
            },
            vendors: {
              percent: 50
            }
          };
          break

        case "SLMGR":
        case "FLDSL":
          $scope.gauges = {
            finance: {
              percent: 50
            },
            customers: {
              percent: 75
            },
            people: {
              percent: 80,
              text: "15d"
            },
            projects: {
              percent: 50
            }
          };
          break
      }
      $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

  }

})();