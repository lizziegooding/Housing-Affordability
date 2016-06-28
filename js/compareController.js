(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#overlay').show();
    $('#compareContent').show();

    console.log('calling compareController');
  };
  module.compareController = compareController;
})(window);
