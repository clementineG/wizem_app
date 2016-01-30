angular.module('userService', [])

    .factory('UserService', ['$ionicHistory', 'Restangular', '$q',
        function ($ionicHistory, Restangular, $q) {

            var userRest;

            var UsersLoginsFb = Restangular.all('users/facebooks');
            Restangular.one("users", user.id).get().then(function (user) {
                userRest = user;
            }, function errorCallback(error) {
                console.log(error);
            });

            return {

                init: function() {
                    if (!self.userRest) {
                        self.userRest = this.getFromLocalStorage();

                        if (typeof self.userRest !== "undefined") {
                            $q.when(this.getUser()).then(function(result) {
                                self.userRest = result;
                            }, function errorCallback(error) {
                                return $q.reject({error: "noUser"});
                            });
                        } else {
                            return $q.reject({error: "noUser"});
                        }
                    }
                },
                getCurrent: function() {
                    return self.userRest;
                },
                getUser: function () {
                    var self = this;
                    var defer = $q.defer();
                    Restangular.one("users", user.id).get().then(function(user){
                        self.userRest = user;
                        return defer.resolve(user);
                    }, function errorCallback(error) {
                        console.log(error);
                        return $defer.reject(error);
                    });
                    return defer.promise;
                },
                getId: function() {
                    return self.userRest.id;
                },
                getFromLocalStorage: function () {
                    user = angular.fromJson(window.localStorage['user']);
                    return user;
                },
                saveToLocalStorage: function (user) {
                    window.localStorage['user'] = angular.toJson(user);
                    return 'Saved';
                },
                deleteLocalStorage: function () {
                    window.localStorage.removeItem('user');
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                },
                setAvatar: function(img){
                    self.userRest.image = img;
                },
                updateUser: function(usr){
                    var defer = $q.defer();
                    usr.put().then(function(user) {
                        self.userRest = user;
                        return defer.resolve(user);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
                    return defer.promise;
                },
                getState: function (users, userId) {
                    var defer = $q.defer();
                    var state = false;
                    var fab = document.getElementsByClassName("confirm-fab")[0];

                    angular.forEach(users, function (user, key) {
                        if (user.id == userId) {
                            state = user.state;
                            if (state) {
                                fab.classList.add("fab-green");
                            } else if (state == false) {
                                fab.classList.add("fab-red");
                            } else {
                                fab.classList.add("fab-gray");
                            }
                            return defer.resolve(state);
                        }
                    });
                    return defer.promise;
                },
                apiWithPromise: function (requestPath, permissions) {
                    var task = $q.defer();
                    facebookConnectPlugin.api(requestPath, permissions,
                        function (data) {
                            task.resolve(data);
                        }, function (error) {
                            task.reject(error);
                        });
                    return task.promise;
                },
                hasWizemAccount: function (userFbEmail) {
                    var defer = $q.defer();

                    UsersLoginsFb.post(userFbEmail).then(function (result) {
                        var exists = result;
                        return defer.resolve(exists);
                    }, function errorCallback(error) {
                        defer.reject(error);
                    });
                    return defer.promise;
                },
                updateWizemAccount: function (params) {
                    console.log('apiupdate');
                    var defer = $q.defer();
                    UsersLoginsFb.post(params).then(function (userFinal) {
                        console.log(userFinal);
                        return defer.resolve(userFinal);
                    }, function errorCallback(error) {
                        console.log(error);
                        defer.reject(error);
                    });
                    return defer.promise;
                },
                changeState: function (user, eventId, state) {
                    var Confirm = Restangular.all('users/' + user.id + '/events/' + eventId + '/confirms');
                    var data = {
                        "confirm": state
                    };
                    Confirm.post(data).then(function(result){
                        console.log(result);
                        return true;
                    }, function errorCallback(error) {
                        console.log(error);
                    });
                }
            }
        }
    ]);