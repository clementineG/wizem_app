angular.module('friendCtrl', [])

    .controller('FriendCtrl', ['$scope', '$stateParams', 'UserService', 'FriendService', 'Restangular', '$state', '$ionicFilterBar','$mdToast',
        function ($scope, $stateParams, UserService, FriendService, Restangular, $state, $ionicFilterBar,$mdToast) {

            var userId = UserService.getId();
            var filterBarInstance;

            // On récupère tous les amis
            FriendService.getAll().then(function (result) {
                console.log(result);

                (typeof result.message === "undefined") ? $scope.friends = result.friends : $scope.message = result.message;
            });

            $scope.showFilterBar = function () {
                filterBarInstance = $ionicFilterBar.show({
                    items: $scope.friends,
                    update: function (filteredItems) {
                        //Update your list
                        $scope.friends = filteredItems;
                        //$scope.message = "Aucun utilisateur ne correspond à cet identifiant."
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

            $scope.acceptFriendRequest = function (friendId) {
                var UserFind = Restangular.all('users/' + userId + '/friends/' + friendId + '/confirms');
                UserFind.post({'confirm': 1}).then(function (confirm) {

                        console.log('confirmé')
                        console.log(confirm)
                        //$scope.isLoading = false;

                        $mdToast.show(
                            $mdToast.simple()
                                .content('Amitié confirmée.')
                                .position("bottom")
                                .hideDelay(3000)
                        );
                        FriendService.getAll().then(function (result) {
                            console.log(result);

                            (typeof result.message === "undefined") ? $scope.friends = result.friends : $scope.message = result.message;
                        });
                    },
                    function errorCallback(error) {
                        console.log(error.data);
                    }
                );

            }

        }]);
