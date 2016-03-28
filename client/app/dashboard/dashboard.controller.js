(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', ['$scope', '$http', '$location', 'backendApi', 'loggedInUser', DashboardCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function DashboardCtrl($scope, $http, $location, backendApi, loggedInUser) {
    $scope.searchbarWidth = "col-xs-12"
    $scope.searchTypeWidth = "col-xs-10"
    $scope.line2 = {};
    $scope.radar1 = {};
    $scope.deals = [];
    $scope.queryText = "";
    $scope.showChart = false;
    $scope.showAdded = false;
    var currentUser;

    $scope.init = function() {
      //use this to get current user
      currentUser = loggedInUser.getCurrentUser();
      if (typeof currentUser != "undefined" || currentUser != "")
        $scope.userName = currentUser.account_s[0];

    }

    $scope.widgets = [{
      title: "My Deals",
      iconUrl: "images/widgets/icon_area-chart.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "myDeals",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "My Investments",
      iconUrl: "images/widgets/icon_cpu-usage.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "myInvestments",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "My Region",
      iconUrl: "images/widgets/icon_map.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "myRegion",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "My Interests",
      iconUrl: "images/widgets/icon_memory-usage.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "myInterests",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "Recent Deals",
      iconUrl: "images/widgets/icon_cpu-usage.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "recentDeals",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "Recent Investments",
      iconUrl: "images/widgets/icon_cpu-usage.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "recentInvestments",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "Recent News",
      iconUrl: "images/widgets/icon_cpu-usage.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "recentNews",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }, {
      title: "Recent Documents",
      iconUrl: "images/widgets/icon_cpu-usage.png",
      searches: [],
      isHide: false,
      query: {
        "workflow": "recentDocuments",
        "query": "*",
        "username": $scope.userName,
        "realm": "Anonymous"
      }
    }];

    var dealReport = {
      "workflow": "dealReport",
      "query": "*",
      "username": $scope.userName,
      "realm": "Anonymous",
      "restParams": {
        "metric": ["total_investment_d"],
        "grouping": ["deal_type_s"]
      }
    };

    $scope.widgets.forEach(function(widget, index, array) {
      backendApi.search(widget.query).then(function(res) {
        widget.data = res.data.documents;
        // console.log(res);
      });
    })

    console.log("----widgets----");
    console.log($scope.widgets);

    backendApi.search(dealReport).then(function(res) {
      console.log("report data");
      console.log(res);
      $scope.reportData = res.data.documents;
      for (let i = 0; i < res.data.documents.length; i++) {
        $scope.bar3.options.series[0].data.push(parseInt(res.data.documents[i].fields.AVG[0]));
        $scope.bar3.options.series[1].data.push(parseInt(res.data.documents[i].fields.MAX[0]));
        $scope.bar3.options.series[2].data.push(parseInt(res.data.documents[i].fields.MIN[0]));
        $scope.bar3.options.series[3].data.push(parseInt(res.data.documents[i].fields.STDEV[0]));
        $scope.bar3.options.series[4].data.push(parseInt(res.data.documents[i].fields.SUM[0]));
        $scope.bar3.options.series[5].data.push(parseInt(res.data.documents[i].fields.count[0]));

        if (i === res.data.documents.length - 1) {
          $scope.showChart = true;
        }
      }
      console.log($scope.bar3.options);
    });

    $scope.pie2 = {
      title: "Pie Chart",
      iconUrl: "images/widgets/placeholder.png",
      isHide: false
    };

    $scope.bar3 = {
      title: "Deal Report",
      iconUrl: "images/widgets/icon_top-categories.png",
      isHide: false
    };

    // $scope.bar3.options = {
    //   title: {
    //     text: '',
    //     subtext: ''
    //   },
    //   tooltip: {
    //     trigger: 'axis'
    //   },
    //   legend: {
    //     data: ['2011', '2012', '2013']
    //   },
    //   toolbox: {
    //     show: true,
    //     feature: {
    //       restore: {
    //         show: true,
    //         title: "restore"
    //       saveAsImage: {
    //         show: true,
    //         title: "save as image"
    //       }
    //     }
    //   },
    //   calculable: true,
    //   xAxis: [{
    //     type: 'value',
    //     boundaryGap: [0, 0.01]
    //   }],
    //   yAxis: [{
    //     type: 'category',
    //     data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'Population']
    //   }],
    //   series: [{
    //     name: '2011',
    //     type: 'bar',
    //     data: [18203, 23489, 29034, 104970, 131744, 630230]
    //   }, {
    //     name: '2012',
    //     type: 'bar',
    //     data: [19325, 23438, 31000, 121594, 134141, 681807
    //   }, {
    //     name: '2013',
    //     type: 'bar',
    //     data: [17325, 21438, 35000, 100000, 134141, 581807]
    //   }]
    // };

    $scope.bar3.options = {
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['AVG', 'MAX', 'MIN', 'STDEV', 'SUM', 'COUNT']
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
        type: 'value',
        boundaryGap: [0, 0.01]
      }],
      yAxis: [{
        type: 'category',
        data: ['Change of Control', 'Growth Capital', 'LBO', 'MBO', 'Replacement Capital']
      }],
      series: [{
        name: 'AVG',
        type: 'bar',
        data: []
      }, {
        name: 'MAX',
        type: 'bar',
        data: []
      }, {
        name: 'MIN',
        type: 'bar',
        data: []
      }, {
        name: 'STDEV',
        type: 'bar',
        data: []
      }, {
        name: 'SUM',
        type: 'bar',
        data: []
      }, {
        name: 'COUNT',
        type: 'bar',
        data: []
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
      // angular.forEach($scope.widgets, function(value, key) {
      //   if (value.title === widget.title) {
      //     storeIndex = key;
      //     return false;
      //   }
      // });
      // if (storeIndex > -1) {
      //   $scope.widgets[storeIndex].added = false;
      // }
    };

    $scope.search = function(queryText) {
      if (queryText != "")
        $location.url("/search-result?queryText=" + queryText)
    }

    $scope.onSelect = function($item, $model, $label) {
      $scope.search($model)
    }
  }

})();

