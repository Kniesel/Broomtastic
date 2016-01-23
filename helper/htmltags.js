module.exports = {

	// "signintag":"<div class>",
	// "loggedintag":"<div class>"


	'signintag':'<div class=\"dropdown-content\"><form action=\"/login\" method=\"post\" id=\"loginform\"><p>Username</p><input class=\"inputforms\" type=\"text\" name=\"username\"><br><p>Password</p><input class=\"inputforms\" type=\"password\" name=\"password\"><input class=\"inputforms\" type=\"submit\" value=\"Login\"><a class=\"inputforms\" href=\"/register\">Register</a></form></div>',

	'loggedintag':'<div class=\"dropdown-content\"><form action=\"/logout\" method=\"post\" id=\"logoutform\"><input class=\"inputforms\" type=\"submit\" value=\"Logout\"></form></div>'
} 