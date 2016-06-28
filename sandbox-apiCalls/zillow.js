var zillow = {};

zillow.id = 'X1-ZWz1fc2p5p72ff_3fm17';

zillow.statesFull = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

zillow.states = ['OR', 'WA', 'PA', 'CA'];

// zillow.state = 'OR';
zillow.datas = [];

zillow.requestData = function() {
  var counter = 0;
  zillow.states.forEach(function(element){
    $.ajax({
      url: '/zillow/' + element,
      type: 'GET',
      // headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr) {
        zillow.datas.push(data.response.list.region);
        console.log(zillow.datas);
        // console.log(zillow.concatArray(zillow.datas));
      },
      fail: function(jqXHR, message, error) {
        console.log(error);
      }
    });
    counter+=1;
    if (counter === 51) {

      // console.log(zillow.datas);
      // zillow.filterFunction(zillow.concatArray(zillow.datas));
      // return zillow.datas;
    }
  });
  // .done(function(){
  //   zillow.filterFunction(zillow.datas);
  // });
};

zillow.concatArray = function(array) {
  var merged = [].concat.apply([], array);
  return merged;
};

zillow.filterFunction = function (array) {
  var filteredCounties = array.filter(function(element){
    return element.zindex;
    // zillow.datas[0].zindex[0]['_']
  });
  console.log(filteredCounties);
  var countyPrices = filteredCounties.map(function(element){

    return element['name'][0] + ' County: Median Home Price is ' + element.zindex[0]['_'];
  });
  console.log(countyPrices);
};

// zillow.requestData();
