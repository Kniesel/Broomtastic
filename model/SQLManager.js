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


SQLManager.prototype.getAll = function() {
	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if (!err){
			console.log('[INFO] The solution is: ', rows);
		} else {
			console.log('[ERROR] Error while performing Query.', err
				);
		}
	});
};

//check if username is already taken (for registration)
SQLManager.prototype.getUsername = function(username) {
	var queryString = 'SELECT * FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function (err, rows, fields) {
		if (!err){
			//Check if user exists
			var user = false;
			if (rows != 0){
				user = true;
				console.log('[INFO] Username already taken: ', rows);
			} else {
				console.log('[INFO] No user with username ' + username + ' in database.')
			}
		}else{
			console.log('Error while performing Query.', err);
		}
	});
};


SQLManager.prototype.getUser = function(username, callback) {
	var queryString = 'SELECT * FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function (err, result) {
		if (!err){
			//Check if user exists
			if (!result[0]){
				callback(null, null);
			} else {
				callback(null, result[0]);
			}
		}else{
			console.log('[ERROR] Error while performing Query.', err);
			callback(err, null);
		}
	});
};

SQLManager.prototype.setUser = function(username, password, email, token, callback) {
	var queryString = 'INSERT INTO users (pk_username, password, email, token) VALUES (?, ?, ?, ?)';
	connection.query(queryString, [username, password, email, token], function (err, result) {
		if (!err){
			callback(null, true);
		}else{
			callback(err, null);
		}
	});
};

SQLManager.prototype.deleteUser = function(username, password, callback) {
	var queryString = 'DELETE FROM users WHERE pk_username = ?';
	connection.query(deleteString, [username], function(err, result){
		if (err){
			callback(err, false);
		} else {
			callback(null, true);
		}
	})
};


SQLManager.prototype.confirmEmail = function(token, callback) {
	var queryString = 'UPDATE users SET token = NULL where token = ?'
	connection.query(queryString, [token], function(err, result){
		if (!err){
			callback (null, true);
		} else {
			callback(err, false);
		}
	})
};






SQLManager.prototype.readAllProducts = function(callback) {
	var queryString = 'SELECT * FROM products';
	connection.query(queryString, function(err, result){
		if (!err){
			callback(null, result);
		} else {
			callback(err, null);
		}
	})
};

SQLManager.prototype.readProductsByCategory = function(category, callback) {
	var queryString = 'SELECT * FROM proucts WHERE category = ?';
	connection.query(queryString, [category], function(err, result){
		if (!err){
			callback(null, result);
		} else {
			callback (err, null);
		}
	})
};

module.exports.SQLManager = SQLManager