angular.module('friendCtrl', [])

    .controller('FriendCtrl', ['$scope', '$stateParams', 'UserService', 'FriendService', 'Restangular', '$state', '$ionicFilterBar',
        function($scope, $stateParams, UserService, FriendService, Restangular, $state, $ionicFilterBar) {

        var userId = UserService.getId();
        var filterBarInstance;

        // On récupère tous les amis
        FriendService.getAll().then(function (result) {
            (typeof result.message === "undefined") ? $scope.friends = result.friends : $scope.message = result.message;
        });

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                friends: $scope.friends,
                update: function (filteredItems, filterText) {
                    $scope.friends = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                },
                cancelText: "Annuler"
            });
        };

        $scope.dividerFunction = function(key){
            return key;
        };

        // On supprimer l'ami sélectionné
        $scope.delete = function(id) {
            FriendService.delete(userId, id);

            // On le supprime du $scope pour mettre à jour la page en direct
            var friend = _.findIndex($scope.friends, { id: id });
            _.remove($scope.friends, function(item) {
                return item.id == friend;
            });
        }

    }]);
