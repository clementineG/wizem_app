angular.module('profileCtrl', [])

    .controller('ProfileCtrl', ['$scope', 'UserService', function($scope, UserService) {

        $scope.user = UserService.getFromLocalStorage();

    }]);