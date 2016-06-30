(function(module) {
  var national = {};

  var sdk = new CitySDK();
  var censusModule = sdk.modules.census;
  censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

  national.countyHomes = [];

  national.nationData = [];

  national.stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

  // ----------------------------------- MEDIAN HOME VALE, INCOME AND GROSS RENT -------

  var request = {
    state: '',
    level: 'state',
    sublevel: true,
    variables: [
      'median_home_value',
      'income',
      'median_gross_rent'
    ],
    api: 'acs5',
    year: '2014'
  };

  //pulls all income, median_home_value, and median_gross_rent data from the Census API for every county in the US
  national.nationalMedian = function(filterFunc) {
    var counter = 0;
    national.stateArray.forEach(function(element){
      request.state = element;
      censusModule.APIRequest(request, function(response){
        national.nationData.push(response.data);
        counter += 1;
        if (counter === national.stateArray.length) {
          filterFunc();
        }
      });
    });
  };

  national.concatArray = function(array) {
    var merged = [].concat.apply([], array);
    return merged;
  };

  national.buildCountyHomes = function () {
    var countiesArray = national.concatArray(national.nationData);
    national.countyHomes = countiesArray.map(function(element){
      return element.median_home_value;
    });
  };

  national.whereCanIBuy = function (array, value1, value2, value3, value4, value5) {
    var monthlyIncome = value1 / 12;
    var percentIncome = value5;
    var utilities = value2;
    var downPayment = value3;
    var interestRate = value4;
    var requiredMonthly = array.map(function(countyMedian){
      var payment = {};
      var mortgateTotal = Math.round((countyMedian - downPayment)*100) / 100;     /* (i x A) / (1 - (1 + i)^-N) */
      payment.mMortgage = Math.round(((interestRate / 12) * mortgateTotal) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12)))*100) / 100;
      payment.mInsurance = Math.round((mortgateTotal / 1000 * 3.5 / 12)*100) / 100;
      payment.mUtilities = Math.round(utilities*100) / 100;
      payment.mPropertyTax = Math.round((mortgateTotal * 0.5983 * 0.02 / 12)*100) / 100;
      payment.mPayment = payment.mMortgage + payment.mInsurance + payment.mUtilities + payment.mPropertyTax;
      payment.aPayment = payment.mPayment * 12;
      return payment;
    });
    var accessibleCounties = requiredMonthly.filter(function(element){
      return element.mPayment < ((Math.round((value1 / 12)*100) / 100) * value5);
    });
    // Math.round(num * 100) / 100
    return '<p>Based on Census Median Home Values, you could afford a home in ' + Math.round(((accessibleCounties.length) / (national.countyHomes.length) * 100) * 100) / 100 + '% of counties in the USA</p>';
  };

  $(function(){
    if ($('#salaryInput').val() > 0) {
      $('#incomeSlide').val($('#salaryInput').val());
    }

    $('#incSlideVal').html('<b>Annual Income:</b> $' + $('#incomeSlide').val());
    $('#percentSlideVal').html('<b>% Income towards Mortgage:</b> ' + Math.round(($('#percentSlide').val()*100)*100) / 100 + '%');
    $('#dpSlideVal').html('<b>Anticipated Down Payment:</b> $' + $('#dpSlide').val());
    $('#interestSlideVal').html('<b>Anticipated Insurance Rate:</b> ' + Math.round(($('#interestSlide').val()*100)*100) / 100 + '%');
    $('#utilitySlideVal').html('<b>Anticipated Monthly Utility Cost:</b> $ ' + $('#utilitySlide').val());

    $('#incomeSlide').on('input', function() {
      $('#incSlideVal').html('<b>Annual Income:</b> $' + $(this).val());
      // setPaint($('#incomeSlide').val());
    });

    $('#percentSlide').on('input', function() {
      $('#percentSlideVal').html('<b>% Income towards Mortgage:</b> ' + Math.round(($(this).val()*100)*100) / 100 + '%');
    });

    $('#dpSlide').on('input', function() {
      $('#dpSlideVal').html('<b>Anticipated Down Payment:</b> $' + $(this).val());
    });

    $('#interestSlide').on('input', function() {
      $('#interestSlideVal').html('<b>Anticipated Insurance Rate:</b> ' + Math.round(($(this).val()*100)*100) / 100 + '%');
    });

    $('#utilitySlide').on('input', function() {
      $('#utilitySlideVal').html('<b>Anticipated Monthly Utilities costs:</b> $ ' + $(this).val());
    });
  });

  $('#button1').on('click', function(){
    national.buildCountyHomes();
    $('#percentHomes').empty();
    $('#percentHomes').append(national.whereCanIBuy(national.countyHomes, $('#incomeSlide').val(), $('#utilitySlide').val(), $('#dpSlide').val(), $('#interestSlide').val(), $('#percentSlide').val()));
    // fetchUpdatedMHV(addNewMapLayer);
    setPaint($('#incomeSlide').val());
  });

  $(function(){
    national.nationalMedian(national.buildCountyHomes);
  });

  module.national = national;
})(window);


