angular.module('friendBlockDirective', [])

    .directive('friendBlock', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                friend: '='
            },
            templateUrl: 'templates/friends/friendBlock.html'
        };
    }]);