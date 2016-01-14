angular.module('friendService', [])

    .factory('FriendService', ['$ionicHistory', '$state', 'Restangular', '$q', 'UserService',
        function ($ionicHistory, $state, Restangular, $q, UserService) {

        var userId = UserService.getId();
        var Friends = Restangular.all('users/' + userId + '/friends');

        return {

            getAll: function() {
                var defer = $q.defer();

                Friends.getList().then(function(result) {
                    var friends = result;
                    return defer.resolve(friends);
                }, function errorCallback(error) {
                    console.log(error);
                });

                return defer.promise;
            },

            delete: function (userId, friendId) {
                Restangular.one('users/' + userId).one("friends/", friendId).remove();
            }

        }

    }]);