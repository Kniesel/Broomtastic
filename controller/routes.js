var htmltags = require('../helper/htmltags.js');
var UserController = require('./user_contr.js');
var ProductController = require('./product_contr.js');
var ShoppingowlController = require('./shoppingowl_contr.js');
var handlerController;
var username;
var dropdowncontent;
var headline;
var content1;
var content2;



module.exports = {


//________________________________________________________
//
// Index page
//________________________________________________________

	index: function(req, res, user){
		this.resetVariables();
		username = user;
		dropdowncontent = htmltags.loggedintag;
		headline = "Welcome to the Broomtastic Webshop!";
		content1 = htmltags.productfilter;
		
		this.renderPage(res);
	},


//________________________________________________________
//
// Profile page
//________________________________________________________

	profile: function (req, res, user){
		console.log("[INFO] Profile of ", user);
		this.resetVariables();
		username = user;
		dropdowncontent = htmltags.loggedintag;
		headline = "Your profile";
		content1 = "<hr><h2>" + user + " </h2><p class=\"title1\"> " + "chris@beispiel.com</p><br><hr><br><br><br><br>";
		content2 = htmltags.changeUsernameForm + htmltags.changePasswordForm + htmltags.changeEmailForm + htmltags.deleteUserForm;

		this.renderPage(res);
	},

//________________________________________________________
//
// Confirmed email page
//________________________________________________________

	confirmEmail: function(req, res){
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
	},

//________________________________________________________
//
// Login
//________________________________________________________


	login: function(user, password, callback){
		handlerController = new UserController.UserController();
		handlerController.login(user, password, function(err, loggedin){
			if (loggedin){
				callback(true); //sucessfully logged in;
			} else {
				console.log("[DEBUG] Error: ", err);
				callback(false, err);
			}
		});
	},


//________________________________________________________
//
// Not logged in page
//________________________________________________________

	notloggedin: function(req, res){
		console.log("[INFO] User not logged in.");
		this.resetVariables();
		username = "Sign in";
		dropdowncontent = htmltags.signintag;
		headline = "You are not logged in";

		this.renderPage(res);
	},


//________________________________________________________
//
// Registration
//________________________________________________________

	//Registration page
	registration: function(req, res){
		this.resetVariables();
		username = "Sign in";
		dropdowncontent = htmltags.signintag;
		headline = "Give us all your information to join us!";
		content1 = htmltags.registerform;

		this.renderPage(res);
	},


	//Post register form
	register: function(req, res){
		this.resetVariables();
		var requsername = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var email = req.body.email;
		var input = false; //false user input

		username = "Sign in"; 
		dropdowncontent = htmltags.signintag;
		content1 = htmltags.registerform;

		//Userinput validation
		if(!requsername || requsername.length < 4 || requsername.length > 20){
			headline = "Error: Your username has to have between 4 and 20 characters.";
		} else if (!password || password.length < 4){
			headline = "Error: Your password has to have at least 4 characters.";
		} else if (!email){
			headline = "Error: You have to enter a valid email address.";
		} else if (password !== password2){
			headline = "Your entered passwords do not match.";
		} else {
			input = true;
			handlerController = new UserController.UserController();
			handlerController.register(requsername, password, email, function(err){
				if (err){
					console.log("[ERROR] ", err);
					headline = "Error: " + err;
				} else {
					headline = "You are registered now.";
					content1 = "<p>We sent you a registration email. Please confirm your email address by clicking on the link in the email to log in.</p>"
				}
				res.render('index', {
					layout: false,
					user: username, 
					dropdowncontent: dropdowncontent,
					headline: headline,
					content1: content1,
					content2: content2
				});
			});
		}
		if(input == false){
			this.renderPage(res);
		}
	},


//________________________________________________________
//
// Change Account
//________________________________________________________

	changeUsername: function(req, res, user, callback){
		var username = req.body.username;
		var newusername = req.body.newusername;
		var password = req.body.password;
		//Input validation
		dropdowncontent = htmltags.loggedintag;
		if (!newusername || newusername.length < 4 || newusername.length > 20){
			headline = "ERROR: Username has to have between 4 and 20 characters."
			this.renderPage(res);
			res.end("Username has to have between 4 and 20 characters.");
		} else {
			handlerController = new UserController.UserController();
			handlerController.changeUsername(username, newusername, password, function (err){
				if (err){
					console.log("[ERROR] ", err);
					callback(user); //username not changed
					res.end(err);
				} else {
					console.log("[INFO] Successfully changed user information.");
					callback(newusername); //username changed
					res.end("Username changed.");
				}
			});
		}
},


	changePassword: function(req, res, user){

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
	},


	changeEmail: function(req, res, user, callback){

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
					callback(false);
				} else {
					console.log("[INFO] Successfully changed user information.");
					user = null;
					callback(true);
				}
			});
		}
	},


