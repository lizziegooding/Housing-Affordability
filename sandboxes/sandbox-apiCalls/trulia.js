var trulia = {};
trulia.id = '8c2r4kqm6vvq8rdqjv333x7y';
// zillow.state = 'OR';
trulia.datas = [];

trulia.requestData = function() {
  $.ajax({
    url: 'http://api.trulia.com/webservices.php?library=TruliaStats&function=getCountyStats&county=Multnomah&state=OR&startDate=2016-05-01&endDate=2016-06-21&statType=listings&apikey=8c2r4kqm6vvq8rdqjv333x7y',
    type: 'GET',
    // headers: { 'Authorization': 'token ' + githubToken },
    success: function(data, message, xhr) {
      trulia.datas = data;
      console.log(data);
      console.log(message);
      console.log(xhr);  
      console.log(trulia.datas);
    }
  });
};

trulia.requestData();

//trulia test curl call
//http://api.trulia.com/webservices.php?library=TruliaStats&function=getCountyStats&county=Multnomah&state=OR&startDate=2016-05-01&endDate=2016-06-21&statType=listings&apikey=8c2r4kqm6vvq8rdqjv333x7y
