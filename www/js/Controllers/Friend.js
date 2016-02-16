angular.module('friendCtrl', [])

    .controller('FriendCtrl', ['$scope', '$stateParams', 'UserService', 'FriendService', 'Restangular', '$state', '$ionicFilterBar',
        function ($scope, $stateParams, UserService, FriendService, Restangular, $state, $ionicFilterBar) {

            var userId = UserService.getId();
            var filterBarInstance;

            // On récupère tous les amis
            FriendService.getAll().then(function (result) {
                (typeof result.message === "undefined") ? $scope.friends = result.friends : $scope.message = result.message;
            });

            $scope.showFilterBar = function () {
                filterBarInstance = $ionicFilterBar.show({
                    items: $scope.friends,
                    update: function (filteredItems) {
                        //Update your list
                        $scope.friends= filteredItems;
                    },
                    cancelText: "Annuler"
                })
            };


            $scope.dividerFunction = function (key) {
                return key;
            };

            $scope.delete = function (id) {
                // DB remove
                FriendService.delete(userId, id);
                // get object to remove
                var a = _.filter($scope.friends, {'id': id});
                // make diff between $scope & object to remove
                var result = _.difference($scope.friends, a);

                $scope.friends = result;
            };

        }]);
