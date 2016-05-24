(function() {
  'use strict';

  angular.module('app')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      var routes, setRoutes;

      routes = [
        'dashboard',
        'search-result',
        'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps',
        'table/static', 'table/dynamic', 'table/responsive',
        'form/elements', 'form/layouts', 'form/validation', 'form/wizard',
        'chart/echarts', 'chart/echarts-line', 'chart/echarts-bar', 'chart/echarts-pie', 'chart/echarts-scatter', 'chart/echarts-more',
        'page/404', 'page/500', 'page/blank', 'page/forgot-password', 'page/invoice', 'page/lock-screen', 'page/profile', 'page/invoice', 'page/signin', 'page/signup', 'page/about', 'page/services', 'page/contact',
        'mail/compose', 'mail/inbox', 'mail/single',
        'app/tasks', 'app/calendar'
      ]

      // $locationProvider.html5Mode(true);
      // enable html5Mode for pushstate ('#'-less URLs)
      // $locationProvider.html5Mode(true)
      // $locationProvider.hashPrefix('!');

      setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'app/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      };

      routes.forEach(function(route) {
        return setRoutes(route);
      });

      $routeProvider
      // .when('/', {redirectTo: 'page/signin'})
        .when('/', {
          redirectTo: '/pre-landing'
        })
        .when('/pre-landing', {
          templateUrl: 'app/landing/pre-landing.html'
        })
        .when('/signin', {
          templateUrl: 'app/login/signin.html'
        })
        .when('/search', {
          templateUrl: 'app/search/search-result.html'
        })
        .when('/signup', {
          templateUrl: 'app/signup/signup.html'
        })
        .when('/forgot', {
          templateUrl: 'app/page/forgot-password.html'
        })
        .when('/my-profile', {
          templateUrl: 'app/profile/my-profile.html'
        })
        .when('/my-training', {
          templateUrl: 'app/training/my-training-dash.html'
        })
        .when('/organization-dashboard', {
          templateUrl: 'app/dashboard/organization/organization-dash.html'
        })
        .when('/department-dashboard', {
          templateUrl: 'app/dashboard/department/department-dash.html'
        })
        .when('/vendors-dashboard', {
          templateUrl: 'app/dashboard/vendors/vendors-dash.html'
        })
        .when('/landing', {
          templateUrl: 'app/landing/landing.html'
        })
        .when('/landing-old', {
          templateUrl: 'app/landing/landing-old.html'
        })
        .when('/team-performance', {
          templateUrl: 'app/tracking/team-performance.html'
        })
        .when('/404', {
          templateUrl: 'app/page/404.html'
        })
        .otherwise({
          redirectTo: '/404'
        });

    }]);

})();