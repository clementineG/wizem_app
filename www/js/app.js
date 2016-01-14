angular.module('wizem', [
    'ionic',
    'loginCtrl',
    'appCtrl',
    'eventCtrl',
    'eventViewCtrl',
    'voteViewCtrl',
    'allUsersEventCtrl',
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
    'guestBlockDirective'
])

    .run(function($ionicPlatform, UserService, $state) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            var user = UserService.getFromLocalStorage();
            if (typeof(user) != "undefined") {
                $state.go('app.home');
            }
        });
    })

    .constant('SocialProvider', {
        facebookId: ''
    })

    .config(function($stateProvider, $urlRouterProvider, $mdIconProvider, $ionicConfigProvider,
                     RestangularProvider, $translateProvider, uiGmapGoogleMapApiProvider) {

        $mdIconProvider.defaultIconSet('/img/icons/mdi.svg');

        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text("");

        //API local
        //RestangularProvider.setBaseUrl('http://localhost:8888/wizem/web/app_dev.php/api/');
        //API wizem.fr
        RestangularProvider.setBaseUrl('http://wizem.fr/api/');
        RestangularProvider.setDefaultHeaders({"Content-type":"application/json"});
        RestangularProvider.setRequestSuffix('.json');

        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });

        //$translateProvider
        //    .useStaticFilesLoader({
        //        prefix: 'scripts/locales/',
        //        suffix: '.json'
        //    })
        //    .registerAvailableLanguageKeys(['fr'], {
        //        'fr' : 'fr', 'fr_FR': 'fr', 'fr_FR': 'fr'
        //    })
        //    .preferredLanguage('fr')
        //    .fallbackLanguage('fr')
        //    .determinePreferredLanguage()
        //    .useSanitizeValueStrategy('escapeParameters');

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
                controller: 'LoginCtrl'
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
        $urlRouterProvider.otherwise('login');
    });