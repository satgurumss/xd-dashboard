(function () {
    'use strict';

    angular.module('app')
        .controller('SearchCtrl', ['$scope','$http','backendApi', SearchCtrl])

    function SearchCtrl($scope,$http, backendApi) {
        $scope.numPerPageOpt = [3, 5, 10]
        $scope.numPerPage = $scope.numPerPageOpt[1]
        $scope.currentPage = 1
        $scope.currentPageItems = []
        $scope.filteredItems = []

        $http.get('/app/sampleData/news.json').then(function(deals){
            $scope.searchResults = deals.data.documents;

            $scope.filteredItems = angular.copy($scope.searchResults)
            $scope.currentPageItems = angular.copy($scope.searchResults)
            $scope.select(1);
        });


        var data = {
                      "workflow": "abraajSearch",
                      "query": "deal 1",
                      "rows": 2,
                      "username": "Administrator",
                      "realm": "Anonymous",
                      "queryLanguage": "simple"

                    }

        backendApi.search( data).then(function(res){console.log(res)});

        //models for the page
        /*$scope.searchResults = [
                {
                    "title":"Document Title 1 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template1"
                },
                {
                    "title":"Document Title 1 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "link" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "link" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "link" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template1"
                },
                {
                    "title":"Document Title 1 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "link" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "link" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "link" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template1"
                },
                {
                    "title":"Document Title 1 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template1"
                },
                {
                    "title":"Document Title 1 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template1"
                },
                {
                    "title":"Document Title 2 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template2"
                },
                {
                    "title":"Document Title 2 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template2"
                },
                {
                    "title":"Document Title 2 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template2"
                },
                {
                    "title":"Document Title 2 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template2"
                },
                {
                    "title":"Document Title 2 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template2"
                },
                {
                    "title":"Document Title 3 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template3"
                },
                {
                    "title":"Document Title 3 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template3"
                },
                {
                    "title":"Document Title 3 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template3"
                },
                {
                    "title":"Document Title 3 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template3"
                },
                {
                    "title":"Document Title 3 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template3"
                },
                {
                    "title":"Document Title 3 - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template3"
                },
                {
                    "title":"Document Title - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template4"
                },
                {
                    "title":"Document Title - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template4"
                },
                {
                    "title":"Document Title - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template4"
                },
                {
                    "title":"Document Title - Limited by number of characters [PDF]",
                    "creationDate": "31 Dec 2015",
                    "docURL" : "www.detailedURLofTheDocument.com/folder/folder/folder",
                    "description" : "Document snippet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor",
                    "optionalLinks" :[
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 1"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 2"
                            },
                            {
                                "URL" :"www.optionallink.com",
                                "linkTitle": "OptionalLink 3"
                            }
                        ],
                    "type":"template4"
                },
            ]*/

        $scope.sortOptions=[
                {"name":"Relevance","value":"relevance"},
                {"name":"Date","value":"date"},
                {"name":"Value","value":"value"}
            ]

        $scope.locations=[
                {
                    "loc_id":"0",
                    "loc_name":"All"
                },
                {
                    "loc_id":"1",
                    "loc_name":"UAE"
                },
                {
                    "loc_id":"2",
                    "loc_name":"USA"
                },
                {
                    "loc_id":"3",
                    "loc_name":"europe"
                },
                {
                    "loc_id":"4",
                    "loc_name":"africa"
                }
            ]
        $scope.filterYears = [2016,2015,2014,2013,2012,2010,2009,2008]
        $scope.doctypes = ["All","PDF", "Presentation"]

        $scope.select = function(page) {
          var end, start;

          start = (page - 1) * $scope.numPerPage;
          end = start + $scope.numPerPage;
          $scope.currentPageItems = $scope.filteredItems.slice(start, end);

          return $scope.currentPageItems;
        };

        /*$scope.filteredItems = angular.copy($scope.searchResults)
        $scope.currentPageItems = angular.copy($scope.searchResults)
        $scope.select(1);*/
    }

})();
