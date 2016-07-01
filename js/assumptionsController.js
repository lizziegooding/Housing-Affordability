(function(module) {
  var assumptionsController = {};

  // show all assumptions tab elements
  assumptionsController.index = function() {
    $('.tab-content').hide();
    $('iframe').hide();
    $('#assumptionsContent').show();
  };
  module.assumptionsController = assumptionsController;
})(window);
