angular.module('profileCtrl', [])

    .controller('ProfileCtrl', ['$scope', 'UserService', 'Restangular', function ($scope, UserService, Restangular) {

        $scope.user = UserService.getFromLocalStorage();
        $scope.editProfile = function (userM) {
            //user
            console.log('editProfile');
            newMail = userM.email;
            var users = Restangular.all("users").getList().then(function (u) {
                console.log('u');
                console.log(u);
                eUser = u[0];
                eUser.email = newMail;
                eUser.customPUT();
                eUser.save();
                $scope.user = eUser;
                console.log('OK');


                console.log(eUser);

            });
            //console.log(users);
            io//t = users.one(1);
            //console.log(t);
            //eUser = Restangular.copy(t);


            //Restangular.one("accounts", 123).one("buildings", 456).one("spaces", 789).get()

        }
    }]);