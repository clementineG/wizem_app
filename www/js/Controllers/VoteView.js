angular.module('voteViewCtrl', [])

    .controller('VoteViewCtrl', ['$scope', 'MapService', '$stateParams', 'UserService', 'Restangular', '$state', 'uiGmapGoogleMapApi', '$mdDialog', '$rootScope',
        function($scope, MapService, $stateParams, UserService, Restangular, $state, uiGmapGoogleMapApi, $mdDialog, $rootScope) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var userId = user.id;

        // Id de l'event sélectionné
        var idEvent = $stateParams.eventId;

        var VoteDates = Restangular.all('users/' + userId + '/events/' + idEvent + '/votes/date');
        var VotePlaces = Restangular.all('users/' + userId + '/events/' + idEvent + '/votes/place');

        // On regarde si on se trouve sur la page de vote pour les dates ou les lieux
        var path = $state.current.name;
        if (path == "app.viewVoteDates") {

        } else {
            // On custom le bouton back pour qu'on le voit sur la Map
            var backButton = document.getElementsByClassName("back-button")[0];
            backButton.classList.add("back-button-map");

            //On récupère tous les lieux
            VotePlaces.getList().then(function(places) {
                $scope.places = places;

                // Quand l'API de la Map est prête
                uiGmapGoogleMapApi.then(function (maps) {
                    // On crée la Map
                    $scope.map = MapService.getMap(places[0].lat, places[0].lng);
                    // On ajoute le marqueur
                    $scope.markers = MapService.getMarkers(places);
                });
            }, function errorCallback(error) {
                console.log(error);
            });
        }




    }]);