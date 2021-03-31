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
}

createMap() 

//IMPORT DATA
//----------------------------------------------------

//Get JSON and scrape coords of earthquake.
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(url, function(response) {
    var lng = response["features"][0]["geometry"]["coordinates"][0];
    var lat = response["features"][0]["geometry"]["coordinates"][1];
    var mag = response["features"][0]["properties"]["mag"];
    var loc = response["features"][0]["properties"]["place"];

    console.log(`The Earthquake occured ${loc} (${lng},${lat}) and had a magnitude of ${mag}`);

//Create Markers, Tooltips and Legend. 
//----------------------------------------------------

//MARKERS
//----------------------------------------------------

//Circle markers with radius = mag, gradient colour, darker = higher mag.

//TOOL TIP
//----------------------------------------------------

//Tool tips on Mouse over with local, lat/long and magnitude.

//LEGEND
//----------------------------------------------------

//Legend to show gradient of magnitudes and values.

//Loop through all JSON objects to log each parameter. 
});

