// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
    'starter.controllers',
    'starter.directives',
    'starter.animations',
    'starter.filters',
    'starter.services',
    'user.controllers',
    'user.services',
    'ionic-material',
    'ionMdInput',
    'ngOpenFB',
    'angular-wurfl-image-tailor',
    'ionic.contrib.ui.tinderCards'
    ])

/**
 * see documentation: https://www.parse.com/apps/quickstart#parse_data/web/existing
 *
 * SET THESE VALUES IF YOU WANT TO USE PARSE, COMMENT THEM OUT TO USE THE DEFAULT
 * SERVICE
 *
 * parse constants
 */
    .value('ParseConfiguration', {
        applicationId: "zrlNcIjMRDe1Wbv6W0e5RWyN6hnj8hQZiO2yGvQX",
        javascriptKey: "DG05UJqgfubV6Dp8Fw4nkmHwQsl2lhIQl2i63nIv"
    })

/**
 *
 */

.factory('StateData', function () {

    var data = {
        state: 'open.gallery'
    };

    return {
        getState: function () {
            return data.state;
        },
        setState: function (_state) {
            data.state = _state;
        }
    };
})


    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);

        /*
         // Turn off back button text
         $ionicConfigProvider.backButton.previousTitleText(false);
         */


        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/open.html',
                controller: 'AppCtrl',
                resolve: {
                    user: function (UserService) {
                        var value = UserService.init();
                        return value;
                    }
                }
            })
            .state('open', {
                url: '/open',
                abstract: true,
                templateUrl: 'templates/open.html',
                controller: 'AppCtrl',
                /*resolve: {
                    user: function (UserService) {
                        var value = UserService.init();
                        return value;
                    }
                }*/
            })


            .state('intro', {
                url: '/',
                templateUrl: 'templates/intro.html',
                controller: 'IntroCtrl'
            })

            .state('physics', {
                url: '/physics',
                templateUrl: 'templates/physics.html',
                controller: 'physicsController'
            })
            .state('open.signup', {
                url: "/signup",
                views: {
                    'menuContent': {
                        templateUrl: 'templates/user/signup.html',
                        controller: 'SignUpController'
                    },
                    'fabContent': {
                    }
                }

            })

            // login state that is needed to log the user in after logout
            // or if there is no user object available
            //has no leftMenu
            /*.state('app.login', {
             url: "/login",
             /!*views: {
             'menuContent' :{
             templateUrl: "templates/user/login.html",
             controller: "LoginController"
             }
             }*!/
             templateUrl: 'templates/user/login.html',
             controller: "LoginController"
             })
             // forgot password state
             //has no leftMenu
             .state('app.forgot', {
             url: "/forgot",
             /!*views: {
             'menuContent' :{
             templateUrl: "templates/user/forgot.html",
             controller: "ForgotController"
             }
             }*!/
             templateUrl: 'templates/user/forgot.html',
             controller: "ForgotController"
             })*/

            .state('app.activity', {
                url: '/activity',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/activity.html',
                        controller: 'ActivityCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-activity').classList.toggle('on');
                            }, 200);
                        }
                    }
                }
            })

            .state('app.friends', {
                url: '/friends',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/friends.html',
                        controller: 'FriendsCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-friends').classList.toggle('on');
                            }, 900);
                        }
                    }
                }
            })

            .state('open.gallery', {
                url: '/gallery',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/gallery.html',
                        controller: 'GalleryCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-balanced-900 drop"><i class="icon ion-android-cart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-gallery').classList.toggle('on');
                            }, 600);
                        }
                    }
                }
            })
            .state('open.categories', {
                url: '/categories',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/categories.html',
                        controller: 'CategoriesCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-balanced-900 drop"><i class="icon ion-android-cart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-gallery').classList.toggle('on');
                            }, 600);
                        }
                    }
                }
            })
          .state('open.category', {
                url: '/category',
                params: {
                  category: {},
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/catego.html',
                        controller: 'CategoryCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-balanced-900 drop"><i class="icon ion-android-cart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-gallery').classList.toggle('on');
                            }, 600);
                        }
                    }
                }
            })

            /*.state('app.login', {
             url: '/login',
             views: {
             'menuContent': {
             templateUrl: 'templates/login.html',
             controller: 'LoginCtrl'
             },
             'fabContent': {
             template: ''
             }
             }
             })*/

            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-android-cart"></i></button>',
                        controller: function ($timeout) {
                            /*$timeout(function () {
                             document.getElementById('fab-profile').classList.toggle('on');
                             }, 800);*/
                        }
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($ionicPlatform, $rootScope, $state,ngFB,StateData) {
        ngFB.init({appId: '1493682747614788'});



        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                if(error != 'undefined' && null != error && null !== error){ //it means it is accessing a protected page, otherwise it's unproteceted and error would not exist
                    //every time it loads a state, that depends on app, it checks for the variable error and depending on that acts
                    var errorMsg = error && (error.debug || error.message || error);
                    console.log('$stateChangeError ' + errorMsg);

                    // if the error is "noUser" the go to login state
                    if (error && error.error === "noUser") {
                        StateData.setState(toState.name);
                        $state.go('open.signup',{});
                    }
                }



            });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });
