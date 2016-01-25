module.exports = {


	'signintag':'<div class=\"dropdown-content\"><form action=\"/login\" method=\"post\" id=\"loginform\"><p>Username</p><input class=\"inputforms\" type=\"text\" name=\"username\" placeholder=\"username\" required><br><p>Password</p><input class=\"inputforms\" type=\"password\" name=\"password\" placeholder=\"password\" required><input class=\"inputforms\" type=\"submit\" value=\"Login\"><a class=\"inputforms\" href=\"/register\">Register</a></form></div>',

	'loggedintag':'<div class=\"dropdown-content\"><form action=\"/logout\" method=\"post\" id=\"logoutform\"><input class=\"inputforms\" type=\"submit\" value=\"Logout\"></form><form action=\"/profile\" method=\"post\"><input class=\"inputforms\" type=\"submit\" value=\"Your profile\"></form></div>',

	'registerform':'<form action=\"/register\" method=\"post\" id=\"registerform\"><p class=\"title1\">Username</p><input class=\"registerinput\" type=\"text\" name=\"username\" placeholder=\"username\" required><br><p class=\"title1\">Password</p><input class=\"registerinput\" type=\"password\" name=\"password\" placeholder=\"password\" required><br><p class=\"title1\">Enter password again</p><input class=\"registerinput\" type=\"password\" name=\"password2\" placeholder=\"repeat password\" required><br><p class=\"title1\">E-Mail-Address (don\'t cheat, we will send you a registration e-mail!)</p><input class=\"registerinput\" type=\"email\" name=\"email\" placeholder=\"email address\" required><br><input class=\"registerinput\" type=\"submit\" value=\"Register\"></form>',

	'productfilter':'<p class=\"title1\">FILTER BY</p><p class=\"title1 title2\">Category</p><form action=\"/products\" method=\"post\" class=\"filtercontent\" name=\"tabledata\"> <select name=\"category\"><option value=\"all\">Show all categories</option> <option>Balls</option> <option>Books</option> <option>Brooms</option> <option>Clothing</option></select><input type=\"submit\" value=\"Okay\"></form> ',

	'notworking':'<p id=\"notworking\"> </p>',

	'deleteUserForm':'<p class=\"title1\">Delete Account</p><br><p id=\"deleteFeedback\"></p><input id=\"deletePassword\" class=\"registerinput\" type=\"password\" name=\"password\" placeholder=\"Password\" required><br><input class=\"registerinput\" type=\"button\" id=\"deleteButton\" value=\"Submit\" onclick=deleteUser()><br><br>'

} 