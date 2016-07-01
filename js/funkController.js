(function(module) {
  var funkController = {};

  // show all funk tab elements and populate page with fetchall
  funkController.index = function() {
    Funk.fetchAll(Funk.appendAll);
    $('iframe').hide();
    $('.tab-content').hide();
    $('#funkContent').empty();
    $('#funkDiv').show();
    $('#funkContent').fadeIn(850);
  };

  module.funkController = funkController;
})(window);
