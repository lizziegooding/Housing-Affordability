(function(module) {
  var funkController = {};

  funkController.index = function() {
    Funk.fetchAll(Funk.appendAll);
    $('#mainDiv').remove();
    $('iframe').hide();
    $('.tab-content').remove();
    $('#funkContent').empty();
    $('#funkDiv').show();

    $('#funkContent').fadeIn(850);
  };

  module.funkController = funkController;
})(window);
