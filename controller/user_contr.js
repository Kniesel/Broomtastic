var RedisManager = require('../model/RedisManager.js');
var Mailer = require('../helper/mailfordummies.js');
var crypto = require('crypto');

var username = "";
var password = "";
var email = "";
var register = false;

var UserController = function(username, userpassword, email){
	
	// this.redisManager = new RedisManager(res);

	if (email){
		register = true;
		console.log("Usercontroller: Register");
	} else {
		console.log ("Usercontroller: Login");
	}

	this.username = username;
	this.password = userpassword;

	if (register){

		// create random token
		createToken = function(callback) {
			const buf = crypto.randomBytes(32);
			return buf.toString('hex');
		}
		var token = createToken()

		this.email = email;
		mailer = new Mailer();
		mailer.sendMail(email, token);


		//TODO
		//Prüfen, ob Username schon in der Datenbank ist
		//Wenn Username vergeben --> Fehler
		//Wenn Username frei --> in die DB schreiben, Token in die DB schreiben
	} else {
		//TODO
		//Prüfen, ob Username in der Datenbank
		//Wenn nicht --> Fehler
		//Wenn schon --> Prüfen ob PW richtig
		//Wenn falsch --> Fehler
		//Wenn richtig --> Cookie generieren
	}
}

// UserController.prototype.get = function(){
// 	var redisManager = this.redisManager;
// 	try {
// 		RedisManager.get("1", "username", function(result) {
// 			if(result instanceof Error) {
// 				var error = result;
// 				throw error;
// 			} else {
// 				console.log("username") 
// 			}
// 		});
// 	} catch (error) {
// 		console.log(error); // handle the error 
// 	}
// }




module.exports.UserController = UserController