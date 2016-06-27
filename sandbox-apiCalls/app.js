var map;

function initialize() {
  var mapOptions = {
    center: {lat: 45.5424, lng: -122.6544},
    zoom: 4
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  console.log('init');
}
// initialize();

// google.maps.event.addDomListener(window, 'load', initialize);

  // mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25iaW5pIiwiYSI6ImNpcHU3ajc2cjA5eGNmbG0yZmh2a2Fud3EifQ.bMYgeUt9yYRmG3Za0B9lSw';
  // var map = new mapboxgl.Map({
  //   container: 'map',
  //   center: [-122.6765, 45.5231],
  //   zoom: 13,
  //   hash: true,
  //   style: 'mapbox://styles/mapbox/streets-v9'
  // });

  // var showit = new mapboxgl.GeoJSONSource(stringed);
  //
  // map.on('load', function(){
  //   map.addSource('county', stringed);
  //   map.addLayer({
  //     'id': '01',
  //     'type': 'fill',
  //     'source': 'county',
  //     'source-layer': 'county',
  //     'paint': {
  //       'fill-outline-color': '#484896',
  //       'fill-color': '#6e599f',
  //       'fill-opacity': 0.75
  //     }
  //   });
  // });
