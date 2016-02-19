/**
 * Created by clementine on 17/02/2016.
 */
angular.module('friendAddCtrl', [])

    .controller('FriendAddCtrl', ['$scope', '$stateParams', 'UserService', 'FriendService', 'Restangular', '$state',
        function ($scope, $stateParams, UserService, FriendService, Restangular, $state) {


            var userId = UserService.getId();
            var UserFind = Restangular.all('users/' + userId + '/friends/finds');
            var FriendAdd = Restangular.all('users/' + userId + '/friends');

            $scope.displayUserFind = false;
            $scope.displayUserAddButton = false;
            $scope.displayUserFriend = false;

            $scope.searchUser = function () {
                $scope.matchedUser = undefined;
                UserFind.post({'username': $scope.username}).then(function (friend) {
                    $scope.message = undefined;
                    $scope.matchedUser = friend;
                    $scope.displayUserFind = true;
                    console.log(friend);
                    if (!friend.areFriends) {
                        //display add button
                        $scope.displayUserAddButton = true;
                        $scope.displayUserFriend = false;

                    } else {
                        $scope.displayUserAddButton = false;
                        $scope.displayUserFriend = true;
                    }

                }, function errorCallback(error) {
                    console.log(error.data);
                    $scope.displayUserFind = false;

                    if (error.data.message == 'Friend not found')
                        $scope.message = "Aucun utilisateur ne correspond à cet identifiant.";
                    else if (error.data.message == 'Invalid username')
                        $scope.message = "";
                    else
                        $scope.message = "Problème réseau, veuillez réésayer";

                });
            };
            $scope.clearInputUsername = function () {
                $scope.username = undefined;
                $scope.matchedUser = undefined;
            };

            $scope.addFriend = function (username) {
                console.log(username);
                FriendAdd.post({'username': $scope.username}).then(function (complete) {
                    console.log('complete')
                    console.log(complete)
                }, function errorCallback(error) {
                    console.log('error')
                    console.log(error)
                });
            }
        }]);
