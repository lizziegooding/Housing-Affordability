
function User() {
  this.income = $('#incomeSlide').val();
  this.downPayment = $('#dpSlide').val();
  this.interestRate = Math.round($('#interestSlide').val())*100;
  this.utilityPayment = $('#utilitySlide').val();
}


var colorArray = ['#ffffb2','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026'];

//Fetch locally stored Median Home Value data
function fetchMHV(callback){
  $.getJSON('data/County_MHV_WGS84.geojson')
  .done(function(data){
    console.log('Success!');
    testGeojson = data;
    myJSON = calcAffordability(testGeojson);
    //Init map page
    callback();
  })
  .fail(function() { console.log('Problem with data!'); })
  .always(function() { console.log('Try to get JSON data from server.');
  });
}

//Calculate annual and montly housing costs based on 20% down (no PMI)
function calcAffordability(someData){
  var interestRate = 0.045;
  // var mPMI = salePrice - (mMortgage * 12) * 0.01;
  testGeojson.features.forEach(function(ele){
    var e = ele.properties;
    var salePrice = e.Median_Hom;
    e.mMortgage = ((interestRate / 12) * salePrice) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12)));
    e.mInsurance = (salePrice / 1000 * 3.5 / 12);
    e.mUtilities = 250;
    e.mPropertyTax = salePrice * 0.5983 * 0.02 / 12;
    e.mPayment = e.mMortgage + e.mInsurance + e.mUtilities + e.mPropertyTax;
    e.aPayment = e.mPayment * 12;
  });
  return someData;
}

// layer (string) ID of a layer
// name (string) name of a paint property
// value (Any) value for the paint propery; must have the type appropriate for the property as defined in the Style Specification

function setPaint(userSalary){
  $('#mapHTML').contentWindow.map.setPaintProperty('myJSON', 'fill-color', colorMap(userSalary, colorArray));
}

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

var objy = {'fill-color': {
  property: 'aPayment',
  stops: [
          [8100, '#ffffb2'],
          [10800, '#fed976'],
          [13500, '#feb24c'],
          [16200, '#fd8d3c'],
          [18900, '#fc4e2a'],
          [21600, '#e31a1c'],
          [24300, '#b10026'],
  ]
}};

$('#salarySubmit').on('click', function(e) {
  e.preventDefault();
  var $salaryInput = $('#salaryInput').val();
  if (isNaN(parseFloat($salaryInput))) {
    console.log('will change class to show user invalid input');
  } else {
    setPaint($salaryInput);
  }
});