//Calculate annual and montly housing costs based on 20% down (no PMI)
// function updateCalcAffordability(json, value1, value2, value3, value4, value5){
//   var monthlyIncome = value1 / 12;
//   var percentIncome = value5;
//   var utilities = value2;
//   var downPayment = value3;
//   var interestRate = value4;
//   json.features.forEach(function(ele){
//     var e = ele.properties;
//     var countyMedian = e.Median_Hom;
//     var mortgateTotal = Math.round((countyMedian - downPayment)*100) / 100;     /* (i x A) / (1 - (1 + i)^-N) */
//     e.mMortgage = Math.round(((interestRate / 12) * mortgateTotal) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12)))*100) / 100;
//     e.mInsurance = Math.round((mortgateTotal / 1000 * 3.5 / 12)*100) / 100;
//     e.mUtilities = Math.round(utilities*100) / 100;
//     e.mPropertyTax = Math.round((mortgateTotal * 0.5983 * 0.02 / 12)*100) / 100;
//     e.mPayment = e.mMortgage + e.mInsurance + e.mUtilities + e.mPropertyTax;
//     e.aPayment = e.mPayment * 12;
//   });
//   //properties added;
//   return json;
// }

// function addNewMapLayer () {
//
//   var map = $('map');
//
//   map.addSource('myJSON', {
//     'type': 'geojson',
//     'data': updatedJSON
//   });
//
//   map.addLayer({
//     'id': 'myJSON',
//     'type': 'fill',
//     'source': 'myJSON',
//     // 'source-layer': 'myJSON',
//     'layout': { visibility: 'visible'},
//     'paint': {
//       'fill-outline-color': '#FFF',
//       'fill-color': {
//         property: 'aPayment',
//         stops: [
//                 [8100, '#ffffb2'],
//                 [10800, '#fed976'],
//                 [13500, '#feb24c'],
//                 [16200, '#fd8d3c'],
//                 [18900, '#fc4e2a'],
//                 [21600, '#e31a1c'],
//                 [24300, '#b10026'],
//         ]
//       },
//       'fill-opacity':  1}
//   });
// }
//
// //need to run fetchMHV here i believe?
// function fetchUpdatedMHV(callback){
//   $.getJSON('data/County_MHV_WGS84.geojson')
//   .done(function(data){
//     console.log('Success!');
//     testGeojson = data;
//     updatedJSON = updateCalcAffordability(testGeojson, $('#incomeSlide').val(), $('#utilitySlide').val(), $('#dpSlide').val(), $('#interestSlide').val(), $('#percentSlide').val());
//     //Init map page
//     callback();
//   })
//   .fail(function() { console.log('Problem with data!'); })
//   .always(function() { console.log('Try to get JSON data from server.');
//   });
// }
