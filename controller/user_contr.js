var redis = require("redis")
var RedisModule = require('../model/RedisManager.js');
var RedisManager = RedisModule.init(redis);
var port = 6379;
var client = redis.createClient(port, "127.0.0.1")
var Mailer = require('../helper/mailfordummies.js');
var crypto = require('crypto');

var username = "";
var password = "";
var email = "";
var register = false;

var UserController = function(username, userpassword, email){
	
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

UserController.prototype.get = function(){
	try {
		RedisManager.get(user, id, function(result) {
			if(result instanceof Error) {
				var error = result;
				throw error;
			} else {
				console.log(id) 
			}
		});
	} catch (error) {
		console.log(error); // handle the error 
	}
}

module.exports.UserController = UserController