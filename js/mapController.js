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

function setPaint(userSalary, source){
  if(source === 'map'){
    map.setPaintProperty('affordCountyMHV', 'fill-color', colorMap(userSalary, colorArray));
  }
  else {
    console.log('not first time calling set Paint');
    document.getElementById('mapHTML').contentWindow.map.setPaintProperty('affordCountyMHV', 'fill-color', colorMap(userSalary, colorArray));
  }

  // document.getElementById('mapHTML').contentWindow.map.setPaintProperty('myJSON', 'fill-color', colorMap(userSalary, colorArray));
}

//Change map based on user input
//map.setPaintProperty('myJSON', 'fill-color', colorMap(60000, colorArray));
