(function () {
    'use strict';

    angular
        .module('app')
        .factory('OperationService', OperationService);

        OperationService.$inject = ['$http', '$cookies', '$rootScope', 'API_URL'];

    function OperationService($http, $cookies, $rootScope, API_URL) {
        let service = {};

        service.getData = getData;
        service.saveData = saveData;
        service.getDetail = getDetail;

        return service;

        function getData(data_for, callback) {
            return $http.get(API_URL + '/api/admin/' + data_for).then(function (response) {
                response = {success: true, message: response.data};
                callback(response);
            }, function (response) {
                response = {success: false, message: response.data};
                callback(response);
            });
        }

        function saveData(data_for, data, callback) {
            return $http.post(API_URL + '/api/admin/' + data_for, data).then(function (response) {
                response = {success: true, message: response.data};
                callback(response);
            }, function (response) {
                response = {success: false, message: response.data};
                callback(response);
            });
        }

        function getDetail(detail_for, id, callback) {
            return $http.get(API_URL + '/api/admin/' + detail_for + '/' + id).then(function (response) {
                response = {success: true, message: response.data};
                callback(response);
            }, function (response) {
                response = {success: false, message: response.data};
                callback(response);
            });
        }
    }

})();
