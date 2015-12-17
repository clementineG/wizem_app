angular.module('loginCtrl', [])

    .controller('LoginCtrl', ['$scope', 'UserService', '$state', '$cordovaOauth', 'Restangular', '$mdDialog',
        function($scope, UserService, $state, $cordovaOauth, Restangular, $mdDialog) {

        $scope.isLoading = false;

        var UsersLogins = Restangular.all('users/logins');
        var Users = Restangular.all('users');

        //Users.getList().then(function(users) {
        //    $scope.users = users;
        //    //console.log($scope.users);
        //}, function errorCallback(error) {
        //    console.log(error);
        //});
        //
        //var newUser = {"email":"f@f.com", "password":"f"};
        //
        //console.log(newUser);

        //Users.post(newUser).then(function(result) {
        //    console.log(result);
        //}, function errorCallback(error) {
        //    console.log(error);
        //});

        $scope.connexion = function(username, password) {
            $scope.isLoading = true;

            var data = {"email": username, "password": password};

            console.log(data);

            UsersLogins.post(data).then(function(user) {
                UserService.saveToLocalStorage(user);
                $scope.isLoading = false;
                $state.go('app.home');
            }, function errorCallback(error) {
                console.log(error.data.message);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Connexion échouée')
                        .content('Vos identifiants sont erronés.')
                        .ok('Fermer')
                );
                $scope.isLoading = false;
            });

        };

        $scope.logFacebook = function() {
            $cordovaOauth.facebook(SocialProvider.facebookId, ['email']).then(
                function(result) {
                    console.log("Response Object -> " + JSON.stringify(result));
                }, function(error) {
                    console.log("Error -> " + error);
                }
            );
        };

        $scope.subscribe = function(mail, username, password) {
            $scope.isLoading = true;

            var data = {"email": mail, "username": username, "password": password};

            console.log(data);

            Users.post(data).then(function(user) {
                console.log(user);
                $scope.isLoading = false;
                //$scope.pseudo = user.pseudo;
                //$scope.password = user.password;
                //$state.go('login');
            }, function errorCallback(error) {
                console.log(error);
                $scope.isLoading = false;
            });
        }

    }]);
