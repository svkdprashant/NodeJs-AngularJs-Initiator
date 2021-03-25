(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$route'];

    function MainController($scope, $route) {
        $scope.currentDate = new Date();
        $scope.$on('$routeChangeSuccess', function(newVal, oldVal) {
            if (oldVal !== newVal) {
                $scope.routeClassName = $route.current.className;
            }

            $scope.activeTab = $route.current.activeTab;
        })
    }

})();
