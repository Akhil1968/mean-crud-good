var rApp = angular.module('meanRouteApp', ['ngRoute']);

// configure routes
rApp.config(function($routeProvider) {
    $routeProvider
        // route for the login page
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController',
            controllerAs : 'lController'
        })
        // route for the login page
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController',
            controllerAs : 'lController'
        })  
        // route for the logout page
        .when('/logout', {
            templateUrl : 'pages/login.html',
            controller  : 'logoutController',
            controllerAs : 'lController'
        })   
        // route for the registration page
        .when('/register', {
            templateUrl : 'pages/register.html',
            controller  : 'registerController',
            controllerAs : 'rController'
        })        
        // route for the console page
        .when('/console', {
            templateUrl : 'pages/console.html',
            controller  : 'consoleController',
            controllerAs : 'cController'
        })            
	
        // route for the add page
        .when('/addTech', {
            templateUrl : 'pages/add.html',
            controller  : 'addController',
            controllerAs : 'aController'
        })    
        // route for the edit page
        .when('/editTech/:editTech', {
            templateUrl : 'pages/edit.html',
            controller  : 'editController',
            controllerAs : 'eController'
        })
        // route for the delete page
        .when('/deleteTech/:delTech', {
            templateUrl : 'pages/delete.html',
            controller  : 'deleteController',
            controllerAs : 'delController'
        });
});

