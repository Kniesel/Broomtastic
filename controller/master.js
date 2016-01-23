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
var htmltags = require('../helper/htmltags.js'); //contain some htmltags with text that are included in the pages
var sess; //session; is set when user successfully logged in and is set to NULL if user loggs out
var user; //username; is set when user successfully logged in and is set to NULL if user loggs out

startup = function(){
	console.log("Starting server ...")

	app.use(express.static('public'));

	app.use(bodyParser());
	app.use(session({secret: 'keyboard cat'}));

	//handlebars for using templates
	app.engine('.hbs', handlebars({extname: '.hbs'}));
	app.set('view engine', '.hbs');


	//User Registration
	app.post('/register', function(req, res){
		console.log("Cookies: ", req.cookies);
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var email = req.body.email;

		if (password === password2){
			handlerController = new UserController.UserController();
			handlerController.register(username, password, email, function(err){
				if (err){
					console.log("[ERROR] ", err);
					res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					feedback:"",
					headline: "Error: " + err,
					content1: htmltags.registerform
		});
				} else {
					res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					feedback:"",
					headline: "You are registered now.",
					content1: "We sent you a registration email. Please confirm your email address by clicking on the link in the email to log in."
		});
				}
			});
		} else {
			res.send("[INFO] Registration: Your entered passwords don't match.");
		}
	})

	app.get('/register', function(req, res){
		res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					feedback:"",
					headline: "Give us all your information to join us!",
					content1: htmltags.registerform
		});
	});

	//index page
	app.get('/home', function(req, res){
		//if user is logged in
		if (user){
			res.render('index', {
				layout: false, 
				user: user, 
				dropdowncontent:htmltags.loggedintag,
				headline: "Welcome to the Broomtastic Webshop!",
				content1: htmltags.productfilter,
				content2: htmltags.notworking
			});
		} else {
			res.render('index',{
				layout: false,
				user: "Sign in",
				dropdowncontent:htmltags.signintag,
				headline: "Welcome to the Broomtastic Webshop!",
				content1: "<p>Please sign in to see our products.</p>"
			});
		}
	});

	//User Login
	app.post('/login', function(req, res){
		var password = req.body.password;
		var username = req.body.username;

		handlerController = new UserController.UserController();
		handlerController.login(username, password, function(err, loggedin){
			if (loggedin){
				sess = req.session; //stores session if user is logged in
				user = username; //stores username if user is logged in
				console.log("[INFO] Session: ", sess);

				//if user is logged in, username is written on dropdownmenu 
				//and dropdownmenu contains only logout button
				res.render('index', {
					layout: false, 
					user: user, 
					dropdowncontent:htmltags.loggedintag, 
					feedback:"Login successful.",
					headline: "You are logged in as " + user + "."
				});
				
			//if user is not logged in, "Sign in" is written on dropdownmenu
			//and dropdownmenu contains login form and register button
			} else {
				console.log("[DEBUG] Error: ", err);
				res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					feedback:"Error: " + err,
					headline: "Error: " + err
				})
			}
		});


	})

	//checks if user is logged in
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
		handlerController = new UserController.UserController();
		handlerController.confirmEmail(token, username, function(err){
			res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag, 
					feedback:"Error: " + err,
					headline: "Thank you for confirming your email address. You may now log in.",
			})
		});
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
	})


}


module.exports.startup = startup
module.exports.author = "Anja Bergmann & Johanna Kirchmaier"