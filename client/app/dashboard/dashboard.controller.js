var clickEvent;
(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardCtrl', 
      ['$scope', '$http', '$location', 'backendApi', 'loggedInUser', '$timeout', DashboardCtrl])
    .filter('singleDecimal', function($filter) {
      return function(input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
      };
    });

  function DashboardCtrl($scope, $http, $location, backendApi, loggedInUser, $timeout) {
    $scope.lineOptions = {
      title: {
        text: 'Statistics'
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          var date = new Date(params.value[0]);
          var data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
          return data + '<br/>' + params.value[1] + ', ' + params.value[2];
        }
      },
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      dataZoom: {
        show: true,
        start: 70
      },
      legend: {
        data: ['series1']
      },
      grid: {
        y2: 80
      },
      xAxis: [{
        type: 'time',
        splitNumber: 10
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: 'series1',
        type: 'line',
        showAllSymbol: true,
        symbolSize: function(value) {
          return Math.round(value[2] / 10) + 2;
        },
        data: (function() {
          var d = [];
          var len = 0;
          var now = new Date();
          var value;
          while (len++ < 200) {
            d.push([
              new Date(2014, 9, 1, 0, len * 10000), (Math.random() * 30).toFixed(2) - 0, (Math.random() * 100).toFixed(2) - 0
            ]);
          }
          return d;
        })()
      }]
    };

    $scope.pieOptions = {
      percent: 35,
      options: {
        animate: {
          duration: 1000,
          enabled: true
        },
        barColor: '#66B5D7',
        lineCap: 'round',
        size: 180,
        lineWidth: 10
      }
    };
    $scope.init = function() {
      console.log("init")
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
          elemScaledHeight = elemHeight * 0.08;
          elemScaledWidth = elemWidth * 0.08;
          elemX = parseInt(typeof clickEvent != "undefined" ? clickEvent.pageX : 0);
          elemY = parseInt(typeof clickEvent != "undefined" ? clickEvent.pageY : 0);

          typeAheadWidthPx = angular.element('.search-field-wrapper').outerWidth(true);
          searchTypeWidthPx = angular.element('.search-type').outerWidth(true);
          searchPanelHeightPx = angular.element('.search-panel').outerHeight(true);
          widgetControlWidth = angular.element('.widget-control').width();

          buttonOffset = typeAheadWidthPx + searchTypeWidthPx;
          //12 has been added because of container's extreme left padding
          wigdetButtonOffset = (elemX - ((elemWidth - elemScaledWidth) / 2) - (widgetControlWidth + 120));

          scaledTopOffset = ((elemHeight - elemScaledHeight) / 2) + elemY - searchPanelHeightPx;
          scaledLeftOffset = buttonOffset - wigdetButtonOffset;

          secondFrame = {
            'opacity': '0.1',
            // 'z-index': '5',
            'top': '-' + scaledTopOffset + 'px',
            'left': scaledLeftOffset + 'px',
            '-webkit-transform': 'scale3d(.08,.08,.08)',
            '-moz-transform': 'scale3d(.08,.08,.08)',
            '-o-transform': 'scale3d(.08,.08,.08)',
            'transform': 'scale3d(.08,.08,.08)'
          };

          firstFrame = {
            'opacity': '1',
            '-webkit-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            '-moz-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            '-o-transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)',
            'transform': 'scale3d( 0.475 , 0.475 , 0.475 ) translate3d(0px , 60px ,50px)'
          };

          jQuery.keyframe.define([{
            name: 'onMove',
            '30%': firstFrame,
            '100%': secondFrame
          }]);
          element.resetKeyframe(function() {
            return element.playKeyframe({
              name: 'onMove',
              duration: '3s',
              delay: '0s',
              timingFunction: 'linear',
              complete: doneFn
            });
          });
        }
      };
    }
  ]);