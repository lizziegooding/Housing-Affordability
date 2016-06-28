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

//Initialize map
fetchMHV(initMap);
