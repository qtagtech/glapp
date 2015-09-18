angular.module('starter.animations', ['ngAnimate'])
    .animation('.fade', function() {
        return {
            enter: function(element, done) {
                element.css('display', 'none');
                $(element).fadeIn(1000, function() {
                    done();
                });
            },
            leave: function(element, done) {
                $(element).fadeOut(1000, function() {
                    done();
                });
            },
            move: function(element, done) {
                element.css('display', 'none');
                $(element).slideDown(500, function() {
                    done();
                });
            }
        }
    })
;