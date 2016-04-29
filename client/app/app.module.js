(function () {
    'use strict';

    var // Constants
        INTERVAL_BIG = 1000,
        INTERVAL_SMALL = 250,
        COLOR_SET_1 = ['#1abc9c', '#2c3e50'],
        COLOR_SET_2 = ['#2ecc71', '#9b59b6'],

        // Variables
        app;

    app = angular.module('app', [
        // Angular modules
        'ngRoute',
        'ngAnimate',
        'ngAria',
        'ngCookies',

        // 3rd Party Modules
        'ui.bootstrap',
        'ui.tree',
        'ngMap',
        'ngTagsInput',
        'textAngular',
        'angular-loading-bar',
        'ui.calendar',
        'duScroll',
        'mgo-angular-wizard',
        "highcharts-ng",
        'angularAwesomeSlider',
        'angular-circles',

        // Custom modules
        'app.custom.services',
        'app.nav',
        'app.i18n',
        'app.chart',
        'app.ui',
        'app.ui.form',
        'app.ui.form.validation',
        'app.page',
        'app.table',
        'app.task',
        'app.calendar',
        'angular-maps'
    ]);

    /*app.config(['ngCirclesSettingsProvider', function (ngCirclesSettingsProvider) {
        ngCirclesSettingsProvider.set({
            colors: ['#f1c40f', '#c0392b']
        });
    }]);*/
})();
