/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', ['ngOpenFB'])
    .controller('LoginController', '$state', '$scope', 'UserService','$ionicLoading','ionMdInput', // <-- controller dependencies
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
                $scope.loading();
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
                        $scope.message = "Error: "+_error.message;
                        //alert("error logging in " + _error.message);
                    })
            };
        })
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
                    $scope.message = _error.message;
                    $scope.$apply();
                    //alert("error logging in " + _error.message);
                })
        };
    }])
    .controller('SignUpController', function ($state, $scope, UserService,$ionicLoading,$ionicModal,$stateParams, $timeout, $ionicModal, ionicMaterialInk, ionicMaterialMotion,ngFB,StateData) {
        UserService.currentUser().then(function(){
            $state.go('open.gallery',{},{reload:true});
        });
        $scope.creds = {};
        $scope.error = {};
        $scope.success = {};
        $scope.currentUser  = null;
         $scope.previous_state = StateData.getState();
        $scope.signup = true;
        //console.log($scope.previous_state);

        /**
         *
         */
        $scope.signUpUser = function () {


            $scope.loading();
            UserService.init();
            $scope.message = null;

            UserService.createUser($scope.creds).then(function (_data) {
                $ionicLoading.hide();
                $scope.user = _data;
                console.log(_data);
                $scope.currentUser = _data;

                //alert("Success Creating User Account ");
                $scope.success.message = "You are now Signed Up and Logged In.";
                //$state.go('app.tab.list', {});
                $state.go($scope.previous_state,{},{reload:true});

            }, function (_error) {
                console.log(_error);
                $ionicLoading.hide();
                if(_error.code == 202){
                    $scope.message = 'Error creando cuenta: El usuario que usaste ya existe ';
                }else{
                    $scope.message = "Error creando cuenta: "+_error.message;
                }

                //alert("Error Creating User Account " + _error.debug)
            });
        }

        $scope.fbLogin = function () {
            $scope.loading();
            $scope.fbToken = '';
            ngFB.login({scope: 'email,publish_actions'}).then(
                function (response) {
                    if (response.status === 'connected') {
                        console.log(response);
                        $scope.fbToken = response.authResponse.accessToken;
                        //console.log('Facebook login succeeded');
                        ngFB.api({
                            path: '/me',
                            params: {fields: 'id,name,email,first_name,last_name'}
                        }).then(
                            function (user) {
                                //$scope.user = user;
                                UserService.init();
                                var creds = {};
                                if(!user.first_name || !user.last_name){
                                    creds.first_name = user.name;
                                    creds.last_name = 'NONE'
                                }else{
                                    creds.first_name = user.first_name;
                                    creds.last_name = user.last_name;
                                }
                                creds.email  = user.email;
                                creds.facebookId = user.id
                                creds.accessToken = $scope.fbToken;
                                creds.password =  (Math.random()*1000000000001|0) + "_random"
                                UserService.createUser(creds).then(function (_data) {
                                    console.log("usuario creadop");
                                    UserService.createFacebook(_data,creds);
                                    UserService.saveSecurity(_data,creds).then(function(_response){
                                        console.log("success saving security")
                                    },function(_error){
                                        console.log(_error);
                                    });
                                    $ionicLoading.hide();
                                    $scope.user = _data;
                                    console.log(_data);
                                    //alert("Success Creating User Account ");
                                    $scope.success.message = "You are now Signed Up";

                                    $state.go($scope.previous_state,{},{reload:true});

                                }, function (_error) {
                                    $ionicLoading.hide();
                                    console.log("errrrrorr");
                                    if(_error.code == 202){
                                    //    update user, everything but the password.
                                        console.log("user already exist, checking for currentUser");
                                        UserService.init();
                                        UserService.currentUser().then(function(_user){
                                            $scope.currentUser = _user;
                                            UserService.updateUser(_user,creds);
                                        },function(_error){
                                            if(_error.error == 'noUser'){
                                                //update user using facebook email, retrieving the user and saving
                                                UserService.updateUser(null, creds,true); //user cannot be altered without session error, so create different object

                                                //It can continue without waiting for the update to happen, is two separate processes
                                                //Force Login taking the security object with the user email and id
                                                UserService.findSecurityKey(creds.email).then(function(_results){
                                                    console.log("sec1");
                                                    var key = _results[0];
                                                    UserService.findSecurityValue(key).then(function(_results){
                                                        console.log("sec2");
                                                        var security = _results[0];
                                                        console.log("security results");
                                                        //console.log(security);

                                                        if(security == null || security === null || security === 'undefined'){//if no security that means, the user existed but had no autosaved security object, which means it was made manually
                                                            //Tell the user to manually login
                                                            //console.log("sec3");
                                                            //$scope.$parent.$scope.message = 'Tu cuenta no est&aacute; configurada con facebook.';
                                                            var texto = document.createElement('div');
                                                            texto.className = "assertive custom-assertive";
                                                            texto.innerHTML = 'Tu cuenta no est&aacute; configurada con facebook.<br>Ve a Login.';
                                                            var referenceNode = document.getElementsByClassName('assertive')[0];
                                                            referenceNode.parentNode.insertBefore(texto, referenceNode.nextSibling);

                                                        }else{
                                                            UserService.login(creds.email,security.get("value")).then(function(_response){
                                                                $state.go($scope.previous_state),{},{reload:true};
                                                            },function(_error){
                                                                console.log("Force Login Error");
                                                                console.log(_error);
                                                                var texto = document.createElement('div');
                                                                texto.className = "assertive custom-assertive";
                                                                texto.innerHTML = 'Has configurado tu cuenta para entrar sin facebook.<br>Ve a Login.';
                                                                var referenceNode = document.getElementsByClassName('assertive')[0];
                                                                referenceNode.parentNode.insertBefore(texto, referenceNode.nextSibling);
                                                            });
                                                        }

                                                    },function(_error){
                                                        console.log("couldn't find value for key");
                                                        console.log(_error);
                                                    });

                                                }, function(_error){
                                                    console.log(_error);
                                                });
                                            }
                                            console.log(_error);
                                        });
                                    }else{
                                        $scope.message = "Error creating User account: "+_error.message;
                                    }

                                    //alert("Error Creating User Account " + _error.debug)
                                });
                                console.log(user);
                            },
                            function (error) {
                                alert('Facebook error: ' + error.error_description);
                            });
                        $scope.closeLogin();
                    } else {
                        alert('Facebook login failed');
                    }
                });
        };

        $ionicModal.fromTemplateUrl('templates/user/login_modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        $scope.doLogin = function () {
            $scope.loading();
            UserService.init();
            UserService.login($scope.creds.login.email, $scope.creds.login.password)
                .then(function (_response) {
                    $ionicLoading.hide();
                    //alert("login success " + _response.attributes.username);
                    $scope.success.message = "Login successful.";

                    // transition to next state
                    $state.go($scope.previous_state,{},{reload:true});

                }, function (_error) {
                    $ionicLoading.hide();
                    $scope.message = "Error: "+_error.message;
                    //alert("error logging in " + _error.message);
                })
        };






        //$scope.$parent.clearFabs();
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
