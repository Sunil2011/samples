

'use strict';

define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  
  'angular-bootstrap',
  
  'jquery.ui.widget'
  
], function (angular, couchPotato) {

  console.log("app js loaded");
  var app = angular.module('app', [
    
    'scs.couch-potato',
    
    'ui.router',
    'ui.bootstrap',
    'app.constants',
    
    //modules name 
    'app.authors',
    'app.posts',
    'app.admin',
    'app.layout'
    
    
  ]);
  
  
  app.controller("BaseController", ['$filter', '$rootScope', '$scope', '$state', '$timeout', 'CONFIG',
    function ($filter, $rootScope, $scope, $state, $timeout, CONFIG) {
        var vm = this;
        $scope.headerView = "./js/modules/layout/views/header.html";
        $scope.sidebarView = "./js/modules/layout/views/sidebar.html";
        
        $scope.imageBasePath = CONFIG.ImageBasePath;
        $scope.focusedForm = true;
        $scope.layoutLoading = false;
        $scope.sidebarCollapsed = false;

     // layout methods
        $scope.refresh = function () {
            console.log('refresh') ; 
            $state.reload();
            
        };
        
        /*
        $scope.toggleLeftBar = function () {
            console.log('toggle') ;
          $scope.sidebarCollapsed = !$scope.sidebarCollapsed;
        };
        */
    }]);
  
  
  return app;
}) ;


