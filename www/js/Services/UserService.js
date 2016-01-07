angular.module('userService', [])

    .factory('UserService', ['$ionicHistory',
        function ($ionicHistory) {

            var user = window.localStorage['user'] ? angular.fromJson(window.localStorage['user']) : {};
           var userExt = {'avatar' : 'http://unsplash.it/100/100'};
            angular.extend(user,userExt);

            return {
                getUser: function () {
                    return user;
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
                    user.avatar = img;
                }

            }

        }]);