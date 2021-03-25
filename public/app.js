(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .directive('includeReplace', function () {
            return {
                require: 'ngInclude',
                restrict: 'A', /* optional */
                link: function (scope, el, attrs) {
                    el.replaceWith(el.children());
                }
            };
        })
        .constant('API_URL', '')
        .config(config)
        .run(run);
    
    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$qProvider'];

    function config($routeProvider, $locationProvider, $httpProvider, $qProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                controllerAs: 'vm',
                className: 'bg-gradient-primary',
                activeTab: ''
            })
            .when('/users', {
                controller: 'UserController',
                templateUrl: 'views/users.html',
                controllerAs: 'vm',
                className: '',
                activeTab: 'users'
            })
            .when('/', {
                templateUrl: 'views/dashboard.html',
                className: '',
                activeTab: 'dashboard'
            })
            .otherwise({redirectTo: '/login'});

        $qProvider.errorOnUnhandledRejections(false);
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();
