define(['angular',
    'angular-couch-potato',
    'angular-bootstrap',
    'angular-ui-router'], function (ng, couchPotato) {

    "use strict";

   // console.log('posts/module.js');

    var module = ng.module('app.posts', ['ui.router', 'ui.bootstrap']);

    couchPotato.configureApp(module);

    module.config(['$stateProvider', '$couchPotatoProvider', '$urlRouterProvider', function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {



            $stateProvider
                    .state('app.posts', {
                        url: '/posts',
                        templateUrl: './js/modules/posts/page-posts.html'
                        
                    })
                    .state('app.posts.list', {
                        // Posts list state. This state is child of posts state
                        url: '/list',
                        templateUrl: './js/modules/posts/page-posts-list.html',
                        controller: ['$scope', function ($scope) {
                                $scope.posts = [
                                    {id: 1, name: "WCG Post 1"},
                                    {id: 2, name: "WCG Post 2"},
                                    {id: 3, name: "WCG Post 3"},
                                    {id: 4, name: "WCG Post 4"},
                                    {id: 5, name: "WCG Post 5"},
                                ]
                            }]
                    })
                    .state('app.posts.info', {
                        // Posts info state. This state is child of posts state
                        url: '/info',
                        template: 'Posts information. We are using directly a string template instead of a url linking to a template.'
                    });

           // $urlRouterProvider.otherwise('/posts');

        }]);
    
     module.run(function ($couchPotato) {
     module.lazy = $couchPotato;
     });
     
    // console.log("layout", module);
    
    return module;
});



