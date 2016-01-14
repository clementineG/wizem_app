angular.module('allUsersEventCtrl', [])

    .controller('AllUsersEventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var id = user.id;

        // Id de l'event sélectionné
        $scope.idEvent = $stateParams.eventId;

        var Users = Restangular.all('events/' + $scope.idEvent + '/users');

        // On récupère tous les events
        Users.getList().then(function(users) {
            $scope.users = users;
        }, function errorCallback(error) {
            console.log(error);
        });

    }]);