//Calculate annual and montly housing costs based on 20% down (no PMI)
function fetchMHV(callback){
  $.getJSON('County_MHV_WGS84.geojson')
  .done(function(data){
    console.log('Success!');
    testGeojson = data;
    myJSON = calcAffordability(testGeojson);
    // console.log('myJSON', myJSON);
    //Init map page
    callback();
  })
  .fail(function() { console.log('Problem with data!'); })
  .always(function() { console.log('Try to get JSON data from server.');
  });
}

function calcAffordability(someData){
  var interestRate = 0.045;
  // var mPMI = salePrice - (mMortgage * 12) * 0.01;
  testGeojson.features.forEach(function(ele){
    var salePrice = ele.properties.Median_Hom;
    ele.properties.mMortgage = ((interestRate / 12) * (salePrice * 0.8)) / (1 - ((1 + ( interestRate / 12)) ^ (-30 * 12)));
    ele.properties.mInsurance = (salePrice / 1000 * 3.5 / 12);
    ele.properties.mUtilities = 250;
    ele.properties.mPropertyTax = salePrice * 0.5983 * 0.02 / 12;
    ele.properties.mPayment = ele.properties.mMortgage + ele.properties.mInsurance + ele.properties.mUtilities + ele.properties.mPropertyTax;
    ele.properties.aPayment = ele.properties.mPayment * 12;

    ele.properties.mMortgage = ele.properties.mMortgage + '';
    ele.properties.mInsurance = ele.properties.mInsurance + '';
    ele.properties.mUtilities = ele.properties.mUtilities + '';
    ele.properties.mPropertyTax = ele.properties.mPropertyTax + '';
    ele.properties.mPayment = ele.properties.mPayment + '';
    ele.properties.aPayment = ele.properties.aPayment + '';
    // ele.properties = JSON.stringify(ele.properties);
  });
  // console.log(data);
  // console.log('Original myJSON ', someData);
  // console.log('myJSON toJSON ', someData.toJSON());
  // console.log('myJSON stringify', JSON.stringify(someData));

  return someData;
}

// console.log(myJSON);
