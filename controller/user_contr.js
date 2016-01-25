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

UserController.prototype.register = function(username, password, email, callback) {


	//hash password
	var hashedPassword = passwordHash.generate(password);

	// create random token
	createToken = function() {
		const buf = crypto.randomBytes(32);
		return buf.toString('hex');
	}
	var token = createToken();

	//write user into database
	database.setUser(username, hashedPassword, email, token, function (err, data){
		if (err){
			console.log("[ERROR] Couldn't write user into db. ", err);
			if (err.message.substring(0, 12) === "ER_DUP_ENTRY"){
				err = "This username is already taken.";
			}
		} else {
			console.log("[INFO] Entered user into db.");

			//Send registration email
			this.email = email;
			mailer = new Mailer();
			mailer.sendMail(email, token, username);
		}
		callback(err);

	});
}


//____________________________________________________________
//
// LOGIN 
//____________________________________________________________

UserController.prototype.login = function(username, password, callback) {


	database.getUser(username, function (err, data){
		loggedin = false;
		if (err){
			console.log("[ERROR] ", error);
		} else {
			console.log("[DEBUG] Login - data: ", data);
			if (!data){
				console.log("[INFO] No user with this username in db.");
				err = "Sorry, but there is no user with username " + username + " in our database.";
			} else {
				if (passwordHash.verify(password, data.password)){
					console.log("[INFO] Password is correct.");
					if (data.token){
						console.log("[INFO] Email not confirmed.");
						err = "Email address not yet confirmed.";
					} else {
						loggedin = true;
					}
				} else {
					console.log("[INFO] Password is incorrect. :(");
						err = "Password is incorrect.";
				}
			}
		}
		callback(err, loggedin);
	})
};


//____________________________________________________________
//
// CONFIRM EMAIL 
//____________________________________________________________


UserController.prototype.confirmEmail = function(token, username, callback) {
	database.confirmEmail(token, username, function (err, data){
		if (err){
			console.log("[ERROR] Couldn't delete token. ", err);
		} else {
			console.log("[INFO] Deleted token from db.");
		}
		callback(err);
	});
};



//____________________________________________________________
//
// CHANGE USER INFORMATION
//____________________________________________________________


//Change username
UserController.prototype.changeUsername = function(username, newusername, password, callback) {
	//Read user from db to check if password is correct
	console.log("[DEBUG]: Username", username);
	database.getUser(username, function (err, data){
		if (err){
			console.log("[ERROR] ", err);
		} else {
			//If no user in db --> Should NOT happen!
			if(!data){
				err = "[ERR]User not found.";
			}else if (passwordHash.verify(password, data.password)){
				console.log("[INFO] Password correct.");
				//change uusername only if password is correct
				database.changeUsername(username, newusername, function (err, result){
					if (err){
						console.log("[ERROR] ", err);
					}
				});
			} else {
				console.log("[ERROR] Password is incorrect.");
				err = "Password is incorrect.";
			}
		}
		callback(err);
	});

};

//Change password
UserController.prototype.changePassword = function(username, password, newpassword, callback) {
	//Read user from db to check if password is correct
	database.getUser(username, function (err, data){
		if (err){
			console.log("[ERROR] ", err);
		} else {
			if (passwordHash.verify(password, data.password)){
				console.log("[INFO] Password correct.");
				//change password only if password is correct
				//hash new password
				var hashedPassword = passwordHash.generate(newpassword);
				database.changePassword(username, hashedPassword, function (err, result){
					if (err){
						console.log("[ERROR] ", err);
					}
				});
			} else {
				console.log("[ERROR] Password is incorrect.");
				err = "Password is incorrect.";
			}
		}
		callback(err);
	});

};


//Change email
UserController.prototype.changeEmail = function(username, password, email, callback) {
	//Read user from db to check if password is correct
	database.getUser(username, function (err, data){
		if (err){
			console.log("[ERROR] ", err);
		} else {
			if (passwordHash.verify(password, data.password)){
				console.log("[INFO] Password correct.");

				// create random token
				createToken = function() {
					const buf = crypto.randomBytes(32);
					return buf.toString('hex');
				}
				var token = createToken();

				//Send registration email
				this.email = email;
				mailer = new Mailer();
				mailer.sendMail(email, token, username);

				//change email address only if password is correct
				database.changeEmail(username, email, token, function (err, result){
					if (err){
						console.log("[ERROR] ", err);
					}
				});
			} else {
				console.log("[ERROR] Password is incorrect.");
				err = "Password is incorrect.";
			}
		}
		callback(err);
	});

};



//____________________________________________________________
//
// DELETE USER 
//____________________________________________________________


UserController.prototype.delete = function(username, password, callback) {
	database.getUser(username, function (err, data){
		if (err){
			console.log("[ERROR] Error performing query: ", err);
		} else {
			//If no user with this username in db 
			if (!data){ 
				console.log("[INFO] No user with this username in db.");
			//If user is in db --> check password
			} else if (passwordHash.verify(password, data.password)){
				console.log("[INFO] Password is correct.");
				database.deleteUser(username, function(err, data){
					//If error while deleting user
					if (err){
						console.log("[ERROR] Error deleting user: ", err);
					//User successfully deleted
					} else {
						console.log("User deleted");
					}
				});
			} else { //If user is in db but password is incorrect
				console.log("[INFO] Password is incorrect. :(");
			}
		}
		callback(err);
	});

};


module.exports.UserController = UserController