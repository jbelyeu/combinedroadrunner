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
		return $http.post('/signup/', userData).success(function(data)
		{
			if (data == "")
			{
				//it failed to save
			}
		});
	};

	login.validate = function(userData, callbackFun)
	{
		console.log("in validate factory");
		console.log(userData);
		$http.post('/validate/', userData).success(function(data)
		{
			var errMsg = "\"Validation Failed: User invalid\"";

			//it failed to validate
			if (data == errMsg)
			{
				alert("Failed to sign in. Double check your username and password");
			}
		});		
	
	};
	return login;

}])

.factory('mainFactory', ['$http', function($http)
{
	var route = {
		routes: [],
		data_stuff: 'asdf'
	};

	route.save = function(routeObj)
	{
		console.log("trying to send post");
		return $http.post('/saveRoute', routeObj).success(function(data)
		{});
	}

	route.loadRoutes = function(userData, callbackFun)
	{
		console.log("trying to call GET");

		var url = '/getRoutes/' + userData.username + '/' + userData.password;
		$http.get(url).success(function(data)
		{
			callbackFun(data);
		});
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
		$scope.validateUser = function()
		{
			console.log("entering validate function");
			console.log($scope);
			if (typeof $scope.username === 'undefined' ||
				typeof $scope.password === 'undefined')
			{
				return;
			}
			var user = {
				username: $scope.username,
				password: $scope.password
			}

			console.log(user);
			loginFactory.validate(user, function()
			{
				console.log("loserer");
				alert("Loser");
			});
		};
		
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
	/*	$scope.saveRoute = function(data)
		{
			console.log(data);
			if (data.latitude == undefined ||
				data.longitude == undefined ||
				data.routename == undefined ||
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
//			loginFactory.save(newRoute);i
			
			var userData = {
				username: data.username,
				password: data.password
			};

			loginFactory.loadRoutes(userData, function(data)
			{
				console.log("in ctrl, routes found: " );
				$scope.routes = data;
				console.log($scope.routes);
			});

		
		//need to enforce uniqueness for username
		//	loginFactory.signup(newUser);
		};
	}*/

		$scope.saveRoute = function ()
		{
			console.log("in saveRoute()");
			console.log($scope.stuff);
		};
	}
]);
