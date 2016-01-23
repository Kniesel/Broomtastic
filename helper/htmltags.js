module.exports = {


	'signintag':'<div class=\"dropdown-content\"><form action=\"/login\" method=\"post\" id=\"loginform\"><p>Username</p><input class=\"inputforms\" type=\"text\" name=\"username\"><br><p>Password</p><input class=\"inputforms\" type=\"password\" name=\"password\"><input class=\"inputforms\" type=\"submit\" value=\"Login\"><a class=\"inputforms\" href=\"./register.html\">Register</a></form></div>',

	'loggedintag':'<div class=\"dropdown-content\"><form action=\"/logout\" method=\"post\" id=\"logoutform\"><input class=\"inputforms\" type=\"submit\" value=\"Logout\"></form></div>',

	'registerform':'<form action=\"/register\" method=\"post\" id=\"registerform\"><p>Username</p><input class=\"inputforms\" type=\"text\" name=\"username\"><p>Password</p><input class=\"inputforms\" type=\"password\" name=\"password\"><p>Enter password again</p><input class=\"inputforms\" type=\"password\" name=\"password2\"><p>E-Mail-Address (do not cheat, we will send you a registration e-mail!)</p><input class=\"inputforms\" type=\"text\" name=\"email\"><input class=\"inputforms\" type=\"submit\" value=\"Register\"></form>',

	'productfilter':'<p class=\"title1\">FILTER BY</p><p class=\"title1 title2\">Category</p><form method=\"post\" class=\"filtercontent\" name=\"tabledata\"> <select name=\"category\"><option>Show all categories</option> <option>Balls</option> <option>Books</option> <option>Brooms</option> <option>Clothing</option></select><button type=\"button\" class=\"filtercontent\" onclick=\"testfunction()\">OK</button></form> ',

	'notworking':'<p id=\"notworking\"> </p>'

} 