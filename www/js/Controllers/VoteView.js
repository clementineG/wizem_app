angular.module('voteViewCtrl', [])

    .controller('VoteViewCtrl', ['$scope', 'MapService', '$stateParams', 'UserService', 'Restangular', '$state',
        'uiGmapGoogleMapApi', '$mdDialog', '$rootScope', '$mdToast',
        function($scope, MapService, $stateParams, UserService, Restangular, $state,
                 uiGmapGoogleMapApi, $mdDialog, $rootScope, $mdToast) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var userId = user.id;

        // Id de l'event sélectionné
        var idEvent = $stateParams.eventId;

        $scope.myGoBack = function() {
            $state.go('app.viewEvent', {'eventId': idEvent});
        };

        var getVoteDates = Restangular.all('users/' + userId + '/events/' + idEvent + '/votes/date');
        var getVotePlaces = Restangular.all('users/' + userId + '/events/' + idEvent + '/votes/place');
        var postVote = Restangular.all('votes');

        // On regarde si on se trouve sur la page de vote pour les dates ou les lieux
        var path = $state.current.name;
        if (path == "app.viewVoteDates") {

        } else if (path == "app.viewVotePlaces") {
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
                getVotePlaces.getList().then(function(places) {
                    $scope.places = places;

                    $scope.isLoading = false;

                    $mdToast.show(
                        $mdToast.simple()
                            .content('Votre vote a bien été pris en compte.')
                            .position("bottom")
                            .hideDelay(3000)
                    );
                }, function errorCallback(error) {
                    console.log(error);
                });

                //$state.go('app.viewEvent', {"eventId":idEvent});
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