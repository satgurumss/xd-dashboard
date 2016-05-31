(function() {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', ['$scope', '$rootScope', '$route', '$document', 'appConfig', '$window', '$timeout', 'WebViewService', 'spreadSheetService', "XDENSITY", "$log", AppCtrl]) // overall control
    .constant("CONST", {
        gaugeBlue: ['#777777', '#28bdc6'],
        gaugeGreen: ['#777777', '#90e4ad'],
        gaugeYellow: ['#777777', '#cce679'],
        gaugeDanger: ['#777777', '#da1b1b'],
        gaugeWarning: ['#777777', '#ff8400'],
        gaugeSuccess: ['#777777', '#157c3e']
    })

    .value("XDENSITY", {
        spreadSheetId: '1F3A2gmeC_PN0o8JaOZEmIE9NTJE3A2MNhMh06UmgtJM',
        sheets: {
            vendors: {
                name: 'Vendors',
                id: '720555477',
                isArray: true
            },
            departments: {
                name: 'Departments',
                id: '473196866',
                isArray: false
            },
            spend: {
                name: 'Spend',
                id: '1604124801',
                isArray: true
            }
        },
        urls: {
            googleSheetUrl1: 'http://docs.google.com/spreadsheets/d/',
            googleSheetUrl2: '/pub?output=csv&gid=',
        },
        isLoaded: false
    });

    function AppCtrl($scope, $rootScope, $route, $document, appConfig, $window, $timeout, WebViewService, spreadSheetService, XDENSITY, $log) {
        $rootScope.showPage = false;
        $rootScope.isTouchIdSupported = false;
        $rootScope.isWebViewOpened = false;
        $rootScope.isAlraeadyRegistered = false;
        $timeout(function() {
            $rootScope.showPage = true;
            if ($window.WebViewBridge) {
                $rootScope.isWebViewOpened = true;
            }
        }, 1000);

        $scope.listenMessage = function(message) {
            var index = message.indexOf("already registered");
            if (index > 0) {
                $rootScope.isAlraeadyRegistered = true;
                return;
            }
            if (message === "touch_supported") {
                $rootScope.isTouchIdSupported = true;
                return;
            } else if (message === "touch_not_supported") {
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

        $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });

        $log.info("in app ctrl");

        /*spreadSheetService.fetchData(XDENSITY.spreadSheetId, XDENSITY.sheets, function() {
            $log.info(XDENSITY);
        });*/

        spreadSheetService.fetchData().then(function(res) {
            $log.info("data loaded");
            XDENSITY = angular.copy(res.data);

            $log.info(XDENSITY);
        });
    }
})();