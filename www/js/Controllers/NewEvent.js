angular.module('newEventCtrl', [])

    .controller('NewEventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var id = user.id;

        var TypesEvent = Restangular.all('events/types');

        //// On récupère tous les events
        //Events.getList().then(function(result) {
        //    $scope.eventsList = result;
        //}, function errorCallback(error) {
        //    console.log(error);
        //    $scope.message = "Vous n'avez pas d'évènement, allez en créer un de suite !";
        //});

    }]);