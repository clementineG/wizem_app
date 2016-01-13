angular.module('userService', [])

    .factory('UserService', ['$ionicHistory', 'Restangular', '$q',
        function ($ionicHistory, Restangular, $q) {

        //var user = window.localStorage['user'] ? angular.fromJson(window.localStorage['user']) : {};

        return {

            getFromLocalStorage: function() {
                user = angular.fromJson(window.localStorage['user']);
                return user;
            },
            saveToLocalStorage: function(user) {
                window.localStorage['user'] = angular.toJson(user);
                return 'Saved';
            },
            deleteLocalStorage: function() {
                window.localStorage.removeItem('user');
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
            },
            getState: function (users, userId) {
                var defer = $q.defer();
                var state = false;
                var fab = document.getElementsByClassName("md-fab")[0];

                angular.forEach(users, function(user, key) {
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
            }

        }

    }]);