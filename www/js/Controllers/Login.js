angular.module('loginCtrl', [])

    .controller('LoginCtrl', ['$scope', 'UserService', '$state', '$cordovaOauth', 'Restangular', '$mdDialog', '$q', '$mdToast',
        function ($scope, UserService, $state, $cordovaOauth, Restangular, $mdDialog, $q, $mdToast) {

            $scope.isLoading = false;

            var UsersLogins = Restangular.all('users/logins');
            var Users = Restangular.all('users');
            $scope.statusFb = null;
            // Connect with standard account
            $scope.connexion = function (username, password) {
                $scope.isLoading = true;

                var data = {"username": username, "password": password};

                UsersLogins.post(data).then(function (user) {
                    UserService.saveToLocalStorage(user);
                    $scope.isLoading = false;
                    $state.go('app.home');
                }, function errorCallback(error) {
                    //console.log(error.data.message);
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


            // Connect with Facebook
            $scope.facebookSignIn = function () {
                // Get Status de log
                facebookConnectPlugin.getLoginStatus(function (success) {
                    //Access to the Fb API to get user's informations
                    facebookConnectPlugin.login(['email', 'public_profile'],
                        function (response) {
                            var p = UserService.apiWithPromise('/me?fields=email,first_name,last_name&access_token=' + response.accessToken, null);
                            p.then(function (userFb) {
                                //console.log(userFb);
                                var data = {'email': userFb.email};
                                // Check if user account exist by fb email
                                var userDb = UserService.hasWizemAccount(data);
                                userDb.then(function (userAPI) {
                                    var userFacebookId = userAPI.facebookId;
                                    var userEmail = userAPI.email;
                                    var userId = userAPI.id;
                                    var params = [];
                                    if (typeof userId != 'undefined' && userFacebookId == false) {
                                        // User has wizem account, but without fb connexion --> update
                                        params = {
                                            'update': true,
                                            'email': userAPI.email,
                                            'userId': userAPI.id,
                                            'facebookId': userFb.id,
                                            'username':  $scope.username
                                        };


                                    }
                                    if (typeof userId == 'undefined' && userFacebookId == false) {
                                        // First connection for this user --> create
                                        //Redirect to enter username
                                        params = {
                                            'create': true,
                                            'email': userEmail,
                                            'userId': userId,
                                            'facebookId': userFb.id
                                        };
                                    }
                                    if (typeof userId != 'undefined' && userFacebookId != false) {
                                        // User has an account with facebook access
                                        params = {'id': userId, 'email': userEmail, 'facebookId': userFb.id};
                                    }

                                    if (params !== []) {
                                        if(params.update == true){
                                            $state.go('app.register');
                                            param.username = $scope.username;
                                        }
                                        UserService.updateWizemAccount(params).then(function (userFinal) {
                                            UserService.saveToLocalStorage(userFinal);
                                            if (typeof userFinal != 'undefined')
                                                $state.go('app.home');
                                            $mdToast.show(
                                                $mdToast.simple()
                                                    .content('Salut ' + userFinal.username)
                                                    .position("bottom")
                                                    .hideDelay(3000)
                                            );
                                        }, function errorCallback(error) {
                                            console.log(error);
                                        });
                                    } else {
                                        $mdToast.show(
                                            $mdToast.simple()
                                                .content('Error' + params.length)
                                                .position("bottom")
                                                .hideDelay(3000)
                                        );
                                    }
                                });
                            });
                        },
                        function (error) {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .clickOutsideToClose(true)
                                    .title('Connexion échouée')
                                    .content('fbConnectPluginError' + error)
                                    .ok('Fermer')
                            );
                        }
                    );
                }, function (error) {
                    console.log('ErrorLog : ');
                    console.log(error);
                });


            };

            $scope.chooseUsername = function(){
                console.log('chooseUsername');
                $scope.go('app.register');
            }

            // Choose Username to complete fb profile
            $scope.saveUsername = function () {
                //    Injecter le pseudo dans l'objet user créé via les id fb
                console.log($scope.username);
                console.log($scope.tempUser);
                var newUser = $scope.tempUser;
                if (typeof newUser != 'undefined' || typeof username != 'undefined') {
                    newUser.username = username;
                    //    POST User
                    //    Restangular
                } else {
                    //    newUSer null
                    if (typeof newUser != 'undefined')
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Object user is empty')
                                .content('usrTemp is not defined')
                                .ok('Fermer')
                        );

                    //    username null
                    else if (typeof username != 'undefined')
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('Connexion échouée')
                                .content('fbConnectPluginError')
                                .ok('Fermer')
                        );
                    else
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Echec de connexion')
                            .content('Veuillez nous contacter')
                            .ok('Fermer')
                }
            }

            // Subscribe
            $scope.subscribe = function (mail, username, password) {
                $scope.isLoading = true;

                var data = {"email": mail, "username": username, "password": password};

                Users.post(data).then(function (user) {
                    $scope.isLoading = false;
                    UserService.saveToLocalStorage(user);
                    $state.go('app.home');
                }, function errorCallback(error) {
                    //console.log(error);
                    $scope.isLoading = false;
                });
            };

            $scope.logout = function () {
                UserService.deleteLocalStorage();
                //facebookConnectPlugin.logout();
                $state.go('login');
            }
        }]);