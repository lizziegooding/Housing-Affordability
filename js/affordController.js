(function(module) {
  var affordController = {};

  // show all afford tab elements
  affordController.index = function() {
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#affordContent').show();
  };
  module.affordController = affordController;
})(window);
