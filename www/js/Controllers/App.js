angular.module('appCtrl', [])

    .controller('AppCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        $scope.user = UserService.getFromLocalStorage();

        $scope.logout = function() {
                UserService.deleteLocalStorage();
                $state.go('login');
        }

    }]);