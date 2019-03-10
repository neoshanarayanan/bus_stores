/*
Author: Neosha Narayanan
Reads db.json and counts number of entries (i.e., number of vehicles)

*/


var low = require('lowdb');
var fs  = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json'); // create new json file!!
// const adapter = new fs('db.json');
var db = low(adapter);

db.defaults({ vehicles : []}).write();


var vehicles_data = db.get('vehicles').value();
console.log(vehicles_data);

var num_vehicles = vehicles_data.length;
console.log("num_vehicles = " + JSON.stringify(num_vehicles));



