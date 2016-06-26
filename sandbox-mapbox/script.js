//Declare access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';
//Initialize a new map object inside of the #map div
var map = new mapboxgl.Map({
  container: 'map', //HTML element to initialize the map in (or element id as string)
  minZoom: 8, //Default of 0 (world)
  maxZoom: 12, //Default of 20 (local)
  center: [-122.6765, 45.5231], //LatLng array in decimal degrees
  style: 'mapbox://styles/mapbox/outdoors-v9' //Basemap style; can be a preset from mapbox or a user defined style
});

//Once the map has loaded
map.on('load', function () {
  //Create new GeoJSON layer 'SFaffordHex'
  map.addSource('SFaffordHex', {
    'type': 'geojson',
    'data': SFaffordHex
  });

  //Add loaded data and style
  map.addLayer({
    'id': 'SFaffordHex',
    'type': 'fill',
    'source': 'SFaffordHex',
    'source-layer': 'SFaffordHex',
    'paint': {
      'fill-outline-color': '#484896',
      'fill-color': '#6e599f',
      'fill-color': {
        property: 'affd20_14',
        stops: [
                [0, '#F2F12D'],
                [0.2, '#EED322'],
                [0.3, '#E6B71E'],
                [0.4, '#DA9C20'],
                [0.5, '#CA8323'],
                [0.6, '#B86B25'],
                [0.7, '#A25626'],
                [0.8, '#8B4225'],
                [0.9, '#723122']
        ]
      },
      'fill-opacity': 0.75 }
  });
});
