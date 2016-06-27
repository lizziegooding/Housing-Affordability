var colorArray = ['#F2F12D','#EED322','#E6B71E','#DA9C20','#CA8323','#B86B25','#A25626'];

function colorMap(userInput, colors){
  // var parentArray = [];
  var fillColor = {};
  var percent = 0.10;
  fillColor.property = 'Median_Hom';
  var parentArray = colors.map(function(col){
    percent += 0.05;
    return [userInput * percent, col];
  });
  // for (var yy = 0; yy < array.length; yy++) {
  //   parentArray.push([userInput * percent, colors[yy]]);
  //   percent += 0.05;
  // }
  fillColor.stops = parentArray;
  return fillColor;
}
