var express = require('express');
var app = express();



var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Broomtastic is listening on http://%s:%s', host, port);
	app.use(express.static('public'));

	//404-Error-Page
	app.use(function(req, res, next){
		res.status(404).send('Sorry cannot find');
	});

	//Error-Handler
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.status(500).send('Suddenly a wild error appears');
	});




});
