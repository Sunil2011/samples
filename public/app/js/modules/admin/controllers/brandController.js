/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['./../module'], function (module) {

    module.registerController('brandController', ['$scope', '$state', '$stateParams', 'brandDataService', 'CONFIG', '$uibModal',
        function ($scope, $state, $stateParams, brandDataService, CONFIG, $uibModal) {

            var vm = this;
            vm.ImagePath = CONFIG.ImageBasePath;

            brandDataService.getBrandList()
                    .then(function (response) {
                       // console.log(response.success);

                        if (response.success) {

                            console.log('brands:',response.brands);
                            vm.brands = response.brands;

                        } else {
                            console.log('success:false');
                        }
                    });


            $scope.addEditBrand = function (brand_id ) {
                    
                    var brand_Id = brand_id || 0 ;
                    //console.log(brand_Id);
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: './js/modules/admin/views/brand-add-edit-modal.html',
                        controller: 'brandAddEditModalController',
                        controllerAs: 'brandAddEdit',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            brandId: function () {
                                return brand_Id;
                            }
                        }
                    });
                   
                    modalInstance.result.finally(function () {
                        $state.reload();
                    });
                   

            };
            
            
            $scope.deleteBrand = function () {
                var brand_id = vm.id || ''; // getting this value from ng-modal for radio -buttton
                if (!brand_id) {
                    alert('Please select the brand !');
                    return;
                }

                var r = confirm("Are you sure, want to delete ?");
                if (r === true) {
                    brandDataService.deleteBrand({id: brand_id})
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





