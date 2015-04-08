var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Route = mongoose.model('Route');

	
/* GET home page. */
router.get('/', function(req, res, next) 
{
	res.render('index', { title: 'Express' });
});


//GET login page
router.get('/Account', function(req, res, next) 
{
	res.render('login', { title: 'Express' });
});

//get all routes for a given username
router.get('/getRoutes/:username/:pass', function(req, res, next) 
{
	console.log("stuff");
	console.log(req.params);
	var pass = req.params.pass;
	var user = req.params.username;

	var mongoClient = require("mongodb").MongoClient;
	mongoClient.connect('mongodb://localhost/roadrunner', function(err, db)
	{
		if (err) {throw err;}
		
		db.collection("users", function (err, users)
		{
			console.log("in call to db" + pass);
			if (err) {throw err;}
			
			users.find({password: pass, username: user}, function (err, items)
			{
				if (err) {throw err;}
				items.toArray(function (err, itemArray)
				{
					if (err) {throw err;}
					if (itemArray.length > 0) //means the user is valid
					{
						Route.find({username: user}, function (err, routes)
						{
							if (err) {throw err;}
							res.json(routes);
						}
					}
					else
					{
						res.json("Get Failed: User invalid");
					}
				});
			});
		});
	});

});

//POST new user info
router.post('/signup', function(req, res, next) 
{
	console.log("in routes POST method");
	console.log(req.body);
	var user = new User(req.body);
	console.log(user);
	user.save(function (err, user)
	{
		if (err)
		{
			return next(err);
		}
		res.json(user);
	});
});

router.post('/saveRoute', function(req, res, next)
{

	console.log("in saveRoute route");
	console.log(req.body);
	var body = req.body;
	var pass = body.password;
	delete body.password;
	var userValid = true;

	var mongoClient = require("mongodb").MongoClient;
	mongoClient.connect('mongodb://localhost/roadrunner', function(err, db)
	{
		if (err)
		{
			throw err;
		}
		
		db.collection("users", function (err, users)
		{
			console.log("in call to db" + pass);
			if (err) {throw err;}
//			var validUser = users.find({password: pass, username: body.username});
			//hacked this for testing
			users.find({password: 'a', username: 'a'}, function (err, items)
			{
				if (err) {throw err;}
				items.toArray(function (err, itemArray)
				{
					if (err) {throw err;}
					if (itemArray.length > 0)
					{
						var route = new Route(req.body);
						console.log('route');
						route.create(function (err, route)
						{
							console.log("in save");
							if (err)
							{
								console.log('err');
								return next(err);
							}
							res.json(route);
						});
					}
					else
					{
						res.json("Save Failed: User invalid");
					}
				});
			});
		});
	});
});

module.exports = router;
