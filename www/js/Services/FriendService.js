angular.module('friendService', [])

    .factory('FriendService', ['$ionicHistory', '$state', 'Restangular', '$q', 'UserService',
        function ($ionicHistory, $state, Restangular, $q, UserService) {

        var userId = UserService.getId();
        var Friends = Restangular.all('users/' + userId + '/friends');

        return {

            getAll: function() {
                var defer = $q.defer();

                Friends.getList().then(function(result) {
                    return defer.resolve({"friends": result});
                }, function errorCallback(error) {
                    console.log(error);
                    var message = "Vous n'avez pas encore d'amis, ajoutez-en !";
                    return defer.resolve({"message": message});
                });

                return defer.promise;
            },

            delete: function (userId, friendId) {
                var defer = $q.defer();
                Restangular.one('users/' + userId).one("friends/", friendId).remove().then(function(result) {
                    return defer.resolve(result);
                }, function errorCallback(error) {
                    console.log(error);
                });
                return defer.promise;
            }

        }

    }]);