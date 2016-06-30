var data = ['54000','15080', '30000'];

function draw(data) {

  canvas.style.display = 'block';
  var myChart = new Chart(canvas, {
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
        }]
      }
    }
  });
}

draw(data);
