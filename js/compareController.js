(function(module) {
  var compareController = {};

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
