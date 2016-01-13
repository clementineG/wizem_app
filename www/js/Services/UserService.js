angular.module('userService', [])

    .factory('UserService', ['$ionicHistory', 'Restangular',
        function ($ionicHistory,Restangular) {

            var user = window.localStorage['user'] ? angular.fromJson(window.localStorage['user']) : {};
            var userRest;
            Restangular.one("users", user.id).get().then(function(u){
                userRest = u;
            });

            return {
                getUser: function () {
                    return userRest;
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
                    user.image = img;
                },
                updateUser: function(usr){
                    usr.put();
                }

            }

        }]);