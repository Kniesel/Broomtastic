module.exports = {


	'signintag':'<div class=\"dropdown-content\"><form action=\"/login\" method=\"post\" id=\"loginform\"><p>Username</p><input class=\"inputforms\" type=\"text\" name=\"username\"><br><p>Password</p><input class=\"inputforms\" type=\"password\" name=\"password\"><input class=\"inputforms\" type=\"submit\" value=\"Login\"><a class=\"inputforms\" href=\"/register\">Register</a></form></div>',

	'loggedintag':'<div class=\"dropdown-content\"><form action=\"/logout\" method=\"post\" id=\"logoutform\"><input class=\"inputforms\" type=\"submit\" value=\"Logout\"></form></div>',

	'registerform':'<form action=\"/register\" method=\"post\" id=\"registerform\"><p class=\"title1\">Username</p><input class=\"registerinput\" type=\"text\" name=\"username\"><br><p class=\"title1\">Password</p><input class=\"registerinput\" type=\"password\" name=\"password\"><br><p class=\"title1\">Enter password again</p><input class=\"registerinput\" type=\"password\" name=\"password2\"><br><p class=\"title1\">E-Mail-Address (don\'t cheat, we will send you a registration e-mail!)</p><input class=\"registerinput\" type=\"text\" name=\"email\"><br><input class=\"registerinput\" type=\"submit\" value=\"Register\"></form>',

	'productfilter':'<p class=\"title1\">FILTER BY</p><p class=\"title1 title2\">Category</p><form action=\"products\" method=\"post\" class=\"filtercontent\" name=\"tabledata\"> <select name=\"category\"><option>Show all categories</option> <option>Balls</option> <option>Books</option> <option>Brooms</option> <option>Clothing</option></select><button type=\"button\" class=\"filtercontent\" onclick=\"testfunction()\">OK</button></form> ',

	'notworking':'<p id=\"notworking\"> </p>'

} 