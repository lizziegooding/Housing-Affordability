//Declare API access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

//Initialize a new map object inside of the #map div
function initMap(callback, initialSalary, source){
  console.log('initMap');
  window.map = new mapboxgl.Map({
    container: 'map', //HTML element to initialize the map in (or element id as string)
    zoom: 3.15,
    minZoom: 1, //Default of 0 (world)
    maxZoom: 9, //Default of 20 (local)
    center: [-80.7129,40.0902], //LatLng array in decimal degrees
    style: 'mapbox://styles/lizziegooding/ciq1cofi8003ybknqhk5pfruz'
    //Basemap style; can be a preset from mapbox or a user defined style
  });
  // map.addControl(new mapboxgl.Navigation());
  map.addControl(new mapboxgl.Navigation({position: 'bottom-left'}));
  //Once the map has loaded
  map.on('load', function () {
    console.log('load data');
    //Create new GeoJSON layer 'affordCountyMHV'
    map.addSource('affordCountyMHV', {
      'type': 'geojson',
      'data': affordCountyMHV
    });

    map.addSource('counties', {
      'type': 'vector',
      'url': 'mapbox://mapbox.82pkq93d'
    });

    //Add loaded data and style
    map.addLayer({
      'id': 'affordCountyMHV',
      'type': 'fill',
      'source': 'affordCountyMHV',
      'source-layer': 'affordCountyMHV',
      'layout': { visibility: 'visible'},
      'paint': {
        'fill-color': '#FFF',
          // property: 'aPayment',
          // stops: [
            // Greens ['#edf8e9','#bae4b3','#74c476','#238b45']
            // Reds ['#fee5d9','#fcae91','#fb6a4a','#cb181d']
        //           [0, '#238b45'], //0-15% affordable
        //           [8100, '#74c476'], //16-20% affordable
        //           [10800, '#bae4b3'], //21-25% affordable
        //           [13500, '#edf8e9'], //26-30% affordable
        //           [16200, '#fee5d9'], //31-35% unaffordable
        //           [18900, '#fcae91'], //36-40% unaffordable
        //           [21600, '#fb6a4a'], //41-45% unaffordable
        //           [24300, '#cb181d'], //>45% unaffordable
        //   ]
        // },
        'fill-opacity':  1}
    },'admin-3-4-boundaries-bg');
    console.log('Added main affordCountyMHV layer');
    map.addLayer({
      'id': 'counties',
      'type': 'fill',
      'source': 'counties',
      'source-layer': 'original',
      'paint': {
        'fill-color': 'rgba(0,0,0,0)'
      }
    });
    map.addLayer({
      'id': 'counties-highlighted',
      'type': 'fill',
      'source': 'counties',
      'source-layer': 'original',
      'paint': {
        'fill-color': '#FFF',
        'fill-opacity': 0.7
      },
      'filter': ['in', 'FIPS', '']
    });

    // Create a new popup
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['counties'] });
      if (features.length) {
        map.setFilter('counties-highlighted', ['==', 'FIPS', features[0].properties.FIPS]);
      } else {
        map.setFilter('counties-highlighted', ['==', 'FIPS', '']);
      }
      var affordCountyMHVfeatures = map.queryRenderedFeatures(e.point, { layers: ['affordCountyMHV'] });

      if (!affordCountyMHVfeatures.length) {
        popup.remove();
        return;
      }

      var feature = affordCountyMHVfeatures[0];

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(map.unproject(e.point))
          .setHTML('<b>' + feature.properties.Geography + '</b>' +
          '<br>Median Home Value (Census 2014): $' + parseInt(feature.properties.Median_Hom).toLocaleString('en-US') +
          '<br>Median Home Value (Zillow 2015): $' + feature.properties.ZHVI.toLocaleString('en-US') )
          .addTo(map);
    });
    callback(initialSalary, source);
    // }

  });//END onLoad
}
