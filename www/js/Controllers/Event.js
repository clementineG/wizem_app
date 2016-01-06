angular.module('eventCtrl', [])

    .controller('EventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        $scope.user = UserService.getFromLocalStorage();

        var id = user.id;
        var idEvent = $stateParams.eventId;

        var Events = Restangular.all('users/' + id + '/events');
        var Event = Restangular.all('events/' + idEvent);

        Events.getList().then(function(result) {
            $scope.eventsList = result;
            //console.log(result);
        }, function errorCallback(error) {
            console.log(error);
            $scope.message = "Vous n'avez pas d'évènement, allez en créer un de suite !";
        });

        Restangular.one('events', idEvent).get().then(function(result) {
            console.log(result);
            $scope.event = result;
        });

    }]);