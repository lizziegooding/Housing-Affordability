//Calculate annual and montly housing costs based on 20% down (no PMI)
function fetchMHV(callback){
  $.getJSON('County_MHV.geojson')
  .done(function(data){
    console.log('Success!');
    testGeojson = data;
    console.log(testGeojson);
    callback();
  })
  .fail(function() { console.log('Problem with data!'); })
  .always(function() { console.log('Try to get JSON data from server.');
  });
}

function calcAffordability(data){
  var interestRate = 0.045;
  // var mPMI = salePrice - (mMortgage * 12) * 0.01;
  testGeojson.features.forEach(function(ele){
    var salePrice = ele.properties.Median_Hom;
    ele.properties.mMortgage = ((interestRate / 12) * (salePrice * 0.8)) / (1 - ((1 + ( interestRate / 12)) ^ (-30 * 12)));
    ele.properties.mInsurance = salePrice / 1000 * 3.5 / 12;
    ele.properties.mUtilities = 250;
    ele.properties.mPropertyTax = salePrice * 0.5983 * 0.02 / 12;
    ele.properties.mPayment = ele.properties.mMortgage + ele.properties.mInsurance + ele.properties.mUtilities + ele.properties.mPropertyTax;
    ele.properties.aPayment = ele.properties.mPayment * 12;
  });
  // console.log(data);
  return data;
}

var myJSON = JSON.stringify(fetchMHV(calcAffordability));
