var SQLManager = require('../model/SQLManager.js')
var express = require('express');
var app = express();
var database;

var ShoppingowlController = function(){
	database = new SQLManager.SQLManager();
}