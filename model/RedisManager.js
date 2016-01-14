exports.init = function(redis) {
  RedisManager = exports.RedisManager = function() {
    this.client = redis.createClient();
    this.client.on('error', function (err) {
      console.log('redis error – ' + client.host + ':' + client.port + ' – ' + err);
    });
  }
  RedisManager.prototype.set = function(key, id, obj, callback) {
    if(typeof(key) == 'string' && typeof(id) == 'string' && typeof(obj) == 'object') {
      this.client.hset(key + ' ' + id, 'data', JSON.stringify(obj), function(err, data) {
        if(err) {
          callback(err);
        } else {
          callback();
        }
      });
    }
  }
  RedisManager.prototype.get = function(key, id, callback) {
    if(typeof(key) == 'string' && typeof(id) == 'string') {
      this.client.hget(key + ' ' + id, 'data', function(err, data) {
        if(err) {
          callback(err);
        } else {
          if(data == null) {
            callback(null)
          } else {
            callback(data);
          }
        }
      });
    }
  }
  RedisManager.prototype.exists = function(key, id) {
    if(typeof(key) == 'string' && typeof(id) == 'string') {
      this.client.exists(key + ' ' + id, function(err, data) {
        if(err) {
          callback(err);
        } else {
          if(data == 1) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
  }
  RedisManager.prototype.delete = function(key, id, callback) {
    if(typeof(key) == 'string' && typeof(id) == 'string') {
      this.client.del(key + ' ' + id, function(err, data) {
        if(err)  {
          callback(err);
        } else {
          callback();
        }
      });
    }
  }  
  RedisManager.prototype.deleteByKey = function(key, callback) {
    var self = this;
    this.client.keys(key + ' *', function (err, replies) {
      console.log(replies.length + " replies:");
      replies.forEach(function (reply, i) {
        self.client.del(reply, function(err, o) {
          if(err) throw err;
        });
      })
      callback();
    });
  }  
  return new RedisManager();
}