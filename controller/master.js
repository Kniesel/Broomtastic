var http = require('http');
var fs = require('fs');
var config = require('../config');
var registration = require ('../public/js/myscript.js');
var express = require('express');
var session = require('express-session');
var app = express();
var UserController = require ('./user_contr.js');
var bodyParser = require ('body-parser');
var handlebars = require('express-handlebars');
var htmltags = require('../helper/htmltags.js');
var sess;
var user; //username

startup = function(){
	console.log("Starting server ...")

	app.use(express.static('public'));

	app.use(bodyParser());
	app.use(session({secret: 'keyboard cat'}));

	//handlebars 
	app.engine('.hbs', handlebars({extname: '.hbs'}));
	app.set('view engine', '.hbs');

	// Get-Request
	// app.get('/content', function(req, res){
	// 	if (user){
	// 		res.render('index', {layout: false, user: user, test:htmltags.loggedintag});
	// 	} else {
	// 		res.render('index', {layout: false, user: "Sign in", test:htmltags.signintag});
	// 	}
	// })

	//User Registration
	app.post('/register', function(req, res){
		console.log("Cookies: ", req.cookies);
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var email = req.body.email;

		if (password === password2){
			res.redirect("/");
			handlerController = new UserController.UserController();
			handlerController.register(username, password, email);
		} else {
			res.send("[INFO] Registration: Your entered passwords don't match.");
		}
	})

	app.get('/home', function(req, res){
		res.render('index', {layout: false});
	})

	//User Login
	app.post('/login', function(req, res){
		var password = req.body.password;
		var username = req.body.username;

		//res.redirect("/");
		handlerController = new UserController.UserController();
		handlerController.login(username, password, function(loggedin){
			if (loggedin){
				//create session if user is logged in
				sess = req.session;
				user = username;
				console.log("[INFO] Session: ", sess);

				//if user is logged in, username is written on dropdownmenu 
				//and dropdownmenu contains only logout button
				if (user){
					res.render('index', {layout: false, user: user, test:htmltags.loggedintag});
				//if user is not logged in, "Sign in" is written on dropdownmenu
				//and dropdownmenu contains login form and register button
				} else {
					res.render('index', {layout: false, user: "Sign in", test:htmltags.signintag});
				}
			}
		});


	})

	function loggedIn(req, res, next){
		if (sess){
			return next();
		}
		res.redirect('/');
	}


	//User logout
	app.post('/logout', function(req, res){
		console.log("[INFO] User logged out.");
		sess = null;
		user = null;
		res.redirect("/");
	});

	app.get('/confirm-e-mail', function(req, res){
		var token = req.query.token;
		var username = req.query.user;
		console.log("[INFO] Token: ", token);
		console.log("[INFO] Username: ", username);
		res.redirect('/confirmed.html');
		handlerController = new UserController.UserController();
		handlerController.confirmEmail(token, username);
	})

	app.post('/awesome', function(req, res){
		if (sess){
			res.redirect('/awesome.html');
		} else {
			res.redirect('/notloggedin.html');
		}
	})


	//Delete user
	app.post('/deleteUser', function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		handlerController = new UserController.UserController();
		handlerController.delete(username, password);
		res.redirect('/');
	})

	//404-Error-Page
	app.use(function(req, res, next){
		res.status(404).send('404 - Sorry cannot find page ' + req.url);
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
	})


}


module.exports.startup = startup
module.exports.author = "Anja Bergmann & Johanna Kirchmaier"