/*
Author: Neosha Narayanan

Uses Node to get MBTA data for Route 1 buses every 15 seconds for 1 hour


*/

var fetch = require('node-fetch');

var low = require('lowdb');
var fs  = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json'); // create new json file!!
// const adapter = new fs('db.json');
var db = low(adapter);

// init the data store and set defaults
db.defaults({ 'vehicles': [] }).write();


var url = "https://api-v3.mbta.com/vehicles?api_key=b71590178cb04823bffb3c3b1bf0725b&filter[route]=1&include=trip";
function makeCall(){

    vehicles = [];
    fetch(url) 
    .then(res => res.json())
    .then(json => {
        var length = json.data.length;
        for (var i = 0; i < length; i++){
            // for each bus, get some info
            var bus = json.data[i];

            var id = bus['id'];
            var label = bus['attributes']['label']; 
            var direction_id = bus['attributes']['direction_id'];
            var long = bus['attributes']['longitude'];
            var lat = bus['attributes']['latitude'];
         
            var post = {"id": id, "label": label, "direction_id": direction_id, "latitude": lat, "longitude": long};
            db.get('vehicles')
            .push(post)
            .write();
        }
        
    })

}

counter = 0;
numCycles = 3600/15;

function run(){
    if(counter < numCycles){
        makeCall();
        setTimeout(run, 15000);
    }
    counter++;
}

run();
