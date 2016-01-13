angular.module('voteViewCtrl', [])

    .controller('VoteViewCtrl', ['$scope', 'MapService', '$stateParams', 'UserService', 'Restangular', '$state', 'uiGmapGoogleMapApi', '$mdDialog', '$rootScope',
        function($scope, MapService, $stateParams, UserService, Restangular, $state, uiGmapGoogleMapApi, $mdDialog, $rootScope) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var userId = user.id;

        // Id de l'event sélectionné
        var idEvent = $stateParams.eventId;

        var getVoteDates = Restangular.all('users/' + userId + '/events/' + idEvent + '/votes/date');
        var getVotePlaces = Restangular.all('users/' + userId + '/events/' + idEvent + '/votes/place');
        var postVote = Restangular.all('votes');

        // On regarde si on se trouve sur la page de vote pour les dates ou les lieux
        var path = $state.current.name;
        if (path == "app.viewVoteDates") {

        } else if (path == "app.viewVotePlaces") {
            // On custom le bouton back pour qu'on le voit sur la Map
            var backButton = document.getElementsByClassName("back-button")[0];
            backButton.classList.add("back-button-map");

            //On récupère tous les lieux
            getVotePlaces.getList().then(function(places) {
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

        $scope.vote = function(vote) {
            $scope.isLoading = true;

            if (typeof(vote.date) != "undefined") {
                // On enregistre le choix de la date
                var data = {"date": vote.date, "user": userId, "event": idEvent};
            } else {
                // On enregistre le choix du lieu
                var data = {"place": vote.place, "user": userId, "event": idEvent};
            }

            postVote.post(data).then(function(vote) {
                console.log(vote.id);
                $scope.isLoading = false;
                $state.go('app.viewEvent', {"eventId":idEvent});
            }, function errorCallback(error) {
                console.log(error.data.message);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Vote échoué')
                        .content('Une erreur est survenue, veuillez choisir à voter à nouveau.')
                        .ok('Fermer')
                );
                $scope.isLoading = false;
            });
        }


    }]);