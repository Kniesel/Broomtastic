var SQLManager = require('../model/SQLManager.js');

module.exports = {

	//before each test
	setUp: function(callback){
		this.username = 'Ted';
		this.password = 'keines';
		this.email = 'anja.bergmann@edu.fh-joanneum.at';
		this.token = '42';
		callback();
	},

	//after each test (after test.done())
	tearDown: function(callback){
		callback();
	},


	testDublicateEntry: function(test){
		var database = new SQLManager.SQLManager();
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){});
		//No duplicate entries allowed --> should throw error
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){
			if (err){ //there should be an error because of the duplicate entry
				test.ok(true);
			} else {
				test.ok(false);
			}
			test.done();
			database.endConnection();
		});
	},

	testInsertEntry: function(test){
		var database = new SQLManager.SQLManager();
		database.deleteUser(this.username, function(err, data){});
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){
			if (!err){ //there shouldn't be an error because there is no user with this username in db (deleted it)
				test.ok(true);
			} else {
				test.ok(false);
			}
			test.done();
			database.endConnection();
		});

	}


}