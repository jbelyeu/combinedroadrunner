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

	route.save = function(routeObj)
	{
		console.log("trying to send post");
		return $http.post('/saveRoute', routeObj).success(function(data)
		{});
	}

	route.loadRoutes = function(userData)
	{
		console.log("trying to call GET");
//		var url = 'getRoutes/' + userData.username + '/' + userData.password;

		var url = '/getRoutes/' + userData.username + '/' + userData.password;
		return $http.get(url).success(function(data)
		{});
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
			if (data.latitude == undefined ||
				data.longitude == undefined ||
				data.username == undefined ||
				data.password == undefined ||
				data.route == undefined 
			)
			{
				console.log("failed controller line 107");
				return;
			}
			var newRoute = data;
			newRoute.latitude = data.toString();
			newRoute.longitude = data.toString();
			loginFactory.save(newRoute);

			var userData = {
				username: "a",
				password: 'a'
			};
			
			console.log(loginFactory.loadRoutes(userData));

		
		//need to enforce uniqueness for username
		//	loginFactory.signup(newUser);
		};
	}
]);
