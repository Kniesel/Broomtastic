var http = require('http');
var fs = require('fs');
var config = require('../config');
var registration = require ('../public/js/myscript.js');
var express = require('express');
var app = express();
var UserController = require ('./user_contr.js');
var bodyParser = require ('body-parser');

startup = function(){
	console.log("Starting server ...")

	app.use(express.static('public'));

	app.use(bodyParser());

	//User Registration
	app.post('/register', function(req, res){
		console.log("posting form")
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var email = req.body.email;
		if (password === password2){
			res.redirect("/");
			handlerController = new UserController.UserController(username, password, email);
		} else {
			res.send("Registration error: Your entered passwords don't match.");
		}
	})

	//User Login
	app.post('/login', function(req, res){
		console.log("posting form")
		var password = req.body.password;
		var username = req.body.username;
		handlerController = new UserController.UserController(username, password);
		
	})

	//404-Error-Page
	app.use(function(req, res, next){
		res.status(404).send('404 - Sorry cannot find page ' + req.url);
	});

	//Error-Handler
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).send('Suddenly a wild error appears');
	});

	var server = app.listen(config.port, function () {
		var host = config.server;
		var port = config.port;

		console.log('Broomtastic is listening on http://%s:%s', host, port);
	})

}


module.exports.startup = startup
module.exports.author = "Anja Bergmann & Johanna Kirchmaier"