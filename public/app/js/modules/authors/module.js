define(['angular',
    'angular-couch-potato',
    'angular-bootstrap',
    'angular-ui-router'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.authors', ['ui.router', 'ui.bootstrap']);

    couchPotato.configureApp(module);

    module.config(['$stateProvider', '$couchPotatoProvider', '$urlRouterProvider', function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {
            $stateProvider
                    .state('app.authors', {
                        // Authors state. This state will contain multiple views
                        url: '/authors',
                       
                        views: {
                            // Main template. It will be placed in the ui-view of the index.html file when /authors url is visited (relatively named)
                            '': {templateUrl: './js/modules/authors/page-authors.html'},
                            // popular child view. Absolutely named. It will be injected in the popular ui-view of authors state
                            'popular@app.authors': {
                                templateUrl: './js/modules/authors/view-popular-authors.html',
                                controller: ['$scope', function ($scope) {
                                        $scope.authors = [
                                            {name: 'John', surname: 'Benneth'},
                                            {name: 'Anthony', surname: 'Horner'},
                                            {name: 'James', surname: 'Blanch'},
                                            {name: 'Harrison', surname: 'Williams'}
                                        ];
                                    }]
                            },
                            // recent child view. Absolutely named. It will be injected in the recent ui-view of authors state
                            'recent@app.authors': {template: 'No recent authors since last month'}
                        }
                        
                        
                    });


        }]);
    
     module.run(function ($couchPotato) {
     module.lazy = $couchPotato;
     });
     
    //console.log("layout", module);
    return module;
});






