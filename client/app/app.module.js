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
        'mwl.calendar',
        'angularSpinner',

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

app.config(function(calendarConfig) {

    console.log(calendarConfig); //view all available config

    calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

    calendarConfig.i18nStrings.weekNumber = 'Week {week}'; //This will set the week number hover label on the month view

    calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

    calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

    calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.

  });
})();
