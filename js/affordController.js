(function(module) {
  var affordController = {};

  affordController.index = function() {
    $('.tab-content').hide();
    $('#affordContent').show();

    console.log('calling affordController');
  };
  module.affordController = affordController;
})(window);
