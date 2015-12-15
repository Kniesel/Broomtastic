//currently not in use

var http = require('http');
var fs = require('fs');
var config = require('../config')


startup = function(){
	console.log("FUNCTION controller/master.js startup()")

	//
	var serv = http.createServer(function(req, res){
		
		//send index.html site
		fs.readFile('./public/index.html', function(err, data){
			if(err)	{
					console.log(err); // always log errors
			} else {
				console.log("test");
				res.writeHead(200, {'content-type':'text/html'})
				res.write(data);
				res.end("eof")
			}
		});
		
	});

	serv.listen(config.port);
	

}

module.exports.startup = startup
module.exports.author = "Anja Bergmann & Johanna Kirchmaier"