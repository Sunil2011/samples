/**
 * Defines constants for application
 */
define(['angular'], function (angular) {
  return angular.module('app.constants', [])
    .constant('CONFIG', {
       
       ImageBasePath: baseUrl + '/uploads',
       ApiBaseUrl : baseUrl 
       
    });
   
});



