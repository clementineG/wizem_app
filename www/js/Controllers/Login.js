angular.module('loginCtrl', [])

    .controller('LoginCtrl', function($scope, $state, $ionicLoading, $http) {

        $scope.connexion = function(pseudo, password) {
            /*** Appel de l'API pour vérifier les identifiants ***/
            /*url = "http://"; */

            /*$ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                showBackdrop: false
            });*/

            /*$http.get(url).success(function(response) {
                $ionicLoading.hide();*/
                $state.go('app.home');
            /*});*/
        }

    });