angular.module('app')
  .animation('.slide', [
    function() {
      var support;
      support = jQuery.keyframe.isSupported();
      jQuery.keyframe.debug = true;
      return {
        leave: function(element, doneFn) {
          var elemHeight, elemScaledHeight, elemScaledWidth, elemWidth, firstFrame, scaledLeftOffset, scaledTopOffset, secondFrame, widgetControlWidth;
          elemHeight = parseInt(element.css('height'));
          elemWidth = parseInt(element.css('width'));
          widgetControlWidth = angular.element('.widget-control').width();
          elemScaledHeight = elemHeight * 0.1;
          elemScaledWidth = elemWidth * 0.1;

          console.log("elemHeight: ", elemHeight);
          console.log("elemWidth: ", elemWidth);
          console.log("widgetControlWidth: ", widgetControlWidth);
          console.log("elemScaledHeight: ", elemScaledHeight);
          console.log("elemScaledWidth: ", elemScaledWidth);

          scaledTopOffset = ((elemHeight - elemScaledHeight) / 2) + 20;
          scaledLeftOffset = ((elemWidth - elemScaledWidth) / 2) - (widgetControlWidth / 2);

          console.log("scaledTopOffset: ", scaledTopOffset);
          console.log("scaledLeftOffset: ", scaledLeftOffset);

          secondFrame = {
            'opacity': '0.8',
            'z-index': '5',
            'top': '-' + scaledTopOffset + 'px',
            'left': +scaledLeftOffset + 'px',
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
              duration: '4s',
              delay: '0s',
              timingFunction: 'ease-in-out',
              complete: doneFn
            });
          });
        }
      };
    }
  ]);