(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('.tab-content').hide();
    $('#compareContent').show();

    console.log('calling compareController');
  };
  module.compareController = compareController;
})(window);
