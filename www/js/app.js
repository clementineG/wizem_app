angular.module('starter', ['ionic', 'loginCtrl', 'appCtrl', 'profileCtrl', 'ngMaterial', 'backButtonDir'])

    .run(function($ionicPlatform) {
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
        });
    })

    .config(function($stateProvider, $urlRouterProvider, $mdIconProvider) {

        $mdIconProvider.defaultIconSet('/img/icons/mdi.svg');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        });

        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'templates/menu.html',
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
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('app.newEvent', {
                url: '/newEvent',
                views: {
                    Home: {
                        templateUrl: 'templates/newEvent.html',
                        controller: 'AppCtrl'
                    }
                }
            })

            .state('app.events', {
                url: '/events',
                views: {
                    Home: {
                        templateUrl: 'templates/events.html',
                        controller: 'AppCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');
    });
