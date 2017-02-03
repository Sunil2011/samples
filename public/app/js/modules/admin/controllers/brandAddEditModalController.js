define(['./../module'], function (module) {

    module.registerController('brandAddEditModalController', ['CONFIG', '$uibModalInstance', '$scope', '$state', 'brandId', 'brandDataService',
        function (CONFIG, $uibModalInstance, $scope, $state, brandId, brandDataService) {
            var vm = this;
            vm.ImagePath = CONFIG.ImageBasePath ;
            
            
            vm.brand = {} ;
            
            vm.brand.id = brandId || '';
            
            
            if(vm.brand.id){
              
                brandDataService.getBrandDetails(vm.brand.id)
                    .then(function(response){
                        if(response.success){
                             vm.brand = response.brand ;
                        }else{
                            alert(response.message);
                        }   
                });
                
            };

            
            vm.close = function () {
                $uibModalInstance.close();
            };
            
            /*
            vm.cancel = function () {
                console.log(123);
                $state.go("app.category");
            };
            */
            

            vm.submitBrand = function () {

                var data = {
                    'id': vm.brand.id,
                    'name': vm.brand.name 
                    
                };

                if ($scope.file != undefined) {
                    data.file = $scope.file;
                }
                console.log('brand-submit:', data);

                brandDataService.addEditBrand(data)
                    .then(function (response) {

                        if (response.success) {
                           // console.log('wel')
                           $state.reload();
                           vm.close();
                           
                        } else {
                          alert(response.message) ;
                        }
                });
                
            };
            

        }]);
});





