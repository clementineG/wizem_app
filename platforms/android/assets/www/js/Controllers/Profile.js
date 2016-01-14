angular.module('profileCtrl', [])

    .controller('ProfileCtrl', ['$scope', '$state', 'UserService', '$mdDialog', 'Restangular', '$cordovaCamera', function ($scope, $state, UserService, $mdDialog, Restangular, $cordovaCamera) {

        var user = UserService.getUser();
        Restangular.one("users", user.id).get().then(function (userConnected) {
            $scope.user = userConnected;
        });
        console.log($scope.user);
        // Page Edition profil utilisateur
        var monthList = ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"];
        var weekDaysList = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

        $scope.datepickerBirthday = {
            titleLabel: 'Anniversaire', 
            todayLabel: 'Now',   
            closeLabel: 'Fer.',   
            setLabel: 'Enr.',
            inputDate: new Date(),   
            mondayFirst: true,   
            weekDaysList: weekDaysList,  
            monthList: monthList,  
            templateType: 'popup',  
            modalHeaderColor: 'bar-positive',  
            modalFooterColor: 'bar-positive',  
            dateFormat: 'dd-MM-yyyy',
            //setButtonType: 'button-assertive',
            //todayButtonType: 'false',
            //closeButtonType: 'button-assertive',
            closeOnSelect: true,  
            callback: function (val) {  //Mandatory
                datePickerBirthdayCallback(val);
            },
        };

        function datePickerBirthdayCallback(v) {
            $scope.datepickerBirthday.inputDate = v;
        }

        $scope.editProfile = function (userM) {
            //user
            Restangular.one("users", $scope.user.id).get().then(function (userM) {
                var userEdited = Restangular.copy($scope.user);
                userEdited.put();
                //window.localStorage.removeItem('user');
                //UserService.saveToLocalStorage($scope.user);

                //$scope.user = UserService.getUser();
                //Restangular.one("users", $scope.user.id).get().then(function (userConnected) {
                //    UserService.saveToLocalStorage(userConnected);
                //});
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Modification(s) enregistrée(s)')
                        .ok('Fermer')
                );
                $state.go('app.profile');

            });

        }

        //Gestion de l'APN pour la photo de profil
        $scope.takePhoto = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                cameraDirection: 1,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                userService.setAvatar("data:image/jpeg;base64," + imageData);
            }, function (err) {
                // error
            });
        }

    }]);