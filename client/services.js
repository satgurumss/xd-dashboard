(function () {
  'use strict';

  angular.module('app')
    .factory('loggedInUser', loggedInUser)
    .factory('gaugesService', gaugesService)

  function loggedInUser($cookies, $location){
    console.log("loggedInUser")
    return{
      setCurrentUser : function(data){
        console.log("setCurrentUser");
        $cookies.putObject("abraajLogin", data);
      },
      getCurrentUser : function(){
        console.log("getCurrentUser");
        var user = $cookies.getObject("abraajLogin");
        var mockUser = {"account_s": "arat", "name_s" :"Ali Arat"}
        return mockUser;
      },
      logOutUser : function(){
        console.log("logOutUser");
        $cookies.remove("abraajLogin");
        $location.url("/signin");
      },
      updateQBoost : function(data , userName){
        console.log("updateQBoost");
        console.log(data)
        $cookies.remove("abraajQBoost" + userName);
        var qboost = {"qboost":data}
        $cookies.putObject("abraajQBoost" + userName, qboost);
      },
      getQBoost : function(userName){
        console.log("getQBoost");
        var abraajQBoost = $cookies.getObject("abraajQBoost" + userName);
        console.log(abraajQBoost)
        return  typeof abraajQBoost != "undefined" ? abraajQBoost.qboost : [];
      },
      updateWidgetStates : function(widgetsList , userName){
        $cookies.remove("abraajWidgets" + userName);
        $cookies.putObject("abraajWidgets" + userName, widgetsList);
      },
      getWidgetStates : function(userName){
        var widgetsState = $cookies.getObject("abraajWidgets" + userName);
        console.log(widgetsState)
        return  typeof widgetsState != "undefined" ? widgetsState : [];
      }

    };
  }

  function gaugesService(CONST){
    return{
      updateGaugeState : function(gaugesList){
        _.each(gaugesList, function(gauge){
            if(gauge.percent <= 30){
              gauge.colors = CONST.gaugeDanger,
              gauge.className = "circle-danger"
            }
            else if(30 < gauge.percent && gauge.percent <= 50){
              gauge.colors = CONST.gaugeWarning,
              gauge.className = "circle-warning"
            }
            else if(50 < gauge.percent && gauge.percent <= 100){
              gauge.colors = CONST.gaugeSuccess,
              gauge.className = "circle-success"
            }
        });

        return gaugesList;
      }
    }
  }


})();