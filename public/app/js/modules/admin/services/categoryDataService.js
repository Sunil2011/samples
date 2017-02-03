define(['./../module'], function (module) {
    
    "use strict";
    
    module.registerFactory('categoryDataService' , ['$http', '$q', '$log', 'CONFIG',
        function($http, $q, $log, CONFIG){
            return {
                getCategoryList : getCategoryList ,
                getCategoryDetails : getCategoryDetails , 
                addEditCategory : addEditCategory ,
                deleteCategory :  deleteCategory 
            };
            
            function getCategoryList() {
               
                return $http.get(CONFIG.ApiBaseUrl + '/api/category',
                {params: {} })
                .then(function successCallback(response) {
                    // console.log(response.data);
                    var data = response.data;
                    return data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
            
            
            function getCategoryDetails(categoryId) {
                if (categoryId) {
                    return $http.get(CONFIG.ApiBaseUrl + '/api/category/' + categoryId,
                            {params: {}})
                            .then(function successCallback(response) {
                                var data = response.data;
                                return data;
                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                }else{
                    alert('categoryId is null') ;
                }

            }
            
            function addEditCategory(params) {
                return $http({
                    url: CONFIG.ApiBaseUrl + '/api/category',
                    method: 'POST',
                    data: params,
                    headers: {'Content-Type': undefined},
                    transformRequest: function (params, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(params, function (value, key) {
                            formData.append(key, value);
                        });
                        
                        var headers = headersGetter();
                        delete headers['Content-Type'];

                        return formData;
                    },
                }).then(function successCallback(response) {
                    var data = response.data;
                    return data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
           
            
            function deleteCategory(params) {
                return $http({
                    url :CONFIG.ApiBaseUrl + '/api/category/delete' ,
                    method : 'POST' ,
                    data : $.param(params),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function successCallback(response) {
                    var data = response.data;
                    return data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
            
            
        }]);
});





