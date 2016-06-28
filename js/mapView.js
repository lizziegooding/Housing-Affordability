//Initialize a new map object inside of the #map div
function initMap(){
  console.log('initMap');
  window.map = new mapboxgl.Map({
    container: 'map', //HTML element to initialize the map in (or element id as string)
    zoom: 3.15,
    // minZoom: 1, //Default of 0 (world)
    // maxZoom: 12, //Default of 20 (local)
    center: [-80.7129,40.0902], //LatLng array in decimal degrees
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
                  [0, '#ffffb2'],
                  [50000, '#fed976'],
                  [100000, '#feb24c'],
                  [150000, '#fd8d3c'],
                  [200000, '#fc4e2a'],
                  [250000, '#e31a1c'],
                  [300000, '#b10026'],
          ]
        },
        'fill-opacity':  1}
    });
  });
}

function setPaint(userSalary){
  document.getElementById('mapHTML').contentWindow.map.setPaintProperty('myJSON', 'fill-color', colorMap(userSalary, colorArray));
}

//Change map based on user input
//map.setPaintProperty('myJSON', 'fill-color', colorMap(60000, colorArray));
