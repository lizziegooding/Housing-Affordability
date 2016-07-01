(function(module) {
  var compareController = {};

// show compare tab elements and draw chart
  compareController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#compareContent').show();
    charting.draw(charting.salaryChart);
    // charting.myChart.data.datasets.data[2].backgroundColor = '#EB7F00';
  };

  module.compareController = compareController;
})(window);
