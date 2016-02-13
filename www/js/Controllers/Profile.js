angular.module('profileCtrl', [])

    .controller('ProfileCtrl', ['$scope', 'UserService', 'Restangular', '$cordovaCamera', '$mdDialog', '$state', '$mdToast',
        function ($scope, UserService, Restangular, $cordovaCamera, $mdDialog, $state, $mdToast) {

        $scope.user = {};
        $scope.tempAvatar = "";

        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.user = UserService.getCurrent();

            // On met en place l'image de cover
            if (!$scope.user.cover) {
                $scope.cover_img = {
                    "background": "url(img/bar-1.jpg) no-repeat center",
                    "background-size": "cover"
                };
            } else {
                $scope.cover_img = {
                    "background": $scope.user.cover,
                    "background-size": "cover"
                };
            }

            // On met à jour la date de naissance pour le formulaire si elle existe
            if ($scope.user.birthDate) {
                $scope.datepickerBirthday.inputDate = new Date($scope.user.birthDate);
            }
        });

        var monthList = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
        var weekDaysList = ["D", "L", "M", "M", "J", "V", "S"];

        $scope.datepickerBirthday = {
            titleLabel: 'Date d\'anniversaire',  //Optional
            todayLabel: ' ',  //Optional
            closeLabel: 'X',  //Optional
            setLabel: 'OK',  //Optional
            //setButtonType: 'button-assertive',  //Optional
            //todayButtonType: 'false',  //Optional
            //closeButtonType: 'button-assertive',  //Optional
            inputDate: new Date(),  //Optional
            mondayFirst: true,  //Optional
            weekDaysList: weekDaysList, //Optional
            monthList: monthList, //Optional
            templateType: 'modal', //Optional
            modalHeaderColor: 'bar-energized', //Optional
            modalFooterColor: 'bar-energized', //Optional
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: true, //Optional
            callback: function (val) {
                if (typeof(val) === 'undefined') {
                    $scope.datepickerBirthday.inputDate = $scope.user.birthDate;
                } else {
                    $scope.datepickerBirthday.inputDate = val;
                    $scope.user.birthDate = val;
                    console.log(val);
                }
            }
        };

        $scope.editProfile = function () {
            $scope.isLoading = true;

            if ($scope.user.birthDate) {
                $scope.user.birthDate = new Date($scope.user.birthDate).getTime();
            }

            var user = angular.copy($scope.user);

            // On remplace l'avatar s'il a prise une nouvelle photo
            if ($scope.tempAvatar)
                UserService.setAvatar($scope.tempAvatar);

            UserService.updateUser(user).then(function(user) {
                $scope.user = user;

                $scope.isLoading = false;

                $mdToast.show(
                    $mdToast.simple()
                        .content('Votre profil a bien été mis à jour.')
                        .position("bottom")
                        .hideDelay(3000)
                );
            }, function errorCallback(error) {
                console.log(error);
            });
            $scope.isLoading = false;
        };

        $scope.takePhoto = function () {
            var options = {
                quality: 75 ,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                cameraDirection: 1,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                // Pour profil seulement :
                targetWidth: 100,
                targetHeight: 100,
                // -------------
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(function (imageData) {

                $scope.tempAvatar = "data:image/jpeg;base64," + imageData;
                //UserService.setAvatar("data:image/jpeg;base64," + imageData);
                //var user = angular.copy($scope.user);
                //UserService.updateUser(user).then(function(u) {
                //    $scope.user = u;
                //});

                //UserService.getUser().then(function(user) {
                //    UserService.setAvatar("data:image/jpeg;base64," + imageData);
                //    //user.image = "data:image/jpeg;base64," + imageData;
                //    UserService.updateUser(user).then(function(u) {
                //       $scope.user = u;
                //    });
                //});

            }, function (error) {
                console.log(error);
            });
        }

    }]);