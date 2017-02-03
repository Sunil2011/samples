define(['angular',
    'angular-couch-potato',
    'angular-bootstrap',
    'angular-ui-router'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.admin', ['ui.router', 'ui.bootstrap']);

    couchPotato.configureApp(module);

    module.config(['$stateProvider', '$couchPotatoProvider', '$urlRouterProvider', function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.admin', {
                    url: '/products',
                    
                    templateUrl: './js/modules/admin/views/product.html',
                    controller: 'productController',
                    controllerAs:'product',
                    
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            './js/modules/admin/services/productDataService' ,
                             
                            './js/modules/admin/controllers/productController'
                        ])
                    }
                })
               
                .state('app.productAddEdit',{
                    url: '/products/add-edit/{product_id}',
                    templateUrl : './js/modules/admin/views/product-add-edit.html',
                    controller : 'productAddEditController',
                    controllerAs :'prdUpdate' ,
                    params: { 
                    },
                    
                    resolve : {
                        deps : $couchPotatoProvider.resolveDependencies([
                            './js/modules/admin/services/productDataService',
                            './js/modules/layout/directives/fileModel',
                            './js/modules/admin/services/categoryDataService',
                            './js/modules/admin/services/brandDataService',
                            './js/modules/admin/controllers/productAddEditController'
                            
                        ])
                    }
                }) 
               
               
                
                .state('app.category', {
                    url: '/categories',
                    
                    templateUrl: './js/modules/admin/views/category.html',
                    controller: 'categoryController',
                    controllerAs:'category',
                    
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            './js/modules/admin/services/categoryDataService' ,
                            './js/modules/layout/directives/fileModel',
                            './js/modules/admin/controllers/categoryController',
                            './js/modules/admin/controllers/categoryAddEditModalController'
                        ])
                    }
                })
            
                .state('app.brand', {
                    url: '/brands',
                    
                    templateUrl: './js/modules/admin/views/brand.html',
                    controller: 'brandController',
                    controllerAs:'brand',
                    
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            './js/modules/admin/services/brandDataService' ,
                            './js/modules/layout/directives/fileModel',
                            './js/modules/admin/controllers/brandController',
                            './js/modules/admin/controllers/brandAddEditModalController'
                        ])
                    }
                });
            
                
                
        }]);
    
    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    
    //console.log('1234');
    return module;
});




