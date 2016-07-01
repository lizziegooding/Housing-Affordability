//Declare access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

//Initialize a new map object inside of the #map div
function initMap(){
  console.log('initMap');
  var map = new mapboxgl.Map({
    container: 'map', //HTML element to initialize the map in (or element id as string)
    zoom: 3,
    // minZoom: 1, //Default of 0 (world)
    // maxZoom: 12, //Default of 20 (local)
    center: [-95.7129, 37.0902], //LatLng array in decimal degrees
    style: 'mapbox://styles/mapbox/outdoors-v9' //Basemap style; can be a preset from mapbox or a user defined style
  });

  //Once the map has loaded
  map.on('load', function () {
    console.log('load data');
    //Create new GeoJSON layer 'myJSON'
    map.addSource('myJSON', {
      'type': 'geojson',
      'data': myJSON
    });

    //Add loaded data and style
    map.addLayer({
      'id': 'myJSON',
      'type': 'fill',
      'source': 'myJSON',
      // 'source-layer': 'myJSON',
      'layout': { visibility: 'visible'},
      'paint': {
        'fill-outline-color': '#FFF',
        'fill-color': {
          property: 'Median_Hom',
          stops: [
                  [0, '#F2F12D'],
                  [50000, '#EED322'],
                  [100000, '#E6B71E'],
                  [150000, '#DA9C20'],
                  [200000, '#CA8323'],
                  [250000, '#B86B25'],
                  [300000, '#A25626'],
                  [500000, '#8B4225'],
                  [750000, '#723122']
          ]
        },
        'fill-opacity':  1}
    });
    //Change map based on user input
    //map.setPaintProperty('myJSON', 'fill-color', colorMap(60000, colorArray));
  });
}
