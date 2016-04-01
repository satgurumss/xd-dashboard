(function() {
	'use strict';

	angular.module('app')
		.controller('ProfileCtrl', ['$scope', '$rootScope', '$http', 'backendApi', '$location', 'loggedInUser', '$filter', ProfileCtrl])
		.controller('TreeTableCtrl',['$scope', '$filter', 'backendApi', TreeTableCtrl])
		.filter("selectedFilter", ['$filter',selectedFilter])

	function ProfileCtrl($scope, $rootScope, $http, backendApi, $location, loggedInUser, $filter) {
		$scope.currentUser = {};
		$scope.profileInfo = {};
		$scope.qBoost = [];
		$scope.selectedQboost = [];

		$scope.init = function() {
			console.log("profile init");
			//use this to get current user
			$scope.currentUser = loggedInUser.getCurrentUser();
			
			if (!_.isEmpty($scope.currentUser)) {
				$scope.currentUser.account_s[0];
				$scope.regionsList =[]
				$scope.gicsList = []
				$scope.selectedQboost = loggedInUser.getQBoost();
				
				backendApi.getUserProfile($scope.currentUser).then(function(res){
					$scope.profileInfo = res.data.documents[0].fields;
					console.log("profile")
					$scope.qBoost.push($scope.profileInfo.account_s+"~200")

					console.log($scope.profileInfo)

				});
			} else
				loggedInUser.logOutUser();
		}
		
		$scope.isRegionSelected = function(title){
			var selected = "\"" +title + "\"~200";
			return $scope.selectedQboost.indexOf(selected) > 0 ? true : false;
		}

		$scope.list1 = [
        {
            id: 1,
            title: "middle east",
            items: [
                {
                    id: 21,
                    title: "uae",
                    items: [
                        {
                            id: 211,
                            title: "dubai",
                            items: []
                        }
                    ]
                }
            ]
        },
        {
            id: 1,
            title: "asia",
            items: [
                {
                    id: 211,
                    title: "china",
                    items: [
	                    {
			                    id: 21,
			                    title: "shenzen",
			                    items: []
			                },
			                {
			                    id: 21,
			                    title: "shanghai",
			                    items: []
			                }
		                ]
                }
            ]
        }
    ];

    $scope.list2 = [
        {
            id: 1,
            title: "middle east",
            items: [
                {
                    id: 21,
                    title: "uae",
                    items: [
                        {
                            id: 211,
                            title: "dubai",
                            items: []
                        }
                    ]
                }
            ]
        },
        {
            id: 1,
            title: "asia",
            items: [
                {
                    id: 211,
                    title: "china",
                    items: [
	                    {
			                    id: 21,
			                    title: "shenzen",
			                    items: []
			                },
			                {
			                    id: 21,
			                    title: "shanghai",
			                    items: []
			                }
		                ]
                }
            ]
        }
    ];

    $scope.selectedItem = {};

    $scope.options = {};

    $scope.remove = function(scope) {
        scope.remove();
    };

    $scope.toggle = function(scope) {
        scope.toggle();
    };

    $scope.setPref = function(title, event){
    	var selected = "\"" +title + "\"~200";

    	if (event.target.checked) {
        $scope.qBoost.push(selected);
      } else {
        $scope.qBoost.splice($scope.qBoost.indexOf(selected), 1);
      }

      loggedInUser.updateQBoost($scope.qBoost); 
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

})();