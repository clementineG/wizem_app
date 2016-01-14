angular.module('eventCtrl', [])

    .controller('EventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var id = user.id;

        var Events = Restangular.all('users/' + id + '/events');

        // On récupère tous les events
        Events.getList().then(function(result) {
            $scope.eventsList = result;
        }, function errorCallback(error) {
            console.log(error);
            $scope.message = "Vous n'avez pas d'évènement, allez en créer un de suite !";
        });

    }]);