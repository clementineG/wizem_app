angular.module('typeEventBlockDirective', [])

    .directive('typeEventBlock', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                type: '='
            },
            templateUrl: 'templates/events/typeEventBlock.html'
        };
    }]);