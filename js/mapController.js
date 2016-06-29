//create an array of colors to populate map paint object
function colorMap(userInput, colors){
  console.log('colorMap called');
  var fillColor = {};
  var percent = 0.10;
// aPayment = annual payment - calculates 30% based on annual salary input
  fillColor.property = 'aPayment';
  fillColor.stops = colors.map(function(col){
    percent += 0.05;
    return [userInput * percent, col];
  });
  return fillColor;
}
