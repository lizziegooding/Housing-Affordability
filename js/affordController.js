(function(module) {
  var affordController = {};

  affordController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#overlay').show();
    $('#affordContent').show();

    console.log('calling affordController');
  };
  module.affordController = affordController;
})(window);
