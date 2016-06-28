//Declare API access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

//Color array for map display
var colorArray = ['#F2F12D','#EED322','#E6B71E','#DA9C20','#CA8323','#B86B25','#A25626'];

//create an array of colors to populate map paint object
function colorMap(userInput, colors){
  console.log('colorMap called');
  var fillColor = {};
  var percent = 0.10;
  fillColor.property = 'mPayment';
  fillColor.stops = colors.map(function(col){
    percent += 0.05;
    return [userInput * percent, col];
  });
  return fillColor;
}

// function setPaint(){
//   console.log('call setPaint', map);
//   map.setPaintProperty('myJSON', 'fill-color', colorMap(1000000000, colorArray));
// }

//Initialize map
// fetchMHV(initMap);
