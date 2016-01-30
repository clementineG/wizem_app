angular.module('eventViewCtrl', [])

    .controller('EventViewCtrl', ['$scope', 'MapService', '$stateParams', 'UserService', 'Restangular', '$state', 'uiGmapGoogleMapApi', '$mdDialog', '$rootScope',
        function($scope, MapService, $stateParams, UserService, Restangular, $state, uiGmapGoogleMapApi, $mdDialog, $rootScope) {

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
                        $scope.borderConfirm = true;
                        $scope.fabicon = "ion-checkmark-round";
                        $scope.userState = "ion-checkmark-round";
                        break;
                    case false:
                        $scope.borderDecline = true;
                        $scope.fabicon = "ion-close-round";
                        $scope.userState = "ion-close-round";
                        break;
                    case null:
                        $scope.borderWainting = true;
                        $scope.fabicon = "ion-help";
                        $scope.userState = "ion-help";
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

            if (!$scope.event.host) {
                var fab = document.getElementsByClassName("confirm-fab")[0];
                var confirm = $mdDialog.confirm()
                    .title('Vas-tu y aller ?')
                    .content('Informe les autres invités de ta présence !')
                    .targetEvent(response)
                    .ok('J\'y vais !')
                    .cancel('Je n\'y vais pas.');

                $mdDialog.show(confirm).then(function () {
                    $scope.accept = true;
                    $scope.fabicon = "ion-checkmark-round";
                    $scope.userState = "ion-checkmark-round";
                    fab.classList.remove("fab-gray");
                    fab.classList.remove("fab-red");
                    fab.classList.add("fab-green");
                    UserService.changeState(user, $scope.idEvent, $scope.accept);
                    $rootScope.$emit("userEventStateChange", user, $scope.accept);
                }, function () {
                    $scope.accept = false;
                    $scope.fabicon = "ion-close-round";
                    $scope.userState = "ion-close-round";
                    fab.classList.remove("fab-gray");
                    fab.classList.remove("fab-green");
                    fab.classList.add("fab-red");
                    UserService.changeState(user, $scope.idEvent, $scope.accept);
                    $rootScope.$emit("userEventStateChange", user, $scope.accept);
                });
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Et non !')
                        .content('Vous êtes l\'hôte de cet évènement, vous ne pouvez pas modifier votre présence :)')
                        .ok('Fermer')
                );
            }
        }

    }]);