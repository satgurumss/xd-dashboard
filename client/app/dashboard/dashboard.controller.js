(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', ['$scope', '$http', DashboardCtrl])

  function DashboardCtrl($scope, $http) {

    $scope.line2 = {};
    $scope.radar1 = {};
    $scope.deals = [];
    $scope.queryText = "";

    $scope.search = function() {
      console.log($scope.queryText);
    }
    $scope.pie2 = {
      title: "Pie Chart",
      iconUrl: "images/widgets/placeholder.png"
    };
    $scope.bar3 = {
      title: "Bar Chart",
      iconUrl: "images/widgets/icon_top-categories.png",
    };

    $http.get('/app/sampleData/deal.json').then(function(deals) {
      $scope.deals = deals.data.documents;
      console.log($scope.deals);
    });

    $scope.widgets = [{
      title: "My Deals",
      iconUrl: "images/widgets/icon_area-chart.png",
      searches: [{
        title: "Search 1_1",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 1_2",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 1_3",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }]
    }, {
      title: "My Investments",
      iconUrl: "images/widgets/icon_cpu-usage.png",
      searches: [{
        title: "Search 2_1",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 2_2",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 2_3",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }]
    }, {
      title: "My Region",
      iconUrl: "images/widgets/icon_map.png",
      searches: [{
        title: "Search 3_1",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 3_2",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 3_3",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }]
    }, {
      title: "My Interests",
      iconUrl: "images/widgets/icon_memory-usage.png",
      searches: [{
        title: "Search 4_1",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 4_2",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }, {
        title: "Search 4_3",
        date: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, alias, in accusantium totam adipisci vel et suscipit quidem libero pariatur minus ratione quo doloremque error at nemo incidunt dicta quia?"
      }]
    }]

    $scope.bar3.options = {
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['2011', '2012', '2013']
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'value',
        boundaryGap: [0, 0.01]
      }],
      yAxis: [{
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'Population']
      }],
      series: [{
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      }, {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }, {
        name: '2013',
        type: 'bar',
        data: [17325, 21438, 35000, 100000, 134141, 581807]
      }]
    };

    $scope.pie2.options = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search']
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      calculable: true,
      series: [{
        name: 'Traffic source',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            label: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          }
        },
        data: [{
          value: 335,
          name: 'Direct'
        }, {
          value: 310,
          name: 'Email'
        }, {
          value: 234,
          name: 'Affiliate'
        }, {
          value: 135,
          name: 'Video Ads'
        }, {
          value: 1548,
          name: 'Search'
        }]
      }]
    };

    $scope.removeWidget = function(widget) {
      widget.isHide = true;
      console.log(widget);
      var storeIndex;
      storeIndex = -1;
      angular.forEach($scope.widgets, function(value, key) {
        if (value.title === widget.title) {
          storeIndex = key;
          return false;
        }
      });
      if (storeIndex > -1) {
        $scope.widgets[storeIndex].added = false;
      }
    };

    $scope.line2.options = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Affiliate', 'Video Ads', 'Direct', 'Search']
      },
      toolbox: {
        show: false,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'Email',
        type: 'line',
        stack: 'Sum',
        data: [120, 132, 101, 134, 90, 230, 210]
      }, {
        name: 'Affiliate',
        type: 'line',
        stack: 'Sum',
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: 'Video Ads',
        type: 'line',
        stack: 'Sum',
        data: [150, 232, 201, 154, 190, 330, 410]
      }, {
        name: 'Direct',
        type: 'line',
        stack: 'Sum',
        data: [320, 332, 301, 334, 390, 330, 320]
      }, {
        name: 'Search',
        type: 'line',
        stack: 'Sum',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }]
    };

    $scope.radar1.options = {
      animation: false,
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'bottom',
        data: ['Allocated Budget', 'Actual Spending']
      },
      toolbox: {
        show: false,
        feature: {
          restore: {
            show: true,
            title: "restore"
          },
          saveAsImage: {
            show: true,
            title: "save as image"
          }
        }
      },
      polar: [{
        indicator: [{
          text: 'sales',
          max: 6000
        }, {
          text: 'dministration',
          max: 16000
        }, {
          text: 'Information Techology',
          max: 30000
        }, {
          text: 'Customer Support',
          max: 38000
        }, {
          text: 'Development',
          max: 52000
        }, {
          text: 'Marketing',
          max: 25000
        }]
      }],
      calculable: true,
      series: [{
        name: 'Budget vs spending',
        type: 'radar',
        data: [{
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Allocated Budget'
        }, {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Actual Spending'
        }]
      }]
    };

  }

})();

angular.module('app')
  .animation('.slide', [
    function() {
      var support;
      support = jQuery.keyframe.isSupported();
      jQuery.keyframe.debug = false;
      return {
        leave: function(element, doneFn) {
          var elemHeight, elemScaledHeight, elemScaledWidth, elemWidth, firstFrame, scaledLeftOffset, scaledTopOffset, secondFrame, widgetControlWidth;
          elemHeight = parseInt(element.css('height'));
          elemWidth = parseInt(element.css('width'));
          widgetControlWidth = angular.element('.widget-control').width();
          elemScaledHeight = elemHeight * 0.1;
          elemScaledWidth = elemWidth * 0.1;
          console.log("widget control width", widgetControlWidth);
          console.log("elemHeight", elemHeight);
          console.log("elemWidth", elemWidth);
          console.log("elementTop", element.css('top'));

          scaledTopOffset = ((elemHeight - elemScaledHeight) / 2) + 20;
          scaledLeftOffset = ((elemWidth - elemScaledWidth) / 2) - (widgetControlWidth / 2);
          console.log("scaledTopOffset", scaledTopOffset);
          console.log("scaledLeftOffset", scaledLeftOffset);
          secondFrame = {
            'opacity': '0.8',
            'z-index': '5',
            'top': '-' + scaledTopOffset + 'px',
            'left': '-' + scaledLeftOffset + 'px',
            '-webkit-transform': 'scale3d(.1,.1,.1)',
            '-moz-transform': 'scale3d(.1,.1,.1)',
            '-o-transform': 'scale3d(.1,.1,.1)',
            'transform': 'scale3d(.1,.1,.1)'
          };
          firstFrame = {
            'opacity': '1',
            '-webkit-transform': 'scale3d(.475,.475,.475) translate3d(0px , 60px ,50px)',
            '-moz-transform': 'scale3d(.475,.475,.475) translate3d(0px , 60px ,50px)',
            '-o-transform': 'scale3d(.475,.475,.475) translate3d(0px , 60px ,50px)',
            'transform': 'scale3d(.475,.475,.475) translate3d(0px , 60px ,50px)'
          };
          jQuery.keyframe.define([{
            name: 'onMove',
            '40%': firstFrame,
            '100%': secondFrame
          }]);
          element.resetKeyframe(function() {
            return element.playKeyframe({
              name: 'onMove',
              duration: '1s',
              delay: '0s',
              timingFunction: 'ease-in-out',
              complete: doneFn
            });
          });
        }
      };
    }
  ]);