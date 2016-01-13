#!/usr/bin/env node
var redis = require("redis")
var port = 6379
var db = redis.createClient(port, "127.0.0.1")

var key = "newt"
var person = "{\"age\":30,\"name\":\"newt\"}"

//Create a new person
db.set(key, person, function(err, result){
	console.log("CREATE\n")
	if(err){
		console.log(err)
	} else {
		console.log("Saved person " + key + "\n")
	}
})

//Read a person from the database
db.get(key, function(err, data){
	console.log("READ\n")
	if(err){
		console.log(err)
	} else {
		var result = JSON.parse(data)
		console.log("Read person " + key + ": ")
		console.log(result)
		console.log("\n")
	}
})

//Update a person in the database
db.get(key, function(err, data){
	console.log("UPDATE\n")
	if (err) {
		console.log(err)
	} else {
		var person = JSON.parse(data)
		console.log("Read person " + key)
		console.log(person)
		person.age += 1
		db.set(key, JSON.stringify(person))
		console.log("Updated person " + key)
		console.log(person)
		console.log("\n")
	}
})

//Delete a person from the database
db.del(key, function(err){
	console.log("DELETE\n")
	if (err){
		console.log(err)
	} else {
		console.log("Deleted person " + key)
	}
})


db.end()
