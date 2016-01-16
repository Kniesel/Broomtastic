var SQLManager = require('../model/SQLManager.js')
var Mailer = require('../helper/mailfordummies.js');
var crypto = require('crypto');
var passwordHash = require('password-hash');
var express = require('express');
var app = express();
var database;

var UserController = function(){
	database = new SQLManager.SQLManager();
}


//____________________________________________________________
//
// REGISTRATION 
//____________________________________________________________

UserController.prototype.register = function(username, password, email) {

	//hash password
	var hashedPassword = passwordHash.generate(password);
	console.log(hashedPassword);

	//check if username is taken or free
	if (database.getUsername(username)){
		console.log("[INFO] Username already taken.");
	} else {
		// create random token
		createToken = function() {
			const buf = crypto.randomBytes(32);
			return buf.toString('hex');
		}

		// STRENGGENOMMEN müsste ma jetzt überprüfen, ob des Token schon jemand anderer hat, aber ... :X
		var token = createToken();

		//write user into database
		database.setUser(username, hashedPassword, email, token, function(err, data){
			if (err){
				console.log("[ERROR] Couldn't write user into db.");
			} else {
				console.log("[INFO] Entered user into db.");
			}
		});

		//Send registration email
		this.email = email;
		mailer = new Mailer();
		mailer.sendMail(email, token);
	}


};

//____________________________________________________________
//
// LOGIN 
//____________________________________________________________

UserController.prototype.login = function(username, password, callback) {

	database.getUser(username, function(err, data){
		loggedin = false;
		if (err){
			console.log("[ERROR] ", error);
		} else {
			if (!data){
				console.log("[INFO] No user with this username in db.");
			} else {
				if (passwordHash.verify(password, data)){
					console.log("[INFO] Password is correct.");
					loggedin = true;
			} else {
				console.log("[INFO] Password is incorrect. :(");
				}
			}
		}
		callback(loggedin);
	})
};


module.exports.UserController = UserController