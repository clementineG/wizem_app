angular.module('friendCtrl', [])

    .controller('FriendCtrl', ['$scope', '$stateParams', 'UserService', 'FriendService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, FriendService, Restangular, $state) {

        var userId = UserService.getId();

        // On récupère tous les events
        FriendService.getAll().then(function (friends) {
            $scope.friends = friends;
        });

        // On supprimer l'ami sélectionné
        $scope.delete = function(id) {
            $scope.isLoading = true;
            FriendService.delete(userId, id);

            $scope.isLoading = false;
            //$state.reload();
            $state.go('app.friends');
        }
    }]);