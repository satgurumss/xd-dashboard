(function () {
    'use strict';

    angular.module('app')
        .controller('SearchCtrl', ['$scope', SearchCtrl])

    function SearchCtrl($scope) {
        $scope.searchResults = [
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
                        ]
                },
                {
                    "title":"Document Title - Limited by number of characters [PDF]",
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
                        ]
                },
                {
                    "title":"Document Title - Limited by number of characters [PDF]",
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
                        ]
                }
            ]

        $scope.sortOptions=[
                {"name":"Title","value":"title"},
                {"name":"Date","value":"date"},
                {"name":"Most Recent","value":"recent"},
            ]
    }


})(); 