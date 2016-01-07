angular.module('friendCtrl', [])

    .controller('FriendCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        $scope.user = UserService.getUser();
            Restangular.one("users",$scope.user.id).getList("friends").then(function(friends){

                $scope.friends = friends;

            });
    }]);