var SQLManager = require('../model/SQLManager.js')
var express = require('express');
var app = express();
var database;

var ShoppingowlController = function(){
	database = new SQLManager.SQLManager();
}

//Add product to shopping owl
ShoppingowlController.prototype.addProduct = function(username, product, callback) {
	database.getProductByName(product, function(err, result){
		if (err){
			callback(err);
		} else {
			var productid = result.pk_productid;
			database.addProductToShoppingowl(username, productid, 1, function(err, result){
				if (err){
					//If product is already in shopping owl --> increase quantity
					if (err.message.substring(0, 12) === "ER_DUP_ENTRY"){
							err = null;
							database.increaseQuantity(username, productid, function(err, result){
							callback(err);
						});
					} else {
						console.log("[ERROR] Couldn't add product to owl: ", err);
					}
				} else {
					console.log("[INFO] Added product to shopping owl.");
				}
				callback(err);
			});
		}
	});
	
};

//Show all products in shopping owl
ShoppingowlController.prototype.getShoppingOwl = function(username, callback) {
	database.getMyShoppingowl(username, function(err, data){
		if(err){
			console.log("[ERROR] ", err);
		}
		callback(err, data);
	});
};


//Delete product from shopping owl
ShoppingowlController.prototype.deleteProduct = function(username, product, callback) {
	database.getProductByName(product, function(err, result){
		if (err){
			callback(err);
		} else {
			var productid = result.pk_productid;
			database.deleteProductFromShoppingowl(username, productid, function(err, result){
				if (err){
					console.log("[ERROR] ", err);
				} else {
					console.log("[INFO] Deleted product from shopping owl.");
				}
				callback(err);
			});
		}
	});
};


module.exports.ShoppingowlController = ShoppingowlController