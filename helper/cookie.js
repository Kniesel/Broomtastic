console.log("TODO \"Documentation\"")
console.log("TODO  add at least one line of description for EVERY FILE")

function Cookie(name,v){
	this.name = name
	this.value = v
	var expireOn = new Date()
	expireOn.setDate( expireOn.getDate()+3) // +3 means expire in 3 days
	this.expires=expireOn.toUTCString()
}

Cookie.prototype.toString = function(){
	var result = this.name + " = " + this.value;
	if(this.expires)	result += "; expires="+this.expires;
	
	return result;
}

module.exports = Cookie