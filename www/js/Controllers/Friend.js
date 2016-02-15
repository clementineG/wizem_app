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
            //var friend = _.findIndex($scope.friends, { id: id });
            //_.remove($scope.friends, function(item) {
            //    return item.id == key;
            //});
            //var tab_friends = [];
            //tab_friends = $scope.friends;

            //var array = [1, 2, 3, 4];
            //var result = _.remove(tab_friends, function(n) {
            //    if(n.id ==id)
            //        $scope.friends.splice(n);
            //        //console.log(n);
            //    //return n % 2 == 0;
            //});
            var a = _.filter($scope.friends, { 'id': id });
            console.log(a);
            var result = _.difference($scope.friends, a);
//            var result = _.without(tab_friends, tab_friends[key]).then  ;
$scope.friends = result;
            console.log($scope.friends);
            //$scope.friends.splice(key, 1);
            //console.log($scope.friends);
            //$scope.$apply();
            //var friend = _.findIndex($scope.friends, { id: id });
            //var index = $scope.friends.indexOf(key);
            //$scope.friends.all().then(func)
            //console.log('id_friend'+id);
            //console.log($scope.friends);
            //console.log($scope.friends.id)
            ////$scope.friends.splice(friend);
        }

    }]);
