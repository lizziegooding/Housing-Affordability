(function(module) {
  var funkController = {};

  funkController.index = function() {
    Funk.fetchAll(Funk.appendAll);
    $('#mainDiv').hide();
    $('iframe').hide();
    $('.tab-content').hide();
    $('#funkContent').empty();
    $('#funkDiv').show();

    $('#funkContent').fadeIn(850);
  };

  module.funkController = funkController;
})(window);
