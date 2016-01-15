var mysql = require('mysql');
var dbconfig = require('./dbconfig.js');

var connection

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
		if (!err)
			console.log('The solution is: ', rows);
		else
			console.log('Error while performing Query.');
	});
};

//check if username is already taken (for registration)
SQLManager.prototype.getUsername = function(username) {
	var queryString = 'SELECT * FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function(err, rows, fields) {
		if (!err){
			//Check if user exists
			var user = false;
			if (rows != 0){
				user = true;
				console.log('REGISTRATION Username already taken: ', rows);
			} else {
				console.log('REGISTRATION No user with username ' + username + ' in database.')
			}
		}else{
			console.log('Error while performing Query.');
		}
	});
};


//check username and password combination for login
SQLManager.prototype.getUser = function(username, password) {
	var queryString = 'SELECT * FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function(err, rows, fields) {
		if (!err){
			//Check if user exists
			var user = false;
			if (rows == 0){
				console.log('LOGIN No user with username ' + username + ' in database.')
			} else {
				user = true;
				console.log('LOGIN The solution is: ', rows);
				return rows;
			}
		}else{
			console.log('Error while performing Query.');
		}
	});
};


SQLManager.prototype.setUser = function(username, password, email, token) {
	var queryString = 'INSERT INTO users (pk_username, password, email, token) VALUES (?, ?, ?, ?)';
	connection.query(queryString, [username, password, email, token], function(err, rows, fields) {
		if (!err){
			console.log('Entered user into db.')
		}else{
			console.log('Error while performing Query.');
		}
	});
};



module.exports.SQLManager = SQLManager