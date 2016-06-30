(function(module) {
  var affordController = {};

  affordController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    // $('#overlay').fadeIn(700);
    $('#affordContent').show();

    console.log('calling affordController');
  };
  module.affordController = affordController;
})(window);
