angular.module('loginCtrl', [])

    .controller('LoginCtrl', ['$scope', 'UserService', '$state', '$cordovaOauth', 'Restangular', '$mdDialog',
        function($scope, UserService, $state, $cordovaOauth, Restangular, $mdDialog) {

        $scope.isLoading = false;

        var UsersLogins = Restangular.all('users/logins');
        var Users = Restangular.all('users');

        $scope.connexion = function(username, password) {
            $scope.isLoading = true;

            var data = {"username": username, "password": password};

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
                $scope.isLoading = false;
                UserService.saveToLocalStorage(user);
                $state.go('app.home');
            }, function errorCallback(error) {
                console.log(error);
                $scope.isLoading = false;
            });
        };

        $scope.logout = function() {
            UserService.deleteLocalStorage();
            $state.go('login');
        }

    }]);
