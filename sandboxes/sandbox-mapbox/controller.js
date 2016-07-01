//Color array for map display
var colorArray = ['#F2F12D','#EED322','#E6B71E','#DA9C20','#CA8323','#B86B25','#A25626'];

//create an array of colors to populate map paint object
function colorMap(userInput, colors){
  var fillColor = {};
  var percent = 0.10;
  fillColor.property = 'mPayment';
  fillColor.stops = colors.map(function(col){
    percent += 0.05;
    return [userInput * percent, col];
  });
  return fillColor;
}
