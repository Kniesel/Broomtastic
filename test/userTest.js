module.exports = {
	setUp: function(callback){
		this.foo = 'bar';
		callback();
	};

	tearDown: function(callback){
		callback();
	};

	testUser: function(test){
		test.equals(this.foo, 'bar');
		test.done();
	};

}