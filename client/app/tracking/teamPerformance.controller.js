(function() {
	'use strict';

	angular.module('app')
		.controller('TeamPerformanceCtrl', ['$scope', '$http', '$location', "gaugesService", "CONST", TeamPerformanceCtrl])

	function TeamPerformanceCtrl($scope, $http, $location, gaugesService, CONST) {
		$scope.isTeamView = true;

		$scope.performanceProgress = {
			percent: 75,
			barLabel: "YTD",
			barValue: "$ 10.6 M"
		};

		$scope.barChartOptions = {
			colors: ["#B6A2DE"],

			chart: {
				type: "bar",
				height: 120,
				width: 200,
				style: {
					fontFamily: "sans-serif"
				},
				plotBorderColor: '#606063',
				spacingTop: 0,
				spacingBottom: 0,
				spacingLeft: 0,
				spacingRight: 0
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
				data: [20, 19, 16, 14, 10, 9]
			}]
		};

		$scope.empStats = [{
			percent: 40,
			barLabel: "",
			barValue: "40%"
		}, {
			percent: 60,
			barLabel: "",
			barValue: "65%"
		}, {
			percent: 75,
			barLabel: "",
			barValue: "75%"
		}, {
			percent: 40,
			barLabel: "",
			barValue: "40%"
		}, {
			percent: 50,
			barLabel: "",
			barValue: "50%"
		}, {
			percent: 80,
			barLabel: "",
			barValue: "80%"
		}];

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
    $scope.monthsToDisplay = "3";

    $scope.satisfactionChart = {
      chart: {
        height: 200,
        spacingLeft: 0,
        spacingRight: 5
      },

      title: {
        text: null,
      },

      subtitle: {
        text: null
      },

      credits: {
        enabled: false
      },

      yAxis: {
        title: {
          text: null,
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent',
        tickInterval:25
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent',
        categories: ['FEB', 'MAR', 'APR']
      },
      tooltip: {
        formatter: function() {
          return '<span class="display-inline-block" style="text-align:center;font-size:1.2em;">' + this.series.name + '</span><br><span class="display-inline-block" style="font-size:1.5em; font-weight: bold; margin-left:10px">' + this.y + '%</span>'
        }
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        borderWidth: 0,
        enabled:false
      },

      series: [{
        name: "Sales",
        data: [60.5, 65.9, 78.6],
        type:"area",
        fillColor: "rgba(40, 189, 198, 0.3)",
        color: "rgba(40, 189, 198, 1)",
        marker: {
          symbol: 'circle',
          fillColor: 'rgba(40, 189, 198, 1)',
          lineWidth: 1,
          lineColor: 'rgba(40, 189, 198, 1)'
        }
      }]
    };

    $scope.init = function(){
    	$scope.isTeamView = true;
    }

		$scope.empView = function(){
			$scope.isTeamView = false;
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

      switch ($scope.monthsToDisplay) {
        case "3":
          categories = ['FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [60.5, 65.9, 78.6];

          break
        case "6":
          categories = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [90.2, 80.5, 75.3, 60.5, 65.9, 78.6];

          break;
        case "9":
          categories = ['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [65.5, 80, 85.5, 90.2, 80.5, 75.3, 60.5, 65.9, 78.6];

          break;
        case "12":
          categories = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR']
          $scope.satisfactionChart.xAxis.categories = []
          $scope.satisfactionChart.xAxis.categories = categories;

          $scope.satisfactionChart.series[0].data = [];
          $scope.satisfactionChart.series[0].data = [50.2, 60, 73.5, 65.5, 80, 85.5, 90.2, 80.5, 75.3, 60.5, 65.9, 78.6];

          break;
      }
    }
	}

})();