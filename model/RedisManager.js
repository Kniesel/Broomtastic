exports.init = function(redis) {
	
	RedisManager = exports.RedisManager = function() {
		this.client = redis.createClient();
		this.client.on('error', function (err) {
			console.log('redis error – ' + client.host + ':' + client.port + ' – ' + err);
		});
		var usersfile = require('../data/users.db');
		var fs = require("fs");


// check if the database is empty -> if empty -> fill initial obj from file

		RedisManager.prototype.fillinData = function(){
			db.hlen("users", function(err, obj){
				if (err) {
					console.log(err)
				} else {
					if (obj == 0) {
						fs.readFile(usersfile, function(error, users){
							if (error) {
								console.log(error)
							} else {
								var users = JSON.parse(users)
								var length = Object.keys(users).length

								// loop which inserts obj into database
								for(var i = 1; i <= length; i++) {
									var tmpUser = users[i]
									console.log(tmpUser)

									// store users into hash "users"
									db.hset("users", tmpUser.username, JSON.stringify(tmpUser), function(errorSet, answer){
										if (errorSet) {
											console.log(errorSet)
										}
									})
								}
							}
						})
					}
				}
			})
		}


RedisManager.prototype.set = function(key, username, obj, callback) {
	//if(typeof(key) == 'string' && typeof(username) == 'string' && typeof(obj) == 'object') {
		this.client.hset("users", obj.username, JSON.stringify(obj), function(err, obj) {
			if(err) {
				callback(err);
			} else {
				callback();
			}
		});
	//}
}


RedisManager.prototype.get = function(key, username, callback) {
//if(typeof(key) == 'string' && typeof(username) == 'string') {
	this.client.hget("users", obj.username, function(err, obj) {
		if(err) {
			callback(err);
		} else {
			if(obj == null) {
				callback(null)
			} else {
				callback(obj);
			}
		}
	});
//}
}


// RedisManager.prototype.exists = function(key, username) {
// if(typeof(key) == 'string' && typeof(username) == 'string') {
// this.client.exists(key + ' ' + username, function(err, obj) {
// if(err) {
// callback(err);
// } else {
// if(obj == 1) {
// return true;
// } else {
// return false;
// }
// }
// });
// }
// }
// RedisManager.prototype.delete = function(key, username, callback) {
// if(typeof(key) == 'string' && typeof(username) == 'string') {
// this.client.del(key + ' ' + username, function(err, obj) {
// if(err){
// callback(err);
// } else {
// callback();
// }
// });
// }
// }
// RedisManager.prototype.deleteByKey = function(key, callback) {
// var self = this;
// this.client.keys(key + ' *', function (err, replies) {
// console.log(replies.length + " replies:");
// replies.forEach(function (reply, i) {
// self.client.del(reply, function(err, o) {
// if(err) throw err;
// });
// })
// callback();
// });
// }
console.log(redis);
return new RedisManager();
}
}