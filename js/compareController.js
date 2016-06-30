(function(module) {
  var compareController = {};

  compareController.index = function() {
    $('#mainDiv').show();
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#compareContent').show();

    console.log('calling compareController');
  };
  module.compareController = compareController;
})(window);
