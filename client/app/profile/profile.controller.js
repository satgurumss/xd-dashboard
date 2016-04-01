(function() {
	'use strict';

	angular.module('app')
		.controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'backendApi', '$location', 'loggedInUser', '$filter', ProfileCtrl])
		.controller('TreeTableCtrl', ['$scope', '$filter', 'backendApi', TreeTableCtrl])
		.filter('selected', ['$filter', selectedFilter])

	function ProfileCtrl($scope, $rootScope, $http, backendApi, $location, loggedInUser, $filter) {
		$scope.currentUser = {};
		$scope.profileInfo = {};

		$scope.init = function() {
			console.log("profile init");
			//use this to get current user
			$scope.currentUser = loggedInUser.getCurrentUser();
			if (!_.isEmpty($scope.currentUser)) {
				$scope.currentUser.account_s[0];

				backendApi.getUserProfile($scope.currentUser).then(function(res){
					$scope.profileInfo = res.data.documents[0].fields;
					console.log("profile")
					console.log($scope.profileInfo)
				});

			} else
				loggedInUser.logOutUser();

		}

	}

	function TreeTableCtrl($scope, $filter, backendApi) {
		$scope.list = [{
			"name": 'Developer',
			"opened": true,
			"children": [{
				"name": 'Front-End',
				"children": [{
					"name": 'Jack',
					"title": 'Leader'
				}, {
					"name": 'John',
					"title": 'Senior F2E'
				}, {
					"name": 'Jason',
					"title": 'Junior F2E'
				}]
			}, {
				"name": 'Back-End',
				"children": [{
					"name": 'Mary',
					"title": 'Leader'
				}, {
					"name": 'Gary',
					"title": 'Intern'
				}, ]
			}]
		}, {
			"name": 'Design',
			"children": [{
				"name": 'Freeman',
				"title": 'Designer'
			}]
		}, {
			"name": 'S&S',
			"children": [{
				"name": 'Nikky',
				"title": 'Robot'
			}]
		}];

		$scope.regionsList = [];
		$scope.gicsList = [];

		$scope.initTable = function(listId) {
			console.log("init table")
			if (listId == "regions") {
				console.log("init regions")
				backendApi.getRegionsList().then(function(res) {
					$scope.regionsList = res.data.documents;
					console.log($scope.regionsList)
					$scope.nestedRegions = nestRegions($scope.regionsList);

					/*console.log("nestedRegions");
					console.log($scope.nestedRegions);*/
				});
			}

			if (listId == "gics") {
				console.log("init gics")
				backendApi.getGICSList().then(function(res) {
					$scope.gicsList = res.data.documents;
					//console.log($scope.gicsList)
				});
			}
		}


		function nestRegions(regionsList) {
			console.log("nestRegions")
			console.log("regionsList")
			console.log(regionsList)
			var nestedList = {};
			
			regionsList.forEach( function(data, i, array){
				var region = {};
				/*region*/
				if(! _.has(nestedList,data.fields.region_s[0])){
					console.log("new region" + data.fields.region_s[0])
					region[data.fields.region_s[0]]={}
					region[data.fields.region_s[0]][data.fields.subregion_s[0]] = {}
					region[data.fields.region_s[0]][data.fields.subregion_s[0]][data.fields.country_s[0]] = {}
					
					if( typeof data.fields.location_s !== "undefined")
						region[data.fields.region_s[0]][data.fields.subregion_s[0]][data.fields.country_s[0]][data.fields.location_s[0]] = {}
					
					_.extend(nestedList, region);
				}
				else{
					console.log("old region")
					var oldregion = nestedList[data.fields.region_s[0]]
					oldregion[data.fields.subregion_s[0]] = {}
					oldregion[data.fields.subregion_s[0]][data.fields.country_s[0]] = {}
					
					if( typeof data.fields.location_s !== "undefined")
						oldregion[data.fields.subregion_s[0]][data.fields.country_s[0]][data.fields.location_s[0]] = {}
				}
				/*subregion*/
				if(findDeep(nestedList,data.fields.subregion_s[0]) === false){
					console.log("new subregion" + data.fields.subregion_s[0])

					var subregion = {}
					subregion[data.fields.subregion_s[0]] = {}
					subregion[data.fields.subregion_s[0]][data.fields.country_s[0]] = {}

					if( typeof data.fields.location_s !== "undefined")
						subregion[data.fields.subregion_s[0]][data.fields.country_s[0]][data.fields.location_s[0]] = {}

					_.extend(nestedList[data.fields.region_s[0]], subregion);
				}
				else{
					console.log("old subregion")
					var oldSubregion = nestedList[data.fields.region_s[0]][data.fields.subregion_s[0]]
					oldSubregion[data.fields.country_s[0]] = {}

					if( typeof data.fields.location_s !== "undefined")
						oldSubregion[data.fields.country_s[0]][data.fields.location_s[0]] = {}
				}
				
				if(findDeep(nestedList,data.fields.country_s[0]) === false){
					console.log("new country" + data.fields.country_s[0])

					var country = {}
					country[data.fields.country_s[0]] ={}
					
					if( typeof data.fields.location_s !== "undefined")
						country[data.fields.location_s[0]] = {}

					_.extend(nestedList[data.fields.region_s[0]][data.fields.subregion_s[0]], country);	
				}
				else{
					console.log("old country")
					var oldCountry = nestedList[data.fields.region_s[0]][data.fields.subregion_s[0]][data.fields.country_s[0]]
					
					if( typeof data.fields.location_s !== "undefined")
						oldCountry[data.fields.location_s[0]] = {}
				}
				
				if(  typeof data.fields.location_s !== "undefined" && findDeep(nestedList,data.fields.location_s[0]) === false){
					console.log("new location" + data.fields.location_s[0])

						var newLocation = {}
						newLocation[data.fields.location_s[0]] = {}

					_.extend(nestedList[data.fields.region_s[0]][data.fields.subregion_s[0]][data.fields.country_s[0]], newLocation);	
				}

			});

			console.log("nestedList")
			console.log(nestedList);

		}


		$scope.toggleAllCheckboxes = function(list, $event) {
			$scope.list = list;
			var i, item, len, ref, results, selected;
			selected = $event.target.checked;
			ref = $scope.list;
			results = [];
			for (i = 0, len = ref.length; i < len; i++) {
				item = ref[i];
				item.selected = selected;
				if (item.children != null) {
					results.push($scope.$broadcast('changeChildren', item));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		$scope.initCheckbox = function(item, parentItem) {
			return item.selected = parentItem && parentItem.selected || item.selected || false;
		};

		$scope.toggleCheckbox = function(item, parentScope) {
			if (item.children != null) {
				$scope.$broadcast('changeChildren', item);
			}
			if (parentScope.item != null) {
				return $scope.$emit('changeParent', parentScope);
			}
		};

		$scope.$on('changeChildren', function(event, parentItem) {
			var child, i, len, ref, results;
			ref = parentItem.children;
			results = [];
			for (i = 0, len = ref.length; i < len; i++) {
				child = ref[i];
				child.selected = parentItem.selected;
				if (child.children != null) {
					results.push($scope.$broadcast('changeChildren', child));
				} else {
					results.push(void 0);
				}
			}
			return results;
		});

		return $scope.$on('changeParent', function(event, parentScope) {
			var children;
			children = parentScope.item.children;
			parentScope.item.selected = $filter('selected')(children).length === children.length;
			parentScope = parentScope.$parent.$parent;
			if (parentScope.item != null) {
				return $scope.$broadcast('changeParent', parentScope);
			}
		});
	}

	function selectedFilter($filter) {
		return function(files) {
			return $filter('filter')(files, {
				selected: true
			});
		};
	}

	function findDeep (items, attrs) {

	  function match(value) {
	    for (var key in attrs) {
	      if(!_.isUndefined(value)) {
	        if (attrs[key] !== value[key]) {
	          return false;
	        }
	      }
	    }

	    return true;
	  }

	  function traverse(value) {
	    var result;

	    _.forEach(value, function (val) {
	      if (match(val)) {
	        result = val;
	        return false;
	      }

	      if (_.isObject(val) || _.isArray(val)) {
	        result = traverse(val);
	      }

	      if (result) {
	        return false;
	      }
	    });

	    return result;
	  }

	  return traverse(items);

	}

})();