(function () {
  'use strict';

  angular.module('app')
    .factory('backendApi', requests)
    .factory('loggedInUser', loggedInUser)

  function requests($http) {
    console.log("backendApi")
    var url = "http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/searchApi/search";
    return {
      doLogin: function(){
        console.log("inside login");
        var loginURL = "http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/searchApi/"+
            "simpleCgi?restOutputFormat=json&jsonpCallback=&workflows=search&q=table%3Aprofile&q.type=simple&q.filter=&q.volatileFilter=&security.realmId=Anonymous&security.principalId=Administrator&security.principalName=Administrator&q.maxresubmits=&locale=en&geo.field=position&geo.latitude=&geo.longitude=&geo.units=DEGREES&geo.distanceFilter=&geo.distanceUnits=KILOMETERS&geo.polygonFilter=&score.function=&hits=20&offset=0&relevancymodel=default&sort=&fields=account_s%2Cname_s%2Cpicture_s&facet=&facet.ff=OFF&facet.ffcount=4&l.stopwords.mode=OFF&l.acronyms.mode=OFF&l.acronymBoost=25&l.synonyms.mode=OFF&l.synonymBoost=25&l.lemma.mode=OFF&l.termexpansionboost=25&l.spell.mode=OFF&l.clustering.mode=OFF&l.clustering.doccount=100&l.clustering.clustercount=10&l.clustering.fields=title%2Ctext&join.rollup=TREE&searchProfile=";
        return $http.get(loginURL);
      },
      search: function ( data ) {
        console.log("inside function");
        //$http.get( "app/sampleData/news.json" );
        return $http.post( url, JSON.stringify( data ) );
      }
    };
  }

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
        return typeof user != "undefined" ? user.fields : {};
      },
      logOutUser : function(){
        console.log("logOutUser");
        $cookies.remove("abraajLogin");
        $location.url("/signin");
      }

    };
  }


})();
