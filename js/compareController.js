(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('.tab-content').hide();
    $('iframe').fadeIn(700);
    $('#overlay').fadeIn(700);
    $('#compareContent').fadeIn(700);

    console.log('calling compareController');
  };
  module.compareController = compareController;
})(window);
