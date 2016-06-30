(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    About.fetchAll(About.appendAll);
    $('#funkDiv').hide();
    $('iframe').hide();
    $('.tab-content').hide();
    $('#aboutContent').empty();
    $('#aboutContent').fadeIn(850);
  };

  module.aboutController = aboutController;
})(window);
