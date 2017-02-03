/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['./../module'], function (module) {
    
  module.registerController('productController', [ '$scope', '$state', '$stateParams', 'productDataService','CONFIG',
        function ( $scope, $state, $stateParams , productDataService , CONFIG) {
            
            var vm = this;
            vm.ImagePath = CONFIG.ImageBasePath ;
            
            productDataService.getProductList()
                .then(function(response) {
                  //  console.log(response.success);
                    
                if(response.success) {
                    
                    console.log("products:",response.products);
                    vm.products = response.products;
                   
                } else {
                    console.log('success:false');
                }
            });
            
            $scope.addEditProduct = function(productId){
                var product_id = productId || ''; // if productId  !== 0 then product_id = productId else empty 
               // console.log(product_id) ;
                $state.go('app.productAddEdit', {product_id : product_id});  
            };
            
            $scope.deleteProduct = function () {
                var product_id = vm.id || '';
                if (!product_id) {
                    alert('Please select the product !');
                    return;
                }
                
                var r = confirm("Are you sure, want to delete ?");
                if (r === true) {
                    productDataService.deleteProduct({id: product_id})
                        .then(function (response) {
                            if (response.success) {
                                    $state.reload();
                            } else {
                                    alert('some error occur while deleting.. ');
                            }
                        });
                }
                

            };

        }]);

});




