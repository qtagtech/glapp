/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['nui.ionic', 'nui.ionic.box2d','timer','ionMdInput'])

    .controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }

        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////

        $scope.hideNavBar = function() {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        $scope.showNavBar = function() {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };
        $scope.hideRainbow = function() {
            document.getElementsByClassName('rainbow')[0].style.display = 'none';
        };

        $scope.showRainbow = function() {
            document.getElementsByClassName('rainbow')[0].style.display = 'block';
        };

        $scope.noHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        $scope.setExpanded = function(bool) {
            $scope.isExpanded = bool;
        };

        $scope.setHeaderFab = function(location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            $scope.hasHeaderFabLeft = hasHeaderFabLeft;
            $scope.hasHeaderFabRight = hasHeaderFabRight;
        };

        $scope.hasHeader = function() {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        $scope.hideHeader = function() {
            $scope.hideNavBar();
            $scope.noHeader();
        };

        $scope.showHeader = function() {
            $scope.showNavBar();
            $scope.hasHeader();
        };

        $scope.clearFabs = function() {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };

        $scope.loading = function() {
            $ionicLoading.show({
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            });
        }

        $timeout(function(){
            ionicMaterialMotion.blinds({
                selector: '.animate-blinds .rainbow'
            });
        },200);

    })

    .controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
    })

    .controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setHeaderFab('left');

        // Delay expansion
        $timeout(function() {
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
        }, 300);

        // Set Motion
        ionicMaterialMotion.fadeSlideInRight();

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false)

        // Set Motion
        $timeout(function() {//
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);



        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    })

    .controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab('left');

        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.animate-pan-in-left .item'
            });
        }, 700);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();
    })

    .controller('GalleryCtrl', function($scope, $stateParams, $timeout, $ionicModal, ionicMaterialInk, ionicMaterialMotion) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);
        $scope.product = {
            name: "Prueba 1",
            price: "15900"
        }
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
            $timeout(function () {
                document.getElementById('fab-activity').classList.toggle('on');
            }, 200);
        };
        $scope.closeModal = function() {
            $timeout(function () {
                document.getElementById('fab-activity').classList.toggle('on');
            }, 200);
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

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });

    })

    .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate,$ionicPopup, $timeout, $window ,ionicMaterialInk, ionicMaterialMotion) {

        $timeout(function(){
            var wHeight = $window.innerHeight;
            var wWidth = $window.innerWidth;
            var ratio = wWidth / (wHeight - 44);
            var page1 = document.getElementById('page1');
            page1.style.width = wWidth+'px';
            page1.style.height = ((page1.width / ratio))+'px';
            var page2 = document.getElementById('page2');
            page2.style.width = wWidth+'px';
            page2.style.height = ((page2.width / ratio))+'px';
            var page3 = document.getElementById('page3');
            page3.style.width = wWidth+'px';
            page3.style.height = ((page3.width / ratio))+'px';
            var page4 = document.getElementById('page4');
            page4.style.width = wWidth+'px';
            page4.style.height = ((page4.width / ratio))+'px';
            var page5 = document.getElementById('page5');
            page5.style.width = wWidth+'px';
            page5.style.height = ((page5.width / ratio))+'px';
        },100);




        // Called to navigate to the main app
        $scope.startApp = function() {

            var confirmPopup = $ionicPopup.confirm({
                title: '&iquest;Deseas personalizar tu experiencia?',
                template: 'Cu&eacute;ntanos qu&eacute; te enamora y as&iacute; podremos darte mejores recomendaciones.',
                buttons: [
                    { text: '<i class="icon ion-close "></i>',
                        onTap: function(e){

                            $state.go('app.gallery');
                        }
                    },
                    {
                        text: '<i class="icon ion-ios-heart"></i>',
                        type: 'button-positive',
                        onTap: function(e) {
                            $state.go('physics');
                        }
                    }

                ]
            });


            //
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
        ionicMaterialInk.displayEffect();
        $timeout(function() {
            ionicMaterialMotion.panInLeft({
                selector: '.animate-pan-in-left'
            });
        }, 500);
        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-pan-in-left'
            });
        }, 200);
        // Activate ink for controller

    })

