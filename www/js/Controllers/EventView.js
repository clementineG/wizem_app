angular.module('eventViewCtrl', [])

    .controller('EventViewCtrl', ['$scope', 'MapService', '$stateParams', 'UserService', 'Restangular', '$state', 'uiGmapGoogleMapApi', '$mdDialog', '$rootScope',
        function($scope, MapService, $stateParams, UserService, Restangular, $state, uiGmapGoogleMapApi, $mdDialog, $rootScope) {

        // On custom le bouton back pour qu'on le voit sur la Map
        var backButton = document.getElementsByClassName("back-button")[0];
        backButton.classList.add("back-button-map");

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var userId = user.id;

        // Id de l'event sélectionné
        $scope.idEvent = $stateParams.eventId;

        var Event = Restangular.all('users/' + userId + '/events/' + $scope.idEvent);

        // On récupère l'event sélectionné
        Restangular.one('users/' + userId + '/events', $scope.idEvent).get().then(function (result) {

            $scope.event = result;

            // On récupère le statut du User sur cet event
            UserService.getState($scope.event.users, userId).then(function (state) {
                switch (state) {
                    case true:
                        $scope.fabicon = "check";
                        $scope.userState = "check";
                        break;
                    case false:
                        $scope.fabicon = "window-close";
                        $scope.userState = "window-close";
                        break;
                    case null:
                        $scope.fabicon = "help";
                        $scope.userState = "help";
                        break;
                }
                $scope.accept = state;
            });

            // Quand l'API de la Map est prête
            uiGmapGoogleMapApi.then(function (maps) {
                // On crée la Map
                $scope.map = MapService.getMap(result.place.places[0].lat, result.place.places[0].lng);
                // On ajoute le marqueur
                $scope.markers = MapService.getMarkers(result.place.places);
            });
        });

        $scope.changeState = function(response) {
            var fab = document.getElementsByClassName("md-fab")[0];
            var confirm = $mdDialog.confirm()
                .title('Vas-tu y aller ?')
                .content('Informe les autres invités de ta présence !')
                .targetEvent(response)
                .ok('J\'y vais !')
                .cancel('Je n\'y vais pas.');
            $mdDialog.show(confirm).then(function() {
                $scope.accept = true;
                $scope.fabicon = "check";
                $scope.userState = "check";
                fab.classList.remove("fab-gray");
                fab.classList.remove("fab-red");
                fab.classList.add("fab-green");
                $rootScope.$emit("userEventStateChange", user, $scope.accept);
            }, function() {
                $scope.accept = false;
                $scope.fabicon = "window-close";
                $scope.userState = "window-close";
                fab.classList.remove("fab-gray");
                fab.classList.remove("fab-green");
                fab.classList.add("fab-red");
                $rootScope.$emit("userEventStateChange", user, $scope.accept);
            });
        }

    }]);