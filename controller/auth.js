module.exports = {
	//Redirects to home if user is not logged in
	loggedIn: function(req, res, next){
		if (req.session == 1){
			return next();
		}
		res.redirect('/');
	}
}