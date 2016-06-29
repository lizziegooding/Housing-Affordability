//Declare API access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

//Initialize a new map object inside of the #map div
function initMap(){
  console.log('initMap');
  window.map = new mapboxgl.Map({
    container: 'map', //HTML element to initialize the map in (or element id as string)
    zoom: 3.15,
    // minZoom: 1, //Default of 0 (world)
    // maxZoom: 12, //Default of 20 (local)
    center: [-80.7129,40.0902], //LatLng array in decimal degrees
    style: 'mapbox://styles/lizziegooding/ciq1cofi8003ybknqhk5pfruz'
    //Basemap style; can be a preset from mapbox or a user defined style
  });
  map.addControl(new mapboxgl.Navigation());

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
      'source-layer': 'myJSON',
      'layout': { visibility: 'visible'},
      'paint': {
        'fill-outline-color': '#DEDEDE',
        'fill-color': {
          property: 'aPayment',
          stops: [
            // Greens ['#edf8e9','#bae4b3','#74c476','#238b45']
            // Reds ['#fee5d9','#fcae91','#fb6a4a','#cb181d']
                  [0, '#238b45'], //0-15% affordable
                  [8100, '#74c476'], //16-20% affordable
                  [10800, '#bae4b3'], //21-25% affordable
                  [13500, '#edf8e9'], //26-30% affordable
                  [16200, '#fee5d9'], //31-35% unaffordable
                  [18900, '#fcae91'], //36-40% unaffordable
                  [21600, '#fb6a4a'], //41-45% unaffordable
                  [24300, '#cb181d'], //>45% unaffordable
          ]
        },
        'fill-opacity':  1}
    },'admin-2-boundaries', 'admin-3-4-boundaries','admin-2-boundaries-bg', 'admin-3-4-boundaries-bg','place-city-lg-s','state-label-md', 'place-city-lg-n');
    // Create a popup, but don't add it to the map yet.
    // map.addSource('basemap', {
    //   'type': 'vector',
    //   'url': 'mapbox://styles/lizziegooding/ciq191ykc003ubem5qks9wnek'
    // });
    //
    // //Add loaded data and style
    // map.addLayer({
    //   'id': 'basemap',
    //   'type': 'fill',
    //   'source': 'basemap',
    //   'source-layer': 'basemap',
    // });
  });
  //Create a new popup
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['myJSON'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    // });

    if (!features.length) {
      popup.remove();
      return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(map.unproject(e.point))
        .setHTML(feature.properties.Geography)
        .addTo(map);
  });
}
// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
// map.on('click', function (e) {
//     var features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
//     if (!features.length) {
//         return;
//     }
//
//     var feature = features[0];
//
//     var popup = new mapboxgl.Popup()
//         .setLngLat(map.unproject(e.point))
//         .setHTML(feature.properties.name)
//         .addTo(map);
// });
//
// // Use the same approach as above to indicate that the symbols are clickable
// // by changing the cursor style to 'pointer'.
// map.on('mousemove', function (e) {
//     var features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
//     map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
// });

function setPaint(userSalary){
  document.getElementById('mapHTML').contentWindow.map.setPaintProperty('myJSON', 'fill-color', colorMap(userSalary, colorArray));
}

//Change map based on user input
//map.setPaintProperty('myJSON', 'fill-color', colorMap(60000, colorArray));
