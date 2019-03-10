/*

Author: Neosha Narayanan
Reads db.json to get vehicle information
Counts unique bus IDs and stores them in an array

*/


var low = require('lowdb');
var fs  = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json'); 
// const adapter = new fs('db.json');
var db = low(adapter);

// read json file
db.defaults({ vehicles : []}).write();
var vehicles_data = db.get('vehicles').value();


//console.log(vehicles_data);


function getUniqueIDs(){
    var num_vehicles = vehicles_data.length; // get number of vehicles
    var uniqueIDs = [];
    var duplicates = [];

    // iterates through each vehicle in vehicles_data
    vehicles_data.forEach(function(element, index){
        var id = element['id'];
        //console.log(id);

        if(index === 0){ // push the first element into unique IDs
            uniqueIDs.push(id);
        }else{
            var notUnique = uniqueIDs.includes(id); // returns false if the ID is not in the array already
           
            if(notUnique === false){
               uniqueIDs.push(id);
            }
        }
    });
    console.log("uniqueIDs = " + JSON.stringify(uniqueIDs));

    return(uniqueIDs);
}

getUniqueIDs();



