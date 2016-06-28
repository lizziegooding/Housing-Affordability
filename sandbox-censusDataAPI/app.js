var sdk = new CitySDK(); // create the CitySDK Instance
census = sdk.modules.census; // Create an instance of the module
census.enable('ebfc2b4e08bb16ebc53b99604e465907d6d087d5'); // enable the module with the api key

var stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'
];
//
// function populateArr() {
//   for (var i = 0; i < 4; i++) {
//     requestArr.push(request + 'i');
//   }
// }

var requestObj =
  {
    'level':'state',
    'state':'',
    'variables': [
      'income',
      'median_home_value'
    ],
    api:'asc5',
    year: '2014'
  };

  // write a function taht returns the median income and median home value for every county in the usa
  //

var arr = [];
function stuff(func){
  var count = 0;
  stateArray.forEach(function(ele){
    requestObj.state = ele;
    census.APIRequest(requestObj,function(response) {
      arr.push(response);
      count++;
      if(count == stateArray.length){
        func();
      }
    });
  });
}

function blah() {
  console.log(arr);
}
//
// requestArr.forEach(function(element){
//   census.APIRequest(element,callback);
//
// });

stuff(blah);
// function(response) {
//   $('#blah').append('<p>' + response.data[0]['commute_time'] + '</p>').text;
//   console.log(response);
// };
