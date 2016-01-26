var SQLManager = require('../model/SQLManager.js');

module.exports = {

	//before each test
	setUp: function(callback){
		this.productid = '20';
		this.productname = 'Testproduct';
		this.category = 'Balls'
		this.price = '500';
		callback();
	},

	//after each test (after test.done())
	tearDown: function(callback){
		callback();
	},

// tests if all products are returned
	testGetAll: function(test){
		var database = new SQLManager.SQLManager();

		database.getAllProducts(function(err, data){
			if (!err){
				test.ok(true);
			} else {
				test.ok(false);
			}
			test.done();
			database.endConnection();
		});
	},

// tests if product by category is returned
	testGetProductByCategory: function(test){
		var database = new SQLManager.SQLManager();

		database.getProductsByCategory(this.category, function(err, data){
			if (!err){
				test.ok(true);
			} else {
				test.ok(false);
			}
			test.done();
			database.endConnection();
		});
	}


}