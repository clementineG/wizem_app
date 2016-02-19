angular.module('appCtrl', [])

    .controller('AppCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        // On récupère le user connecté
        //UserService.getUser().then(function(user) {
        //    console.log(user);
        //});
        //    console.log('cono');

    }]);