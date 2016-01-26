var http = require('http');
var fs = require('fs');
var config = require('../config');
var registration = require ('../public/js/myscript.js');
var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require ('body-parser');
var handlebars = require('express-handlebars');
var htmltags = require('../helper/htmltags.js'); //contain some htmltags with text that are included in the pages
var sess; //session; is set when user successfully logged in and is set to NULL if user loggs out
var user; //username; is set when user successfully logged in and is set to NULL if user loggs out
var routes = require('./routes.js');

startup = function(){
	console.log("Starting server ...")

	app.use(express.static('public'));

	app.use(bodyParser());
	app.use(session({secret: 'keyboard cat'}));

	//handlebars for using templates
	app.engine('.hbs', handlebars({extname: '.hbs'}));
	app.set('view engine', '.hbs');


//________________________________________________________
//
// Index page
//________________________________________________________

	app.get('/home', function(req, res){
		if (req.session.id === sess){
			routes.index(req, res, user);
		} else {
			routes.notloggedin(req, res);
		}
	});


//________________________________________________________
//
// User Registration
//________________________________________________________


	//Go to registration page
	app.get('/register', function(req, res){
		if (req.session.id !== sess){
			routes.registration(req, res);
		} else {
			res.redirect('/');
		}
	});


	//Submit of registration form
	app.post('/register', function(req, res){
		if (req.session.id !== sess){
			routes.register(req, res);
		} else {
			res.redirect('/');
		}
	});


//________________________________________________________
//
// User Login
//________________________________________________________


	app.post('/login', function(req, res){
		routes.login(req.body.username, req.body.password, function(result, err){
			if (result){
				sess = req.session.id; //stores session if user is logged in
				user = req.body.username; //stores username if user is logged in
				res.redirect('/');
			} else {
				res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					headline:"Error: " + err,
				})
			}
		});
	});


//________________________________________________________
//
// Products
//________________________________________________________


	//Get products via post request
	app.post('/products', function(req, res){
		if (req.session.id === sess){
			var category = req.body.category;
			if(!category){
				category = "all";
			}
			routes.products(req, res, category, user);
		} else {
			routes.notloggedin(req, res);
		}
	});

	//Get products via get request
	app.get('/products', function(req, res){
		if (req.session.id === sess){
			var category = req.query.category;
			if(!category){
				category = "all";
			}
			routes.products(req, res, category, user);
		} else {
			routes.notloggedin(req, res);
		}
	});



//________________________________________________________
//
// User Logout
//________________________________________________________


	//User logout
	app.post('/logout', function(req, res){
		console.log("[INFO] User logged out.");
		sess = null;
		user = null;
		res.redirect("/");
	});



//________________________________________________________
//
// Email confirmation
//________________________________________________________

	app.get('/confirm-e-mail', function(req, res){
		routes.confirmEmail(req, res);
	})


//________________________________________________________
//
// Profile page
//________________________________________________________


	app.post('/profile', function(req, res){
		if (user){
			routes.profile(req, res, user);
		} else {
			routes.notloggedin(req, res);
		}
	});

	app.get('/profile', function(req, res){
		if (user){
			routes.profile(req, res, user);
		} else {
			routes.notloggedin(req, res);
		}
	});


//________________________________________________________
//
// Change Account
//________________________________________________________


	//change username
	app.post('/changeUsername', function(req, res){
		routes.changeUsername(req, res, user, function(result){
			user = result;
		});
	});

	//change password
	app.post('/changePassword', function(req, res){
		routes.changePassword(req, res, user);
	});


	//change email address
	app.post('/changeEmail', function(req, res){
		routes.changeEmail(req, res, user, function(result){
			if (result){
				user = null;
				sess = null;
			}
		});
	});


//________________________________________________________
//
// Delete Account
//________________________________________________________


	//Delete user
	app.post('/deleteUser', function(req, res){
		routes.deleteUser(req, res, function(deleted){
			if(deleted){
				user = null;
				sess = null;
				routes.notloggedin(req, res);
			}
		});
	});


//________________________________________________________
//
// Shopping owl
//________________________________________________________


	app.get('/shoppingowl', function(req, res){
		routes.getShoppingOwl(req, res, user);
	});



//________________________________________________________
//
// Errorhandling
//________________________________________________________


	//404-Error-Page
	app.use(function(req, res, next){
		res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					headline: "404 - Sorry, this page doesn't exist. :(",
			})
	});

	//Error-Handler
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).send('Suddenly a wild error appears');
	});





	var server = app.listen(config.port, function () {
		var host = config.host;
		var port = config.port;

		console.log('Broomtastic is listening on http://%s:%s', host, port);
	});


}


module.exports.startup = startup
module.exports.author = "Anja Bergmann & Johanna Kirchmaier"