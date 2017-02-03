/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['./../module'], function (module) {

    module.registerController('categoryController', ['$scope', '$state', '$stateParams', 'categoryDataService', 'CONFIG', '$uibModal',
        function ($scope, $state, $stateParams, categoryDataService, CONFIG, $uibModal) {

            var vm = this;
            vm.ImagePath = CONFIG.ImageBasePath;

            categoryDataService.getCategoryList()
                    .then(function (response) {
                       // console.log(response.success);

                        if (response.success) {
                            console.log('categories:',response.categories);
                            vm.categories = response.categories;

                        } else {
                            console.log('success:false');
                        }
                    });
            /*
             $scope.addEditCategory = function(categoryId){
             var category_id = categoryId || ''; // if categoryId  !== 0 then product_id = productId else empty 
             alert(category_id) ;
             // $state.go('app.categoryAddEdit', {category_id : category_id});  
             };
             */

            $scope.addEditCategory = function (category_id ) {
                    
                    var category_Id = category_id || 0 ;
                    //console.log(category_Id);
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: './js/modules/admin/views/category-add-edit-modal.html',
                        controller: 'categoryAddEditModalController',
                        controllerAs: 'categoryAddEdit',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            categoryId: function () {
                                return category_Id;
                            }
                        }
                    });
                   
                    modalInstance.result.finally(function () {
                        $state.reload();
                    });
                   

            };
            
            
            $scope.deleteCategory = function () {
                var category_id = vm.id || '';
                if (!category_id) {
                    alert('Please select the category !');
                    return;
                }

                var r = confirm("Are you sure, want to delete ?");
                if (r === true) {
                    categoryDataService.deleteCategory({id: category_id})
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





