angular.module('wizem', [
    'ionic',
    'loginCtrl',
    'appCtrl',
    'eventCtrl',
    'profileCtrl',
    'ngMaterial',
    'ngCordovaOauth',
    'restangular',
    'userService'
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
            user = UserService.getFromLocalStorage();
            if (typeof(user) != "undefined") {
                $state.go('app.home');
            }
        });
    })

    .constant('SocialProvider', {
        facebookId: ''
    })

    .config(function($stateProvider, $urlRouterProvider, $mdIconProvider, $ionicConfigProvider, RestangularProvider) {

        $mdIconProvider.defaultIconSet('/img/icons/mdi.svg');

        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text("");

        RestangularProvider.setBaseUrl('http://localhost:8888/Wizem/web/app_dev.php/api/');
        RestangularProvider.setDefaultHeaders({"Content-type":"application/json"});
        RestangularProvider.setRequestSuffix('.json');

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
                controller: 'AppCtrl'
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
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');
    });