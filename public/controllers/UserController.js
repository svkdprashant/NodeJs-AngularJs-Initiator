(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

        UserController.$inject = ['$location', 'OperationService', 'FlashService', '$routeParams'];

    function UserController($location, OperationService, FlashService, $routeParams) {
        var vm = this;

        vm.listUsers = listUsers;

        vm.usersList = [];

        // Add/edit form data
        vm.form = {};
        vm.form.name = '';
        vm.form.id = $routeParams.id ? $routeParams.id : 0;

        function listUsers() {
            vm.dataLoading = true;
            OperationService.getData('users',function (response) {
                if (response.success) {
                    vm.usersList = response.message;
                    initializeDataTable();
                } else {
                    FlashService.Error(response.message);
                }

                vm.dataLoading = false;
            });
        };

        function initializeDataTable() {
            angular.element(document).ready( function () {
                $('#dataTable').DataTable();
            });
        }
    }

})();
