(function(module) {
  var affordController = {};

  affordController.index = function() {
    $('#mainDiv').show();
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#affordContent').show();

    console.log('calling affordController');
  };
  module.affordController = affordController;
})(window);
