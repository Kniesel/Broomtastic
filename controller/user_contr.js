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

	//check if username is taken or free
	if (database.getUsername(username)){
		console.log("[INFO] Username already taken.");
	} else {
		// create random token
		createToken = function() {
			const buf = crypto.randomBytes(32);
			return buf.toString('hex');
		}

		var token = createToken();

		//write user into database
		database.setUser(username, hashedPassword, email, token, function(err, data){
			if (err){
				console.log("[ERROR] Couldn't write user into db. ", err);
				var tokenerror = 'ER_DUP_ENTRY: Duplicate entry \'' + token + '\' for key \'token\''
				if (err.message.slice(0, tokenerror.length) == tokenerror){
					console.log("[ERROR] Doppeltes Token!");
					//Jetzt müsste man ein neues Token generieren 
					//und das ganze Zeug nochmal in die DB schreiben
					//Und falls es immer noch doppelt sien sollte, 
					//nochmal ein neues generieren
					//Funktioniert aber nicht mit while-Schleife,
					//weil die DB-Aufrufe asynchron sind
					//--> Bis auf weiteres ignorieren. 
					//
					//LÖSUNG ((c)Heli):
					//In der DB unique-constraint auf Token weg
					//Beim confirmen Kombination aus Token und Username || Token und Email überprüfen
				}
			} else {
				console.log("[INFO] Entered user into db.");

				//Send registration email
				this.email = email;
				mailer = new Mailer();
				mailer.sendMail(email, token);
			}
		});

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
				if (passwordHash.verify(password, data.password)){
					console.log("[INFO] Password is correct.");
					if (data.token){
						console.log("[INFO] Email not confirmed.");
					} else {
						loggedin = true;
					}
				} else {
					console.log("[INFO] Password is incorrect. :(");
				}
			}
		}
		callback(loggedin);
	})
};


//____________________________________________________________
//
// CONFIRM EMAIL 
//____________________________________________________________


UserController.prototype.confirmEmail = function(token) {
	database.confirmEmail(token, function(err, data){
		if (err){
			console.log("[ERROR] Couldn't delete token. ", err);
		} else {
			console.log("[INFO] Deleted token from db.");
		}
	});
	//Delete token from db
};



//____________________________________________________________
//
// DELETE USER 
//____________________________________________________________


UserController.prototype.delete = function(username, password) {

	database.getUser(username, function(err, data){
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
	})

};


module.exports.UserController = UserController