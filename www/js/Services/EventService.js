angular.module('eventService', [])

    .factory('EventService', ['$ionicHistory', '$state', 'Restangular', '$q', 'UserService',
        function ($ionicHistory, $state, Restangular, $q, UserService) {

        var userId = UserService.getId();
        //var Event = Restangular.all('users/' + userId + '/events/' + eventId);

        return {

            get: function(eventId) {
                var defer = $q.defer();

                Restangular.one('users/' + userId).one("events/", eventId).get().then(function(event) {
                    console.log(event);
                    return defer.resolve(event);
                }, function errorCallback(error) {
                    console.log(error);
                });

                return defer.promise;
            },

            delete: function (eventId, userId) {
                var defer = $q.defer();
                Restangular.one("events/", eventId).one("/users/", userId).remove().then(function(result) {
                    return defer.resolve(result);
                }, function errorCallback(error) {
                    console.log(error);
                });
                return defer.promise;
            }

        }

    }]);