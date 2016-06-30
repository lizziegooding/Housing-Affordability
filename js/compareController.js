(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#compareContent').show();
    draw(salaryChart);
  };

  module.compareController = compareController;
})(window);
