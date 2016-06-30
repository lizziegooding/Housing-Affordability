(function(module) {
  var charting = {};

  var sdk = new CitySDK();
  var censusModule = sdk.modules.census;
  censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

  charting.countyHomes = [];

  charting.nationData = [];

  charting.stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

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
  charting.nationalMedian = function() {
    var counter = 0;
    charting.stateArray.forEach(function(element){
      request.state = element;
      censusModule.APIRequest(request, function(response){
        charting.nationData.push(response.data);
        counter += 1;
        if (counter === charting.stateArray.length) {
          console.log(charting.nationData);
        }
      });
    });
  };

  charting.nationalMedian();

  $('#stateButton').on('click', function(){
    $('#countySelect').fadeIn(700);
    //and other things here

  });

  //need to create two dropdowns for state, and for county

  charting.concatArray = function(array) {
    var merged = [].concat.apply([], array);
    return merged;
  };

  charting.buildCountyHomes = function () {
    var countiesArray = charting.concatArray(charting.nationData);
    charting.countyHomes = countiesArray.map(function(element){
      $('#countySelect').append('<option value=' + element.name + '>' + element.name + '</option>');
      return '[' + element.name + ',' + element.median_home_value + ']';
    });
  };

//make census call looping through states, or allow user to select state (easier)
//returned data must be sanitized into just county name and median_home_value
//those will be parsed into two arrays and passed into var data (see below),
//data will be passed to a new Chart constructor, along with context (the html element I believe)
//

//dropdown with all states
//onchange, api call is made bring back counties for that state and then populating another dropdown
//onsubmit chart is created with the county median_home_values

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });

  charting.baseData = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
  };

  module.charting = charting;
})(window);
