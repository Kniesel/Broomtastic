var SQLManager = require('../model/SQLManager.js')
var express = require('express');
var app = express();
var database;

var ShoppingowlController = function(){
	database = new SQLManager.SQLManager();
}

//Add product to shopping owl
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

//Show all products in shopping owl
ShoppingowlController.prototype.getShoppingOwl = function(username, callback) {
	database.getMyShoppingowl(username, function(err, data){
		if(err){
			console.log("[ERROR] ", err);
		} else {
			console.log("[INFO] Data from shopping owl: ", data);
		}
		callback(err, data);
	});
};

//Change quantity of a selected product in shopping owl
ShoppingowlController.prototype.updateProduct = function(username, productid, quantity, callback) {
	database.changeQuantity(username, productid, quantity, function(err, result){
		if (err){
			console.log("[ERROR] ", err);
		} else {
			console.log("[INFO] Changed quantity of a product in shopping owl.");
		}
		callback(err);
	})
};

//Delete product from shopping owl
ShoppingowlController.prototype.deleteProduct = function(username, productid, callback) {
	database.deleteProductFromShoppingowl(username, productid, function(err, result){
		if (err){
			console.log("[ERROR] ", err);
		} else {
			console.log("[INFO] Deleted product from shopping owl.");
		}
		callback(err);
	})
};


module.exports.ShoppingowlController = ShoppingowlController