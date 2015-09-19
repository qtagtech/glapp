angular.module('starter.services', [])

    .factory('categories', function($q,$http,ParseConfiguration) {
        var categories = null;
        var parseInitialized = false;

        function LoadData() {
            var defer = $q.defer();
            /*$http.get('http://demo6537529.mockable.io/categories').success(function (data) {
                categories = data;
                defer.resolve();
            });
            return defer.promise;*/
            if (parseInitialized === false) {
                Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
                parseInitialized = true;
                //console.log("parse initialized in init function");
            }
            var Category = Parse.Object.extend("Category");
            var query = new Parse.Query(Category);
            query.find({
                success: function(results) {
                    //alert("Successfully retrieved " + results.length + " scores.");
                    // Do something with the returned Parse.Object values
                    console.log(results);
                    categories = results;
                    defer.resolve();
                },
                error: function(error) {
                    defer.reject({error: error.code + " " + error.message});
                }
            });

            return defer.promise;
        }

        return {
            GetData: function () { return categories ; },
            LoadData:LoadData
        }
    });


