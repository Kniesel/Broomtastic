var SQLManager = require('../model/SQLManager.js')
var Mailer = require('../helper/mailfordummies.js');
var crypto = require('crypto');
var passwordHash = require('password-hash');

var username = "";
var password = "";
var email = "";
var hashedPassword = passwordHash.generate(password);
var database = new SQLManager.SQLManager();

var UserController = function(){

}


//____________________________________________________________
//
// REGISTRATION 
//____________________________________________________________

UserController.prototype.register = function(username, password, email) {

	//set variables
	this.username = username;
	this.password = password;
	console.log(password);
	this.email = email;
	//hash password
	this.hashedPassword = passwordHash.generate(password);
	console.log(hashedPassword);


	//check if username is taken or free
	if (database.getUsername(username)){
		console.log("Username already taken.");
	} else {
		// create random token
		createToken = function() {
			const buf = crypto.randomBytes(32);
			return buf.toString('hex');
		}

		var token = createToken();

		//write user into database
		database.setUser(username, hashedPassword, email, token);

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

UserController.prototype.login = function(username, password) {

	//set variables
	this.username = username;
	this.password = password;
	this.hashedPassword = passwordHash.generate(this.password);


	database.getUser(username, function(err, data){
		if (err){
			console.log("ERROR: ", error);
		} else {
			console.log("Result from db: ", data);
			if (passwordHash.verify(this.password, this.hashedPassword)){
				console.log("Password is correct.");
				//TODO
				//Cookie / Session
			} else {
				console.log("Password is incorrect. :(");
			}
		}
	})
};


module.exports.UserController = UserController