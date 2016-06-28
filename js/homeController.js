(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#overlay').show();
    $('#homeContent').show();
  };

  $('#salarySubmit').on('click', function(e) {
    e.preventDefault();
    setPaint($('#testDol').val());
  });

  module.homeController = homeController;
})(window);
