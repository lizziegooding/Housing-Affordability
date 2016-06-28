(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#overlay').show();
    $('#homeContent').show();

    console.log('calling homeController');
  };
  module.homeController = homeController;
})(window);
