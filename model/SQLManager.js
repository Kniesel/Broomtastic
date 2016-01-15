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

SQLManager.prototype.getUser = function(username) {
	var username = username;
	var queryString = 'SELECT * FROM users WHERE pk_username = ?';
	connection.query(queryString, [username], function(err, rows, fields) {
		if (!err){
			//Check if user exists
			if (rows == 0){
				console.log('No user with username ' + username + ' in database.')
			} else {
				console.log('The solution is: ', rows);
			}
		}else{
			console.log('Error while performing Query.');
		}
	});
};


SQLManager.prototype.setUser = function(username, password, email, token) {
	var username = username;
	var queryString = 'INSERT INTO users (pk_username, password, email, token) VALUES (?, ?, ?, ?)';
	connection.query(queryString, [username, password, email, token], function(err, rows, fields) {
		if (!err){
			//Check if user exists
			var user = false;
			if (rows == 0){ //No user with username in db
				console.log('No user with username ' + username + ' in database.');
			} else {
				console.log('Username vergeben!');
				user = true;
			}
		}else{
			console.log('Error while performing Query.');
		}
	});
};



module.exports.SQLManager = SQLManager