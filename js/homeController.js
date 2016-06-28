(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#overlay').show();
    $('#homeContent').show();
  };

  $('#salaryBtn').on('click', function() {
    setPaint();
  });

  module.homeController = homeController;
})(window);
