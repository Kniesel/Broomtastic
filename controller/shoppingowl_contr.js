var SQLManager = require('../model/SQLManager.js')
var express = require('express');
var app = express();
var database;

var ShoppingowlController = function(){
	database = new SQLManager.SQLManager();
}


ShoppingowlController.prototype.addProduct = function(username, productid, quantity, callback) {
	database.addProductToShoppingowl(username, productid, quantity, function(err, result){
		if (err){
			console.log("[ERROR] ", err);
		} else {
			console.log("[INFO] Added product to shopping owl.");
		}
		callback(err);
	})
};