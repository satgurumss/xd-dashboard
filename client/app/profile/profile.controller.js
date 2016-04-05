(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'backendApi', '$location', 'loggedInUser', '$filter', ProfileCtrl])

  function ProfileCtrl($scope, $rootScope, $http, backendApi, $location, loggedInUser, $filter) {
    $scope.currentUser = {};
    $scope.profileInfo = {};
    var qBoost = [];

    $scope.list1 = [];
    $scope.list2 = [];

    $scope.init = function() {
      console.log("profile init");
      //use this to get current user
      $scope.currentUser = loggedInUser.getCurrentUser();

      if (!_.isEmpty($scope.currentUser)) {
        qBoost = loggedInUser.getQBoost($scope.currentUser.account_s[0]);
        console.log(qBoost)

        backendApi.getUserProfile($scope.currentUser).then(function(res) {
          $scope.profileInfo = res.data.documents[0].fields;
          console.log("profile")
          if(qBoost.length == 0)
            qBoost.push($scope.profileInfo.account_s + "~200")
        });

        backendApi.getRegionsList().then(function(res) {
          $scope.list1 = nestRegions(res.data);
        })

        backendApi.getGICSList().then(function(res) {
          $scope.list2 = nestSectors(res.data);
        })
      } else
        loggedInUser.logOutUser();
    }

    $scope.isRegionSelected = function(item) {
      var selected = "\"" + item.title + "\"~200";
      return qBoost.length > 0 && qBoost.indexOf(selected) > 0 ? true : false;
    }

    $scope.selectedItem = {};

    $scope.options = {};

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.setPref = function(item, event) {
      var selected = "\"" + item.title + "\"~200";

      if (event.target.checked) {
        if(_.isUndefined(item.items))
          qBoost.push(selected);
        else{
          traverse(item,check);
        }
      } else {
        
        if(_.isUndefined(item.items))
          qBoost.splice(qBoost.indexOf(selected), 1);
        else{
          traverse(item,uncheck);
        }
      }
      console.log(qBoost);
      loggedInUser.updateQBoost(qBoost, $scope.currentUser.account_s[0]);
    }

    function check(item) {
      var title = "\"" + item.title + "\"~200";
      item.isChecked = true
      qBoost.push(title);
    }

    function uncheck(item) {
      debugger
      var title = "\"" + item.title + "\"~200";
      item.isChecked = false
      if(qBoost.indexOf(title) !== -1)
        qBoost.splice(qBoost.indexOf(title), 1);
      console.log("spliced")
      console.log(qBoost);
    }

    function traverse(tree, func){
      var i;
      var items = tree.items;
      func(tree);
      for( i = 0; i < items.length; i++){

        var item = items[i];
        if(item.items !== undefined) {
          traverse(item,func);
        } else {
          func(item);
        }
      }
    }
    
    /*----------NESTING REGIONS FUNCTIONS-------------*/
    function nestRegions(listOfRegions) {
      var regionList = [],
        subRegionList = [],
        countriesList = [],
        locationsList = [],
        region,
        subRegion,
        country,
        location;

      _.each(listOfRegions.documents, function(document, index) {
        var regionTitle = document.fields.region_id[0],
          countryTitle = document.fields.region_id[1],
          locationTitle = document.fields.region_id[2],
          subRegionTitle = document.fields.region_id[3];

        if (!locationTitle || !countryTitle || !subRegionTitle || !regionTitle) return;

        region = findObject(regionList, regionTitle);

        if (region) {
          subRegionList = region.items || [];

          subRegion = findObject(subRegionList, subRegionTitle);

          if (subRegion) {
            countriesList = subRegion.items || [];

            country = findObject(countriesList, countryTitle);

            if (country) {
              locationsList = country.items || [];

              location = findObject(locationsList, locationTitle);

              if (!location) {
                locationsList.push(makeLocation(locationTitle));
              }
            } else {
              countriesList.push(makeCountry(countryTitle, locationTitle));
            }
          } else {
            subRegionList.push(makeSubRegion(subRegionTitle, countryTitle, locationTitle));
          }
        } else {
          regionList.push(makeRegion(regionTitle, subRegionTitle, countryTitle, locationTitle));
        }
      });

      return regionList;
    }

    function findObject(list, findString) {
      return _.find(list, function(item) {
        return item.title === findString;
      });
    }

    function makeRegion(regionTitle, subRegionTitle, countryTitle, locationTitle) {
      var region = {
        title: regionTitle,
        items: [makeSubRegion(subRegionTitle, countryTitle, locationTitle)]
      };

      return region;
    }

    function makeSubRegion(subRegionTitle, countryTitle, locationTitle) {
      var subRegion = {
        title: subRegionTitle,
        items: [makeCountry(countryTitle, locationTitle)]
      }

      return subRegion;
    }

    function makeCountry(countryTitle, locationTitle) {
      var country = {
        title: countryTitle,
        items: [makeLocation(locationTitle)]
      };

      return country;
    }

    function makeLocation(locationTitle) {
      var location = {
        title: locationTitle
      };

      return location;
    }

    // --------------------------------------------------------------

    /*----------NESTING GICS FUNCTIONS-------------*/
    function nestSectors(list) {
      var sectorsList = [],
        industryGroupList = [],
        industryList = [],
        subIndustryList = [],
        sector,
        industryGroup,
        industry,
        subIndustry;

      _.each(list.documents, function(document, index) {
        var sectorTitle = document.fields.sector_s[0],
          industryGroupTitle = document.fields.industry_group_s[0],
          industryTitle = document.fields.industry_s[0],
          subIndustryTitle = document.fields.sub_industry_s[0];

        if (!subIndustryTitle || !industryTitle || !industryGroupTitle || !sectorTitle) return;

        sector = findObject(sectorsList, sectorTitle);

        if (sector) {
          industryGroupList = sector.items || [];

          industryGroup = findObject(industryGroupList, industryGroupTitle);

          if (industryGroup) {
            industryList = industryGroup.items || [];

            industry = findObject(industryList, industryTitle);

            if (industry) {
              subIndustryList = industry.items || [];

              subIndustry = findObject(subIndustryList, subIndustryTitle);

              if (!subIndustry) {
                subIndustryList.push(makeSubIndustry(subIndustryTitle));
              }
            } else {
              industryList.push(makeIndustry(industryTitle, subIndustryTitle));
            }
          } else {
            industryGroupList.push(makeIndustryGroup(industryGroupTitle, industryTitle, subIndustryTitle));
          }
        } else {
          sectorsList.push(makeSector(sectorTitle, industryGroupTitle, industryTitle, subIndustryTitle));
        }
      });

      return sectorsList;
    }

    function findObject(list, findString) {
      return _.find(list, function(item) {
        return item.title === findString;
      });
    }

    function makeSector(sectorTitle, industryGroupTitle, industryTitle, subIndustryTitle) {
      var sector = {
        title: sectorTitle,
        items: [makeIndustryGroup(industryGroupTitle, industryTitle, subIndustryTitle)]
      };

      return sector;
    }

    function makeIndustryGroup(industryGroupTitle, industryTitle, subIndustryTitle) {
      var industryGroup = {
        title: industryGroupTitle,
        items: [makeIndustry(industryTitle, subIndustryTitle)]
      }

      return industryGroup;
    }

    function makeIndustry(industryTitle, subIndustryTitle) {
      var industry = {
        title: industryTitle,
        items: [makeSubIndustry(subIndustryTitle)]
      };

      return industry;
    }

    function makeSubIndustry(subIndustryTitle) {
      var subIndustry = {
        title: subIndustryTitle
      };

      return subIndustry;
    }

    // --------------------------------------------------------------

  }


})();