//________________________________________________________
//
// Delete User
//________________________________________________________


	deleteUser: function(req, res, callback){

		username = req.body.username;
		var password = req.body.password;
		handlerController = new UserController.UserController();
		handlerController.delete(username, password, function(err){
			if (err){
				dropdowncontent = htmltags.loggedintag;
				headline = "ERROR " + err;
				callback(false); //user not deleted
			} else {
				username = "Sign in"; 
				dropdowncontent = htmltags.signintag;
				headline = "Account successfully deleted.";
				callback(true); //user deleted
			}
		});
	},


//________________________________________________________
//
// Products
//________________________________________________________

	products: function(req, res, category, user){
		this.resetVariables();
		console.log("[INFO] Category: ", category);

		username = user;
		dropdowncontent = htmltags.loggedintag;
		content1 = htmltags.productfilter;

		handlerController = new ProductController.ProductController();

		if (category === "all"){
			handlerController.getAllProducts(function(err, data){
				if (err){
					headline = "Error: " + err;
				} else {

					var productdata = "<p><table class=\"tablecontent\"><tr class=\"tablehead\"><th class=\"tablehead\">Product</td><th class=\"tablehead\">Category</td><th class=\"tablehead\">Price</td></tr>";

					for (var i in data){
						productdata = productdata 
							+ "<tr class=\"tablebody\"><td class=\"tablebody\">" 
								+ data[i].productname
							+ "</td><td class=\"tablebody\">"
								+ data[i].category
							+ "</td><td class=\"tablebody\">"
								+ data[i].price
							+ "€</td></tr>";
					}

					productdata = productdata + "</table></p>"
					content2 = productdata;
				}
				res.render('index', {
					layout: false,
					user: username, 
					dropdowncontent: dropdowncontent,
					headline: headline,
					content1: content1,
					content2: content2
				});
			});
		//If a specific categroy is selected
		} else {
			handlerController.getProductsByCategory(category, function (err, data){
				if(err){
					headline: "Error: " + err
				} else {

					var productdata = "<p><table class=\"tablecontent\"><tr class=\"tablehead\"><th class=\"tablehead\">Product</td><th class=\"tablehead\">Category</td><th class=\"tablehead\">Price</td></tr>";

					for (var i in data){
						productdata = productdata 
							+ "<tr class=\"tablebody\"><td class=\"tablebody\">" 
								+ data[i].productname
							+ "</td><td class=\"tablebody\">"
								+ data[i].category
							+ "</td><td class=\"tablebody\">"
								+ data[i].price
							+ "€</td></tr>";
					}

					productdata = productdata + "</table></p>"
					
					content2 = productdata;
				}
				res.render('index', {
					layout: false,
					user: username, 
					dropdowncontent: dropdowncontent,
					headline: headline,
					content1: content1,
					content2: content2
				});
			});
		}
	},


//________________________________________________________
//
// Shopping Owl
//________________________________________________________

	getShoppingOwl: function(req, res, user){
		this.resetVariables();
		var requsername = req.query.username;
		var input = false;
		username = user; 
		dropdowncontent = htmltags.loggedintag;

			if(!requsername){
				requsername = user;
			}
			if (!username){
				username = "Sign in";
				dropdowncontent = htmltags.signintag;
				headline = "You are not logged in.";
			} else if (username.toLowerCase() !== requsername.toLowerCase()){
				headline = "You are not logged in as " + requsername;
			} else {
				input = true;
				handlerController = new ShoppingowlController.ShoppingowlController();
				handlerController.getShoppingOwl(username, function(err, data){
					if(err){
						headline = "Error " + err;
					} else {

						var productdata = "<p><table class=\"tablecontent\"><tr class=\"tablehead\"><th class=\"tablehead\">Product</td><th class=\"tablehead\">Quantity</td><th class=\"tablehead\">Price</td></tr>";

						for (var i in data){
							productdata = productdata 
								+ "<tr class=\"tablebody\"><td class=\"tablebody\">" 
									+ data[i].productname
								+ "</td><td class=\"tablebody\">"
									+ data[i].quantity
								+ "</td><td class=\"tablebody\">"
									+ data[i].totalprice
								+ "€</td></tr>";
						}

						productdata = productdata + "</table></p>";

						headline = "Your Shopping Owl";
						content1 = productdata;
					}
					res.render('index', {
						layout: false,
						user: user, 
						dropdowncontent: dropdowncontent,
						headline: headline,
						content1: content1
					});
				});
			}
			if (input == false){
				this.renderPage(res);
			}
	},


//________________________________________________________
//
// Set the variables to null
//________________________________________________________

	resetVariables: function(){
		username = null;
		dropdowncontent = null;
		headline = null;
		content1 = null;
		content2 = null;
	},


//________________________________________________________
//
// Render page with the set variables
//________________________________________________________

	renderPage: function(res){
		res.render('index', {
			layout: false,
			user: username, 
			dropdowncontent: dropdowncontent,
			headline: headline,
			content1: content1,
			content2: content2
		});
	}
}