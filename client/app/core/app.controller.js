(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', [ '$scope', '$rootScope', '$route', '$document', 'appConfig', '$window', '$timeout', 'WebViewService',  AppCtrl]) // overall control
        .constant("CONST",{
            gaugeBlue: ['#777777', '#28bdc6'],
            gaugeGreen: ['#777777', '#90e4ad'],
            gaugeYellow: ['#777777', '#cce679'],
            gaugeDanger: ['#777777', '#da1b1b'],
            gaugeWarning: ['#777777', '#ff8400'],
            gaugeSuccess: ['#777777', '#157c3e'],
        });

    function AppCtrl($scope, $rootScope, $route, $document, appConfig, $window, $timeout, WebViewService) {
        $rootScope.showPage = false;
        $rootScope.isTouchIdSupported = false;
        $rootScope.isWebViewOpened = false;
        $rootScope.isAlraeadyRegistered = false;
        $timeout(function() {
            $rootScope.showPage = true;
            if($window.WebViewBridge) {
                $rootScope.isWebViewOpened = true;
            }
        }, 1000);

        $scope.listenMessage = function(message) {
            var index = message.indexOf("already registered");
            if(index > 0) {
                $rootScope.isAlraeadyRegistered = true;
                return;
            }
            if(message === "touch_supported") {
                $rootScope.isTouchIdSupported = true;
                return;
            } else if(message === "touch_not_supported") {
                $rootScope.isTouchIdSupported = false;
                return;
            }
            WebViewService.responseHandler(message);
        }

        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.color = appConfig.color;

        $scope.$watch('main', function(newVal, oldVal) {
            // if (newVal.menu !== oldVal.menu || newVal.layout !== oldVal.layout) {
            //     $rootScope.$broadcast('layout:changed');
            // }

            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
            $rootScope.$broadcast('nav:reset');
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
            if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                $scope.main.fixedHeader = true;
                $scope.main.fixedSidebar = true;
            }
            if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                $scope.main.fixedHeader = false;
                $scope.main.fixedSidebar = false;
            }
            }
            if (newVal.fixedSidebar === true) {
            $scope.main.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
            $scope.main.fixedSidebar = false;
            }
        }, true);

        $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });
    }

})();