angular.module('guestBlockDirective', [])

    .directive('guestBlock', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: 'templates/events/guestBlock.html',
            link: function($scope, element, attrs) {
                changeIcon($scope, $scope.user.state);

                $rootScope.$on("userEventStateChange", function(event, user, state) {
                    if ($scope.user.id == user.id) {
                        changeIcon($scope, state);
                    }
                })
            }
        };

        function changeIcon($scope, state) {
            switch (state) {
                case true:
                    $scope.userIcon = "check";
                    break;
                case false:
                    $scope.userIcon = "window-close";
                    break;
                case null:
                    $scope.userIcon = "help";
                    break;
            }
        }
    }]);