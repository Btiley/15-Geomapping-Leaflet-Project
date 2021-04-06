//CREATE INITAL MAP FUNCTION
//----------------------------------------------------
//NY Coords: 38.575764, -121.478851
//Map Params (Centred on Chad to encompass entire map)
var mapCentre = [15.4542, 18.7322];
var mapZoom = 2;

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
        
        var earthquake = response["features"]

        earthquake.forEach(function(data){
          
          var lat = data["geometry"]["coordinates"][1];  
          var lng = data["geometry"]["coordinates"][0];
          var mag = data["properties"]["mag"];
          var loc = data["properties"]["place"];
          var date = data["properties"]["time"];

      //Create Markers, Tooltips and Legend. 
      //----------------------------------------------------

      //MARKERS
      //----------------------------------------------------

      //Function to create circle, takes input of colour and radius = magnitude
        var colors = ["lightgreen","green","yellow","orange","red","darkred"];
        function genCircle(col) {
          var circle = L.circle([lat, lng], {
            color: col,
            fillColor: col,
            fillOpacity: 0.75,
            radius: (mag *25000)
          }).addTo(myMap);
          
          circle.bindPopup(`<b> Time: </b> ${date} <br> <b> Magnitude :</b> ${mag} <br> <b> Place :</b> ${loc} <br> <b> Coordinates :</b>: ${lat},${lng}`)
        }

      //Colour changes based on degree of magnitude. 
          if (mag < 1) { 
            var circle = genCircle(colors[0])}

          else if (mag >= 1, mag < 2) {
            var circle = genCircle(colors[1])}

          else if(mag >= 2, mag < 3) {
            var circle = genCircle(colors[2])}

          else if(mag >= 3, mag < 4) {
            var circle = genCircle(colors[3])} 

          else if(mag >= 4, mag < 5){
            var circle = genCircle(colors[4])}

          else{
            var circle = genCircle(colors[5])}
          });

      //LEGEND
      //----------------------------------------------------
      //Set legend Position
      var legend = L.control({ position: "bottomleft", backgroundcolor: "white" });
      legend.onAdd = function() {
          var div = L
            .DomUtil
            .create("div", "info legend");
          var grades = [0, 1, 2, 3, 4, 5];
          var colors =  ['#98EE00','green','yellow','orange','red','darkred'];
          
            
      // Set Legend Content 
        for (var i = 0; i<grades.length; i++) {
          console.log(colors[i]);
          div.innerHTML +=
          '<i style= " background:' + colors[i] + ' " ></i>' + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
          }
        return div;
     
        };
      legend.addTo(myMap)
   
  });

  // div.innerHTML +="<i style='background: " + colors[0] + "'></i> " +grades[0] + (grades[0 + 1] ? "&ndash;" + grades[0 + 1] + "<br>" : "+");