var SQLManager = require('../model/SQLManager.js')
var express = require('express');
var app = express();
var database;

var ProductController = function(){
	database = new SQLManager.SQLManager();
}

//____________________________________________________________
//
// READ ALL PRODUCTS
//____________________________________________________________

ProductController.prototype.getAllProducts = function(callback){


	database.getAllProducts(function (err, data){
		if (err){
			console.log("[ERROR] ", error);
		} else {
			if (!data){
				console.log("[INFO] Sorry, something went wrong with the data.");
			} else {
				console.log("[INFO] Read all Products.");
			}
		}
		callback(err, data);
	});

}


//____________________________________________________________
//
// READ PRODUCTS BY CATEGORY 
//____________________________________________________________

ProductController.prototype.getProductsByCategory = function(category, callback){
	database.getProductsByCategory(category, function (err, data){
		if (err){
			console.log("[ERROR] ", error);
		} else {
			if (!data){
				console.log("[INFO] Sorry, something went wrong with the data.");
			} else {
				console.log("[INFO] Read all Products.");
			}
		}
		callback(err, data);
	});
}

module.exports.ProductController = ProductController