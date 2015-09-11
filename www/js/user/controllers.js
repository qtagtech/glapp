/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', [])
    .controller('LoginController', [
        '$state', '$scope', 'UserService','$ionicLoading','ionMdInput', // <-- controller dependencies
        function ($state, $scope, UserService, $ionicLoading,ionMdInput) {

            debugger;

            // ng-model holding values from view/html
            $scope.creds = {
                username: "",
                password: ""
            };
            $scope.error = {};
            $scope.success = {};

            /**
             *
             */
            $scope.doLogoutAction = function () {
                UserService.logout()
                    .then(function (_response) {
                        // transition to next state
                        $state.go('login');
                    }, function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };

            /**
             *
             */
            $scope.doLoginAction = function () {
                $scope.loading = $ionicLoading.show({
                    content: 'Sending',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                UserService.init();
                UserService.login($scope.creds.username, $scope.creds.password)
                    .then(function (_response) {
                        $ionicLoading.hide();
                        //alert("login success " + _response.attributes.username);
                        $scope.success.message = "Login successful.";

                        // transition to next state
                        $state.go('app.tab.list');

                    }, function (_error) {
                        $ionicLoading.hide();
                        $scope.error.message = "Error: "+_error.message;
                        //alert("error logging in " + _error.message);
                    })
            };
        }])
    .controller('ForgotController', ['$scope', '$state', 'UserService','$ionicLoading',function($scope, $state,UserService, $ionicLoading) {
        $scope.creds = {};
        $scope.error = {};
        $scope.state = {
            success: false
        };

        $scope.doResetAction = function() {
            $scope.loading = $ionicLoading.show({
                content: 'Sending',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            UserService.init();
            UserService.reset($scope.creds.username)
                .then(function (_response) {
                    $ionicLoading.hide();
                    //alert("login success " + _response.attributes.username);
                    $scope.state.success = true;
                    $scope.$apply();

                    // transition to next state
                    //$state.go('tab.list');

                }, function (_error) {
                    $ionicLoading.hide();
                    $scope.state.success = false;
                    $scope.error.message = _error.message;
                    $scope.$apply();
                    //alert("error logging in " + _error.message);
                })
        };
    }])
    .controller('SignUpController', function ($state, $scope, UserService,$ionicLoading,$stateParams, $timeout, $ionicModal, ionicMaterialInk, ionicMaterialMotion) {

        $scope.creds = {};
        $scope.error = {};
        $scope.success = {};

        /**
         *
         */
        $scope.signUpUser = function () {

            /*$scope.loading = $ionicLoading.show({
                content: 'Sending',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });*/
            $scope.loading();
            UserService.init();

            UserService.createUser($scope.creds).then(function (_data) {
                $ionicLoading.hide();
                $scope.user = _data;
                console.log(_data);

                //alert("Success Creating User Account ");
                $scope.success.message = "You are now Signed Up and Logged In.";
                //$state.go('app.tab.list', {});

            }, function (_error) {
                $ionicLoading.hide();
                $scope.error.message = "Error creating User account: "+_error.message;
                //alert("Error Creating User Account " + _error.debug)
            });
        }


        /*$scope.loading();
        $timeout(function(){
            $ionicLoading.hide();
        },5000);*/
        $scope.$parent.clearFabs();
       $timeout(function(){
           $scope.hideRainbow();
       },100);

        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        $timeout(function(){
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .icon-logo'
            });
        },500);
        $timeout(function(){
            ionicMaterialMotion.blinds({
                selector: '.animate-blinds .app-logo'
            });
        },700);
        $timeout(function(){
            ionicMaterialMotion.ripple();
        },1000);
        $timeout(function(){
            var bt = document.getElementsByClassName('facebook-login')[0].style.visibility = 'visible';
        },2500);
        ionicMaterialInk.displayEffect();
    });
