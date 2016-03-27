(function() {
    'use strict';

    angular.module('app')
        .directive('myEnterPress', enterDirective);

    function enterDirective () {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.myEnterPress);
                    });

                    event.preventDefault();
                }
            });
        };
    } 

})();