(function(module) {

  var mathObj = {};

  //Set initial affordability assumptions
  //National Median Household Income
  mathObj.iSalary = 53482;
  //Annual minimum wage earnings assuming federal minimum wage
  mathObj.minSalary = 15080;
  mathObj.iUtilities = 250;
  mathObj.iDownPayment = 0.2;
  mathObj.iInterest = 0.0385;
  mathObj.colorArray = ['#225378', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f'];

  /* This function runs when the page loads. It performs the following actions:
     1) takes the geoJSON objects and passes each of them through calcAffordability() to add properties to each objects
     2) adds updated geoJSON objects as a data source to the map on a per county basis
     3) runs setPaint() - aka secondCallback() - at the end of initMap() - aka callback() - to color the map by cross referencing the geoJSON data with the initial hard-coded salary data - aka iSalary
  */
  mathObj.fetchMHV = function(data, callback, secondCallback, source, initialSalary, value1, value2, value3){
    affordCountyMHV = mathObj.calcAffordability(data, value1, value2, value3);
    //Init map page
    callback(secondCallback, initialSalary, source);
  };

  //Adds properties to geoJSON objects for calculation to color map
  //Calculate annual and montly housing costs based on 20% down (no PMI)
  mathObj.calcAffordability = function(rawData, utilities, downPayment, interestRate){
    rawData.features.forEach(function(ele){
      var e = ele.properties;
      var homeValue = parseFloat(e.Median_Hom);
      var mortgateTotal = Math.round((homeValue - (homeValue * downPayment)) * 100) / 100;
      e.mMortgage = Math.round(((interestRate / 12) * mortgateTotal) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12))) * 100) / 100;
      e.mInsurance = Math.round((mortgateTotal / 1000 * 3.5 / 12) * 100) / 100;
      e.mUtilities = Math.round(utilities * 100) / 100;
      e.mPropertyTax = Math.round((mortgateTotal * 0.0129 / 12) * 100) / 100;
      e.mPayment = e.mMortgage + e.mInsurance + e.mUtilities + e.mPropertyTax;
      e.aPayment = e.mPayment * 12;
    });
    return rawData;
  };
  module.mathObj = mathObj;
}(window));
