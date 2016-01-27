var http = require('http');
var fs = require('fs');
var config = require('../config');
var registration = require ('../public/js/myscript.js');
var express = require('express');
var session = require('express-session');
var app = express();
var UserController = require ('./user_contr.js');
var ProductController = require ('./product_contr.js');
var ShoppingowlController = require('./shoppingowl_contr.js');
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



//________________________________________________________
//
// Index page
//________________________________________________________

	app.get('/home', function(req, res){
		//if user is logged in
		if (sess === req.session.id){
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


//________________________________________________________
//
// User Registration
//________________________________________________________


	//Go to registration page
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


	//Submit of registration form
	app.post('/register', function(req, res){
		console.log("Cookies: ", req.cookies);
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var email = req.body.email;

		//Userinput validation
		if(!username || username.length < 4 || username.length > 20){
			res.end("Error: Your username has to have between 4 and 20 characters.");
		//Userinput validation
		} else if (!password || password.length < 4){
			res.end("Error: Your password has to have at least 4 characters.");
		//Userinput validation
		} else if (!email){
			res.end("Error: You have to enter a valid email address.");
		//Userinput validation
		} else if (password !== password2){
			res.end("Your entered passwords do not match.");
		//If userinput is valid ...
		} else {
			handlerController = new UserController.UserController();
			//... try to write user into db
			handlerController.register(username, password, email, function(err, info){
				if (err){
					console.log("[ERROR] Registration failed: ", err);
					res.end(err);
				} else {
					console.log("[INFO] Entered user into db.");
					res.end("You are registered now. <br> We sent you a registration email. Please confirm your email address by clicking on the link in the email to log in.")
				}
			});
		}
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
				sess = req.session.id; //stores session id if user is logged in
				user = username; //stores username if user is logged in
				console.log("[INFO] User logged in.");
				console.log("[INFO] Session: ", sess);

				//if user is logged in, username is written on dropdownmenu 
				//and dropdownmenu contains only logout button
				res.render('index', {
					layout: false, 
					user: user, 
					dropdowncontent:htmltags.loggedintag,
					headline: "You are logged in as " + user + "."
				});
				
			//if user is not logged in, "Sign in" is written on dropdownmenu
			//and dropdownmenu contains login form and register button
			} else {
				console.log("[ERROR] User failed to log in: ", err);
				res.render('index', {
					layout: false, 
					user: "Sign in", 
					dropdowncontent:htmltags.signintag,
					headline: err
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
		var category = req.body.category;
		console.log("[INFO] Category: ", category);
		
		handlerController = new ProductController.ProductController();

		//show all products
		if (category === "all"){
			handlerController.getAllProducts(function(err, data){
				if (err){
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag, 
						feedback:"Error: " + err,
						headline: "Error: " + err
					});
				} else {

					var productdata = "<p><table class=\"tablecontent\"><tr class=\"tablehead\"><th class=\"tablehead\">Product</td><th class=\"tablehead\">Category</td><th class=\"tablehead\">Price</td><th class=\"tablehead\">Add product to ShoppingOwl</td></tr>";

					for (var i in data){
						productdata = productdata 
							+ "<tr class=\"tablebody\"><td class=\"tablebody\" id=\"productowl" 
							+ i + "\">" 
								+ data[i].productname
							+ "</td><td class=\"tablebody\">"
								+ data[i].category
							+ "</td><td class=\"tablebody\">"
								+ data[i].price
							+ "€</td><td class=\"tablebody\">" 
							+ "<input class=\"inputforms\" type=\"button\" value=\"Add\" onclick=addToOwl(this) id=\"owl" 
							+ i + "\"></td></tr>";
					}

					productdata = productdata + "</table></p>"

					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Products",
						content1: htmltags.productfilter,
						content2: productdata
					});
				}
			});
		//If a specific categroy is selected
		} else {
			handlerController.getProductsByCategory(category, function (err, data){
				if (err){
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag, 
						feedback:"Error: " + err,
						headline: "Error: " + err
					});
				} else {

					var productdata = "<p><table class=\"tablecontent\"><tr class=\"tablehead\"><th class=\"tablehead\">Product</td><th class=\"tablehead\">Category</td><th class=\"tablehead\">Price</td><th class=\"tablehead\">Add product to ShoppingOwl</td></tr>";

					for (var i in data){
						productdata = productdata 
							+ "<tr class=\"tablebody\"><td class=\"tablebody\" id=\"productowl" 
							+ i + "\">" 
								+ data[i].productname
							+ "</td><td class=\"tablebody\">"
								+ data[i].category
							+ "</td><td class=\"tablebody\">"
								+ data[i].price
							+ "€</td><td class=\"tablebody\">" 
							+ "<input class=\"inputforms\" type=\"button\" value=\"Add\" onclick=addToOwl(this) id=\"owl" 
							+ i + "\"></td></tr>";
					}

					productdata = productdata + "</table></p>"

					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Products",
						content1: htmltags.productfilter,
						content2: productdata
					});
				}
			});
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
		//If user is not logged in
		if (req.session.id !== sess){
			console.log("[INFO] User not logged in.");
			res.redirect('/');
		//If user is logged in
		} else {
			var email;
			handlerController = new UserController.UserController();
			handlerController.fetchEmail(user, function(err, email){
				if (err){
					email = "Couldn't fetch email address from databse.";
				} else {
					email = email;
				}
				console.log("[INFO] Profile of ", user);
				res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Your profile",
						content1: "<hr><h2>" + user + " </h2><p class=\"title1\"> " + email + "</p><br><hr><br><br><br><br>",
						content2: htmltags.changeUsernameForm + htmltags.changePasswordForm + htmltags.changeEmailForm + htmltags.deleteUserForm
				});
			});
		}
	});

	app.get('/profile', function(req, res){
		if(req.session.id != sess){
			res.redirect('/');
		} else {
			console.log("[INFO] Profile of ", user);
			res.render('index', {
				layout: false, 
				user: user, 
				dropdowncontent:htmltags.loggedintag,
				headline: "Your profile",
				content1: htmltags.changeUsernameForm + htmltags.changePasswordForm + htmltags.changeEmailForm + htmltags.deleteUserForm
			});
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
			res.send("Your username has to have between 4 and 20 characters.");
		} else {
			handlerController = new UserController.UserController();
			handlerController.changeUsername(username, newusername, password, function (err){
				if (err){
					console.log("[ERROR] Couldn't change username: ", err);
					res.end("Couldn't change username: " + err);
				} else {
					console.log("[INFO] Successfully changed username from ", user, " to ", newusername);
					user = newusername;
					res.end("Successfully changed username.");
				}
			});
		}
	});

	//change password
	app.post('/changePassword', function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		var newpassword = req.body.newpassword;
		if (!newpassword || newpassword.length < 4){
			res.send("Your new password has to have at least 4 characters.");
		} else {
			handlerController = new UserController.UserController();
			handlerController.changePassword(username, password, newpassword, function(err){
				if (err){
					console.log("[ERROR] Couldn't change password: ", err);
					res.end(err);
				} else {
					console.log("[INFO] Successfully changed password of ", user);
					res.end("Password successfully changed!");
				}
			});
		}
	});


	//change email address
	app.post('/changeEmail', function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		var email = req.body.email;
		if (!password){
			res.end("Please enter your password.");
		}
		if (!email || email.length < 3){
			res.end("Please enter a valid email address.");
		} else {
			handlerController = new UserController.UserController();
			handlerController.changeEmail(username, password, email, function(err){
				if (err){
					console.log("[ERROR] Couldn't change email address: ", err);
					res.end("Couldn't change email address: " + err);
				} else {
					console.log("[INFO] Successfully changed user information.");
					user = null;
					sess = null;
					res.end("Email address successfully changed!<br><br>You have to confirm your new email address before you can log in again.");
				}
			});
		}
	});


