(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', 'API_URL'];

    function AuthenticationService($http, $cookies, $rootScope, API_URL) {
        let service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(email, password, callback) {
            return $http.post(API_URL + '/api/admin/login', {
                email: email,
                password: password
            }).then(function (response) {
                response = {success: true, message: response.data};
                callback(response);
            }, function (response) {
                response = {success: false, message: response.data};
                callback(response);
            });
        }

        function SetCredentials(email, token) {

            let authdata = token;
            $rootScope.globals = {
                currentUser: {
                    email: email,
                    authdata: authdata
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            let cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 1);
            $cookies.putObject('globals', $rootScope.globals, {expires: cookieExp});
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

})();
