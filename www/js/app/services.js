angular.module('starter.services', [])

    .factory('categories', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var categories = [{
            id: 0,
            name: 'Accesorios',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        }, {
            id: 0,
            name: 'Cabello',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },{
            id: 0,
            name: 'Cremas y Jabones',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },{
            id: 0,
            name: 'Cuidado Facial',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },{
            id: 0,
            name: 'Entretenimiento',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },];

        return {
            all: function() {
                return categories;
            },
            remove: function(category) {
                categories.splice(categories.indexOf(category), 1);
            },
            get: function(categoryId) {
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].id === parseInt(categoryId)) {
                        return categories[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('vcategories', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var categories = [{
            id: 0,
            name: 'Accesorios',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        }, {
            id: 0,
            name: 'Cabello',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },{
            id: 0,
            name: 'Cremas y Jabones',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },{
            id: 0,
            name: 'Cuidado Facial',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },{
            id: 0,
            name: 'Entretenimiento',
            description: 'You on your way?',
            image:{
                id: 0,
                title: 'Imagen Accesorios',
                url: 'url'
            },
            parent: {}
        },];

        return {
            all: function() {
                return categories;
            },
            remove: function(category) {
                categories.splice(categories.indexOf(category), 1);
            },
            get: function(categoryId) {
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].id === parseInt(categoryId)) {
                        return categories[i];
                    }
                }
                return null;
            }
        };
    });
