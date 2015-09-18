angular.module('starter.filters',[])
    .filter('startAt', function() {
    return function(arr, start) {
        return (arr || []).slice(start, arr.length);
    };
});