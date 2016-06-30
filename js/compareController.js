(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('#funkDiv').hide();

    $('.tab-content').hide();
    $('iframe').show();
    // $('#overlay').fadeIn(700);
    $('#compareContent').show();

    console.log('calling compareController');
  };
  module.compareController = compareController;
})(window);
