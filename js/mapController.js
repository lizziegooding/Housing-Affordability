(function(module) {

  var colorObj = {};

  //This function determines the colors assigned to county geoJSON objects on the map in relation to the numerical value user's input

  colorObj.colorMap = function(userInput, colors){
    var fillColor = {};
    var percent = 0.10;
  // aPayment = annual payment - calculates 30% based on annual salary input
    fillColor.property = 'aPayment';
    fillColor.stops = colors.map(function(col){
      percent += 0.05;
      return [userInput * percent, col];
    });
    return fillColor;
  };

  //This function is called the page loads and colors the map based on static inital values. The salary data that the user inputs to the form on the home page or the sliders on the afford page will call the function again and alter the map's coloration.

  colorObj.setPaint = function(userSalary, source){
    if(source === 'map'){
      map.setPaintProperty('affordCountyMHV', 'fill-color', colorObj.colorMap(userSalary, mathObj.colorArray));
    }
    else {
      document.getElementById('mapHTML').contentWindow.map.setPaintProperty('affordCountyMHV', 'fill-color', colorObj.colorMap(userSalary, mathObj.colorArray));
    }
  };
  module.colorObj = colorObj;
}(window));
