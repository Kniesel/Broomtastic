var redis = require("redis")
var RedisModule = require('../model/RedisManager.js');
var RedisManager = RedisModule.init(redis);
var port = 6379;
var client = redis.createClient(port, "127.0.0.1")
var mailer = require('../helper/mailfordummies.js');

var username = "";
var password = "";
var email = "";

var UserController = function(username, userpassword){
	console.log("Usercontroller: Login");
	this.username = username;
	this.userpassword = userpassword;
	console.log(username);
	console.log(userpassword);
}

var UserController = function(username, userpassword, email){
	console.log("Usercontroller: Register");
	this.username = username;
	this.userpassword = userpassword;
	this.email = email;
	console.log(username);
	console.log(userpassword);
	console.log(email);
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