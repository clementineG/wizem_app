angular.module('chooseTypeEventCtrl', [])

    .controller('ChooseTypeEventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state',
        function($scope, $stateParams, UserService, Restangular, $state) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var userId = user.id;

        var TypesEvent = Restangular.all('events/types');
        var CreateEvent = Restangular.all('events');

        // On récupère tous les types d'event
        TypesEvent.getList().then(function(result) {
            $scope.types = result;
        }, function errorCallback(error) {
            console.log(error);
        });

        $scope.createEvent = function(id) {
            var data = {"userId": userId, "typeevent": id};

            CreateEvent.post(data).then(function (eventId) {
                $state.go('app.newEvent', {"eventId": eventId});
            }, function errorCallback(error) {
                console.log(error);
            });
        }

    }]);