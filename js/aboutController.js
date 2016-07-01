(function(module) {
  var aboutController = {};

  // show all about tab elements and populate page with fetchall
  aboutController.index = function() {
    $('iframe').hide();
    $('.tab-content').hide();
    $('#aboutContent').show();
  };

  module.aboutController = aboutController;
})(window);