//________________________________________________________
//
// Delete Account
//________________________________________________________


	//Delete user
	app.post('/deleteUser', function(req, res){
		var password = req.body.password;
		handlerController = new UserController.UserController();
		handlerController.delete(user, password, function(err){
			if (err){
				console.log("[ERROR] Couldn't delete account: ", err);
				res.end("Couldn't delete account: " + err);
			} else {
				console.log("[INFO] Deleted account of ", user);
				user = null;
				sess = null;
				res.end("Account successfully deleted.")
			}
		});
	})


//________________________________________________________
//
// Shopping owl
//________________________________________________________


	app.get('/shoppingowl', function(req, res){
		var username = req.query.username;
		if(!username){
			username = user;
		}
		if (!user){
			res.render('index', {
				layout: false, 
				user: "Sign in", 
				dropdowncontent:htmltags.signintag,
				headline: "You are not logged in.",
			});
		} else if (user.toLowerCase() !== username.toLowerCase()){
			res.render('index', {
				layout: false, 
				user: user, 
				dropdowncontent:htmltags.loggedintag,
				headline: "You are not logged in as " + username,
			});
		} else {
			handlerController = new ShoppingowlController.ShoppingowlController();
			handlerController.getShoppingOwl(username, function(err, data){
				if(err){
					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Error " + err,
					});
				} else {

					var productdata = "<p><table class=\"tablecontent\"><tr class=\"tablehead\"><th class=\"tablehead\">Product</td><th class=\"tablehead\">Quantity</td><th class=\"tablehead\">Price</td><th class=\"tablehead\">Delete product</td></tr>";

					for (var i in data){
						productdata = productdata 
							+ "<tr class=\"tablebody\" id=\"columnowl" + i + "\"><td class=\"tablebody\" id=\"productowl" 
							+ i + "\">" 
								+ data[i].productname
							+ "</td><td class=\"tablebody\">"
								+ data[i].quantity
							+ "</td><td class=\"tablebody\">"
								+ data[i].totalprice
							+ "€</td><td class=\"tablebody\">" 
							+ "<input class=\"inputforms\" type=\"button\" value=\"Delete\" onclick=deleteFromOwl(this) id=\"owl" 
							+ i + "\"></td></tr>";
					}

					productdata = productdata + "</table></p>"

					res.render('index', {
						layout: false, 
						user: user, 
						dropdowncontent:htmltags.loggedintag,
						headline: "Products",
						content1: productdata
					});
				}
			});
		}
	});


	app.del('/deleteFromOwl', function(req, res){
		var username = req.query.user;
		var product = req.query.product;
		if(username !== user){
			//another user in url than logged in
			res.end("ERROR");
		} else {
			console.log("[DEBUG] Delete from owl");
			handlerController = new ShoppingowlController.ShoppingowlController();
			handlerController.deleteProduct(username, product, function(err, data){
				if(err){
					res.end("ERROR");
				} else {
					res.end("DELETED");
				}
			});
		}
	})

	app.get('/addToOwl', function(req, res){
		var username = req.query.user;
		var product = req.query.product;
		//another user in url than logged in
		if(username !== user){
			res.end("ERROR");
		} else {
			handlerController = new ShoppingowlController.ShoppingowlController();
			handlerController.addProduct(username, product, function(err, data){
				if(err){
					console.log("[ERROR] Couldn't add product to shopping owl: ", err);
					res.end("ERROR");
				} else {
					console.log("[INFO] Added product to shopping owl.");
					res.end("ADDED");
				}
			});
		}
	})



//________________________________________________________
//
// Redirects to home if user is not logged in
//________________________________________________________



	//Redirects to home if user is not logged in
	function loggedIn(req, res, next){
		if (sess = req.session.id){
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
