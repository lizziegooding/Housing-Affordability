(function(module) {
  //Declare API access Token
  mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

  //This function initializes the MapBox map and then adds multiple layers to it (e.g., county boundaries); it also established the hover/pop-up interactivity
  var initObj = {};
  //Initialize a new map object inside of the #map div
  initObj.initMap = function(callback, initialSalary, source){
    window.map = new mapboxgl.Map({
      container: 'map', //HTML element to initialize the map in (or element id as string)
      zoom: 3.15,
      minZoom: 1, //Default of 0 (world)
      maxZoom: 12, //Default of 20 (local)
      center: [-80.7129,40.0902], //LatLng array in decimal degrees
      style: 'mapbox://styles/lizziegooding/ciq1cofi8003ybknqhk5pfruz'
      //Basemap style; can be a preset from mapbox or a user defined style
    });
    // map.addControl(new mapboxgl.Navigation());
    map.addControl(new mapboxgl.Navigation({position: 'bottom-left'}));
    //Once the map has loaded
    map.on('load', function () {
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
          'fill-opacity':  1
        },
      },'admin-3-4-boundaries-bg');
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
    });
  };
  module.initObj = initObj;
}(window));
