(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    // $('#overlay').fadeIn(700);
    $('#compareContent').show();

    console.log('calling compareController');
  };
  module.compareController = compareController;
})(window);
