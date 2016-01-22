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
		//Make sure there is a user called Ted in the db
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){});
		//Try to enter Ted again --> should throw error as no duplicate entries are allowed
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){
			if (err){
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
		//make sure there is no user called Ted in the db
		database.deleteUser(this.username, function(err, data){});
		//enter Ted into db
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){
			if (!err){ //there shouldn't be an error because there is no user with this username in db (if there was one, they were deleted in the former query)
				test.ok(true);
			} else {
				test.ok(false);
			}
			test.done();
			database.endConnection();
		});
	},

	testDeleteEntry: function(test){
		var database = new SQLManager.SQLManager();
		//make sure there is a user called Ted in the db
		database.setUser(this.username, this.password, this.email, this.token, function(err, data){});
		//delete Ted
		database.deleteUser(this.username, function(err, data){
			if (!err){
				test.ok(true);
			} else {
				test.ok(false);
			}
			test.done();
			database.endConnection();
		})

	}


}