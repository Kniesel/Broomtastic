#!/usr/bin/env node


var config = require('./config.js')

console.log("-------------------------------------------------")
console.log("Server starting on Port " + config.port)
console.log("Projectname: Broomtastic")

var theapp = require('./controller/master.js')
theapp.startup()

console.log("written by: " + theapp.author+"\n")
console.log("-------------------------------------------------")