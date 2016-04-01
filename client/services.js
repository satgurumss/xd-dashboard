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
        var loginURL = "http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/searchApi/"+
            "simpleCgi?restOutputFormat=json&jsonpCallback=&workflows=search&q=table%3Aprofile&q.type=simple&q.filter=&q.volatileFilter=&security.realmId=Anonymous&security.principalId=Administrator&security.principalName=Administrator&q.maxresubmits=&locale=en&geo.field=position&geo.latitude=&geo.longitude=&geo.units=DEGREES&geo.distanceFilter=&geo.distanceUnits=KILOMETERS&geo.polygonFilter=&score.function=&hits=20&offset=0&relevancymodel=default&sort=&fields=account_s%2Cname_s%2Cpicture_s&facet=&facet.ff=OFF&facet.ffcount=4&l.stopwords.mode=OFF&l.acronyms.mode=OFF&l.acronymBoost=25&l.synonyms.mode=OFF&l.synonymBoost=25&l.lemma.mode=OFF&l.termexpansionboost=25&l.spell.mode=OFF&l.clustering.mode=OFF&l.clustering.doccount=100&l.clustering.clustercount=10&l.clustering.fields=title%2Ctext&join.rollup=TREE&searchProfile=";
        return $http.get(loginURL);
      },
      search: function ( data ) {
        //$http.get( "app/sampleData/news.json" );
        return $http.post( url, JSON.stringify( data ) );
      },
      getAutocompleteData: function ( queryText ){
        var url = "http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/autocompleteApi/simple/dictionaryProvider?term="+ queryText;
        return $http.get(url);
      },
      getRegionsList: function(){
        return $http.get("http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/searchApi/simpleCgi?restOutputFormat=json&hits=100&workflows=search&q=table:region&q.type=advanced&security.principalid=Administrator&security.realmid=Anonymous");
      },
      getGICSList: function(){
        return $http.get("http://ec2-54-229-163-11.eu-west-1.compute.amazonaws.com:18000/rest/searchApi/simpleCgi?restOutputFormat=json&hits=200&workflows=search&q=table:gics&q.type=advanced&security.principalid=Administrator&security.realmid=Anonymous");
      },
      getUserProfile: function(data){
        console.log("getting profile")
        var profilePaylod ={
            "workflow": "abraajSearch",
            "query": "table:profile name_s:" + data.name_s[0],
            "username": data.account_s[0],
            "realm": "Anonymous",
            "queryLanguage": "simple",
            "restParams": {
              "highlight":["true"]
            }
           }
        console.log(profilePaylod)
        return $http.post(url, JSON.stringify(profilePaylod) );
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
        $cookies.remove("abraajQBoost");
        $location.url("/signin");
      },
      updateQBoost : function(data){
        console.log("updateQBoost");
        $cookies.remove("abraajQBoost");
        $cookies.put("abraajQBoost", data);
      },
      getQBoost : function(data){
        console.log("updateQBoost");
        return $cookies.get("abraajQBoost");
      }

    };
  }


})();