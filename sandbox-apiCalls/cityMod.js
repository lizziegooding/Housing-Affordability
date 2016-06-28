var national = {};

national.countyHomes = [];

national.nationData = [];

national.aliases = [
  'median_home_value',
  'income',
  'median_gross_rent',
  'population',
  'education_bachelors',
  'commute_time_public_transport',
  'commute_time_solo_automobile',
  'poverty'
];

// national.alias = [
//     'Median Home Value',
//     'Income',
//     'Median Gross Rent',
//     'Population',
//     'Education Bachelors',
//     'Commute Time Public Transport',
//     'Commute Time Solo Automobile',
//     'Poverty'];

national.stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

var sdk = new CitySDK();
var censusModule = sdk.modules.census;
censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

national.populateCheckbox = function() {
  national.aliases.forEach(function(element){
    $('#checkboxDiv').append('<label>' + element + '</label>' + '<input type= \'checkbox\' value = ' + element + '>');
  });
};

national.populateCheckbox();

//the below is functional for the user to request data from the api

$('#callAPI').on('click', function(){
  national.populateRequestVariables();
});

var userRequest = {
  state: 'CA',
  level: 'state',
  sublevel: true,
  variables: ['income', 'median_home_value'],
  api: 'acs5',
  year: '2014'
};

// if we add more check boxes, be careful because the function below will work on those aswell.
national.populateRequestVariables = function(){
  // userRequest.state = $('#stateFilter').val();
  // $('input:checked').each(function () {
  //   userRequest.variables.push($(this).val());
  // });
  censusModule.APIRequest(userRequest, function(response){
    console.log(response);
  });
};

// use our state array. use a foreach loop that populates a select with each of the states.
// allow the user to select which state they want to get data

(national.populateFilter = function() {
  national.stateArray.forEach(function(element){
    $('#stateFilter').append('<option value=' + element + '>' + element + '</option>');
  });
})();
// ----------------------------------- MEDIAN HOME VALE, INCOME AND GROSS RENT -------

// var request = {
//   state: '',
//   level: 'state',
//   sublevel: true,
//   variables: [
//     'median_home_value',
//     'income',
//     'median_gross_rent'
//   ],
//   api: 'acs5',
//   year: '2014'
// };
//
// national.nationalMedian = function(viewFunc) {
//   var counter = 0;
//   national.stateArray.forEach(function(element){
//     request.state = element;
//     censusModule.APIRequest(request, function(response){
//       national.nationData.push(response.data);
//       counter += 1;
//       if (counter === national.stateArray.length) {
//         viewFunc();
//       }
//     });
//   });
// };
//
// national.concatArray = function(array) {
//   var merged = [].concat.apply([], array);
//   return merged;
// };
//
// //this could be used as blanket function for filtering based on whatever data you want
// //category would be whatever national category you want to isolateData from
// //like national.buildCountyHomes but instead of explicitly passing median_home_value, that would be category parameter
// national.isolateData = function(category){};
//
// national.buildCountyHomes = function () {
//   var countiesArray = national.concatArray(national.nationData);
//   national.countyHomes = countiesArray.map(function(element){
//     return element.median_home_value;
//   });
// };
//
// national.whereCanIBuy = function (array, value1, value2, value3) {
//   var interestRate = 0.045;
//   var requiredMonthly = array.map(function(element){
//     var monthlyPayment = {};
//     var homePrice = element - value3;     /* (i x A) / (1 - (1 + i)^-N) */
//     monthlyPayment.mMortgage = ((interestRate / 12) * homePrice) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12)));
//     monthlyPayment.mInsurance = (homePrice / 1000 * 3.5 / 12);
//     monthlyPayment.mUtilities = 250;
//     monthlyPayment.mPropertyTax = homePrice * 0.5983 * 0.02 / 12;
//     monthlyPayment.mPayment = monthlyPayment.mMortgage + monthlyPayment.mInsurance + monthlyPayment.mUtilities + monthlyPayment.mPropertyTax;
//     monthlyPayment.aPayment = monthlyPayment.mPayment * 12;
//     return monthlyPayment;
//   });
//   var accessibleCounties = requiredMonthly.filter(function(element){
//     return element.mPayment < (value1 * value2);
//   });
//   // Math.round(num * 100) / 100
//   return '<p>In ' + Math.round(((accessibleCounties.length) / (national.countyHomes.length) * 100) * 100) / 100 + '% of counties in the US</p>';
// };
//
// $('#button1').on('click', function(){
//   national.buildCountyHomes();
//   $('#percentHomes').append(national.whereCanIBuy(national.countyHomes, $('#income').val(), $('#incomePercent').val(), $('#downP').val()));
// });
//
// $(function(){
//   national.nationalMedian(national.buildCountyHomes);
// });

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
