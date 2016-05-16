(function() {
  'use strict';

  var webViewMessages = {
    hypr_login: "hypr_login",
    hypr_register: "hypr_register"
  },
  hyprLoggedIn = false,
  usingHypr = false;

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
            hyprLoggedIn = false;
            $location.url("/signin");
          })
          .error(function(data, status, headers, config) {
            console.log("error");
          })
      },
      isLoggedIn: function(route) {

        $http.get("/isLoggedInUser")
        .success(function(loggedIn,status){
          if( ! loggedIn && ! usingHypr)
            $location.url("/signin");
          else if( ! hyprLoggedIn && usingHypr) {
            $location.url("/signin");
          }
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

  function webViewService($window, $location) {
    return {
      hyprLogin: function(name) {
        usingHypr = true;
        var message =  {
          action: webViewMessages.hypr_login,
          name: name
        };
        message = JSON.stringify(message);
        console.log(message);
        if($window.WebViewBridge) $window.WebViewBridge.send(message);
      },
      hyprRegister: function(hyprname) {
        usingHypr = true;
        var message =  {
          name: hyprname,
          action: webViewMessages.hypr_register
        };
        message = JSON.stringify(message);
        console.log(message);
        if($window.WebViewBridge) $window.WebViewBridge.send(message);
      },
      responseHandler: function(response) {

        console.log(response);
        response = JSON.parse(response);

        console.log("in service");
        console.log(response);

        switch(response.action) {
          case "reg_response":
            if(response.data.Response === 'Success') {
              console.log("iin iff");
              hyprLoggedIn = true;
              $location.url("/landing");

            }
            break;

          case "auth_response":
            if(response.data.Response === 'Success!') {
              console.log("iin iff");
              hyprLoggedIn = true;
              $location.url("/landing");

            }
            break;
        }
      }
    }
  }


})();