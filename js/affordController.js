(function(module) {
  var affordController = {};

  affordController.index = function() {
    $('.tab-content').hide();
    $('iframe').fadeIn(700);
    $('#overlay').fadeIn(700);
    $('#affordContent').fadeIn(700);

    console.log('calling affordController');
  };
  module.affordController = affordController;
})(window);
