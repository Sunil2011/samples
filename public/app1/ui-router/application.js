// File: application.js
var wcgUiRouterApplication = angular.module('wcgUiRouterApplication', ['ui.router']);

wcgUiRouterApplication.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/posts');
    
    $stateProvider
     .state('posts', {
         //  Posts state. This state will contain nested views
         url: '/posts',
         templateUrl: 'page-posts.html'
     })
     .state('posts.list', {
         // Posts list state. This state is child of posts state
         url: '/list',
         templateUrl: 'page-posts-list.html',
         controller: ['$scope', function($scope) {
            $scope.posts = [
               {id: 1, name: "WCG Post 1"},
               {id: 2, name: "WCG Post 2"},
               {id: 3, name: "WCG Post 3"},
               {id: 4, name: "WCG Post 4"},
               {id: 5, name: "WCG Post 5"},
            ]    
         }]
     })
     .state('posts.info', {
         // Posts info state. This state is child of posts state
         url: '/info',
         template: 'Posts information. We are using directly a string template instead of a url linking to a template.'
     })
     .state('authors', {
         // Authors state. This state will contain multiple views
         url: '/authors',
         views: {
            // Main template. It will be placed in the ui-view of the index.html file when /authors url is visited (relatively named)
            '': { templateUrl: 'page-authors.html' },

            // popular child view. Absolutely named. It will be injected in the popular ui-view of authors state
            'popular@authors': {
               templateUrl: 'view-popular-authors.html',
               controller: ['$scope', function($scope) {
                 $scope.authors = [
                    {name: 'John', surname: 'Benneth'},
                    {name: 'Anthony', surname: 'Horner'},
                    {name: 'James', surname: 'Blanch'},
                    {name: 'Harrison', surname: 'Williams'}
                 ];
               }]
            },

            // recent child view. Absolutely named. It will be injected in the recent ui-view of authors state
            'recent@authors': { template: 'No recent authors since last month' }
         }
   });
        
});
