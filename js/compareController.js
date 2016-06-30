(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('#mainDiv').show();
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#compareContent').show();
    draw(salaryChart);
  };

  module.compareController = compareController;
})(window);
