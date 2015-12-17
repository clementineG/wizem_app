angular.module('eventCtrl', [])

    .controller('EventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

            $scope.user = UserService.getFromLocalStorage();

            var id = user.id;
            var events = Restangular.all('users/' + id + '/events');

            events.getList().then(function(result) {
                $scope.eventsList = result;
                console.log($scope.eventsList);
            }, function errorCallback(error) {
                console.log(error);
            });



    }]);