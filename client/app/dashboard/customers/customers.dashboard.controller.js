(function() {
  'use strict';

  angular.module('app')
    .controller('CustomersDashCtrl', ['$scope', '$http', '$location', "gaugesService", "CONST", "loggedInUser", 'utils', "XDENSITY", "$log", CustomersDashCtrl])

  function CustomersDashCtrl($scope, $http, $location, gaugesService, CONST, loggedInUser, utils, XDENSITY, $log) {
    $scope.sourceCustomerBarChart = {
      colors: ["#688E49"],

      chart: {
        type: "bar",
        height: 120,
        style: {
          fontFamily: "sans-serif"
        },
        backgroundColor: "#464646",
        plotBorderColor: '#464646',
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
          pointWidth: 18,
          pointPadding: 0,
          borderRadius: 8,
          borderColor: "#688E49",
          dataLabels: {
            color: '#000',
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
        categories: ['Acme Corporation', 'Mercury Consulting', 'Omega Technologies', 'Starlight Systems', 'Platinum Consulting'],
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
            color: '#fff',
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

    $scope.options = {
      from: 1,
      to: 4,
      step: 1,
      dimension: " quarter",
      smooth: false,
      limits:false,
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
      scale: ["Jan", "Apr", "Jul", "Oct"]
    };

    $scope.qtrToDisplay = "1";

    $scope.mapData = [{
      code: "us-ma",
      z: 0
    }, {
      code: "us-wa",
      z: 1
    }, {
      code: "us-ca",
      z: 2
    }, {
      code: "us-or",
      z: 3
    }, {
      code: "us-wi",
      z: 4
    }, {
      code: "us-me",
      z: 5
    }, {
      code: "us-mi",
      z: 6
    }, {
      code: "us-nv",
      z: 7
    }, {
      code: "us-nm",
      z: 8
    }, {
      code: "us-co",
      z: 9
    }, {
      code: "us-wy",
      z: 10
    }, {
      code: "us-ks",
      z: 11
    }, {
      code: "us-ne",
      z: 12
    }, {
      code: "us-ok",
      z: 13
    }, {
      code: "us-mo",
      z: 14
    }, {
      code: "us-il",
      z: 15
    }, {
      code: "us-in",
      z: 16
    }, {
      code: "us-vt",
      z: 17
    }, {
      code: "us-ar",
      z: 18
    }, {
      code: "us-tx",
      z: 19
    }, {
      code: "us-ri",
      z: 20
    }, {
      code: "us-al",
      z: 21
    }, {
      code: "us-ms",
      z: 22
    }, {
      code: "us-nc",
      z: 23
    }, {
      code: "us-va",
      z: 24
    }, {
      code: "us-ia",
      z: 25
    }, {
      code: "us-md",
      z: 26
    }, {
      code: "us-de",
      z: 27
    }, {
      code: "us-pa",
      z: 28
    }, {
      code: "us-nj",
      z: 29
    }, {
      code: "us-ny",
      z: 30
    }, {
      code: "us-id",
      z: 31
    }, {
      code: "us-sd",
      z: 32
    }, {
      code: "us-ct",
      z: 33
    }, {
      code: "us-nh",
      z: 34
    }, {
      code: "us-ky",
      z: 35
    }, {
      code: "us-oh",
      z: 36
    }, {
      code: "us-tn",
      z: 37
    }, {
      code: "us-wv",
      z: 38
    }, {
      code: "us-dc",
      z: 39
    }, {
      code: "us-la",
      z: 40
    }, {
      code: "us-fl",
      z: 41
    }, {
      code: "us-ga",
      z: 42
    }, {
      code: "us-sc",
      z: 43
    }, {
      code: "us-mn",
      z: 44
    }, {
      code: "us-mt",
      z: 45
    }, {
      code: "us-nd",
      z: 46
    }, {
      code: "us-az",
      z: 47
    }, {
      code: "us-ut",
      z: 48
    }, {
      code: "us-hi",
      z: 49
    }, {
      code: "us-ak",
      z: 50
    }, {
      z: 51
    }];

    $scope.formatNumberFromString = function(value) {
      return utils.formatNumberFromString(value)
    }

    $scope.init = function() {
      utils.validateExcelData(function() {
        //XDENSITY.isLoaded = true;

        loggedInUser.fetchCurrentUser()
          .success(function(data, status, headers, config) {
            loggedInUser.isLoggedIn("/customers-dashboard");
            $scope.userRole = data.userRole;
            populateData($scope.userRole);
          })
          .error(function(data, status, headers, config) {
            $location.url("#/")
          });

        /* $scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));*/
      });
    }

    var populateData = function(userRole) {
      $scope.gauges = {};
      $scope.gauges["phone"] = {};
      $scope.gauges["web"] = {};
      $scope.gauges["events"] = {};


      $scope.gauges.phone["colors"] = ['#DDD', '#77AC4A']
      $scope.gauges.web["colors"] = ['#DDD', '#77AC4A']
      $scope.gauges.events["colors"] = ['#DDD', '#77AC4A']

      $scope.gauges.phone["percent"] = 20;
      $scope.gauges.web["percent"] = 30;
      $scope.gauges.events["percent"] = 50;

      $scope.organization = utils.getDeptData("Organization");

      $scope.sourceRevenues = {
        phone: {
          ytd: "30.00 M",
          avg: "50.45 M"
        },
        web: {
          ytd: "30.00 M",
          avg: "50.45 M"
        },
        events: {
          ytd: "30.00 M",
          avg: "50.45 M"
        },
        technical: {
          ytd: "30.00 M",
          avg: "50.45 M"
        }
      };

      var trendData = utils.getDeptTrendData("Organization");
      $scope.trendChart.series[0].data = [];
      $scope.trendChart.series[0].data = [trendData["2014"].budget, trendData["2015"].budget, trendData["2016"].budget];

      $scope.trendChart.series[1].data = [];
      $scope.trendChart.series[1].data = [trendData["2014"].spend, trendData["2015"].spend, trendData["2016"].spend];

      //$scope.gauges = angular.copy(gaugesService.updateGaugeState($scope.gauges));
    }

    function formatDeptChartData() {
      var series = {
        budget: [],
        spent: [],
        overSpent: []
      };

      _.each(XDENSITY.sheets.departments.data, function(dept) {
        var budget = dept.Budget,
          spent = dept.Spend,
          diff = 0,
          budgetData = spentData = overSpentData = {
            low: 0,
            high: 0
          };

        budget = formatNumberToSD(parseInt(budget.replace(/,/g, "")), 2);
        spent = formatNumberToSD(parseInt(spent.replace(/,/g, "")), 2);
        diff = budget - spent;

        if (diff > 0) {
          budgetData.low = spent;
          budgetData.high = budget;

          spentData.high = spent;
        } else if (diff < 0) {
          budgetData.high = budget;

          overSpentData.low = budget;
          overSpentData.high = budget + -1(diff);
        }

        series.budget.push(budgetData);
        series.spent.push(spentData);
        series.overSpent.push(overSpentData);
      });

      $scope.deptBarChartOptions.series[0].data = series.budget
      $scope.deptBarChartOptions.series[1].data = series.spent
      $scope.deptBarChartOptions.series[2].data = series.overSpent
    }
  }

})();