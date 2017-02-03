define(['./../module'], function (module) {
    
    "use strict";
    
    module.registerFactory('productDataService' , ['$http', '$q', '$log', 'CONFIG',
        function($http, $q, $log, CONFIG){
            return {
                getProductList : getProductList ,
                getProductDetails : getProductDetails , 
                addEditProduct : addEditProduct ,
                deleteProduct :  deleteProduct 
            };
            
            function getProductList() {
               // console.log(CONFIG.ApiBaseUrl);
                return $http.get(CONFIG.ApiBaseUrl + '/api/products',
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
            
            
            function getProductDetails(productId) {
                if (productId) {
                    return $http.get(CONFIG.ApiBaseUrl + '/api/products/getSpecificProduct/' + productId,
                            {params: {}})
                            .then(function successCallback(response) {
                                var data = response.data;
                                return data;
                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                }else{
                    alert('productId is null') ;
                }

            }
            
            function addEditProduct(params) {
                return $http({
                    url: CONFIG.ApiBaseUrl + '/api/products/add',
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
           
            
            function deleteProduct(params) {
                return $http({
                    url :CONFIG.ApiBaseUrl + '/api/products/delete' ,
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





