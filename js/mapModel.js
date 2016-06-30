//Color array for map display
// var colorArray = ['#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#fee08b', '#fdae61', '#f46d43', '#d73027'];

//Set initial affordability assumptions
var iSalary = 54000;
var iUtilities = 250;
var iDownPayment = 0.2;
var iInterest = 0.045;
var colorArray = ['#225378', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f'];
//Fetch locally stored Median Home Value data
function fetchMHV(data, callback, secondCallback, source, initialSalary, value1, value2, value3){
  console.log(data);
  // $.getJSON('data/County_MHV_WGS84.geojson')
  // .done(function(data){
  //   console.log('Success!');
  //   testGeojson = data;
  //   console.log(testGeojson);
  //   console.log('3. calling calcAffordability');
  affordCountyMHV = calcAffordability(data, value1, value2, value3);
  console.log(affordCountyMHV);
  console.log('affordCountyMHV defined');
  //Init map page
  callback(secondCallback, initialSalary, source);
  // })
  // .fail(function() { console.log('Problem with data!'); })
  // .always(function() { console.log('Try to get JSON data from server.');
  // });
}

//Calculate annual and montly housing costs based on 20% down (no PMI)
function calcAffordability(rawData, utilities, downPayment, interestRate){
  console.log('4. inside calcAffordability');
  // var interestRate = 0.045;
  // var mPMI = homeValue - (mMortgage * 12) * 0.01;
  rawData.features.forEach(function(ele){
    var e = ele.properties;
    var homeValue = parseFloat(e.Median_Hom);
    // e.mMortgage = ((interestRate / 12) * (homeValue - (homeValue * downPayment)) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12))));
    // e.mInsurance = (homeValue / 1000 * 3.5 / 12);
    // e.mUtilities = utilities;
    // e.mPropertyTax = homeValue * 0.0129 / 12;
    // e.mPayment = e.mMortgage + e.mInsurance + e.mUtilities + e.mPropertyTax;
    // e.aPayment = e.mPayment * 12;
    var mortgateTotal = Math.round((homeValue - (homeValue * downPayment))*100) / 100;     /* (i x A) / (1 - (1 + i)^-N) */
    e.mMortgage = Math.round(((interestRate / 12) * mortgateTotal) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12)))*100) / 100;
    e.mInsurance = Math.round((mortgateTotal / 1000 * 3.5 / 12)*100) / 100;
    e.mUtilities = Math.round(utilities*100) / 100;
    e.mPropertyTax = Math.round((mortgateTotal * 0.0129 / 12)*100) / 100;
    e.mPayment = e.mMortgage + e.mInsurance + e.mUtilities + e.mPropertyTax;
    e.aPayment = e.mPayment * 12;
  });
  return rawData;
}
