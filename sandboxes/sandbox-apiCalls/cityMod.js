(function(module) {
  var national = {};

  var sdk = new CitySDK();
  var censusModule = sdk.modules.census;
  censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

  national.countyHomes = [];

  national.nationData = [];

  national.aliases = [
    'median_home_value',
    'median_gross_rent',
  ];

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
  national.nationalMedian = function(viewFunc) {
    var counter = 0;
    national.stateArray.forEach(function(element){
      request.state = element;
      censusModule.APIRequest(request, function(response){
        national.nationData.push(response.data);
        // console.log(response);
        counter += 1;
        if (counter === national.stateArray.length) {
          viewFunc();
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

  $(function(){
    $('#incSlideVal').text($('#incomeSlide').val());
    $('#dpSlideVal').text($('#dpSlide').val());
    $('#interestSlideVal').text(Math.round($('#interestSlide').val())*100 + '%');
    $('#utilitySlideVal').text($('#utilitySlide').val());

    $('#incomeSlide').on('input', function() {
      $('#incSlideVal').text($(this).val());
    });

    $('#dpSlide').on('input', function() {
      $('#dpSlideVal').text($(this).val());
    });

    $('#interestSlide').on('input', function() {
      $('#interestSlideVal').text(Math.round(($(this).val()*100)*100) / 100 + '%');
    });

    $('#utilitySlide').on('input', function() {
      $('#utilitySlideVal').text($(this).val());
    });
  });

  national.whereCanIBuy = function (array, value1, value2, value3, value4) {
    var monthlyIncome = value1;
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
      return element.mPayment < ((Math.round(value1*100) / 100) * 0.3);
    });
    // Math.round(num * 100) / 100
    return '<p>In ' + Math.round(((accessibleCounties.length) / (national.countyHomes.length) * 100) * 100) / 100 + '% of counties in the US</p>';
  };

  $('#button1').on('click', function(){
    national.buildCountyHomes();
    console.log($('#incomeSlide').val());
    $('#percentHomes').append(national.whereCanIBuy(national.countyHomes, $('#incomeSlide').val(), $('#utilitySlide').val(), $('#dpSlide').val(), $('#interestSlide').val()));
  });

  // parseInt($('#incomeSlide').val(),10)

  $(function(){
    national.nationalMedian(national.buildCountyHomes);
  });

  module.national = national;
})(window);


//  -------------------------------------------
// sandboxing to refactor capitalizing the first letter in the checkbox checkBoxChoices

// var national = {};
//
// var userRequest = {
//   state: 'OR',
//   level: 'state',
//   sublevel: true,
//   variables: [
//     'median_home_value',
//     'income',
//     'median_gross_rent',
//     'population',
//     'education_bachelors',
//     'commute_time_public_transport',
//     'commute_time_solo_automobile',
//     'poverty'
//   ],
//   api: 'acs5',
//   year: '2014'
// };
//
// national.checkboxChoices = userRequest.variables.forEach(function(element){
//   var finished = element.split('_');
//   finished.split(',');
//   console.log('first finished = ' + finished);
//   var blah = finished.forEach(function(string){
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   });
//   // var newblah = blah.join(' ');
// });
//
//
//

// national.aliases = [
//   'median_home_value',
//   'income',
//   'median_gross_rent',
//   'population',
//   'education_bachelors',
//   'commute_time_public_transport',
//   'commute_time_solo_automobile',
//   'poverty'
// ];

// national.populateCheckbox = function() {
//   national.aliases.forEach(function(element){
//     $('#checkboxDiv').append('<label>' + element + '</label>' + '<input type= \'checkbox\' value = ' + element + '>');
//   });
// };
//
// national.populateCheckbox();
//
// //the below is functional for the user to request data from the api
//
// $('#callAPI').on('click', function(){
//   national.userRequestSend();
// });

// var userRequest = {
//   //state: '',
//   level: 'state',
//   sublevel: true,
//   variables: [],
//   api: 'acs5',
//   year: '2014'
// };
//
// // if we add more check boxes, be careful because the function below will work on those aswell.
// national.userRequestSend = function(){
//   userRequest.state = $('#stateFilter').val();
//   $('input:checked').each(function () {
//     userRequest.variables.push($(this).val());
//   });
//   censusModule.APIRequest(userRequest, function(response){
//     console.log(response);
//   });
// };
//
// // use our state array. use a foreach loop that populates a select with each of the states.
// // allow the user to select which state they want to get data
//
// (national.populateFilter = function() {
//   national.stateArray.forEach(function(element){
//     $('#stateFilter').append('<option value=' + element + '>' + element + '</option>');
//   });
// })();
