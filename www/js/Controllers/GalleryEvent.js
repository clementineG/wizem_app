angular.module('galleryEventCtrl', [])

    .controller('GalleryEventCtrl', ['$scope', '$stateParams', 'UserService', 'Restangular', '$state', '$ionicSlideBoxDelegate',
        function($scope, $stateParams, UserService, Restangular, $state, $ionicSlideBoxDelegate) {

        // On récupère le User et son id
        var user = UserService.getFromLocalStorage();
        var id = user.id;

        // Id de l'event sélectionné
        $scope.idEvent = $stateParams.eventId;

        $scope.myGoBack = function() {
            $state.go('app.viewEvent', {'eventId': $scope.idEvent});
        };

        $scope.slide = function(index){
            $ionicSlideBoxDelegate.slide(index);
        };

        $scope.pictures = [
            {
                src:'https://metrouk2.files.wordpress.com/2013/10/183153274.jpg',
                sub: 'This is a subtitle'
            },
            {
                src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
                sub: 'Blablablablablablablablablablablablablabla' /* Not showed */
            },
            {
                src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
                sub: 'This is a subtitle'
            },
            {
                src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
                sub: '' /* Not showed */
            },{
                src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
                sub: 'This is a subtitle'
            },
            {
                src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
                sub: '' /* Not showed */
            },{
                src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
                sub: 'This is a subtitle'
            },
            {
                src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
                sub: '' /* Not showed */
            }
        ]

    }]);