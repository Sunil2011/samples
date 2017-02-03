/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['./../module'], function (module) {

    module.registerController('productAddEditController',
    [ '$scope', '$state', 'productDataService', '$stateParams','CONFIG', 'brandDataService','categoryDataService',
        function ( $scope, $state, productDataService, $stateParams , CONFIG, brandDataService,categoryDataService ) {
            var vm = this;
             vm.ImagePath = CONFIG.ImageBasePath ;
            
            vm.product = {};
            vm.product.id = $stateParams.product_id || '';

            if(vm.product.id) {
                productDataService.getProductDetails(vm.product.id)
                .then(function (response) {
                    if (response.success) {
                        vm.product = response.product;
                    } else {
                        alert(response.message);
                    }
                });
            }

            vm.cancel = function () {
                $state.go('app.admin');
            };

            // valid argumnet is for form validation 
            vm.submitProduct = function (valid ) {
                        
               if(valid == false ){
                    console.log('product-name can not be empty ');
                  // $state.reload() ;
                    return ;
                }
                        
                var data = { 
                    'id': vm.product.id ,
                    'name': vm.product.name,
                    'brand' : vm.product.brand ,
                    'category' : vm.product.category ,
                }
                
                if($scope.file != undefined) {
                    data.file = $scope.file;
                }
                console.log('product-submit :-',data);
                
                productDataService.addEditProduct(data)
                .then(function (response) {
                    if (response.success) {
                        
                        $state.go('app.admin');
                    } else {
                        alert(response.message);
                    }
                });
            };
            
            // getting category list on scope for drop-down 
            categoryDataService.getCategoryList()
                    .then(function(response){
                        if(response.success){
                            vm.categories = response.categories ;
                        }else{
                            console.log('failed to load category list');
                        }
            });
            
            // getting brand list on scope for drop-down
            brandDataService.getBrandList()
                    .then(function(response){
                        if(response.success){
                            vm.brands = response.brands ;
                        }else{
                            console.log('failed to load brand list');
                        }
            });
            
        }]);
});


    




    