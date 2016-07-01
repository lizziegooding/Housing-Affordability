(function(module) {
  var aboutController = {};

  // show all about tab elements and populate page with fetchall
  aboutController.index = function() {
    About.fetchAll(About.appendAll);
    $('#funkDiv').hide();
    $('iframe').hide();
    $('.tab-content').hide();
    $('#aboutTeam').empty();
    $('#aboutContent').fadeIn(850);
  };

  module.aboutController = aboutController;
})(window);
