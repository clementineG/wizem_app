angular.module('eventCtrl', [])

    .controller('EventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        $scope.user = UserService.getFromLocalStorage();

        var id = user.id;
        var events = Restangular.all('users/' + id + '/events');

        events.getList().then(function(result) {
            $scope.eventsList = result;
        }, function errorCallback(error) {
            console.log(error);
            $scope.message = "Vous n'avez pas d'évènement, allez en créer un de suite !";
        });

        $scope.test = function() {
            console.log('toto');
        }

    }]);