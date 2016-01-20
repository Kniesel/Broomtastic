var SQLManager = require('../model/SQLManager.js')
var Mailer = require('../helper/mailfordummies.js');
var crypto = require('crypto');
var passwordHash = require('password-hash');
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





//____________________________________________________________
//
// READ PRODUCTS BY CATEGORY 
//____________________________________________________________
