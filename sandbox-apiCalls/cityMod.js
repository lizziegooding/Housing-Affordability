var stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

var sdk = new CitySDK();
var censusModule = sdk.modules.census;
censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

// var request2 = {
//
//     "level": "state",
//     "state": "OR",
//     "sublevel": true,
//     "variables": [
//         "median_home_value",
//         'income',
//     ],
//     "api": "acs5",
//     "year": "2014"
//
// };

var request = {
  state: 'AK',
  level: 'level',
  sublevel: true,
  variables: [
    'median_home_value',
    'income',
  ],
  api: 'acs5',
  year: '2014'
};

// $('button').on('click', function(){
//   censusModule.GEORequest(request4, function(response) {
//     console.log('add that data to map');
//     map.data.addGeoJson(response);
//   });
// });

$('button').on('click', function(){
  var request = {
    state: 'AK',
    level: 'level',
    sublevel: true,
    variables: [
      'median_home_value',
      'income',
    ],
    api: 'acs5',
    year: '2014'
  };
  var requestsArray = [];
  stateArray.forEach(function(element){
    request4.state = element;
    requestsArray.push(censusModule.APIRequest(request4, function(response){
      return response;
    }));
    return requestsArray;
  });
  var defer = $.when.apply($, requestsArray);
  defer.done(function(){
    $.each(arguments, function(index, data){
      console.log(data);
    });
  });
});

// var defer = $.when.apply($, jqXHRs); defer.then(function() { ... });

// var stringed;
// censusModule.GEORequest(request3, function(response) {
//   var county = {};
//   county.type = 'geojson';
//   county['data'] = {};
//   county['data']['type'] = 'Feature';
//   county['data']['geometry'] = response.features[0].geometry;
//   county['data']['properties'] = response.features[0].properties;
//   stringed = JSON.stringify(county.data);
//   console.log(response);
// });
//
// console.log(data);
