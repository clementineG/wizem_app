angular.module('profileCtrl', [])

    .controller('ProfileCtrl', function($scope, $http, $ionicHistory) {

        $scope.stateProfil = true;
        console.log($scope.stateProfil);

        $scope.getProfile = function($id) {

            /*url = "http://"; */
            /*$http.get(url).success(function(response) {

            });*/

        }

    })