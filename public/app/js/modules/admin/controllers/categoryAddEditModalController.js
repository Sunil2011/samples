define(['./../module'], function (module) {

    module.registerController('categoryAddEditModalController', ['CONFIG', '$uibModalInstance', '$scope', '$state', 'categoryId', 'categoryDataService',
        function (CONFIG, $uibModalInstance, $scope, $state, categoryId, categoryDataService) {
            var vm = this;
            vm.ImagePath = CONFIG.ImageBasePath ;
            
            
            vm.category = {} ;
            
            vm.category.id = categoryId || '';
            //alert(vm.category.category_id);
            
            if(vm.category.id){
              
                categoryDataService.getCategoryDetails(vm.category.id)
                    .then(function(response){
                        if(response.success){
                             vm.category = response.category ;
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
            

            vm.submitCategory = function () {

                var data = {
                    'id': vm.category.id,
                    'name': vm.category.name 
                    
                };

                if ($scope.file != undefined) {
                    data.file = $scope.file;
                }
                console.log('category-submit:', data);

                categoryDataService.addEditCategory(data)
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





