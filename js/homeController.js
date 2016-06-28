(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('#homeContent').show();

    console.log('calling homeController');
  };
  module.homeController = homeController;
})(window);
