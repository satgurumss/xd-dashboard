(function() {
  'use strict';

  var webViewMessages = {
    hypr_login: "hypr_login",
    hypr_register: "hypr_register"
  };

  angular.module('app')
    .factory('loggedInUser', loggedInUser)
    .factory('gaugesService', gaugesService)
    .factory('WebViewService', webViewService)

  function loggedInUser($cookies, $location, $http, $q) {
    console.log("loggedInUser")
    return {
      logOutUser: function() {
        $http.post("/logout")
          .success(function(data, status, headers, config) {
            $location.url("/signin");
          })
          .error(function(data, status, headers, config) {
            console.log("error");
          })
      },
      isLoggedIn: function(route){

        $http.get("/isLoggedInUser")
        .success(function(loggedIn,status){
          if( ! loggedIn )
            $location.url("/signin");
          else{
            $location.url(route)
          }
        })
        .error(function(data,status){
          $location.url("/signin");
        });
      }
    };
  }

  function gaugesService(CONST) {
    return {
      updateGaugeState: function(gaugesList) {
        _.each(gaugesList, function(gauge) {
          if (gauge.percent <= 30) {
            gauge.colors = CONST.gaugeDanger
            gauge.className = "circle-danger"
          } else if (30 < gauge.percent && gauge.percent <= 50) {
            gauge.colors = CONST.gaugeWarning
            gauge.className = "circle-warning"
          } else if (50 < gauge.percent && gauge.percent <= 100) {
            gauge.colors = CONST.gaugeSuccess
            gauge.className = "circle-success"
          }
        });

        return gaugesList;
      }
    }
  }

  function webViewService($window) {
    return {
      hyprLogin: function(hyprname) {
        var message =  {
          name: hyprname,
          action: webViewMessages.hypr_login
        };
        console.log(message);
        if($window.WebViewBridge) $window.WebViewBridge.send(message);
      },
      hyprRegister: function(hyprname) {
        var message =  {
          name: hyprname,
          action: webViewMessages.hypr_register
        };
        message = JSON.stringify(message);
        console.log(message);
        if($window.WebViewBridge) $window.WebViewBridge.send(message);
      }
    }
  }


})();