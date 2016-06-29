(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    About.fetchAll(About.appendAll);
    $('iframe').hide();
    $('#overlay').hide();
    $('.tab-content').hide();
    $('#aboutContent').empty();
    $('#aboutContent').fadeIn(850);
  };

  module.aboutController = aboutController;
})(window);
