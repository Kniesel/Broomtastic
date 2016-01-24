var mysql = require('mysql');
var dbconfig = require('./dbconfig.js');

var connection;

var SQLManager = function(){
	connection = mysql.createConnection({
		host: dbconfig.host,
		user: dbconfig.user,
		password: dbconfig.password,
		database: dbconfig.database
	});

	connection.connect();
}

//Connect to db (only needed for testing)
SQLManager.prototype.connect = function() {
	connection.connect();
};

//End connection to db (only needed for testing)
SQLManager.prototype.endConnection = function() {
	connection.end();
};


//____________________________________________________________
//
// USERS
//____________________________________________________________


//Get all users
SQLManager.prototype.getAll = function(callback) {
	connection.query('SELECT * FROM users', function (err, result) {
		callback(err, result);
	});
};


//Read user by username
SQLManager.prototype.getUser = function(username, callback) {
	var queryString = 'SELECT * FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function (err, result) {
		callback(err, result[0]);
	});
};


//Write user into db
SQLManager.prototype.setUser = function(username, password, email, token, callback) {
	var queryString = 'INSERT INTO users (pk_username, password, email, token) VALUES (?, ?, ?, ?)';
	connection.query(queryString, [username, password, email, token], function (err, result) {
		callback(err, result);
	});
};



//Change username
SQLManager.prototype.changeUsername = function(username, newusername, callback) {
	var queryString = 'UPDATE users SET pk_username = ? WHERE pk_username = ?'
	connection.query(queryString, [newusername, username], function (err, result){
		callback(err, result);
	});
};

//Change password
SQLManager.prototype.changePassword = function(username, password, callback) {
	var queryString = 'UPDATE users SET password = ? WHERE pk_username = ?'
	connection.query(queryString, [password, username], function (err, result){
		callback(err, result);
	});
};

//Change email address
SQLManager.prototype.changeEmail = function(username, email, token, callback) {
	var queryString = 'UPDATE users SET email = ?, token = ? WHERE pk_username = ?'
	connection.query(queryString, [email, token, username], function (err, result){
		callback(err, result);
	});
};


//Delete user from db
SQLManager.prototype.deleteUser = function(username, callback) {
	var queryString = 'DELETE FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function (err, result){
		callback(err, result);
	})
};


//Delete token from db to confirm email address
SQLManager.prototype.confirmEmail = function(token, username, callback) {
	var queryString = 'UPDATE users SET token = NULL where token = ? AND pk_username = ?'
	connection.query(queryString, [token, username], function (err, result){
		callback(err, result);
	})
};




//____________________________________________________________
//
// PRODUCTS
//____________________________________________________________


//Get all products
SQLManager.prototype.getAllProducts = function(callback) {
	connection.query('SELECT * FROM products', function (err, result) {
		callback(err, result);
	});
};


//Get products from a certain category
SQLManager.prototype.getProductsByCategory = function(category, callback) {
	var queryString = 'SELECT * FROM products WHERE category = ?';
	connection.query(queryString, [category], function (err, result) {
		callback(err, result);
	});

};



module.exports.SQLManager = SQLManager