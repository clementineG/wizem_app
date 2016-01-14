angular.module('profileCtrl', [])

    .controller('ProfileCtrl', ['$scope', 'UserService', 'Restangular', '$cordovaCamera', '$mdDialog', '$state',
        function ($scope, UserService, Restangular, $cordovaCamera, $mdDialog, $state) {

        $scope.user = UserService.getUser();

        var monthList = ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"];
        var weekDaysList = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

        $scope.datepickerBirthday = {
            titleLabel: 'Anniversaire',  //Optional
            todayLabel: 'Now',  //Optional
            closeLabel: 'Fer.',  //Optional
            setLabel: 'Enr.',  //Optional
            //setButtonType: 'button-assertive',  //Optional
            //todayButtonType: 'false',  //Optional
            //closeButtonType: 'button-assertive',  //Optional
            inputDate: new Date(),  //Optional
            mondayFirst: true,  //Optional
            weekDaysList: weekDaysList, //Optional
            monthList: monthList, //Optional
            templateType: 'popup', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: true, //Optional
            callback: function (val) {  //Mandatory
                datePickerBirthdayCallback(val);
            }
        };

        function datePickerBirthdayCallback(v) {
            $scope.datepickerBirthday.inputDate = v;
        }

        $scope.editProfile = function (userM) {
            Restangular.one("users", userM.id).get().then(function (u) {
                UserService.updateUser(u);

                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title("Modification enregistrée")
                        .ok("Fermer")
                )

                $state.go('app.profile');
            });
        };

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
                UserService.setAvatar("data:image/jpeg;base64," + imageData);

            }, function (err) {
                // error
            });
        }

    }]);