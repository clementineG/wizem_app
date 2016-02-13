angular.module('newEventCtrl', [])

    .controller('NewEventCtrl', ['$scope', '$stateParams', 'UserService', 'EventService', 'Restangular', '$state', '$ionicModal', '$ionicPickerI18n', '$mdDialog',
        function($scope, $stateParams, UserService, EventService, Restangular, $state, $ionicModal, $ionicPickerI18n, $mdDialog) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var userId = user.id;

        $scope.$on('$ionicView.beforeEnter', function() {
            // Id de l'event
            var eventId = $stateParams.eventId;
            $scope.eventId = eventId;
            console.log(eventId);
            console.log($scope.eventId);

            $scope.event = EventService.get(eventId).then(function (event) {
                console.log(event);
                $scope.event = event;

                $scope.cover_img = {
                    "background": "url(img/cover/" + event.typeEvent + ".jpg) no-repeat center",
                    "background-size": "cover"
                };

            }, function errorCallback(error) {
                console.log(error);
            });

        });

        $scope.myGoBack = function(response) {
            var confirm = $mdDialog.confirm()
                .title('Attention !')
                .content('Si tu retournes en arrière, les données de ton évènement seront supprimée.')
                .targetEvent(response)
                .ok('Ok')
                .cancel('Annuler');

            $mdDialog.show(confirm).then(function () {
                EventService.delete($scope.eventId, userId).then(function(result) {
                    console.log(result);
                    $state.go('app.chooseType');
                }, function errorCallback(error) {
                    console.log(error);
                });
            }, function () {
                console.log("Annuler");
            });
        };

        $ionicPickerI18n.weekdays = ["D", "L", "M", "M", "J", "V", "S"];
        $ionicPickerI18n.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        $ionicPickerI18n.cancel = "X";
        $ionicPickerI18n.title = "Quand ?";

        $ionicModal.fromTemplateUrl('/templates/events/datetimePicker.html', function($ionicModal) {
            $scope.modal = $ionicModal;
        },{
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.datetime = function() {
            $scope.modal.show().then(function() {
                var buttonCancel = document.querySelector(".button-stable");
                buttonCancel.addEventListener("click", function() {
                    $scope.modal.hide();
                });
            });
            var element = angular.element(document.querySelector("#datetime"));
            element.triggerHandler("click");
        };

        $scope.dates = [];
        $scope.addDate = function(datetimeValue) {
            console.log(datetimeValue);
            $scope.modal.hide();
            $scope.dates.push(datetimeValue);
        };

        $scope.removeDate = function(index) {
            $scope.dates.splice(index, 1);
        }


    }]);