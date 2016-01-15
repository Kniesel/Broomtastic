var SQLManager = require('../model/SQLManager.js')
var Mailer = require('../helper/mailfordummies.js');
var crypto = require('crypto');
var passwordHash = require('password-hash');

var username = "";
var password = "";
var email = "";
var register = false;

var UserController = function(username, userpassword, email){


	if (email){
		register = true;
	}

	var database = new SQLManager.SQLManager();
	this.username = username;
	this.password = userpassword;
	//Hash password
	var hashedPassword = passwordHash.generate(password); 


//------------------------------------------------------------
// REGISTRATION 
//------------------------------------------------------------

	if (register){


		if (database.getUsername(username)){	//username taken
			console.log("Username vergeben");
		} else {								//username free
			
			// create random token
			createToken = function(callback) {
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
	}

//------------------------------------------------------------
// LOGIN 
//------------------------------------------------------------
	else {
		var tuple = database.getUser(username, hashedPassword);

		console.log("Returned tuple: ", tuple); //undefined --> ASYNCHRON
		//--> Auf tuple warten und dann pw prüfen! 
		//TODO
		//Prüfen ob PW richtig
		//Wenn falsch --> Fehler
		//Wenn richtig --> Cookie generieren
	}
}


module.exports.UserController = UserController