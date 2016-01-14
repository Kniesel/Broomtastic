var redis = require("redis")
var RedisModule = require('../model/RedisManager.js');
var RedisManager = RedisModule.init(redis);
var port = 6379;
var client = redis.createClient(port, "127.0.0.1")

var user = 'user';
var id = '123';

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