//PHYSICS CONTROLLERS
// Demos
    .controller('physicsController', function($scope, nuiWorld, $timeout, $ionicPopup) {
        Element.prototype.remove = function() {
            this.parentElement.removeChild(this);
        }
        NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
            for(var i = this.length - 1; i >= 0; i--) {
                if(this[i] && this[i].parentElement) {
                    this[i].parentElement.removeChild(this[i]);
                }
            }
        }

        document.addEventListener("mousedown", function(event){
            event.preventDefault();
            return false;
        });

        document.onmousedown=disableclick;
        status="Right Click Disabled";
        function disableclick(event)
        {
            if(event.button==2)
            {
                return false;
            }
        }

        // Clean up. This proto version of nui-box2d needs a hack to reset the world:
        var timerElement = document.getElementsByTagName('timer')[0];
        $scope.timerRunning = false;
        nuiWorld.reset();

        $scope.blocks = [];
        $scope.removeBlock = null;
        $scope.selectedBar = '';

        // just feeding in parameters for a regular div:
        /* for(var i=1; i < 10; i++){
         $scope.blocks.push({"shape": "box", "x": i * 10 + '%', "y": '20%', "width": "45px", "height": "45px"})
         }*/
        for(var i=1; i <10; i++){
            $scope.blocks.push({id: i,"shape": "circle", "x": i * 15 + '%', "y": '10%', "width": "130px", "height": "130px",state: 'normal',color: get_random_color(),showing: true})
        }

        $scope.makeStyle = function(block){
            var br = (block.shape == "circle") ? block.width : 0;
            return({
                "width": block.width,
                "height": block.height,
                "border-radius": br
            });
        }

        $scope.growMeShrinkMe = function(block){
            //console.log('from -->' + block.state);

            if(block.state === 'normal'){
                block.state = 'selected';
            }else{
                if(block.state === 'selected'){
                    block.state = 'double';
                }else{
                    block.state = 'normal';
                }
            }
            //console.log('to -->' + block.state);

            //block.shape = block.shape == 'circle' ? 'square' : 'circle';

        }

        $scope.itemOnLong = function(block) {
            $scope.removeBlock = block;
            //console.log("start long");
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            /*console.log(block);
             console.log('Long press');*/
        }

        $scope.itemOnEnd = function(block) {
            $scope.timerRunning = false;
            $scope.removeBlock = null;
            //console.log("end long");
            $scope.$broadcast('timer-stop');
            //console.log('Touch end');
        }

        $scope.startTimer = function (){
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };

        $scope.stopTimer = function (){
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        };

        $scope.$on('timer-tick', function (event, args) {
            //console.log( $scope.timerType  + ' - event.name = '+ event.name + ', timeoutId = ' + args.timeoutId + ', millis = ' + args.millis +'\n');
        });
        $scope.$on('timer-stopped', function (event, data){
            $scope.timerRunning = false;
            //console.log('Timer Stopped at: ', data.millis);
            if(data.millis == 0){
                //delete object
                $scope.destroyMe($scope.removeBlock);
                /*var index = $scope.blocks.indexOf($scope.removeBlock);
                 $scope.blocks.splice(index, 1);*/
                //console.log('fin');

            }
            else{
                //restart timer
                var dif = (4000 - data.millis) / 1000;
                timerElement.addCDSeconds(dif + 1);
            }
        });

        // how to destroy an object properly:
        // The directive saves a reference to the physics engine world body under the DOM element (look for 'body').
        // FYI - likewise, it saves the ref the other way if you need it (check the source code) under body - fixture - userData.
        $scope.destroyMe = function(block){
            // Destroy the physics engine body. Fetch the click target from the mouse event target.
            var theDOMElement = document.getElementById(block.id);
            var thePhysicsWorldBody = theDOMElement.body;
            nuiWorld.world.DestroyBody( thePhysicsWorldBody );
            // Destroy the corresponding DOM element. In Angular world, we'll remove the Array item that creates the DOM element via ng-repeat in this demo. Angular will take care of removing the DOM element because of data-binding.
            var pos = $scope.blocks.indexOf(block);
            $scope.blocks.splice(pos,1);
            $scope.removeBlock = null;
        }
        $scope.showAlert = function() {
            var confirmPopup = $ionicPopup.alert({
                title: 'Ayuda',
                subtitle: 'En esta ventana puedes escoger qu&eacute; te enamora.',
                template: '<p>Cada c&iacute;rculo representa un producto o un servicio que ofrecemos. <br />Para indicar que alguno te gusta, presiona el c&iacute;rculo correspondiente una vez. Si te enamora, es decir, te gusta mucho, presi&oacute;nalo de nuevo.<br />Si por el contrario, alguno no te gusta, presi&oacute;nalo y mantenlo as&iacute; hasta que el contador termine y se eliminar&aacute;</p>',
                buttons: [
                    { text: '!Entendido!',
                        type: 'button-positive',
                        onTap: function(e){


                        }
                    }
                ]
            });
        };


        /*$scope.showHelp = function(){
         var confirmPopup = $ionicPopup.alert({
         title: 'Ayuda',
         subtitle: 'En esta ventana puedes escoger qu&eacute; te enamora.',
         template: '<p>Cada &iacute;rculo representa un producto o un servicio que ofrecemos. <br />Para indicar que alguno te gusta, presiona el c&iacute;rculo correspondiente una vez. Si te enamora, es decir, te gusta mucho, presi&oacute;nalo de nuevo.<br />Si por el contrario, alguno no te gusta, presi&oacute;nalo y mantenlo as&iacute; hasta que el contador termine y se eliminar&aacute;</p>',
         buttons: [
         { text: '!Listo!',
         onTap: function(e){


         }
         }
         ]
         });
         };*/


        function rand(min, max) {
            return parseInt(Math.random() * (max-min+1), 10) + min;
        }

        function get_random_color() {
            var h = rand(180, 250);
            var s = rand(30, 100);
            var l = rand(20, 70);
            return 'hsl(' + h + ',' + s + '%,' + l + '%)';
        }

    })
    .controller('ListController', function($scope, nuiWorld) {
        // Clean up. This proto version of nui-box2d needs a hack to reset the world:
        nuiWorld.reset();
        $scope.blocks = [];
        for(var i=0; i < 5; i++){
            $scope.blocks.push({"x": i})
        }

    });


;
