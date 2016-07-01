//Fetch locally stored Median Home Value data
function fetchMHV(callback){
  $.getJSON('County_MHV_WGS84.geojson')
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
