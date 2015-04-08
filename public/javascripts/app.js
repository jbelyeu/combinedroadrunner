angular.module('rrWebsiteApp',['ui.router', 'ngResource'])

.factory('loginFactory', ['$http', function($http)
{
	var login = {
	firstname: '',
		lastname: '',
		username: '',
		password: ''
	};

	login.signup = function(userData)
	{
		return $http.post('/signup/', userData)
			.success(function(data)
			{});
	};
	return login;

}])

.factory('mainFactory', ['$http', function($http)
{
	var route = {};

	route.save = function(route)
	{
		return "nothing";
	}
	return route;
}])

.config
([
	'$stateProvider',
	'$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) 
	{
		$stateProvider
		.state('home', 
		{
			url: '/home',
			templateUrl: '/index.ejs',
			controller: 'MainCtrl'
		})
		.state("Login",
		{
			url: '/Login',
			templateUrl: '/login',
			controller: 'LoginCtrl'
		})
		.state("saveRoute",
		{
			url: '/SaveRoute',
			templateUrl: '/saveRoute',
			controller: 'MainCtrl'
		});
		$urlRouterProvider.otherwise('home');
	}
])

.controller('LoginCtrl',
[
	'$scope',
	'$stateParams',
	'loginFactory', 
	function ($scope, $stateParams, loginFactory)
	{
		$scope.addNewUser = function()
		{
			if (typeof $scope.firstname  === 'undefined' || 
				typeof $scope.lastname  === 'undefined' ||
				typeof $scope.username  === 'undefined' ||
				typeof $scope.password  === 'undefined') 
			{
				return;
			}
			var newUser = { 
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                username: $scope.username,
                password: $scope.password
            };
			
			loginFactory.signup(newUser);
		};
	}
])

.controller('MainCtrl', 
[
	'$scope',
	'$stateParams',
	'mainFactory', 
	function ($scope, $stateParams, loginFactory)
	{
		$scope.saveRoute = function(data)
		{
			console.log(data);
			console.log("here");
			console.log($scope.route);
			if ($scope.route == undefined)
			{
				return;
			}
			var newUser = { 
                route: $scope.route
            };
			//need to enforce uniqueness for username
		//	loginFactory.signup(newUser);
		};
	}
]);
