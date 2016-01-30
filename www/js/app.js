angular.module('wizem', [
    'ionic',
    'loginCtrl',
    'appCtrl',
    'eventCtrl',
    'eventViewCtrl',
    'voteViewCtrl',
    'allUsersEventCtrl',
    'galleryEventCtrl',
    'profileCtrl',
    'friendCtrl',
    'ngMaterial',
    'ngCordova',
    'ngCordovaOauth',
    'restangular',
    'userService',
    'mapService',
    'friendService',
    'ngMessages',
    'ionic-datepicker',
    'pascalprecht.translate',
    'uiGmapgoogle-maps',
    'guestBlockDirective',
    'ionic.ion.autoListDivider',
    'jett.ionic.filter.bar',
    'ion-gallery'
])

    .run(function($ionicPlatform, UserService, $state, $rootScope, $cordovaStatusbar) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(false);
                cordova.plugins.Keyboard.hideFormAccessoryBar(true);

            }

            $cordovaStatusbar.styleHex('#EBEEF0');

            //if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                //StatusBar.styleDefault();
            //}

            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error) {
                    if (error && error.error === "noUser") {
                        $state.go('login');
                    }
                }
            )

        });
    })

    .config(function($stateProvider, $urlRouterProvider, $mdIconProvider, $ionicConfigProvider, ionGalleryConfigProvider,
                     RestangularProvider, $translateProvider, uiGmapGoogleMapApiProvider, $ionicFilterBarConfigProvider) {

        /***** Icon's config *****/
        $mdIconProvider.defaultIconSet('/img/icons/mdi.svg');

        /***** NavBar's config *****/
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text("");

        /***** Google Map's config *****/
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });


        /************* CONFIG DEE L'API À DÉPLACER DANS UN FICHIER *************/

        //API local
        //RestangularProvider.setBaseUrl('http://localhost:8888/wizem/web/app_dev.php/api/');
        //API wizem.fr
        RestangularProvider.setBaseUrl('http://wizem.fr/api/');
        RestangularProvider.setDefaultHeaders({"Content-type":"application/json"});
        RestangularProvider.setRequestSuffix('.json');

        /*************************************************************************/


        /************* CONFIG DES PLUGINS À DÉPLACER DANS UN FICHIER *************/

        /***** Fitler bar *****/
        $ionicFilterBarConfigProvider.placeholder("Rechercher");

        /***** Gallery photos *****/
        ionGalleryConfigProvider.setGalleryConfig({
            action_label: 'Fermer',
            toggle: true,
            row_size: 3
        });

        /*************************************************************************/


        /************* ROOTING À DÉPLACER DANS UN FICHIER *************/

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        });

        $stateProvider.state('subscribe', {
            url: '/subscribe',
            templateUrl: 'templates/subscribe.html',
            controller: 'LoginCtrl'
        });

        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'LoginCtrl',
                    resolve: {
                        user: function(UserService) {
                            var value = UserService.init();
                            return value;
                        }
                    }
            })

            .state('app.home', {
                url: '/home',
                views: {
                    Home: {
                        templateUrl: 'templates/home.html',
                        controller: 'AppCtrl'
                    }
                }
            })

            .state('app.profile', {
                cache: false,
                url: '/profile',
                views: {
                    Home: {
                        templateUrl: 'templates/profile/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('app.editProfile', {
                url: '/profile/edit',
                views: {
                    Home: {
                        templateUrl: 'templates/profile/editProfile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('app.newEvent', {
                url: '/newEvent',
                views: {
                    Home: {
                        templateUrl: 'templates/events/newEvent.html',
                        controller: 'EventCtrl'
                    }
                }
            })

            .state('app.events', {
                url: '/events',
                views: {
                    Home: {
                        templateUrl: 'templates/events/events.html',
                        controller: 'EventCtrl'
                    }
                }
            })

            .state('app.viewEvent', {
                url: '/view-event/:eventId',
                views: {
                    Home: {
                        templateUrl: 'templates/events/viewEvent.html',
                        controller: 'EventViewCtrl'
                    }
                }
            })

            .state('app.viewVoteDates', {
                url: '/view-event/:eventId/view-votes',
                views: {
                    Home: {
                        templateUrl: 'templates/events/viewVoteDates.html',
                        controller: 'VoteViewCtrl'
                    }
                }
            })

            .state('app.viewVotePlaces', {
                url: '/view-event/:eventId/view-votes',
                views: {
                    Home: {
                        templateUrl: 'templates/events/viewVotePlaces.html',
                        controller: 'VoteViewCtrl'
                    }
                }
            })

            .state('app.allUsers', {
                url: '/view-event/:eventId/users',
                views: {
                    Home: {
                        templateUrl: 'templates/events/allUsers.html',
                        controller: 'AllUsersEventCtrl'
                    }
                }
            })

            .state('app.gallery', {
                url: '/view-event/:eventId/gallery',
                views: {
                    Home: {
                        templateUrl: 'templates/events/gallery.html',
                        controller: 'GalleryEventCtrl'
                    }
                }
            })

            .state('app.friends', {
                url: '/friends',
                views: {
                    Home: {
                        templateUrl: 'templates/friends/friends.html',
                        controller: 'FriendCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('home');

        /*************************************************************************/
    });