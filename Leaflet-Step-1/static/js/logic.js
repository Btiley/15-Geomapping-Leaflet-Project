//CREATE INITAL MAP FUNCTION
//----------------------------------------------------

//Map Params (Centred on West Coast USA)
var mapCentre = [38.575764, -121.478851]
var mapZoom = 5

function createMap(){
// Initialize map object
var myMap = L.map("map", {
    center: mapCentre,
    zoom: mapZoom
  });
  
//Add 'streetmap' tile layer

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


//IMPORT DATA
//----------------------------------------------------

//Get JSON and scrape coords of earthquake.
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(response) {
    var lat = response["features"][0]["geometry"]["coordinates"][1];  
    var lng = response["features"][0]["geometry"]["coordinates"][0];
    
    var mag = 3
    var loc = response["features"][0]["properties"]["place"];

    console.log(`The Earthquake occured ${loc} (${lng},${lat}) and had a magnitude of ${mag}`);
//response["features"][0]["properties"]["mag"];
//Create Markers, Tooltips and Legend. 
//----------------------------------------------------

//MARKERS
//----------------------------------------------------
//Circle markers with radius = mag, gradient colour, darker = higher mag.
//Mag Ranges: 0-1 Green ,1-2 LimeGreen,2-3 Yellow,3-4 Orange ,4-5 Dark Orange, 5+ Red
//If mag < 1, mag >= 1 < 2, mag >= 2 < 3, mag >= 3 < 4, mag >= 4 < 5, >= 5
function genCircle(col) {
  L.circle([lat, lng], {
    color: col,
    fillColor: col,
    fillOpacity: 0.75,
    radius: (mag *50000)
  }).addTo(myMap);

}
if (mag < 1) {
  console.log("mag < 1");
  var circle = genCircle("lightgreen")
  //circle.bindPopup(`<b>Magnitude</b>: ${mag} <br> <b>Coordinates</b>: ${lat},${lng} <br> <b>Place</b>: ${loc}`);

}
else if (mag >= 1, mag < 2) {
  console.log("mag >= 1 < 2");
  var circle = genCircle("green")
  //circle.bindPopup(`<b>Magnitude</b>: ${mag} <br> <b>Coordinates</b>: ${lat},${lng} <br> <b>Place</b>: ${loc}`);

}
else if(mag >= 2, mag < 3) {
  console.log("mag >= 2 < 3");
  var circle = genCircle("yellow")
  //circle.bindPopup(`<b>Magnitude</b>: ${mag} <br> <b>Coordinates</b>: ${lat},${lng} <br> <b>Place</b>: ${loc}`);

}
else if(mag >= 3, mag < 4) {
  console.log("mag >= 3 < 4")
  
  var circle = genCircle("orange")
  
  //circle.bindPopup(`<b>Magnitude</b>: ${mag} <br> <b>Coordinates</b>: ${lat},${lng} <br> <b>Place</b>: ${loc}`);

}
else if(mag >= 4, mag < 5){
  console.log("mag >= 4 < 5")  
  
  var circle = genCircle("darkorange")
  
  //circle.bindPopup(`<b>Magnitude</b>: ${mag} <br> <b>Coordinates</b>: ${lat},${lng} <br> <b>Place</b>: ${loc}`);

}
else{
  console.log("mag > 5")
  
  var circle = genCircle("red")
  
  //circle.bindPopup(`<b>Magnitude</b>: ${mag} <br> <b>Coordinates</b>: ${lat},${lng} <br> <b>Place</b>: ${loc}`);

}

// var circle = L.circle([lat, lng], {
//   color: "green",
//   fillColor: "green",
//   fillOpacity: 0.75,
//   radius: (mag *50000) 
// }).addTo(myMap);

// Binding a pop-up to our marker 



});

//TOOL TIP
//----------------------------------------------------

//Tool tips on Mouse over with local, lat/long and magnitude.

//LEGEND
//----------------------------------------------------

//Legend to show gradient of magnitudes and values.

//Loop through all JSON objects to log each parameter. 
};

createMap();