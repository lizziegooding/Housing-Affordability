(function(module) {
  var national = {};

  // calling data from the census api
  var sdk = new CitySDK();
  var censusModule = sdk.modules.census;
  censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

  national.countyHomes = [];

  national.nationData = [];

  national.stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

  // ----------------------------------- MEDIAN HOME VALE, INCOME AND GROSS RENT -------

  // specifying the api request from the census
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

  var $incomeSlide = $('#incomeSlide');
  var $incSlideVal = $('#incSlideVal');
  var $percentSlide = $('#percentSlide');
  var $percentSlideVal = $('#percentSlideVal');
  var $salaryInput = $('#salaryInput');
  var $dpSlideVal = $('#dpSlideVal');
  var $dpSlide = $('#dpSlide');
  var $interestSlideVal = $('#interestSlideVal');
  var $interestSlide = $('#interestSlide');
  var $utilitySlideVal = $('#utilitySlideVal');
  var $utilitySlide = $('#utilitySlide');
  var $percentHomes = $('#percentHomes');
  var $salarySubmit = $('#salarySubmit');
  var $salaryInput = $('#salaryInput');

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

// calculate affordability based on data from census api
  national.whereCanIBuy = function (array, annualIncome, utilities, downPayment, interestRate) {
    var monthlyIncome = annualIncome / 12;
    var requiredMonthly = array.map(function(countyMedian){
      var payment = {};
      var mortgateTotal = Math.round((countyMedian - (countyMedian * downPayment)) * 100) / 100;
      payment.mMortgage = Math.round(((interestRate / 12) * mortgateTotal) / (1 - Math.pow((1 + (interestRate / 12)),(-30 * 12))) * 100) / 100;
      payment.mInsurance = Math.round((mortgateTotal / 1000 * 3.5 / 12) * 100) / 100;
      payment.mUtilities = Math.round(utilities * 100) / 100;
      payment.mPropertyTax = Math.round((mortgateTotal * 0.0129 / 12) * 100) / 100;
      payment.mPayment = payment.mMortgage + payment.mInsurance + payment.mUtilities + payment.mPropertyTax;
      payment.aPayment = payment.mPayment * 12;
      return payment;
    });

    var accessibleCounties = requiredMonthly.filter(function(element){
      return element.mPayment < ((Math.round((annualIncome / 12) * 100) / 100) * 0.3);
    });
    return '<p>Based on Census Median Home Values, you could afford a home in ' + Math.round(((accessibleCounties.length) / (national.countyHomes.length) * 100) * 100) / 100 + '% of counties in the USA</p>';
  };

// get user input from affordability sliders
  $(function(){
    $salarySubmit.on('click', function(){
      $incomeSlide.val(parseInt($salaryInput.val()));
      $incSlideVal.html('<b>Annual Income:</b> $' + parseInt($salaryInput.val()));
    });

    $incSlideVal.html('<b>Annual Income:</b> $' + $incomeSlide.val());
    $dpSlideVal.html('<b>Anticipated % Down Payment:</b> ' + Math.round(($dpSlide.val() * 100) * 100) / 100 + '%');
    $interestSlideVal.html('<b>Anticipated Interest Rate:</b> ' + Math.round(($interestSlide.val() * 100) * 100) / 100 + '%');
    $utilitySlideVal.html('<b>Anticipated Monthly Utility Cost:</b> $' + $utilitySlide.val());
    $incomeSlide.on('input', function() {
      $incSlideVal.html('<b>Annual Income:</b> $' + $(this).val());
    });

    $dpSlide.on('input', function() {
      $dpSlideVal.html('<b>Anticipated % Down Payment:</b> ' + Math.round(($(this).val() * 100) * 100) / 100 + '%');
    });

    $interestSlide.on('input', function() {
      $interestSlideVal.html('<b>Anticipated Interest Rate:</b> ' + Math.round(($(this).val() * 100) * 100) / 100 + '%');
    });

    $utilitySlide.on('input', function() {
      $utilitySlideVal.html('<b>Anticipated Monthly Utilities costs:</b> $ ' + $(this).val());
    });
    national.nationalMedian(national.buildCountyHomes);
  });

  $('#button1').on('click', function(){
    national.buildCountyHomes();
    $percentHomes.empty();
    $percentHomes.append(national.whereCanIBuy(national.countyHomes, $incomeSlide.val(), $utilitySlide.val(), $dpSlide.val(), $interestSlide.val(), $percentSlide.val()));
    var updateCalc = mathObj.calcAffordability(document.getElementById('mapHTML').contentWindow.countyMHV, $utilitySlide.val(), $dpSlide.val(), $interestSlide.val());
    document.getElementById('mapHTML').contentWindow.map.getSource('affordCountyMHV').setData(updateCalc);
    colorObj.setPaint($incomeSlide.val(), mathObj.colorArray);
  });

  module.national = national;
})(window);
