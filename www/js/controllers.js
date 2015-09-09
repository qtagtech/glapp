/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['nui.ionic', 'nui.ionic.box2d'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, ionicMaterialInk, ionicMaterialMotion) {
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
    $scope.$parent.setHeaderFab('right');

        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

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

    .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $timeout, $window ,ionicMaterialInk, ionicMaterialMotion) {

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
            $state.go('app.gallery');
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
    .controller('Box2DController', function($scope, nuiWorld) {
        // Clean up. This proto version of nui-box2d needs a hack to reset the world:
        nuiWorld.reset();

        $scope.blocks = [];
        $scope.selectedBar = '';

        // just feeding in parameters for a regular div:
       /* for(var i=1; i < 10; i++){
            $scope.blocks.push({"shape": "box", "x": i * 10 + '%', "y": '20%', "width": "45px", "height": "45px"})
        }*/
        for(var i=1; i <10; i++){
            $scope.blocks.push({id: i,"shape": "circle", "x": i * 15 + '%', "y": '10%', "width": "130px", "height": "130px",state: 'normal',color: get_random_color()})
        }

        $scope.makeStyle = function(block){
            var br = (block.shape == "circle") ? block.width : 0;
            return({
                "width": block.width,
                "height": block.height,
                "border-radius": br
            });
        }

        $scope.convertToSquare = function(block){
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
            console.log(block);
            console.log('Long press');
        }

        $scope.itemOnEnd = function(block) {
            console.log('Touch end');
        }

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
