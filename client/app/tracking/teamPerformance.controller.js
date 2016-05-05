(function() {
	'use strict';

	angular.module('app')
		.controller('TeamPerformanceCtrl', ['$scope', '$http', '$location', "gaugesService", "CONST", TeamPerformanceCtrl])

	function TeamPerformanceCtrl($scope, $http, $location, gaugesService, CONST) {
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

		$scope.team = [{
			name: "D Smith",
			title: "Manager HR",
			img: "images/g1.jpg",
			trendIsPositive: true,
			trend: "+1.0 M",
			budget: "4 M",
			fct: "4.5 M",
			progress: {
				percent: 30,
				barLabel: "",
				barValue: "$5 M"
			}
		}, {
			name: "S Doe",
			title: "Manager",
			img: "images/m1.jpg",
			trendIsPositive: false,
			trend: "-2.0 M",
			budget: "18 M",
			fct: "18 M",
			progress: {
				percent: 60,
				barLabel: "",
				barValue: "$16 M"
			}
		}, {
			name: "M Maria",
			title: "Manager IT",
			img: "images/g2.jpg",
			trendIsPositive: true,
			trend: "+1.0 M",
			budget: "18 M",
			fct: "19 M",
			progress: {
				percent: 75,
				barLabel: "",
				barValue: "$19 M"
			}
		}, {
			name: "A Aditya",
			title: "Mgr Finance",
			img: "images/m4.jpg",
			trendIsPositive: false,
			trend: "-2.0 M",
			budget: "12 M",
			fct: "12 M",
			progress: {
				percent: 40,
				barLabel: "",
				barValue: "$10 M"
			}
		}, {
			name: "G Lorem",
			title: "Mgr Audit",
			img: "images/g3.jpg",
			trendIsPositive: true,
			trend: "+3.0 M",
			budget: "11 M",
			fct: "15 M",
			progress: {
				percent: 50,
				barLabel: "",
				barValue: "$14 M"
			}
		}, {
			name: "C Gayle",
			title: "Manager HR",
			img: "images/m3.jpg",
			trendIsPositive: false,
			trend: "-0.5 M",
			budget: "19.5 M",
			fct: "19.5 M",
			progress: {
				percent: 80,
				barLabel: "",
				barValue: "$20 M"
			}
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
				tickInterval: 25
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
				enabled: false
			},

			series: [{
				name: "Sales",
				data: [60.5, 65.9, 78.6],
				type: "area",
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

		$scope.init = function() {
			$scope.isTeamView = true;
		}

		$scope.empView = function(index) {
			$scope.isTeamView = false;
			var selectedEmp = $scope.team[index];

			$scope.emp = {};
			$scope.emp.value = selectedEmp.progress.barValue;
			$scope.emp.trend = selectedEmp.trend;
			$scope.emp.trendIsPositive = selectedEmp.trendIsPositive;
			$scope.emp.budget = selectedEmp.budget;
			$scope.emp.fct = selectedEmp.fct
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