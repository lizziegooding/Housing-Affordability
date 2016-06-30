(function(module) {
  var affordController = {};

  affordController.index = function() {
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#affordContent').show();
  };
  module.affordController = affordController;
})(window);
