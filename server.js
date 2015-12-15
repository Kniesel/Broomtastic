var express = require('express');
var app = express();

var Auth0Strategy = require('passport-auth0');
var passport = require('passport');



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



var strategy = new Auth0Strategy({
   domain:       'your-domain.auth0.com',
   clientID:     'your-client-id',
   clientSecret: 'your-client-secret',
   callbackURL:  '/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

	// passport.use(new BasicStrategy(
	//   function(userid, password, done) {
	//     User.findOne({ username: userid }, function (err, user) {
	//       if (err) { return done(err); }
	//       if (!user) { return done(null, false); }
	//       if (!user.verifyPassword(password)) { return done(null, false); }
	//       return done(null, user);
	//     });
	//   }
	// ));

});
