angular.module('profileCtrl', [])

    .controller('ProfileCtrl', ['$scope', 'UserService', 'Restangular', function ($scope, UserService, Restangular) {

        $scope.user = UserService.getFromLocalStorage();
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
            },
        };

        function datePickerBirthdayCallback(v){
            $scope.datepickerBirthday.inputDate=v;
        }

        $scope.editProfile = function (userM) {
            //user
            Restangular.one("users",$scope.user.id).get().then(function(us){
                console.log(us);
            });

            //newMail = userM.email;
            //var users = Restangular.all("users").getList().then(function (u) {
            //    eUser = u[0];
            //    eUser.email = newMail;
            //    eUser.put();
            //    eUser.save();
            //    $scope.user = eUser;
            //    console.log(eUser);
            //
            //});
            //Restangular.one("accounts", 123).one("buildings", 456).one("spaces", 789).get()

        }
    }]);