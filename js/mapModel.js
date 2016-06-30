//Color array for map display
// var colorArray = ['#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#fee08b', '#fdae61', '#f46d43', '#d73027'];
var colorArray = ['#225378', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f'];
//Fetch locally stored Median Home Value data
function fetchMHV(callback, initialSalary){
  console.log('2. inside fetchMHV(), fetching geojson data');
  $.getJSON('data/County_MHV_WGS84.geojson')
  .done(function(data){
    console.log('Success!');
    testGeojson = data;
    console.log(testGeojson);
    console.log('3. calling calcAffordability');
    myJSON = calcAffordability(testGeojson);
    console.log('5. myJson defined');
    //Init map page
    callback(initialSalary);
  })
  .fail(function() { console.log('Problem with data!'); })
  .always(function() { console.log('Try to get JSON data from server.');
  });
}

//Calculate annual and montly housing costs based on 20% down (no PMI)
function calcAffordability(someData){
  console.log('4. inside calcAffordability');
  var interestRate = 0.045;
  // var mPMI = salePrice - (mMortgage * 12) * 0.01;
  someData.features.forEach(function(ele){
    var e = ele.properties;
    var salePrice = e.Median_Hom;
    e.mMortgage = ((interestRate / 12) * salePrice * 0.8) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12)));
    e.mInsurance = (salePrice / 1000 * 3.5 / 12);
    e.mUtilities = 250;
    e.mPropertyTax = salePrice * 0.5983 * 0.02 / 12;
    e.mPayment = e.mMortgage + e.mInsurance + e.mUtilities + e.mPropertyTax;
    e.aPayment = e.mPayment * 12;
  });
  return someData;
}
