(function(module) {
  var compareController = {};

// show compare tab elements and draw chart
  compareController.index = function() {
    console.log('compare');
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#compareContent').show();
    charting.draw(charting.salaryChart);
  };

  module.compareController = compareController;
})(window);
