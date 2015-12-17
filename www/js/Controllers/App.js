angular.module('appCtrl', [])

    .controller('AppCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        $scope.user = UserService.getFromLocalStorage();

        var id = user.id;
        var events = Restangular.all('users/' + id + '/events');
        console.log(events);

        $scope.logout = function() {
                UserService.deleteLocalStorage();
                $state.go('login');
        }

    }]);