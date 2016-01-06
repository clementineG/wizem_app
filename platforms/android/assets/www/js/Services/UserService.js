angular.module('userService', [])

    .factory('UserService', ['$ionicHistory',
        function ($ionicHistory) {

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
            }

        }

    }]);