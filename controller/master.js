var http = require('http');
var fs = require('fs');
var config = require('../config');
var registration = require ('../public/js/myscript.js');
var express = require('express');
var session = require('express-session');
var app = express();
var UserController = require ('./user_contr.js');
var ProductController = require ('./product_contr.js');
var bodyParser = require ('body-parser');
var handlebars = require('express-handlebars');
var htmltags = require('../helper/htmltags.js'); //contain some htmltags with text that are included in the pages
var sess; //session; is set when user successfully logged in and is set to NULL if user loggs out
var user; //username; is set when user successfully logged in and is set to NULL if user loggs out
var routes = require('./routes.js');
var ShoppingowlController = require('./shoppingowl_contr.js');

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
		if (user){
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
		routes.registration(req, res);
	});


	//Submit of registration form
	app.post('/register', function(req, res){
		routes.register(req, res);
	})


//________________________________________________________
//
// User Login
//________________________________________________________


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
				});
			}
		});
	});



//________________________________________________________
//
// Products
//________________________________________________________


	//Get products
	app.post('/products', function(req, res){
		routes.products(req, res, user);
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
		var username = req.body.username;
		var newusername = req.body.newusername;
		var password = req.body.password;
		//Input validation
		if (!newusername || newusername.length < 4 || newusername.length > 20){
			res.render('index', {
				layout: false, 
				user: user, 
				dropdowncontent:htmltags.loggedintag,
				headline: "ERROR: Username has to have between 4 and 20 characters."
			});
		} else {
			console.log("[DEBUG] Password: ", password);
			handlerController = new UserController.UserController();
			handlerController.changeUsername(username, newusername, password, function (err){
				if (err){
					console.log("[ERROR] ", err);
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "ERROR: "+ err
					});
				} else {
					console.log("[INFO] Successfully changed user information.");
					user = newusername;
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Username successfully changed!",
					});
				}
			});
		}
	});

	//change password
	app.post('/changePassword', function(req, res){
		var password = req.body.password;
		var newpassword = req.body.newpassword;
		if (!newpassword || newpassword.length < 4){
			res.render('index', {
					layout: false, 
					user: user, 
					dropdowncontent:htmltags.loggedintag,
					headline: "Your new password has to have at least 4 characters."
				});
		} else {
			handlerController = new UserController.UserController();
			handlerController.changePassword(user, password, newpassword, function(err){
				if (err){
					console.log("[ERROR] ", err);
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "ERROR: "+ err
					});
				} else {
					console.log("[INFO] Successfully changed user information.");
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Password successfully changed!",
					});
				}
			});
		}
	});


	//change email address
	app.post('/changeEmail', function(req, res){
		var user = req.body.username;
		var password = req.body.password;
		var email = req.body.email;
		if (!email || email.length < 3){
			res.render('index', {
				layout: false, 
				user: user, 
				dropdowncontent:htmltags.loggedintag,
				headline: "Please enter a valid email address."
			});
		} else {
			handlerController = new UserController.UserController();
			handlerController.changeEmail(user, password, email, function(err){
				if (err){
					console.log("[ERROR] ", err);
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "ERROR: "+ err
					});
				} else {
					console.log("[INFO] Successfully changed user information.");
					user = null;
					res.render('index', {
						layout: false, 
						user: "Sign in", 
						dropdowncontent:htmltags.signintag,
						headline: "Email address successfully changed!",
						content1: "<p> You have to confirm your new email address before you can log in again.</p>"
					});
				}
			});
		}
	});


//________________________________________________________
//
// Delete Account
//________________________________________________________


	//Delete user
	//BUG: User still logged in after deleting account
	app.post('/deleteUser', function(req, res){
		routes.deleteUser(req, res);
	});




//________________________________________________________
//
// Shopping owl
//________________________________________________________


	app.get('/shoppingowl', function(req, res){
		routes.getShoppingOwl(req, res, user);
	});









	//Redirects to home if user is not logged in
	function loggedIn(req, res, next){
		if (user){
			return next();
		}
		res.redirect('/');
	}



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