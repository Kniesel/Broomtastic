var redis = require("redis")
var RedisModule = require('../model/RedisManager.js');
var RedisManager = RedisModule.init(redis);
var port = 6379;
var client = redis.createClient(port, "127.0.0.1")
var mailer = require('../helper/mailfordummies.js');

var user = 'user';
var id = '123';

var UserController = function(username, userpassword){
	console.log("Usercontroller")
	this.username = username
	this.userpassword = userpassword
	alert("Usercontroller\n Req: " + req + "\nRes: " + res)
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

module.exports.Usercontroller = UserController