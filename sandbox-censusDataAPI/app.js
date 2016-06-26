var sdk = new CitySDK(); // create the CitySDK Instance
census = sdk.modules.census; // Create an instance of the module
census.enable('ebfc2b4e08bb16ebc53b99604e465907d6d087d5'); // enable the module with the api key

function populateArr() {
  for (var i = 0; i < 4; i++) {
    requestArr.push(request + 'i');
  }
}

var requestArr = [
  {
    'level':'state',
    'state':'CA',
    'variables': [
      'age',
      'commute_time'
    ]
  },
  {
    'level':'state',
    'state':'OR',
    'variables': [
      'age',
      'commute_time'
    ]
  },
  {
    'level':'state',
    'state':'AZ',
    'variables': [
      'age',
      'commute_time'
    ]
  }
];

var callback = function(response) {
  $('#blah').append('<p>' + response.data[0]['commute_time'] + '</p>').text;
  console.log(response);
};

requestArr.forEach(function(element){
  census.APIRequest(element,callback);

});
