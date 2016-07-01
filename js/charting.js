(function(module) {

// calling data from the census api
  var sdk = new CitySDK();
  var censusModule = sdk.modules.census;
  censusModule.enable('34c1995fd27b0768996406c90a11d8ddf0024344');

  var charting = {};

// populating the charting object with API data
  charting.baseData = {
    labels: [],
    datasets: [
      {
        label: 'Home Prices',
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
        data: [],
      }
    ]
  };

  charting.countyLabels = [];
  charting.countyData = [];

  charting.stateArray = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

// populating the state dropdown menu filter
  charting.populateFilter = function() {
    charting.stateArray.forEach(function(element){
      $('#stateSelect').append('<option value=' + element + '>' + element + '</option>');
    });
  };

  // when page is loaded, create dropdown menu

  $(function(){
    charting.populateFilter();
  });
  var $button = $('#button');
  var $viewChart = $('#viewChart');

// specifying the api request from the census
  var request = {
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

// request data and populate the chart for each filtered state by county
  charting.stateMedian = function() {
    var counter = 0;
    request.state = $('#stateSelect').val();
    censusModule.APIRequest(request, function(response){
      charting.baseData.labels = [];
      charting.baseData.datasets[0].data = [];
      response.data.forEach(function(element){
        var split = element.name.split(',');
        var countyName = split[0];
        console.log(countyName);
        charting.baseData.labels.push(countyName);
        charting.baseData.datasets[0].data.push(element.median_home_value);
      });
    });
  };

// reder modal chart
  charting.viewChart = function () {
    var chartModal = $('#chartModal');
    chartModal.modal('show');
// remove iframes because a new iframe is appended onto the old one each time you make a call
// cleared out canvasHolder and then appended a new one so that the chart would only show one at a time
    var ctx = $('<canvas>');
    var hiddeniFrame = $('.chartjs-hidden-iframe');
    hiddeniFrame.remove();
    $('#canvasHolder').empty();
    $('#canvasHolder').append(ctx);
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: charting.baseData,
      options: {
        title: {
          display: true,
          text: 'Median Home Values by County'
        }
      }
    });
  };

  $viewChart.on('click', function(){
    charting.viewChart();
    $button.fadeIn(700);
    $viewChart.hide();
  });

  $button.on('click', function(){
    if ($('#stateSelect').val() == '--Select State--') {
      alert('You must select a state.');
    } else {
      charting.stateMedian();
      $('#chart').empty();
      $button.hide();
      $viewChart.fadeIn(700);
    }
  });

  charting.salaryChart = ['54000','15080'];

// create median income chart
  charting.draw = function(data) {
    canvas.style.display = 'block';
    charting.myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Median Household Income', 'Yearly Earnings At Minimum Wage', 'Your Income'],
        datasets: [{
          label: 'Dollar Amount',
          backgroundColor: '#EB7F00',
          borderColor: 'black',
          borderWidth: 1,
          hoverBackgroundColor: '#1695A3',
          hoverBorderColor: 'black',
          data: data,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: { beginAtZero:true}
          }],
          xAxes: [{
            ticks: {
              display: false
            }
          }]
        }
      }
    });
  };

  module.charting = charting;
})(window);
